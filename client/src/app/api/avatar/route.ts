import { getClient } from '@/db';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST (request: Request): Promise<NextResponse> {
  const reqJSON = await request.json();
  const { avatar, avatarName, userID } = reqJSON;

  if (!avatar || !avatarName) {
    return NextResponse.json({ error: 'Invaild file type' }, { status: 400 });
  }

  let result;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    result = await cloudinary.uploader.upload(avatar, {
      public_id: avatarName,
      folder: 'dark-secrets/avatars'
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  let newAvatar;
  if (!process.env.IMG_TO_ASCII_API) {
    newAvatar = result.secure_url;
  } else {
    const body = {
      img_url: result.secure_url,
      img_name: avatarName,
      definition: 'low'
    };

    const res = await fetch(process.env.IMG_TO_ASCII_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      newAvatar = result.secure_url;
    } else {
      const resJSON = await res.json();
      newAvatar = resJSON.img;
    }
  }

  const client = getClient();
  await client.connect();

  await client.query(
    'update users set avatar = $1 where id = $2',
    [newAvatar, userID]
  );

  await client.end();

  return NextResponse.json({ msg: 'Upload success', result }, { status: 201 });
}

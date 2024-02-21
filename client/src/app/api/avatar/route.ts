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

  const newAvatar = result.secure_url;

  const client = getClient();
  await client.connect();

  await client.query(
    'update users set avatar = $1 where id = $2',
    [newAvatar, userID]
  );

  await client.end();

  return NextResponse.json({ msg: 'Upload success', result }, { status: 201 });
}

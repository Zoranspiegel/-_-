export async function fetcher (url: RequestInfo | URL): Promise<Response> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('An error ocurred');
  }
  // eslint-disable-next-line @typescript-eslint/return-await
  return res.json();
}

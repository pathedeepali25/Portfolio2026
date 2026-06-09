// Run: CLOUDINARY_API_KEY=xxx CLOUDINARY_API_SECRET=yyy node scripts/get-cloudinary-assets.mjs
const CLOUD_NAME = 'dfim5nugc';
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!API_KEY || !API_SECRET) {
  console.error('Set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET env vars');
  process.exit(1);
}

const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');
let resources = [];
let nextCursor = null;

do {
  const url = new URL(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image`);
  url.searchParams.set('max_results', '500');
  if (nextCursor) url.searchParams.set('next_cursor', nextCursor);

  const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
  const data = await res.json();
  resources.push(...(data.resources ?? []));
  nextCursor = data.next_cursor;
} while (nextCursor);

console.log(JSON.stringify(resources.map(r => ({
  public_id: r.public_id,
  url: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto/${r.public_id}`,
  filename: r.public_id.split('/').pop(),
  format: r.format,
})), null, 2));

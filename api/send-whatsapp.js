export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const upstream = await fetch('https://api.ycloud.com/v2/whatsapp/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.YCLOUD_API_KEY,
    },
    body: JSON.stringify(req.body),
  })

  const text = await upstream.text()
  res.status(upstream.status).setHeader('Content-Type', 'application/json').send(text)
}
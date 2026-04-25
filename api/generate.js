export default async function handler(req, res) {
  const apiKey = process.env.AI_API_KEY; 

  // 1. Check if the key even loaded
  if (!apiKey) {
    return res.status(500).json({ error: "API Key missing in Vercel settings!" });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body) // This passes the message from your frontend
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

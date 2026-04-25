export default async function handler(req, res) {
  const apiKey = process.env.AI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Environment Variable AI_API_KEY is missing!" });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    
    // If Gemini sends an error, pass it back to the frontend
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Server crashed: " + error.message });
  }
}

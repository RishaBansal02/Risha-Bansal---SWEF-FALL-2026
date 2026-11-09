// Tiny OpenAI wrapper. You implement POST /ask.
// Run: npm run dev  ->  http://localhost:3002
// Put your key in .env (see .env.example). Never commit .env.

require("dotenv").config();
const express = require("express");

const app = express();
const PORT = 3002;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true, try: "POST /ask with { prompt: \"...\" }" });
});

// TODO: POST /ask — see hw/README.md
//   Read prompt; 400 if missing; fetch OpenAI; res.json({ reply: ... })

app.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({
      error: "prompt is required"
    });
  }

  try {
    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "user", content: prompt }
          ]
        })
      }
    );

    const data = await openaiRes.json();

    if (!openaiRes.ok) {
      console.error("OpenAI API error:", data);

      return res.status(502).json({
        error: "OpenAI API request failed",
        details: data.error?.message,
        status: openaiRes.status
      });
    }

    return res.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    console.error("OpenAI request error:", error);

    return res.status(500).json({
      error: "Something went wrong"
    });
  }
});

app.listen(PORT, () => {
  console.log(`OpenAI wrapper listening on http://localhost:${PORT}`);
});

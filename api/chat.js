export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const GROQ_API_KEY = "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";

  try {
    const { messages, model, max_tokens } = req.body;

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model || "llama-3.1-8b-instant",
          messages,
          max_tokens: max_tokens || 150,
        }),
      }
    );

    const data = await groqRes.json();

    if (!groqRes.ok) {
      return res
        .status(groqRes.status)
        .json({ error: data?.error?.message || "Groq API error" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({ error: "Internal proxy error" });
  }
}

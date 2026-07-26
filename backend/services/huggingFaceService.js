console.log("I am inside huggingFaceService");
const axios = require("axios");

const analyzeReview = async (review) => {
  try {
    const prompt = `
You are an AI assistant for a Homestay Review Analyzer.

Analyze the following guest review.

Return ONLY in this format:

Sentiment:
Theme:
AI Response:

Guest Review:
"${review}"
`;

    const response = await axios.post(
      "https://router.huggingface.co/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("HF Response:");
console.dir(response.data, { depth: null });

return response.data.choices[0].message.content;

  } catch (error) {
    console.error("========== HUGGING FACE ERROR ==========");
    console.error(
      error.response ? error.response.data : error.message
    );
    console.error("=======================================");

    throw new Error("Failed to analyze review");
  }
};

module.exports = {
  analyzeReview,
};
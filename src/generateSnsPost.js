// generateSnsPost.js

const openai = require("openai");
const fs = require("fs");

openai.apiKey = "your_openai_api_key";

const settings = JSON.parse(fs.readFileSync("settings.json", "utf-8"));

async function generateSnsPost(topic, maxTokens) {
  try {
    const response = await openai.Completion.create({
      engine: settings.engine,
      prompt: topic,
      max_tokens: maxTokens,
      n: settings.n,
      stop: settings.stop,
      temperature: settings.temperature,
    });

    return response.choices[0].text.trim();
  } catch (error) {
    console.error("Error generating SNS post:", error);
  }
}

(async () => {
  const topic = process.argv[2];
  const maxTokens = parseInt(settings.maxTokens);

  if (!topic) {
    console.error("トピックをコマンドライン引数で指定してください。");
    process.exit(1);
  }

  const snsPost = await generateSnsPost(topic, maxTokens);

  console.log("生成されたSNS投稿文:");
  console.log(snsPost);
})();

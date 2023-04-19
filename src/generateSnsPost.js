// generateSnsPost.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("Error: Please set the OPENAI_API_KEY environment variable.");
  process.exit(1);
}

if (process.argv.length < 3) {
  console.error("Error: Please provide a topic as a command line argument.");
  process.exit(1);
}

const topic = process.argv[2];

const configuration = new Configuration({ apiKey: apiKey });
const openai = new OpenAIApi(configuration);

const settings = JSON.parse(fs.readFileSync("settings.json", "utf-8"));

async function generateSnsPost(topic) {
  try {
    const prompt = `Create an engaging SNS post about ${topic}.`;

    const response = await openai.createCompletion({
      model: settings.engine,
      prompt: prompt,
      max_tokens: settings.max_tokens,
      n: settings.n,
      stop: null,
      temperature: settings.temperature,
    });

    const postText = response.data.choices[0].text.trim();
    console.log(`SNS Post about ${topic}: ${postText}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

generateSnsPost(topic);


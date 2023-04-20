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
    const prompt = `${topic}について、SNS投稿の文字列を作成してください。`;

    // @see https://platform.openai.com/docs/api-reference/chat/create?lang=node.js
    // ToDo:パラメータをsettings.jsonから読み込む
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: prompt}],
    });
    //console.dir(response.data.choices[0].message);
    const postText = response.data.choices[0].message.content;
    //console.log(`SNS Post about ${topic}: ${postText}`);
    console.log(`${postText}`);

  } catch (error) {
    console.error("Error:", error);
  }
}

generateSnsPost(topic);


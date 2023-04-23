// https://github.com/plhery/node-twitter-api-v2
require('dotenv').config();
//import { TwitterApi } from 'twitter-api-v2';
const { TwitterApi } = require('twitter-api-v2')

// Instantiate with desired auth type (here's Bearer v2 auth)
console.log("call new TwitterApi");
const twitterClient = new TwitterApi(process.env.APP_USER_TOKEN);
console.log("called new TwitterApi");

// Tell typescript it's a readonly app
const readOnlyClient = twitterClient.readOnly;

async function post(msg) {
  console.log("start post");
  try {
    // Play with the built in methods
    console.log("call userByUsername()");
    //const user = await readOnlyClient.v2.userByUsername('username');
    console.log("called userByUsername()");
    await twitterClient.v1.tweet('Hello, this is a test.');
    console.log("called tweet()");
    // You can upload media easily!
    //await twitterClient.v1.uploadMedia('./big-buck-bunny.mp4');
    console.log("post done");

  } catch (error) {
    console.error("Error:", error);
    console.error("data:", error.data);
  }
}

post("");


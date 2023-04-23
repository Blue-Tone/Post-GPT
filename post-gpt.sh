
#TREND=`node src/getTrendWords.js`
TREND="テスト"

POST_MSG=`node src/generateSnsPost.js $TREND`

echo $POST_MSG

#Twitterに投稿
node src/postToTwitter.js $POST_MSG



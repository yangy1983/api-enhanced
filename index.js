javascript
// index.js - Vercel serverless entry point
const { constructServer } = require('./server');

let cachedApp;

module.exports = asyns (req, res) => {
  if (!cachedApp){
    const app = await constructServer);
    cachedApp =app;
  }
  return cachedApp(req, res);
};

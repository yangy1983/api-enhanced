javascript
const fs = require('fs');
const path = require('path');
const os = require('os');
const { constructServer } = require('./server');
const generateConfig = require('./generateConfig');

let cachedApp;
let initialized = false;

async function initialize() {
  // 确保 anonymous_token 文件存在
  const tmpPath = os.tmpdir();
  const tokenPath = path.resolve(tmpPath, 'anonymous_token');
  if (!fs.existsSync(tokenPath)) {
    fs.writeFileSync(tokenPath, '', 'utf-8');
  }
  // 获取匿名 token + xeapi 密钥
  try { await generateConfig(); } catch (e) { console.error('init error:', e); }
  // 构建 Express app
  cachedApp = await constructServer();
  initialized = true;
}

module.exports = async (req, res) => {
  if (!initialized) {
    await initialize();
  }
  return cachedApp(req, res);
};

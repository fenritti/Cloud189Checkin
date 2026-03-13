// 这是兼容原版的 bark.js 支持 group
module.exports = {
  sendKey: process.env.BARK_KEY || '',
  apiServer: process.env.BARK_SERVER || 'https://api.day.app',
  group: process.env.BARK_GROUP || 'Cloud189Checkin' // 👈 这里加分组
};

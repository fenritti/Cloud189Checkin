const axios = require('axios');
const logger = require('../logger');

// Bark 配置（支持环境变量）
const BARK_KEY = process.env.BARK_KEY || '';
const BARK_SERVER = process.env.BARK_SERVER || 'https://api.day.app';
const BARK_GROUP = process.env.BARK_GROUP || 'Cloud189Checkin'; // 👈 分组在这里

// 推送方法（给主程序调用）
async function push(title, content) {
  if (!BARK_KEY) {
    logger.warn('Bark 未配置 BARK_KEY，跳过推送');
    return;
  }

  try {
    const pushUrl = `${BARK_SERVER}/${BARK_KEY}`;
    const payload = {
      title: title,
      body: content,
      group: BARK_GROUP, // 👈 核心：启用分组
      sound: '1', // 通知提示音
    };

    await axios.post(pushUrl, payload, { timeout: 8000 });
    logger.info('✅ Bark 推送成功（已分组）');
  } catch (err) {
    logger.error('❌ Bark 推送失败：', err.message);
  }
}

// 导出给主程序使用
module.exports = {
  sendKey: BARK_KEY,
  apiServer: BARK_SERVER,
  push: push, // 必须导出这个方法
};

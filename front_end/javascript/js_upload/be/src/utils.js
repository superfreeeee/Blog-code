const path = require('path');

const { UPLOAD_DIR, TMP_DIR } = require('./multerUpload');

/**
 * 获取文件路径
 * @param {*} fileName
 * @returns
 */
const getFilePath = (fileName) => {
  return path.join(UPLOAD_DIR, fileName);
};

/**
 * 获取文件块路径
 * @param {*} fileMD5
 * @returns
 */
const getChunkPath = (fileMD5) => {
  return path.join(TMP_DIR, fileMD5);
};

module.exports = {
  getFilePath,
  getChunkPath,
};

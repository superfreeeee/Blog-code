const path = require('path');
const multer = require('@koa/multer');
const fse = require('fs-extra');

// 存储上传文件的目录
const UPLOAD_DIR = path.join(__dirname, '../public/upload');
const TMP_DIR = path.join(__dirname, '../public/tmp');

/**
 * 简单上传
 */
const storage = multer.diskStorage({
  // ! simple
  // destination: async function (req, file, cb) {
  //   cb(null, UPLOAD_DIR)
  // },
  destination: async function (req, file, cb) {
    const relativePath = file.originalname.replace(/\@/g, path.sep);
    const nameIndex = relativePath.lastIndexOf(path.sep);
    const saveDir = path.resolve(
      UPLOAD_DIR,
      relativePath.substring(0, nameIndex)
    );
    await fse.ensureDir(saveDir);
    // 设置文件的存储目录
    cb(null, saveDir);
  },
  filename: function (req, file, cb) {
    // 设置文件名
    const originName = file.originalname;
    const name = originName.includes('@')
      ? originName.split('@')[1]
      : originName;
    cb(null, name);
  },
});

const multerUpload = multer({ storage });

/**
 * 分片上传
 */
const storageSplit = multer.diskStorage({
  destination: async function (req, file, cb) {
    const fileMD5 = file.originalname.split('-')[0];
    const fileDir = path.join(TMP_DIR, fileMD5);
    await fse.ensureDir(fileDir);
    cb(null, fileDir);
  },
  filename: function (req, file, cb) {
    const chunkIndex = file.originalname.split('-')[1];
    cb(null, `${chunkIndex}`);
  },
});

const multerUploadSplit = multer({ storage: storageSplit });

module.exports = {
  multerUpload,
  multerUploadSplit,
  UPLOAD_DIR,
  TMP_DIR,
};

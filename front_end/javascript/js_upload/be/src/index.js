const Koa = require('koa');
const Router = require('@koa/router');
const static = require('koa-static');
const cors = require('@koa/cors');
const koaBody = require('koa-body');

const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const { readdirSync } = require('fs');

const {
  multerUpload,
  multerUploadSplit,
  UPLOAD_DIR,
} = require('./multerUpload');
const { getFilePath, getChunkPath } = require('./utils');

const app = new Koa();
const router = new Router();

const PORT = 3001;
// 上传后资源的URL地址
const RESOURCE_URL = `http://localhost:${PORT}`;
const IGNORES = ['.DS_Store'];

app.use(koaBody());

/**
 * 测试路由
 */
router.get('/hello', async (ctx) => {
  ctx.body = 'Hello World with Koa';
});

/**
 * 单文件上传路由
 */
router.post(
  '/upload/single',
  multerUpload.single('file'),
  async (ctx) => {
    try {
      const file = ctx.file;
      console.log('file:', file);
      ctx.body = {
        code: 1,
        msg: 'Upload Success',
        url: `${RESOURCE_URL}/${file.originalname}`,
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 0,
        msg: 'Upload Failed',
      };
    }
  }
);

/**
 * 多文件上传路由
 */
router.post(
  '/upload/multiple',
  multerUpload.fields([{ name: 'files', maxCount: 3 }]),
  async (ctx) => {
    try {
      const files = ctx.files.files;
      console.log('files:', files);
      ctx.body = {
        code: 1,
        msg: 'Upload Success',
        files: files.map((file) => {
          return { url: `${RESOURCE_URL}/${file.originalname}` };
        }),
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: 0,
        msg: 'Upload Failed',
      };
    }
  }
);

/**
 * 检查文件是否存在
 */
router.get('/upload/checkExist', async (ctx) => {
  const { n: fileName, m: fileMD5, c: chunks } = ctx.query;
  console.log(`fileName: ${fileName}`);
  console.log(`fileMD5: ${fileMD5}`);
  console.log(`chunks: ${chunks}`);

  // 检查文件是否存在
  const filePath = getFilePath(fileName);
  const fileExists = await fse.pathExists(filePath);
  if (fileExists) {
    ctx.body = {
      code: 1,
      data: {
        isExists: true,
        url: `${RESOURCE_URL}/${fileName}`,
      },
    };
    return;
  }

  let chunkIds = [];
  const chunksPath = getChunkPath(fileMD5);
  const chunksExist = await fse.pathExists(chunksPath);
  if (chunksExist) {
    chunkIds = readdirSync(chunksPath).filter(
      (file) => !IGNORES.includes(file)
    );
  }

  if (chunkIds.length === +chunks) {
    await concatFiles(chunksPath, filePath);
    ctx.body = {
      code: 1,
      data: {
        isExists: true,
        url: `${RESOURCE_URL}/${fileName}`,
      },
    };
    return;
  }

  ctx.body = {
    code: 1,
    data: {
      isExists: false,
      chunkIds,
    },
  };
});

const concatFiles = async (source, target) => {
  const readFile = (filePath, ws) =>
    new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .on('data', (data) => ws.write(data))
        .on('end', resolve)
        .on('error', reject);
    });
  const chunkIds = readdirSync(source);
  const sortedChunkIds = chunkIds
    .filter((chunkId) => !IGNORES.includes(chunkId))
    .sort((a, b) => a - b);
  const writeStream = fs.createWriteStream(target);
  for (const chunkId of sortedChunkIds) {
    const chunkPath = path.join(source, chunkId);
    await readFile(chunkPath, writeStream);
    await fs.unlinkSync(chunkPath);
  }
  fs.rmdirSync(source);
  writeStream.end();
};

/**
 * 上传 chunk 路由
 */
router.post(
  '/upload/chunk',
  multerUploadSplit.single('file'),
  async (ctx) => {
    const body = ctx.request.body;
    console.log('body:', body);
    const chunks = body.chunks;
    const fileMD5 = ctx.file.originalname.split('-')[0];
    const chunkPath = getChunkPath(fileMD5);
    const files = readdirSync(chunkPath).filter(
      (file) => !IGNORES.includes(file)
    );
    if (files.length === +chunks) {
      const filePath = getFilePath(body.name);
      await concatFiles(chunkPath, filePath);
    }
    ctx.body = {
      code: 1,
      data: ctx.file,
      concat: files.length === chunks,
    };
  }
);

// 注册中间件
app.use(cors());
app.use(static(UPLOAD_DIR));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`app starting at ${RESOURCE_URL}`);
});

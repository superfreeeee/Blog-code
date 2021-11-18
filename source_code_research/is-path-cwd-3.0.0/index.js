import process from 'node:process';
import path from 'node:path';

export default function isPathCwd(path_) {
  let cwd = process.cwd();

  path_ = path.resolve(path_);

  // win32 下忽略大小写
  if (process.platform === 'win32') {
    cwd = cwd.toLowerCase();
    path_ = path_.toLowerCase();
  }

  // 与 process.cwd 方法返回值做比较
  return path_ === cwd;
}

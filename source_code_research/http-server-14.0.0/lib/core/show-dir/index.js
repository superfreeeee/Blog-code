'use strict';

const styles = require('./styles');
const lastModifiedToString = require('./last-modified-to-string');
const permsToString = require('./perms-to-string');
const sizeToString = require('./size-to-string');
const sortFiles = require('./sort-files');
const fs = require('fs');
const path = require('path');
const he = require('he');
const etag = require('../etag');
const url = require('url');
const status = require('../status-handlers');

const supportedIcons = styles.icons;
const css = styles.css;

/**
 * 展示目录页面中间件
 * @param {*} opts 
 * @returns 
 */
// ? Read
module.exports = (opts) => {
  // opts are parsed by opts.js, defaults already applied
  const cache = opts.cache;
  const root = path.resolve(opts.root);
  const baseDir = opts.baseDir;
  const humanReadable = opts.humanReadable;
  const hidePermissions = opts.hidePermissions;
  const handleError = opts.handleError;
  const showDotfiles = opts.showDotfiles;
  const si = opts.si;
  const weakEtags = opts.weakEtags;

  /**
   * 展示目录页面中间件
   */
  // ? Read
  return function middleware(req, res, next) {
    // Figure out the path for the file from the given url
    const parsed = url.parse(req.url); // 解析 url
    const pathname = decodeURIComponent(parsed.pathname); // 请求路径
    const dir = path.normalize(
      path.join(
        root,
        path.relative(
          path.join('/', baseDir),
          pathname
        )
      )
    ); // 请求目录

    fs.stat(dir, (statErr, stat) => {
      if (statErr) {
        // 读文件 stat 异常
        if (handleError) {
          // 处理异常  => 500
          status[500](res, next, { error: statErr });
        } else {
          // 否则直接进入下一个中间件
          next();
        }
        return;
      }

      // files are the listing of dir
      fs.readdir(dir, (readErr, _files) => {
        // 读取目录下所有文件
        let files = _files;

        if (readErr) {
          // 读异常
          if (handleError) {
            // 500
            status[500](res, next, { error: readErr });
          } else {
            // or next
            next();
          }
          return;
        }

        // Optionally exclude dotfiles from directory listing.
        if (!showDotfiles) {
          // 隐藏隐藏文件
          files = files.filter(filename => filename.slice(0, 1) !== '.');
        }

        // 返回固定页面
        res.setHeader('content-type', 'text/html');
        res.setHeader('etag', etag(stat, weakEtags));
        res.setHeader('last-modified', (new Date(stat.mtime)).toUTCString());
        res.setHeader('cache-control', cache);

        /**
         * 渲染目录页面（文件列表）
         * @param {*} dirs 
         * @param {*} renderFiles 
         * @param {*} lolwuts 
         */
        // ? Read
        function render(dirs, renderFiles, lolwuts) {
          // each entry in the array is a [name, stat] tuple

          // render: html, head, body start
          let html = `${[
            '<!doctype html>',
            '<html>',
            '  <head>',
            '    <meta charset="utf-8">',
            '    <meta name="viewport" content="width=device-width">',
            `    <title>Index of ${he.encode(pathname)}</title>`,
            `    <style type="text/css">${css}</style>`,
            '  </head>',
            '  <body>',
            `<h1>Index of ${he.encode(pathname)}</h1>`,
          ].join('\n')}\n`;

          // render table
          html += '<table>';

          const failed = false;
          const writeRow = (file) => {
            // render a row given a [name, stat] tuple
            const isDir = file[1].isDirectory && file[1].isDirectory();
            // href 文件路径
            let href = `./${encodeURIComponent(file[0])}`;

            // append trailing slash and query for dir entry
            if (isDir) {
              // 目录加上后缀 /
              href += `/${he.encode((parsed.search) ? parsed.search : '')}`;
            }

            const displayName = he.encode(file[0]) + ((isDir) ? '/' : '');
            const ext = file[0].split('.').pop();
            const classForNonDir = supportedIcons[ext] ? ext : '_page';
            const iconClass = `icon-${isDir ? '_blank' : classForNonDir}`;

            // render tr 行
            // TODO: use stylessheets?
            html += `${'<tr>' +
              '<td><i class="icon '}${iconClass}"></i></td>`;
            if (!hidePermissions) {
              // 文件权限
              html += `<td class="perms"><code>(${permsToString(file[1])})</code></td>`;
            }
            html +=
              // 最后修改时间
              `<td class="last-modified">${lastModifiedToString(file[1])}</td>` +
              `<td class="file-size"><code>${sizeToString(file[1], humanReadable, si)}</code></td>` +
              `<td class="display-name"><a href="${href}">${displayName}</a></td>` +
              '</tr>\n';
          };

          // 按 dirs、files、lolwuts 顺序打印
          dirs.sort((a, b) => a[0].toString().localeCompare(b[0].toString())).forEach(writeRow);
          renderFiles.sort((a, b) => a.toString().localeCompare(b.toString())).forEach(writeRow);
          lolwuts.sort((a, b) => a[0].toString().localeCompare(b[0].toString())).forEach(writeRow);

          // render body end
          html += '</table>\n';
          html += `<br><address>Node.js ${
            process.version
            }/ <a href="https://github.com/http-party/http-server">http-server</a> ` +
            `server running @ ${
            he.encode(req.headers.host || '')}</address>\n` +
            '</body></html>'
          ;

          if (!failed) {
            // 返回 200 text/html
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
          }
        }

        // ? Read
        // 对当前目录下文件进行排序（分类 err, dir, file）
        sortFiles(dir, files, (lolwuts, dirs, sortedFiles) => {
          // It's possible to get stat errors for all sorts of reasons here.
          // Unfortunately, our two choices are to either bail completely,
          // or just truck along as though everything's cool. In this case,
          // I decided to just tack them on as "??!?" items along with dirs
          // and files.
          //
          // Whatever.

          // if it makes sense to, add a .. link
          if (path.resolve(dir, '..').slice(0, root.length) === root) {
            // 加入 .. 文件
            fs.stat(path.join(dir, '..'), (err, s) => {
              if (err) {
                if (handleError) {
                  // 能读但是失败  => 500
                  status[500](res, next, { error: err });
                } else {
                  next();
                }
                return;
              }
              dirs.unshift(['..', s]);
              render(dirs, sortedFiles, lolwuts);
            });
          } else {
            render(dirs, sortedFiles, lolwuts);
          }
        });
      });
    });
  };
};

# Linux 常见命令(shell 指令)

## 指令查询

- `man <command>`：查询指令说明
- `info`：查询指令说明

## 用户相关

- `passwd`：修改密码
- `mkpasswd`：生成随机密码
- `who`、`finger`：展示目前用户

## 时间/日期

- `date`：展示当前系统时间
- `cal`：展示日历

## 界面/消息

- `clear`：清空命令行
- `echo <arg>`：打印信息
- `write <user> <tty>`：向其他用户(具体 tty)传送消息
- `wall <message>`：广播消息
- `talk <user> <tty>`：向其他用户(具体 tty)交换消息
- `mesg [yn]`：是否接受消息

## 文件操作

- 目录相关
  - `pwd`：打印当前目录路径
  - `cd <dir-path>`：改变目录
  - `mkdir <dir-name>`：创建目录
  - `rmdir <dir-name>`：删除目录
  - `ls [-alrtAFR] <dir-name>`：展示当前目录内容
    - `-a`：显示隐藏文件
    - `-l`：显示文件类型(1)、权限(9)、连接数、用户名、用户分组、文件字节数、最后修改时间、文件名
    - `-r`：反序显示(默认依字母序显示)
    - `-t`：按最后修改时间显示
    - `-A`：显示隐藏文件(排除 `.` 跟 `..`)
    - `-F`：添加符号(目录加 `/`、可执行档加 `*`)
    - `-R`：递归显示
- 文件相关
  - `touch <file-name>`：访问文件(更新最后修改时间) or 创建不存在文件
  - `cp <file-name> <dir-name>`：复制文件
  - `mv <file-name> <dir-name/file-name>`：文件移动、改名
  - `ln [-bsv] <file-name> <file-name>`：创建链接文件
    - `-b`：删除、覆盖前一个链接
    - `-s`：软链接
    - `-v`：显示详细处理过程
  - `rm [-f|-i] [-dPRrvW] file`：删除文件
  - `cat <file-name>`：展示文件内容(按行展示)
  - `more/less <file-name>`：展示文件内容(按页展示)
- 权限相关
  - `chmod [-cfvR] [--help] [--version] mode file...`：修改文件权限
    - `mode = [ugoa][[+-=][rwxX]...][,...]`：
      - 用户选择
        - `u`：拥有用户
        - `g`：分组用户
        - `o`：其他用户
        - `a`：所有用户
      - 权限增减
        - `+`：新增权限
        - `-`：取消权限
        - `=`：唯一权限
      - 权限类型
        - `r`：读
        - `w`：写
        - `x`：执行
        - `X`
      - 数字形式：`r` 为 4、`w` 为 2、`x` 为 1，组合。ex: `chmod 777`

## 进程 / 作业控制

- `ps`：展示进程信息
- `pstree`：树状展示进程信息
- `<ctrl + z>`：将作业放到后台
- `jobs`：查看后台运行作业
- `fg`：后台作业放到前台运行
- `bg`：继续执行一个后台暂停的作业
- `nohup`：后台运行命令
- `nice`：挂起时改变进程优先级
- `renice`：运行时改变进程优先级
- `top`：CPU 进程动态信息
- `man <command>`：查询指令说明


- ``：

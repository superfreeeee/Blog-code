#导入nginx镜像
FROM nginx
# 作者信息
MAINTAINER superfree <superfreeeee@gmail.com>
# 把当前打包工程的html复制到虚拟地址
COPY build/ /usr/share/nginx/html/
# 使用自定义nginx.conf配置端口和监听
RUN rm /etc/nginx/conf.d/default.conf
ADD default.conf /etc/nginx/conf.d/
# nginx 为静态资源分配不需要重新启动
RUN bash -c 'echo init ok!!!'
# JDK 8
FROM java:8
# 作者
MAINTAINER superfree <superfreeeee@gmail.com>
# 目标宗卷
VOLUME /blog/file
# 复制执行档案
COPY be-0.0.1-SNAPSHOT.jar app.jar
# 启动命令
RUN bash -c "touch /app.jar"
ENTRYPOINT ["java", "-jar", "app.jar"]


FROM java:8
MAINTAINER superfree <superfreeeee@gmail.com>
VOLUME /tmp
COPY demo-0.0.1-SNAPSHOT.jar app.jar
RUN bash -c "touch /app.jar"
ENTRYPOINT ["java", "-jar", "app.jar"]

FROM maven:3.9-amazoncorretto-21 as build-stage

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn clean package -DskipTests

FROM amazoncorretto:21

WORKDIR /app

COPY --from=build-stage /app/target/pizzaria-0.0.1-SNAPSHOT.jar pizzaria-0.0.1-SNAPSHOT.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "pizzaria-0.0.1-SNAPSHOT.jar"]

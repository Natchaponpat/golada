# build stage
FROM golang:alpine AS build-env
WORKDIR /
ADD ./* golada-backend/
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh gcc musl-dev && \
    cd golada-backend  && go build -o golada-backend

# final stage
FROM alpine
RUN apk --no-cache add ca-certificates
WORKDIR /app
ENV GOLADA_BACKEND_PORT 8080
COPY --from=build-env /golada-backend/golada-backend /app/.
CMD ["/app/golada-backend"]

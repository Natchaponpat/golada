# build stage
FROM golang AS build-env
WORKDIR /
ADD ./* golada-backend/
RUN cd golada-backend  && go build -o golada-backend
ENV GOLADA_BACKEND_PORT 8080
CMD ["/golada-backend/golada-backend"]

## final stage
#FROM alpine
#RUN apk --no-cache add ca-certificates
#WORKDIR /app
#ENV GOLADA_BACKEND_PORT 8080
#COPY --from=build-env /golada-backend/golada-backend /app/.
##ENTRYPOINT ./golada-backend
#RUN ls -la
#RUN pwd
#CMD ["/app/golada-backend"]

FROM alpine:latest
WORKDIR /app

COPY /bin/Release/net8.0/linux-musl-x64/ ./
COPY scrapbox.db ./scrapbox.db

RUN chmod +x ./backend
RUN apk add --no-cache icu-libs

EXPOSE 5000

CMD ["./backend"]
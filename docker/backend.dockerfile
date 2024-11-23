FROM golang:alpine

RUN apk add --no-cache libaio

RUN go install github.com/air-verse/air@latest \
    && go install github.com/go-delve/delve/cmd/dlv@latest \
    && rm -rf /go/pkg /root/.cache

RUN adduser -D -u 1000 -g 1000 builder \
    && mkdir /src && chown builder:builder /src 

USER builder
WORKDIR /src

CMD air

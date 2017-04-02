FROM alpine:3.5

RUN apk add --update nodejs

COPY ./dist /home/nobody/app/dist
COPY ./src /home/nobody/app/src
COPY gulpfile.js package.json /home/nobody/app/
RUN chown -R nobody:nobody /home/nobody
USER nobody
ENV HOME=/home/nobody
WORKDIR /home/nobody/app/
RUN npm install && ./node_modules/gulp/bin/gulp.js
CMD ./node_modules/local-web-server/bin/cli.js -p 8080 -d ./dist
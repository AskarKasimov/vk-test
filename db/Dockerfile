FROM node:slim
WORKDIR /app
RUN yarn global add json-server
COPY ./db.json ./
EXPOSE 3001
CMD ["json-server", "db.json", "--port", "3001"]
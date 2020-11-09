FROM node:12.16.1-slim

WORKDIR /bot-controller

COPY package.json package.json
RUN npm install

COPY . .

EXPOSE 1234
ENTRYPOINT ["npm", "run", "start"]

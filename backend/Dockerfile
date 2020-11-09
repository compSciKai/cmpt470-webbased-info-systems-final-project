FROM node:12.16.1-slim

WORKDIR /backend

COPY package.json package.json
RUN npm install

COPY . .

ENTRYPOINT ["npm", "run", "start"]

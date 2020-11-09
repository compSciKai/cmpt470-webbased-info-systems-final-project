FROM node:12.16.1-slim

WORKDIR /frontend

COPY package.json package.json
RUN npm install

COPY . .
RUN npm run build

ENTRYPOINT ["npm", "run", "start"]

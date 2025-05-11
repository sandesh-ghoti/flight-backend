FROM node:23.11.0-bookworm-slim
WORKDIR /development/nodejs/flight-service

COPY package.json .
RUN npm install --omit=dev
COPY . .

CMD ["npm", "run", "dev"]
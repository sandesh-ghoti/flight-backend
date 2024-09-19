FROM node
WORKDIR /development/nodejs/flight-service

COPY package.json .
RUN npm install --omit=dev
COPY . .

CMD ["npm", "run", "dev"]
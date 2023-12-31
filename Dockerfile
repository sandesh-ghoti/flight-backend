FROM node
WORKDIR /development/nodejs/flight-service
COPY . .
RUN npm install nodemon
RUN npm ci
CMD ["npx", "nodemon","./src"]
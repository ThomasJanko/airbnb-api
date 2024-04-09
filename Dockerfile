# Dockerfile

FROM node:20

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 4040

CMD ["npm", "start"]
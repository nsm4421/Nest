FROM node:18
WORKDIR /user/src/app
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm","run","start:dev"]
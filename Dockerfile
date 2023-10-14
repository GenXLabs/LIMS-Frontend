FROM node:16-alpine

RUN mkdir -p /user/app
WORKDIR /user/app

COPY ./ ./

RUN npm install
RUN npm run buld

EXPOSE 3000
CMD ["npm","start"]
FROM node:alpine

WORKDIR /app

COPY ./ ./
RUN npm ci

EXPOSE 3001

CMD ["npm", "start"]
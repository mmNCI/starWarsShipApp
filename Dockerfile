# syntax=docker/dockerfile:1
FROM cimg/node:20.11
ENV NODE_ENV=production
COPY ["package.json","package_lock.json*","./"]
RUN sudo npm install
COPY . .
CMD ["npm","start"]
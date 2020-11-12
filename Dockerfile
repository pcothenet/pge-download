FROM node:12.18.3

COPY package*.json /opt/app/
COPY tsconfig.json /opt/app/
COPY .npmrc /opt/app/

WORKDIR /opt/app

RUN npm ci

ENV PATH /opt/app/node_modules/.bin:$PATH

COPY lib/ /opt/app/lib/

RUN npm run build

USER node
EXPOSE 3011
CMD [ "npm", "run", "start-docker" ]

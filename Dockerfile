FROM node:18 as builder

ENV CODE_DIR /code

EXPOSE 9000
CMD ["yarn", "dev"]

WORKDIR $CODE_DIR

RUN yarn global add @quasar/cli
COPY code/package.json .
COPY code/yarn.lock .

RUN ln -s ../node_modules node_modules && mkdir ../node_modules
RUN yarn 

COPY code .


FROM oraclelinux:7-slim

RUN yum -y install oracle-nodejs-release-el7 oracle-instantclient-release-el7 && \
    yum-config-manager --disable ol7_developer_nodejs\* && \
    yum-config-manager --enable ol7_developer_nodejs16 && \
    yum -y install nodejs node-oracledb-node16 && \
    rm -rf /var/cache/yum/*

ENV NODE_PATH=/usr/lib/node_modules/ \
    NAMES.DIRECTORY_PATH=info

WORKDIR /usr/lib/oracle/21/client64/lib/network/admin

COPY tnsnames.ora ./


WORKDIR /usr/src/js

COPY package.json ./

COPY . .

RUN npm install

EXPOSE 3001


CMD ["node", "index.js"]
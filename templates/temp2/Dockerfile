# ---- Base Node ----

FROM node:16.13.0-alpine AS base
ARG NPM_TOKEN_ARG
ENV NPM_TOKEN=$NPM_TOKEN_ARG
# install node
RUN apk add --no-cache tini  \
        python3 \
        make \
        g++
# set working directory
WORKDIR /app
# Set tini as entrypoint
ENTRYPOINT ["/sbin/tini", "--"]
# copy project file
COPY .npmrc .
COPY package.json .
RUN npm set-script prepare ""

# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install

#
# ---- Test ----
# run linters, setup and tests
FROM dependencies AS build
COPY . .
RUN  npm run lint
RUN  npm run build

#
# ---- Release ----
FROM base AS release
# copy production node_modules
COPY --from=dependencies /app/prod_node_modules ./node_modules
COPY --from=build /app/build ./build
# copy app sources
COPY . .
# expose port and define CMD
EXPOSE 8080
CMD npm run start

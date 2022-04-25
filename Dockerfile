# Image source
FROM node:16-alpine

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY ["package.json", "yarn.lock", "./" ] 

# Then install the NPM module
RUN yarn --frozen-lockfile

# Copy current directory to APP folder
COPY . /app/

EXPOSE 3000
CMD ["yarn", "run", "start:dev"]
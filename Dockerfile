FROM node:18-alpine AS base
WORKDIR /app
RUN apk update && apk add \
    git \
    && rm -rf /var/cache/apk/*
    
COPY package*.json ./
RUN npm install --ignore-scripts

# Download the important BOTC repo files into this container.
# This downloads far less data than a generic 
# RUN git clone https://github.com/ThePandemoniumInstitute/botc-release.git /app/botc-release
RUN mkdir -p /app/botc-release
WORKDIR /app/botc-release
RUN git init && \
    git remote add origin https://github.com/ThePandemoniumInstitute/botc-release.git && \
    git config core.sparseCheckout true && \
    echo "resources/" >> .git/info/sparse-checkout && \
    git branch -m main && \
    git pull origin main
RUN mkdir -p /app/public/assets/icons/official
RUN mv /app/botc-release/resources/characters/*/* /app/public/assets/icons/official/
WORKDIR /app
RUN rm /app/botc-release -rf

COPY . . 


FROM base AS dev
EXPOSE 3000
CMD ["npm", "start"]

FROM base AS build
RUN npm run build

FROM docker.io/nginxinc/nginx-unprivileged:latest AS prod
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

FROM node:23.11.0-slim

RUN apt-get update && \
    apt-get install -y netcat-openbsd && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY ./to-do-list-frontend/ ./
COPY ./entrypoint.frontend.sh ./
RUN npm install

EXPOSE 3000

ENTRYPOINT ["./entrypoint.frontend.sh"]
CMD ["npm", "run", "build"]
# Incomplete for production
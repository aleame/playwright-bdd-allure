FROM mcr.microsoft.com/playwright:v1.57.0

WORKDIR /app

COPY package.json package-lock.json ./

RUN apt-get update && apt-get install -y default-jre && \
    npm install -g allure-commandline --save-dev && \
    npm ci && \
    rm -rf /var/lib/apt/lists/*

COPY . .

CMD ["npx", "playwright", "test"]

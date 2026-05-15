FROM guts778/playwright-java:v1

WORKDIR /app

# 1. Install project dependencies (only re-runs if package.json changes)
COPY package.json package-lock.json ./
RUN npm ci

# 2. Copy project files
COPY . .

# 3. Generate BDD tests
RUN npm run bddgen

# 4. Default command
CMD ["npm", "run", "test"]

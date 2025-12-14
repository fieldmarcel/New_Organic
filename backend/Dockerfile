FROM node:18-alpine

WORKDIR /app

# Copying  only package files first
COPY package*.json ./

# Installing  dependencies insdi container (Linux binaries)
RUN npm install

# Copying  rest of the app (without  node_modules)
COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]

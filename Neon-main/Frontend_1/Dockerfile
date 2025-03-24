FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Ensure the assets directory is copied
COPY assets  ../assets

EXPOSE 5173

ENV VITE_BACKEND_URL=http://localhost:3000/api/v1/

CMD ["npm", "run", "dev"]
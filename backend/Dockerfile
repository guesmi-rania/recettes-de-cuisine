# backend/Dockerfile
FROM node:18

WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port du backend
EXPOSE 5000

# Lancer le backend
CMD ["npm", "start"]

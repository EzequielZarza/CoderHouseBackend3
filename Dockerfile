#Se toma la imagen base Node de Docker Hub
FROM node

#Se crea carpeta interna donde el projecto sera guardado
WORKDIR /app

#Se copia el package.json a la nueva carpeta
COPY package.json .

#Se instalan las dependencias en la nueva carpeta
RUN npm install 

#Se copia todo el codigo de la aplicacion a la nueva carpeta
COPY . .

#Se configura para trabajar en el puerto 8080
EXPOSE 8080

#Se ejecuta npm start por consola para que funcione
CMD [ "npm", "start" ]

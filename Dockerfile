# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=build /app/build/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

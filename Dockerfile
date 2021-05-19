FROM nginx:latest

EXPOSE 80

COPY provisioning/nginx/sunshine-react.conf /etc/nginx/conf.d/

COPY build/ /usr/share/nginx/html/

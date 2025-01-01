FROM node:16.20-alpine as base 

WORKDIR /ecommerce-furniture

ARG REACT_APP_AUTH0_DOMAIN
ARG REACT_APP_AUTH0_CLIENT_ID
ARG REACT_APP_AUTH0_CLIENT_SECRET

ENV REACT_APP_AUTH0_DOMAIN=$REACT_APP_AUTH0_DOMAIN
ENV REACT_APP_AUTH0_CLIENT_SECRET=$REACT_APP_AUTH0_CLIENT_SECRET
ENV REACT_APP_AUTH0_CLIENT_ID=$REACT_APP_AUTH0_CLIENT_ID

COPY . .
RUN yarn run build


FROM nginx:1.15.2-alpine as release
RUN apk add --no-cache jq


COPY --from=base /ecommerce-furniture/build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
EXPOSE 3000

COPY docker-entrypoint.sh /
RUN ["chmod", "+x", "/docker-entrypoint.sh"]
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

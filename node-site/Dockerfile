#the image we are starting from (image:tag)
FROM node:10.13.0

#the maintainer's name
MAINTAINER Adam Baldwin

#environment variables
ENV NODE_ENV=production
ENV PORT=3000

#copy current directory's files to volume
COPY . /var/www
#set the working directory for run and entrypoint commands
WORKDIR /var/www

#mount a volume
#VOLUME ["/var/www"]

#tasks to run before entrypoint called
RUN npm install

#the port to expose for the container (in this case use the env variable above)
EXPOSE $PORT

#the final command to run to fire it up
ENTRYPOINT ["npm", "start"]
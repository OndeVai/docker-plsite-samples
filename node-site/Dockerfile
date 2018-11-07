#------------mongodb linking notes (named linking):
#first pull the mongo docker image
#docker pull mongo
#then run the mongo container with name
#docker run -d --name my-mongodb mongo
#then run this container linking the names
#docker run -p 3000:3000 --link my-mongodb:mongodb abaldwin/node


#the image we are starting from (image:tag)
FROM node:10.13.0

#the maintainer's name
MAINTAINER Adam Baldwin

#environment variables
ENV NODE_ENV=production
ENV PORT=3000
#this is passed because without container we are deferring to localhost for mongo
ENV MONGODB_HOST=mongodb

#copy current directory's files to folder
COPY . /var/www
#set the working directory for run and entrypoint commands
WORKDIR /var/www

#mount a volume
#VOLUME ["/var/www"]
#todo need to mount the source code to this src code directory
#todo need to mount node modules as data volume

#tasks to run before entrypoint called
RUN npm install

#the port to expose for the container (in this case use the env variable above)
EXPOSE $PORT

#the final command to run to fire it up
ENTRYPOINT ["npm", "start"]
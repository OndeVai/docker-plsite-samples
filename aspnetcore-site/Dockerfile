#----------linking sql server (named link method)
#--pull the docker linux image
#docker pull mcr.microsoft.com/mssql/server
#--run the docker linux container in as sql express
#docker run --name my-mssql -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=P@ssword66' -e 'MSSQL_PID=Express' -p 1433:1433 -d mcr.microsoft.com/mssql/server:latest
#--then run this container linking the names
#docker run -p 8080:5000 --link my-mssql:mssql abaldwin/aspnetcore:dev

#------------sql server linking notes (container networks) --THIS IS PREFERRED
#--first create a container network
#docker network create --driver bridge sql_isolated_network
#--then run the sql server container with a name and within the network
#docker run -d --net=sql_isolated_network --name mssql -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=P@ssword66' -e 'MSSQL_PID=Express' -p 1433:1433 mcr.microsoft.com/mssql/server:latest
#--then run the node app container with a name and within the network
#docker run --net=sql_isolated_network --name aspnetapp -p 8080:5000 abaldwin/aspnetcore:dev


#get the base image for runtime, 
FROM microsoft/dotnet:2.1-sdk
WORKDIR /src
#copy csproj from local directory to /src directory
COPY ["aspnetcore-site.csproj", "./"]
#restore nuget packages for copied csproj
RUN dotnet restore "./aspnetcore-site.csproj"
#copy the rest of the local files over to /src
COPY . .
#change to within /src directory
WORKDIR "/src/."
#build the csproj with the other files copied in to /app
RUN dotnet build "aspnetcore-site.csproj"
#expose port 5000 note this is confusing but it means the port to 
#expose for inter container communication only 
#(ie if this were a rest api other containers to talk to it through port 8080)
EXPOSE 5000
ENTRYPOINT ["dotnet", "run"]

#docker build -t abaldwin/aspnetcore:dev .
#docker run -p 8080:5000 abaldwin/aspnetcore:dev .

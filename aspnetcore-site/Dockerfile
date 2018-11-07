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

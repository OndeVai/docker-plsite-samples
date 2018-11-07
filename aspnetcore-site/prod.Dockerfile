#get the base image for runtime, 
FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
#expose port 80 note this is confusing but it means the port to 
#expose for inter container communication only 
#(ie if this were a rest api other containers to talk to it through port 8080)
EXPOSE 80


#get the base image for building
FROM microsoft/dotnet:2.1-sdk AS build
#change to /src (on container)
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
RUN dotnet build "aspnetcore-site.csproj" -c Release -o /app

#add another layer on top of build 
FROM build AS publish
#publish to /app
RUN dotnet publish "aspnetcore-site.csproj" -c Release -o /app

#copy files from publish and run app with the entry point
FROM base AS final
#ENV ASPNETCORE_URLS=http://*:5000
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "aspnetcore-site.dll"]

#docker run -p 8080:80 abaldwin/aspnetcore:prod .
# Ubuntu 14.04 as OS
FROM ubuntu:14.04
MAINTAINER Vaibhav Magon "vaibhav.magon@momentsapp.io"

# Installing Dependencies
RUN apt-get update
RUN apt-get update --fix-missing
RUN apt-get install -y curl
RUN apt-get -y install python-software-properties git build-essential
RUN curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
RUN apt-get install -y nodejs

# Install app dependencies
ADD package.json /package.json
RUN npm install

# Mysql Port and Db path
RUN apt-get install mysql-server
EXPOSE 3306
CMD ["--port 3306"]
ENTRYPOINT usr/bin/mysql

# Create app directory
RUN mkdir -p /crossoverAssignment
WORKDIR /crossoverAssignment

# Install app dependencies
ADD package.json /crossoverAssignment/package.json
RUN npm install

# Bundle app source
ADD . /crossoverAssignment

# Exposing Ports
EXPOSE 80 3000

CMD "echo" "Running Scripts!"
CMD ["sh", "appInstallerScript.sh"]




# Auction App - Introduction

<img src="https://img.shields.io/static/v1?label=Node&message=8&color=<COLOR>"> <img src="https://img.shields.io/static/v1?label=MySql&message=5.5&color=<COLOR>"> <img src="https://img.shields.io/static/v1?label=Build&message=Passing&color=<COLOR>">

Auction App is a end-to-end implemented classified platform with option of bidding for products in realtime. This is a feature rich repo and was originally part of Crossover's onboarding program (where it was selected).
 

## Prerequisites
1. Nodejs installed on the platform
2. MySQL installed and server running
3. All commands and code will run from Code folder onwards. Make sure one has the right path.


## Instructions to Install & Run Auction App.
1. Run - "npm install" to install or Node dependencies.
2. Run - "bower install" to install bower dependencies for client side libraries.
3. If no error is found (as it is not found for me) Run using cmd - "forever start server.js"
4. Open - "http://localhost:3000" in browser to see the Auction App.

Or <br/>

<b> Run - "sh appInstallerScript.sh" to install all dependencies, db scripts, npm modules and run the server. </b>


## Data and Tables
1. One should have Nodejs & MySQL (Prerequisites to run the application).
2. Enter Values for Mysql as per settings in respective local mysql in the config.js file. The fields are:
2.1 User
2.2 Password
[Host, Database and Port will be 'localhost','auctionDb' and '3306'. Please don't change them for proper function of code]
3. Run - "node db.js" to initialise database auctionDb and tables. After executing the script will notify.


## High level system design

<img src="https://i.ibb.co/rQTtGCr/download.png" alt="download" border="0">


## Unit Test Cases
1. After setting up connection with local MySQL you are ready to run the test cases.
2. To Run use - "npm test" and it will run all test cases.


## Assumptions
1. If there was more time sockets and messaging queue like rabbitMq could have been implemented.
2. For demo I have used UserName as uniqueId in the application and not any custom generated ID for ease.


## Maintainers
- Vaibhav Magon

## Support

[![Buy Me Chai](https://i.ibb.co/Xkdj83y/image-2.png)](https://buymechai.ml/link.html?vpa=vaibhav210991@okaxis&nm=Vaibhav&amt=10)


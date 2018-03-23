# Demo Project

This is just a demo project and the api's and enpoints available in the project is just a subset of all the functionalities that can be made
by Google places api's. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software:

```
NodeJS (tested on 6.11.0)
MySQL (tested on Ver 14.14 Distrib 5.7.21, for Linux (x86_64))
```

### Installing

A step by step series that tell you have to get a development env running

```
Clone the project

```
Now create a database in MySQL name "demo" or change it in config/config.json -> development object, also put username and pwd
of the db.

Now if you have sequelize-cli then run:

```
sequelize db:migrate
```
This will create database struchture as migrations are there in place in folder projectroot/migrations
If you dont have sequelize-cli the import the db from project_root/dump.sql file in the database that you created.

Now run

```
npm install
```
 and then
 
```
node server.js
```
 
# Folder Struchture

 - Entry point: server.js
 - routes folder is there to manage routes based on the functionality.
 - controller folder is there to manage entry code for each end point.
 - config folder holds the configs for db, port, api key etc.
 - google folder hold the functions to call google API's.
 - migrations folder is there to support databse creation.
 - models folder have database table schemas and support sequelize functions.

# End Points

 A postman export will be provided for explaing the accurate calls and below is just formal
 explaination of the end points.

 There are total 6 end points

 1. Register: Expects name, email and password.

 2. Login: Expects email and password.

   Validation over email and passwords are not applied expecting to be done from front end,
   so can be considered as known improvement.

 3. Search: Allows you to search hospitals, restaurants etc types around a location given by
 latitude and longitude.
    - Radius need to be provided to guide the search. (See routes/places.js)
    - A request made by a user is cached and the data is served from the db itself if the user makes
   same request again.
    - Caching should be done by redis ideally but have been done by MySQL so as to not use two db's.
    - Note: Only this api is applied with caching in the demo.

 4. Geocode: This end point allows you to find the latitude and longitude of an address if you
 dont have them to give to the search API. (See routes/places.js)

 5 and 6. Favourites: There are two end points for adding a favourite and retrieving a user's favourites
 by the user himself.


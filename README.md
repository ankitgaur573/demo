# PDemo Project

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
This will create database struchture
If you dont have sequelize-cli the import the db from project_root/dump.sql file in the database that you created.

Now run

```
npm install
```
 and then
 
```
node server.js
```
 

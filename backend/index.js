import express from "express";

import  {PORT, mongoDBURL}  from "./config.js";

import mongoose from 'mongoose';

import {Book} from './models/bookmodel.js'

import booksRoute from './routes/bookRoute.js'

import cors from 'cors'

const app=express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://book-store-management.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//middleware for parsing request body(in isomnia we check)
app.use(express.json());

app.use(
    cors({
        // origin:'http://localhost:5173',
        origin:'https://book-store-management.vercel.app',
        methods:['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders:['Content-Type'],
    })
);

//middleware for book route
app.use('/books', booksRoute);

app.get('/', (request, response)=> {
    console.log(request);
    return response.status(234).send('welcome');
});

app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});



mongoose
  .connect(mongoDBURL)
  .then( () => {
    console.log('App Connected');
  })
  .catch((error) => {
    console.log(error);
  });
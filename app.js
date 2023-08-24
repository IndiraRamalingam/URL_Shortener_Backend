const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const userRoutes = require('./routes/userRoutes')
const urlRoutes = require('./routes/urlRoutes')

//add middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users',userRoutes);
app.use('/api/url',urlRoutes);

module.exports =app;
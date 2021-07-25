const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const path = require('path');
app.use('*', cors());

// const retriveBalance = require('./routes/retrive_balance');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movies', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected sucessfully to db");
});

//schema
const moviesSchema = new mongoose.Schema({
    data: String
});

const moviesModel = mongoose.model('movies', moviesSchema);

//routes 
app.use('/', (request, response) => {
    response.send("Movies Server is Running")
});

app.post('/storemovies', function(req, res){
    const movies = new moviesModel({data: JSON.stringify(req.body)});
    movies.save(function(err, movies){
        if (err) throw err;
        return res.send(res);
    });
});

app.get('/getmovies', function(req, res){
    let movie = moviesModel.find(function(err, movies){
        if(err) throw err;
        return res.send(JSON.parse(movies))
    });
})

server.listen(8025, function(){
    console.log("Movies Server is Running");
});

module.export = app;



const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')

const movieData = require('./data');

app.use('*', cors());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/moviesdbtest1', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected sucessfully to db");
});

//schema
const moviesSchema = new mongoose.Schema({
    data: {
        show: {
            "id": Number,
            "url": String,
            "name": String,
            "language": String,
            "genres": [
            
            ],
            "status": String,
            "runtime": Number,
            "premiered": String,
            "rating": {
                "average": Number
            },
            "network": {
                "name": String
            },
            "image": {
                "original": String
            },
            "summary": String
        }
    }
});

const moviesModel = mongoose.model('movies', moviesSchema);

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false })); // urlencoded form parser
app.use(bodyParser.json())  // json parser
app.use(cors());

//routes 
app.get('', (request, response) => {
    response.send("Movies Server is Running")
});

app.post('/savemovies', function(req, res){
    console.log(req.body)
    const movies = new moviesModel({data: req.body});
    movies.save(function(err, movies){
        if (err) throw err;
        res.send(movies);
    });
});

app.get('/getmovies', function(req, res){
    let movies = moviesModel.find(function(err, movies){
        if(err) throw err;
        res.send(movies)
    });
});

server.listen(8025, function(){
    console.log("Movies Server is Running");
});

module.export = app;



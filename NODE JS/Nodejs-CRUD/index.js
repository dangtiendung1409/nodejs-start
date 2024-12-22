const express = require('express');
const mongoose = require('mongoose'); 
const club = require('./models/Club')
const keys = require('./config/keys')
const homeRoute = require('./routes/home');
const bodyParser = require('body-parser')

const port = 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/ucl_crud', {

});

// Kiểm tra kết nối
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json()) 


// Router 
app.use('/', homeRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

const config = require('./config/db');
// Connect file account.js part 1
const account = require('./routes/account');

// Initiate app
const app = express();

const port = 3000;

// initialize library passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// for using others' sites API, social net authorization, for examle
app.use(cors());

app.use(bodyParser.json());

// Connecting to database
mongoose.connect(config.db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB is connected'))
    .catch((err) => console.log('Error in connection with MongoDB', err))

// check if connection to db is successful
// mongoose.connection.on('connected', () => {
//     console.log('Successful connection to the database');
// })
// // check if connection to db with error
// mongoose.connection.on('error', (err) => {
//     console.log(`Error with connection to database: ${err}`);
// })
//https://docs.mongodb.com/guides/server/install/
//"C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe"


// run server
// check if server is running - http://localhost:3000/
app.listen(port, () => {
    console.log(`Server was running on port ${port}`);
});

// URL-addresses
// app.get('/') - main page
app.get('/', (req, res) => {
    // message in browser on main page
    res.send('Main blog page!')
});

// Connect file account.js part 2
app.use('/account', account);

// All routes, URLs we have to remove to folder routes:
// // URL of registration form
// app.get('/account/reg', (req, res) => {
//     // message in browser on main page
//     res.send('Registration page!')
// });
//
// // URL of authorization form
// app.get('/account/auth', (req, res) => {
//     // message in browser on main page
//     res.send('Login page!')
// });
//
// // URL of user's cabinet
// app.get('/account/dashboard', (req, res) => {
//     // message in browser on main page
//     res.send('Dashboard page!')
// });


//1. for auto renew server running use library - nodemon: npm install nodemon,
// then write in package.json scripts "start": "nodemon index" and run in terminal: npm start

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
 
const db = knex({
	client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'aschnall',
    password : '',
    database : 'smartbrain'
  }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

//signin
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

//register
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

//profile/:userID
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

//image
app.put('/image', (req, res) => { image.handleImage(req, res, db) })

//handle API call
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


app.listen(3001, () => {
	console.log('app is running on port 3001')
})

/*
/ --> res = this is working
/signin --> POST (posting some user information), will respond with success/fail
/register --> POST (add data to database), will return new user object
/profile/:userID --> GET user information, return the user
/image --> PUT (updating user profile), return the updated user object

*/
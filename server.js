const express = require('express');
const bodyParser = require('body-parser'); 
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
//const cors = require('cors');
const crypto = require('crypto');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

encrypt = (data) => {
  let cipher = crypto.createCipher('aes-256-ecb', 'password');
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

decrypt = (data) => {
  let cipher = crypto.createDecipher('aes-256-ecb', 'password');
  return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
}

app.post('/api/upload', (req, res) => {
	let data = req.files.file;
	let b = req.body;

	// Do something with the file, put it somewhere on the server + ref to db + meta
	console.log('from /upload route: ', data);
	console.log('body: ', b);
	res.send('File has been uploaded');
});

app.post('/api/pushtodb', (req, res) => {
	let data = req.body.username;
	console.log('received from react: ' + data);
});

const sessions = {}

app.post('/api/login', (req, res) => {
	let username = req.param('username');
	let password = req.param('password');
	console.log('u: ', username);
	console.log('p: ', password);
	const sessionId = Math.random();
	res.send({
		name: username,
		success: true,
		id: sessionId,
	})
});

app.get('/api/about', (req, res) => {
	let obj = {
		arg1: 'I like blue apples.',
		arg2: 'There is no way back.'
	}
	res.send(obj);
});

app.get('/api/home', (req, res) => {
	let obj = {
		arg1: 'argument no #1 from express',
		arg2: 'argument no #2 from express'
	}
	res.send(obj);
});
app.listen(3010, () => {
	console.log('Server has started.');
});


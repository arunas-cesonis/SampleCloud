const express = require('express');
const bodyParser = require('body-parser'); 
const fileUpload = require('express-fileupload');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.post('/api/upload', (req, res) => {
	let data = req.files.file;
	// Do something with the file, put it somewhere on the server + ref to db + meta
	console.log('from /upload route: ', data);
});

app.post('/api/pushtodb', (req, res) => {
	let data = req.body.username;
	console.log('received from react: ' + data);
	res.redirect('/api/home');
	
});

app.get('/api/about', (req, res) => {
	let obj = {
		arg1: 'argument no #1 from express',
		arg2: 'argument no #2 from express'
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


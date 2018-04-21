const express = require('express');
const bodyParser = require('body-parser'); 

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.post('/api/pushtodb', (req, res) => {
	var data = req.body.username;
	console.log('received from react: ' + data);
	res.redirect('/api/home');
	
});

app.get('/api/home', (req, res) => {
	var obj = {
		arg1: 'argument no #1 from express',
		arg2: 'argument no #2 from express'
	}
	res.send(obj);
});
app.listen(3010, () => {
	console.log('Server has started.');
});


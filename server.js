const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.post('/api/newUserRequest', (req, res) => {
	var data = req.body.messageOfGuest;
	console.log('received from react: ' + data);
	res.redirect('/home');
	
});

app.get('/home', (req, res) => {
	var obj = {
		test: 'Test',
		arg2: 'arg2'
	}
	res.send(obj);
});
app.listen(3010, () => {
	console.log('Server has started.');
});


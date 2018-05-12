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
    console.log('file name: ', data.name);
    console.log('username: ', b.username);
    console.log('desired file name: ', b.filename);
	console.log('body: ', b);
	res.send('File has been uploaded');
});

app.post('/api/pushtodb', (req, res) => {
	const data = req.body.username;
	console.log('received from react: ' + data);
});

app.post('/api/reg/received', (req, res) => {
    const b = req.body;
    console.log('U:', b.username);
    console.log('P:', b.password);
    console.log('E:', b.email);
    res.send('The user has been added.');
});

app.post('/api/checkUsername', (req, res) => {
    const b = req.body;
    console.log('/api/checkUsername req: ', b.username);
    // To check against DB if this username is taken or not and return true or false.
    if(b.username.length > 4){
        res.send({
            free: true,
        });
    } else {
        res.send({
            free: false,
        });

    }
});
const sessions = {}

app.post('/api/login', (req, res) => {
    const b = req.body;
	console.log('u: ', b.username);
	console.log('p: ', b.password);
	const sessionId = Math.random();
	res.send({
		name: b.username,
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

//JUST FOR TESTING, WILL BE INTEGRATED WITH DB
app.get('/api/browse/users/list', (req, res) => {
    let sampleObj = [
        {
            email: 'Snare@snare.com',
            username: 'John',
        },
        {
            email: 'HiHat@hot.com',
            username: 'Lucy',
        },
        {
            email: 'ppo@gmail.com',
            username: 'Paul',
        },
    ]
    res.send(sampleObj);
});
//JUST FOR TESTING, WILL BE INTEGRATED WITH DB
app.post('/api/browse/getfiles', (req, res) => {
    const b = req.body;
    let sampleObj = [
        {
            username: 'John',
            files: 
            {
                'file1': 'industrial',
                'file2': 'barking',
                'file3': 'wind',
            }
        },
        {
            username: 'Lucy',
            files: 
            {
                'file1': 'crazyWav',
                'file2': 'spooky',
                'file3': 'terminator',
            }
        },
        {
            username: 'Paul',
            files: 
            {
                'file1': 'snare20',
                'file2': 'snare20',
                'file3': 'kick20',
            }
        },
    ]
    const result = sampleObj.filter(el => 
            el.username === b.username);
    console.log('filtered:', result);
    console.log('post:', b.username);
    res.send(sampleObj);
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


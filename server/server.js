const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const fs = require('fs');
const crypto = require('crypto');
const app = express();
const multer = require('multer');

mongoose.connect('mongodb://localhost/samplecloud');
const db = mongoose.connection;

const fileSchema = mongoose.Schema({
  username: String,
  email: String,
  fileName: String,
  friendlyName: String,
  filePath: String,
  dateAdded: Date
});

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  dateCreated: String,
  admin: Boolean
});

const User = mongoose.model('user', userSchema);
const File = mongoose.model('file', fileSchema);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to samplecloud DB.');
});
/* EXAMPLE DEFINING DOCUMENT
const sampleFile = new File({
  username: 'Paulius',
  email: 'p@ttt.com',
  fileName: 'test.mp3',
  friendlyName: 'sample300',
  filePath: 'http://localhost:3000/public/paul/test.mp3'
});

EXAMPLE SAVING DOCUMENT
sampleFile.save(function(err) {
  if(err) console.log(err)
  console.log('Saved!');
});
*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

encrypt = data => {
  let cipher = crypto.createCipher('aes-256-ecb', 'password');
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
};

decrypt = data => {
  let cipher = crypto.createDecipher('aes-256-ecb', 'password');
  return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
};

app.post('/api/upload', (req, res) => {
  const data = req.files.file;
  const b = req.body;
  const username = b.user.toLowerCase();
  const filePath = "http://localhost:3000/uploads/" + username + '/' + data.name;
  const userFolder = '../client/public/uploads/' + username;
  const date = Date();
  const files = [];
  const fullPath = userFolder + '/' + data.name;
  const ext = data.name.slice(-4, data.name.length);
  const fileMeta = new File({
    username: b.user,
    email: b.email,
    fileName: data.name,
    friendlyName: b.friendlyName,
    filePath: filePath,
    dateAdded: date 
  });
  // Do something with the file, put it somewhere on the server + ref to db + meta
  fs.readdirSync(userFolder).forEach(file => { 
    if(data.name !== file){
      console.log('readdirSync(): ', file, 'does not exists');
    } else {
      console.log('readdirSync(): ', file, 'exists');
      files.push(file);
    }
  });
  console.log('EXTENSION: ', ext); 
  if(files.length === 0 && ext === '.mp3'){
      fileMeta.save(function(err) {
        if(err) return console.log(err);
        res.send({ success: true });
      });
    data.mv(fullPath, (err) => {
      console.log('DATA.mv(); called!');
      if(err) console.log('ERROR: ', err);
    });
  } else {
    res.send({ success: false });
  }
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
  if (b.username.length > 4) {
    res.send({
      free: true
    });
  } else {
    res.send({
      free: false
    });
  }
});
const sessions = {};

app.post('/api/login', (req, res) => {
  const b = req.body;
  const username = b.username;
  const password = b.password;
  console.log('u: ', b.username);
  console.log('p: ', b.password);
  const sessionId = Math.random();
  
  User.findOne({ 'username': username, 'password': password }, function(err, user){
    if(err) throw err;
    if(user){
      res.send(user);
    } else {
      res.send(null);
    }
  });
  /*
  res.send({
    name: b.username,
    success: true,
    id: sessionId
  });
  */
});

app.get('/api/about', (req, res) => {
  let obj = {
    arg1: 'I like blue apples.',
    arg2: 'There is no way back.'
  };
  res.send(obj);
});

//JUST FOR TESTING, WILL BE INTEGRATED WITH DB
app.get('/api/browse', (req, res) => {
  File.find(function(err, files){
    res.send(files);
  });
});

app.post('/api/browse/search', (req, res) => {
  const b = req.body.searchInput;
  File.find({ 'fileName': { $regex: b } }, function(err, files){
    if(err) throw err;
    res.send(files);
  });
  // Merge array into a single array //
  /*
  filterArr = [].concat.apply([], tmpArr);
  // Filter by given value indexOf(val) > -1 (if > -1 element found)
  filterArr = filterArr.filter((sample) => sample.toLowerCase().indexOf(b) > -1);
  res.send(filterArr);
  */
});

app.post('/api/browse/getfiles', (req, res) => {
  const b = req.body;
  const username = b.arg
  File.find({ 'username': username }, function(err, files){
    if(err) return err 
    res.send(files);
  }).collation({ locale: 'en', strength: 1 });

  // EQUIVALENT TO FOR EACH
  /*
  const db_query = File.find({ username: username }).cursor();
  db_query.on('data', function(doc){
    tmpArr.push(doc); 
  });
  db_query.on('close', function(){
    console.log('done!');
  });
  const tmpArr = sampleObj.filter((sample) => ( 
    sample.username === username
  ));
  const samples = Object.values(tmpArr[0].files);
  console.log('Array: ', samples);
  res.send(samples);
  /* findIndex
  const i = sampleObj.findIndex(file => file.username === b.arg);
  console.log(sampleObj[i]);
  res.send(sampleObj[i]);
  */
});

app.get('/api/home', (req, res) => {
  const maxSamples = 10;
  File.find({}).sort({dateAdded: -1}).exec(function(err, files){
    console.log('/api/home FILES by DATE: ', files);
    const samples = files.splice(0, maxSamples);
    res.send(samples);
  });
});

app.listen(3010, () => {
  console.log('Server has started.');
});

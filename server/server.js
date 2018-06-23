const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const fs = require('fs');
const crypto = require('crypto');
const app = express();

mongoose.connect('mongodb://localhost/samplecloud');
const db = mongoose.connection;

//File MetaData
const fileSchema = mongoose.Schema({
  username: String,
  email: String,
  fileName: String,
  friendlyName: String,
  filePath: String,
  category: String,
  dateAdded: Date
});

//User MetaData
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

//Handle UserSamples
app.get('/api/profile/:user', (req, res) => {
  const data = {
    files: '',
    user: ''
  };
  File.find({ 'username': req.params.user }, (err, files) => {
    data.files = files;
    User.find({ 'username': req.params.user}, (err, user) => {
      data.user = user;
      res.send(data);
    });
  });
});

//Update Pwd in the DB
app.post('/api/profile/pwd', (req, res) => {
  const username = req.body.user.username;
  const newPwd = req.body.newPwd;
  const email = req.body.user.email;
  console.log('e: ', email);
  const q = { 'username': username, 'email': email };
  User.update(q, { 'password': newPwd }, (err, response) => {
    if (err) throw err;
    console.log('Mongo: ', response);
    res.send({ updated: true });
  }).collation({ locale: 'en', strength: 1 });;
});

//Handle File Upload
app.post('/api/profile', (req, res) => {
  const extTypes = ['.mp3', '.wav']; 
  const data = req.files.file;
  const b = req.body;
  const username = b.user.toLowerCase();
  const category = b.category;
  const filePath = "http://localhost:3000/uploads/" + username + '/' + data.name;
  const userFolder = '../client/public/uploads/' + username;
  const date = Date();
  const files = [];
  const fullPath = userFolder + '/' + data.name;
  const dotIndex = data.name.lastIndexOf('.');
  const ext = data.name.slice(dotIndex);
  const fileMeta = new File({
    username: username,
    email: b.email,
    fileName: data.name,
    friendlyName: b.friendlyName,
    filePath: filePath,
    category: category,
    dateAdded: date 
  });
  // Do something with the file, put it somewhere on the server + ref to db + meta
  fs.readdirSync(userFolder).forEach(file => { 
    if(data.name === file){
      files.push(file);
    }
  });
  console.log('CATEGORY: ', category); 
  console.log('EXTENSION: ', ext); 
  if(files.length === 0 && extTypes.indexOf(ext) > -1){
    console.log('File Meta: ', fileMeta);
      fileMeta.save(function(err) {
        if(err) return console.log(err);
        res.send({ success: true });
      });
    data.mv(fullPath, (err) => {
      console.log('DATA.mv(); called!');
      if(err) console.log('ERROR: ', err);
    });
  } else {
    res.send({ 
      error: 'File already exists or unaccepted format. Accepted formats: [.mp3, .wav].',
      success: false 
    });
  }
});

//Handle Register Form
app.post('/api/register', (req, res) => {
  const b = req.body;
  console.log('U:', b.username);
  console.log('P:', b.password);
  console.log('E:', b.email);
  res.send('The user has been added.');
});

//Check if username is free
app.post('/api/validate', (req, res) => {
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

//Handle Login Form
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
});

//Might need to delete this or move it to the login page.
app.get('/api/about', (req, res) => {
  let obj = {
    arg1: 'I like blue apples.',
    arg2: 'There is no way back.'
  };
  res.send(obj);
});

//Selective Search
app.get('/api/browse', (req, res) => {
  const usersArr = [];
  const catsArr = [];
  const allFiles = [];
  File.find(function(err, files){
    allFiles.push(files);
    files.map((item) => {
      if(usersArr.indexOf(item.username.toLowerCase()) === -1){
        usersArr.push(item.username.toLowerCase());
      }
      if(catsArr.indexOf(item.category.toLowerCase()) === -1){
        catsArr.push(item.category.toLowerCase());
      }
    });
    res.send({
      users: usersArr,
      categories: catsArr,
      files: allFiles
    });
  });
});

//Search
app.post('/api/browse/search', (req, res) => {
  const searchVal = req.body.searchInput;
  const searchCond = req.body.searchCond;
  const searchType = req.body.searchType;
  const query = {};
  query[searchType] = searchCond;
  console.log('Search Condition: ', searchCond);
  console.log('Search Type: ', searchType);
  if(searchCond){
    File.find({ $and: [{ 'friendlyName': { $regex: searchVal }}, query ]}, function(err, files){
      if(err) throw err;
      res.send(files);
    }).collation({ locale: 'en', strength: 1 });
  } else {
    File.find({ 'friendlyName': { $regex: searchVal } }, function(err, files){
      if(err) throw err;
      res.send(files);
    });
  }
  // Merge array into a single array //
  /*
  filterArr = [].concat.apply([], tmpArr);
  // Filter by given value indexOf(val) > -1 (if > -1 element found)
  filterArr = filterArr.filter((sample) => sample.toLowerCase().indexOf(b) > -1);
  res.send(filterArr);
  */
});

app.post('/api/browse/getfiles', (req, res) => {
  const value = req.body.val
  const type = req.body.type
  const query = {};
  query[type] = value;
  File.find(query, (err, files) => {
    if(err) return err 
    res.send(files);
  }).collation({ locale: 'en', strength: 1 });

  /* findIndex
  const i = sampleObj.findIndex(file => file.username === b.arg);
  console.log(sampleObj[i]);
  res.send(sampleObj[i]);
  */
});

//HOME
app.get('/api/home', (req, res) => {
  const maxSamples = 10;
  File.find({}).sort({dateAdded: -1}).exec((err, files) => {
    console.log('/api/home FILES by DATE: ', files);
    const samples = files.splice(0, maxSamples);
    res.send(samples);
  });
});

app.listen(3010, () => {
  console.log('Server has started.');
});

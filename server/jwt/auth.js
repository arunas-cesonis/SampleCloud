const jwt = require('jsonwebtoken');
const _ = require('lodash');
const secret = 'secret'

testJWT = (arg) => {
  console.log('Testing: ', arg);
}

verifyJWT = (token) => {
  jwt.verify(token, secret, (err, decodedToken) => {
    if(err || !decodedToken) {
      return err;
    }
    console.log('jwt/auth.js Decoded Token: ', decodedToken);
    return decodedToken;
  });
}

createJWT = (details) => {
  if(!details.maxAge || typeof details.maxAge !== 'number') {
    details.maxAge = 3600;
  }
  if(!details.connected){
  }
  details.sessionData = _.reduce(details.sessionData || {}, (memo, val, key) => {
    if(typeof val !== 'function' && key !== 'password') {
      memo[key] = val;
    }
    return memo;
  }, {});

  let token = jwt.sign({
    data: details.sessionData
  }, secret, {
    expiresIn: details.maxAge,
    algorithm: 'HS256'
  });

  return token;
}

module.exports = {
  verifyJWT,
  createJWT,
  testJWT
}

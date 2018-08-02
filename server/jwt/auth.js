const jwt = require('jsonwebtoken');
const _ = require('lodash');
const secret = 'secret'

const testJWT = (arg) => {
  console.log('Testing: ', arg);
}

const verifyJWT = (token) => {
  // To implement ASYNC AWAIT solution instead of Promise
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decodedToken) => {
      if(err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    }); 
  });
}

const createJWT = (details) => {
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

const verifyJWT_MW = (req, res, next) => {
  if(req.cookies.session){
    const cookie = JSON.parse(req.cookies.session);
    const token = cookie.token;
    verifyJWT(token)
      .then((decodedToken) => {
        req.user = decodedToken.data;
        next();
      }).catch((err) => {
        throw err;
      });
  } else {
    console.log('Token was not found.');
  }
}

module.exports = {
  verifyJWT,
  createJWT,
  verifyJWT_MW,
  testJWT
}

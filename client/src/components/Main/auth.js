import jwt from 'jsonwebtoken';

//Sort this later
const secret = 'secret';

export const verifyJWT = (token) => {
  jwt.verify(token, secret, (err, decodedToken) => {
    if(err || !decodedToken) {
      return err;
    }
    console.log('jwt/auth.js Decoded Token: ', decodedToken);
    return 'asdasd';
  });
}


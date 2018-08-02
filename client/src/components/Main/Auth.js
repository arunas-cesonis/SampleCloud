import jwt from 'jsonwebtoken';

export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, 'secret', (err, decodedToken) => {
    if(err || !decodedToken) {
      return err;
    }
    return decodedToken;
  });
  const userDetail = decoded.data._doc;
  userDetail.connected = true;
  return userDetail;
}

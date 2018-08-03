import jwt from 'jsonwebtoken';

export const verifyJWT = (token, secret) => {
  const decoded = jwt.verify(token, secret, (err, decodedToken) => {
    if(err || !decodedToken) {
      return err;
    }
    return decodedToken;
  });
  if(decoded.data) {
    const userDetail = decoded.data._doc;
    userDetail.connected = true;
    return userDetail;
  }
  return null;
}

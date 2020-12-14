const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.get('Authorization').split(' ')[1];
  if (!token) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'myToken');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  if (decodedToken.userRole !== "Admin") {
    const error = new Error('You have no permission');
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  req.userRole = decodedToken.userRole;

  next();
};
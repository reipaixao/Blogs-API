const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization: token } = req.headers;

  const secret = process.env.JWT_SECRET;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const { data } = jwt.verify(token, secret);

    req.jwt = data;

    next();
  } catch (error) {
      return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

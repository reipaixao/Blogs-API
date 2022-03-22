const jwt = require('jsonwebtoken');

const User = require('../../services/User');

const { JWT_SECRET } = process.env;

const jwtConfig = { algorithms: ['HS256'] };

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const { email } = jwt.verify(token, JWT_SECRET, jwtConfig);
      
      const userByEmail = await User.getUserByEmail(email);

      req.user = userByEmail;

      return next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

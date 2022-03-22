// Consulta ao PR #73

const jwt = require('../utils/jwt');

const loginService = (email) => {
  const token = jwt.sign({ email });
  return token;
};

module.exports = loginService;

const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const sign = (payload) => {
    const options = {
        algorithm: 'HS256',
        expiresIn: '1h',
    };

    const token = jwt.sign(payload, secret, options);
    return token;
};

const verify = (token) => jwt.verify(token, secret, { algorithms: ['HS256'] });

module.exports = {
    sign,
    verify,
};

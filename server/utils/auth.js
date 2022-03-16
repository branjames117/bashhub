const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;
const expiresIn = '2h';

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    console.log(secret);

    return jwt.sign({ data: payload }, secret, { expiresIn });
  },

  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // if no token, return req object as is
    if (!token) {
      return req;
    }

    try {
      // decode and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiresIn });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // return updated request object
    return req;
  },
};

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Get token from headers
      token = req.headers.authorization.split(' ')[1];
      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //Get user from the token
      req.user = await User.findById(decoded.id).select('-password');
      //   console.log(req.user);
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Not authorized!');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token!');
  }
});

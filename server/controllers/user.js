const User = require('../model/user'),
  {normalizeErrors} = require('../helpers/mongoose'),
  jwt = require('jsonwebtoken'),
  config = require('../config/dev');

exports.auth = function (req, res) {

  const {email, password} = req.body;

  if (!password || !email) {
    return res.status(422).send({errors: [{title: 'Data missing', detail: 'Provide email and password'}]});
  }

  User.findOne({email}, function (err, user) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (!user) {
      return res.status(422).send({errors: [{title: 'User not found', detail: 'User does not exist'}]})
    }

    if (user.passwordMatch(password)) {
      const token = jwt.sign({
        userId: user.id,
        username: user.username
      }, config.SECRET, {expiresIn: '1h'});
      return res.json(token);
    } else {
      return res.status(422).send({errors: [{title: 'Invalid credentials', detail: 'Wrong email or password'}]});
    }
  });
}

exports.register = function (req, res) {
  const {username, email, password, passwordConfirmation} = req.body;

  if (!password || !email) {
    return res.status(422).send({errors: [{title: 'Data missing', detail: 'Provide email and password'}]});
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({errors: [{title: 'Mismtached passwords', detail: 'Passwords do not match'}]});
  }

  User.findOne({type: email}, function (err, existingUser) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (existingUser) {
      return res.status(422).send({errors: [{title: 'invalid email', detail: 'This email address is already in use'}]});
    }

    const user = new User({
      username, email, password
    });

    user.save(function (err) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      return res.json({'Registered': true});
    });
  });
}

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    const user = parseToken(token);

    User.findById(user.userId, function(err, user) {
      if(err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }
      if(user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  } else {
    return notAuthorized(res);
  }
}

function parseToken(token) {
  console.log(token.split(' ')[1] + " compareTo " + config.SECRET);
  return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res) {
  res.status(422).send({
    errors: [{title: 'Authorization error', detail: "Please login to access this resource"}]
  });
}

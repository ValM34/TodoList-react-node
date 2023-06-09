const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtUtils');

// Constants
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/;

exports.getAllUsers = async (req, res, next) => {
  const users = await User.findAll()
    .then(users => {
      res.status(200).json(users)
    })
}

exports.subscription = async (req, res) => {

  // Params
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;



  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({ message: 'NULL PARAMETER' });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'EMAIL IS NOT VALID' });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ message: 'PASSWORD IS NOT VALID' });
  }

  User.findOne({
    attributes: ['email'],
    where: { email: email }
  })
    .then((userFound) => {
      if (!userFound) {
        bcrypt.hash(password, 5, function (err, bcryptedPassword) {
          const newUser = User.create({
            email: email,
            password: bcryptedPassword,
            firstName: firstName,
            lastName: lastName
          })
            .then(function (newUser) {
              return res.status(201).json({
                'userId': newUser.id
              })
            })
            .catch(function (err) {
              return res.status(500).json({ 'error': 'CANNOT ADD USER' });
            })
        });
      } else {
        return res.status(409).json({ 'error': 'USER ALREADY EXIST' });
      }
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': 'ERROR' });
    });
};

exports.connexion = async (req, res) => {

  // Params
  const email = req.body.email;
  const password = req.body.password;

  if (email == null || password == null) {
    return res.status(400).json({ 'error': 'MISSING PARAMETER' });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ 'error': 'EMAIL IS NOT VALID' });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ 'error': 'PASSWORD IS NOT VALID' });
  }

  User.findOne({
    where: { email: email }
  })
    .then(function (userFound) {
      if (userFound) {
        bcrypt.compare(password, userFound.password, function (errBcrypt, resBcrypt) {
          if (resBcrypt) {
            return res.status(200).json({
              'userId': userFound.id,
              'token': jwtUtils.generateTokenForUser(userFound)
            });
          } else {
            return res.status(403).json({ 'error': 'INVALID PASSWORD' });
          }
        })
      } else {
        return res.status(404).json({ 'error': 'USER NOT EXIST IN DB' });
      }
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': 'UNABLE TO VERIFY USER' });
    });
}

exports.isLoggedIn = (req, res, next) => {
  return res.status(200).json(req.auth);
}
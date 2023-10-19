const { body, validationResult } = require('express-validator');

const userValidator = [
  body('userName')
    .isString()
    .notEmpty()
    .withMessage('User name is required'),

  body('email')
    .isString()
    .isEmail()
    .withMessage('Valid email is required'),

  body('password')
    .isString()
    .optional(),

  body('companyName')
    .isString()
    .notEmpty()
    .withMessage('Company name is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { userValidator };

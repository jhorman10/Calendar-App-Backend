/**
 * Rutas de usuarios / Auth
 * host + /api/auth
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { fieldValidators } = require('../middlewares/fieldValidators');
const { validateJWT } = require('../middlewares/validateJWT');
const router = Router();

router.post(
  '/new',
  [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').not().isEmpty().isEmail(),
    check('password', 'password is required and not lower than 6 characters')
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    fieldValidators,
  ],
  createUser
);

router.post(
  '/',
  [
    check('email', 'email is required').not().isEmpty().isEmail(),
    check('password', 'password is required and not lower than 6 characters')
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    fieldValidators,
  ],
  loginUser
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;

const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    console.log(user);

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'User already exists.',
      });
    }
    user = new User(req.body);
    console.log(user);
    //encrypted password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //generate own JWT
    const token = generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'please contact administrator',
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'User or email does not exists.',
      });
    }

    //compare password with user's password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrect.',
      });
    }
    //generate own JWT
    const token = generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: 'please contact administrator',
    });
  }
};

const renewToken = async(req, res = response) => {
  const { uid, name } = req;
  //generate own JWT
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    msg: 'renew',
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};

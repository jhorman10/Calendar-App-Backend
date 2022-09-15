const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: { type: String, required: true, nullable: false },
  email: { type: String, required: true, nullable: false, unique: true },
  password: { type: String, required: true, nullable: false },
});

module.exports = model('User', UserSchema);

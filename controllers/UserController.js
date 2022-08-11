const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// signup account
exports.signup = async (req, res) => {
  const { fullname, phone, password, loginType, email } = req.body;

  // validation
  if (!fullname) return res.status(400).json({ success: false, message: 'fullname is required'});
  if (!phone) return res.status(400).json({ success: false, message: 'phone is required'});
  if (!email) return res.status(400).json({ success: false, message: 'email is required'});
  if (!password) return res.status(400).json({ success: false, message: 'password is required'});
  if (!loginType) return res.status(400).json({ success: false, message: 'loginType is required'});

  // check if user already exists
  const user = await UserModel.findOne({ phone });
  if (user) return res.status(400).json({ success: false, message: 'user already exists'});

  // password encryption
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create new user
  const newUser = new UserModel({ fullname, phone, email, loginType, password:hashedPassword });
  await newUser.save();
  return res.status(200).json({ success: true, message: 'user created successfully'});

}


// login account
exports.login = async (req, res) => {
  const { phone, password } = req.body;

  // validation
  if (!phone) return res.status(400).json({ success: false, message: 'phone is required'});
  if (!password) return res.status(400).json({ success: false, message: 'password is required'});

  // check if user already exists
  const user = await UserModel.findOne({ phone });
  if (!user) return res.status(400).json({ success: false, message: 'user does not exist'});

  // password validation
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ success: false, message: 'invalid password'});

  // generate jwt token
  const token = jwt.sign({ id: user._id, phone: user.phone }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return res.status(200).json({ success: true, user:user, token:token });
}


// verify account
exports.verify = async (req, res) => {
  const { phone, otp } = req.body;

  // validation
  if (!phone) return res.status(400).json({ success: false, message: 'phone is required'});
  if (!otp) return res.status(400).json({ success: false, message: 'otp is required'});

  // check if user already exists
  const user = await UserModel.findOne({ phone });
  if (!user) return res.status(400).json({ success: false, message: 'user does not exist'});

  // otp validation
  if (otp !== user.otp) return res.status(400).json({ success: false, message: 'invalid otp'});

  // generate jwt token
  const token = jwt.sign({ id: user._id, phone: user.phone }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return res.status(200).json({ success: true, user:user, token:token });

}

// update profile account 
exports.updateProfile = async (req, res) => {
  const { fullname, phone, email } = req.body;
  const { id } = req.user;

  // validation
  if (!fullname) return res.status(400).json({ success: false, message: 'fullname is required'});
  if (!email) return res.status(400).json({ success: false, message: 'email is required'});
  if (!phone) return res.status(400).json({ success: false, message: 'phone is required'});
  //if (!password) return res.status(400).json({ success: false, message: 'password is required'});

  // check if user already exists
  const user = await UserModel.findById(id);
  if (!user) return res.status(400).json({ success: false, message: 'user does not exist'});

  // password encryption
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);

  // update user
  user.fullname = fullname;
  user.phone = phone;
  user.email = email;
  // user.password = hashedPassword;
  await user.save();
  return res.status(200).json({ success: true, message: 'user updated successfully'});
}

// profile account
exports.profile = async (req, res) => {
  const { id } = req.user;
  const user = await UserModel.findById(id);
  return res.status(200).json({ success: true, user:user });
}

// forgot password account
exports.forgotPassword = async (req, res) => {
  const { phone } = req.body;

  // validation
  if (!phone) return res.status(400).json({ success: false, message: 'phone is required'});

  // check if user already exists
  const user = await UserModel.findOne({ phone });
  if (!user) return res.status(400).json({ success: false, message: 'user does not exist'});

  // generate jwt token
  const token = jwt.sign({ id: user._id, phone: user.phone }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return res.status(200).json({ success: true, user:user, token:token });
}

// delete profile account
exports.deleteProfile = async (req, res) => {
  const { id } = req.user;
  const user = await UserModel.findById(id);
  await user.remove();
  return res.status(200).json({ success: true, message: 'user deleted successfully'});
}

const User = require('../../models/user');
const { generateToken } = require('../../config/jwt');

// @desc    Signup user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  const { name, birth, email, password, gender} = req.body;

  try {
    const user = await User.create({
      name,
      birth,
      gender,
      email,
      password
    });

    const token = generateToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1440 * 60 * 1000 
    });

    res.status(201).json({
      success: true,
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
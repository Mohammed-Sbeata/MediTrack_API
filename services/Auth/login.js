const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../config/jwt');



// @desc    Login user with email OR username
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, error: 'User not exists' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Email or password is not correct' });
    }

    const token = generateToken(user._id);
    await user.save();

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none', 
      maxAge: 15 * 60 * 1000 
    });

    user.password = undefined;

    res.status(200).json({
      success: true,
      token,
      user
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};
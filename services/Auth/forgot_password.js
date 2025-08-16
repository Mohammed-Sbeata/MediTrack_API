const User = require('../../models/user');
const sendEmail = require('../Auth/email');
const crypto = require('crypto');



// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'No account with this email exists' 
      });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetCode)
      .digest('hex');
      
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; 
    await user.save();

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Code',
      html: `
        <p>Your password reset code:</p>
        <h2>${resetCode}</h2>
        <p>This code expires in 10 minutes</p>
      `
    });

    res.status(200).json({ 
      success: true, 
      message: 'Reset code sent to email' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};
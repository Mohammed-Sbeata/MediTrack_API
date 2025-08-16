const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const sendEmail = require('../Auth/email');
const crypto = require('crypto');



// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const { resetCode, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        error: 'Passwords do not match' 
      });
    }


    const hashedCode = crypto
      .createHash('sha256')
      .update(resetCode)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedCode,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid or expired code' 
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.passwordChangedAt = Date.now();
    await user.save();

    await sendEmail({
      email: user.email,
      subject: 'Password Changed Successfully',
      html: '<p>Your password has been updated successfully</p>'
    });

    res.status(200).json({ 
      success: true, 
      message: 'Password reset successfull' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};
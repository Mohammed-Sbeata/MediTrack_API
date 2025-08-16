const { verifyToken } = require('../../config/jwt');
const User = require('../../models/user')

exports.protect = async (req, res, next) => {
  let token;

  // Get token from cookie
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    // Verify token
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }
};
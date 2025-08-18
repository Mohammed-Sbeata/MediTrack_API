const Medicine = require('../../models/medicine');

// @desc    Delete medicine
// @route   DELETE /api/medicines/deleteMedi/:id
// @access  Private
exports.deleteMedi = async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!medicine) return res.status(404).json({ success: false, error: 'Medicine not found' });
    res.status(200).json({ success: true, message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

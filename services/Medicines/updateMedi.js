const Medicine = require('../../models/medicine');

// @desc    Update medicine
// @route   PUT /api/medicines/updateMedi/:id
// @access  Private
exports.updateMedi = async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!medicine) return res.status(404).json({ success: false, error: 'Medicine not found' });
    res.status(200).json({ success: true, medicine });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const Medicine = require('../../models/medicine');

exports.addMedi = async (req, res) => {
  try {
    const { name, quantity, doses } = req.body;

    if (!name || !quantity || !doses || !doses.length) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    // إنشاء الدواء
    const medicine = await Medicine.create({
      name,
      quantity,
      doses,
      user: req.user._id
    });

    res.status(201).json({ success: true, medicine });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

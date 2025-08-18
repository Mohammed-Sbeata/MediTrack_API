const Medicine = require('../../models/medicine');

exports.getOneMedi = async (req, res) => {
  try {
    const med = await Medicine.findOne({ _id: req.params.id, user: req.user._id });
    if (!med) return res.status(404).json({ success: false, error: 'Medicine not found' });

    const dosesPerDay = med.doses.length;
    const days = Math.ceil(med.quantity / dosesPerDay);

    const schedule = Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      doses: med.doses.map(d => ({ time: d.time, taken: false }))
    }));

    res.status(200).json({ success: true, medicine: med, schedule });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

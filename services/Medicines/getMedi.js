const Medicine = require('../../models/medicine');

exports.getMedi = async (req, res) => {
  try {
    const medicines = await Medicine.find({ user: req.user._id });

    // لحساب المواعيد لكل يوم
    const schedule = medicines.map(med => {
      const dosesPerDay = med.doses.length;
      const days = Math.ceil(med.quantity / dosesPerDay);
      return {
        ...med.toObject(),
        schedule: Array.from({ length: days }, (_, i) => ({
          day: i + 1,
          doses: med.doses.map(d => ({ time: d.time, taken: false }))
        }))
      };
    });

    res.status(200).json({ success: true, medicines: schedule });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

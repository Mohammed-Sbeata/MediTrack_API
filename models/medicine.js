const mongoose = require('mongoose');

const doseSchema = new mongoose.Schema({
  time: { type: String, required: true }, // HH:MM
  taken: { type: Boolean, default: false } // هل تم أخذ الجرعة
});

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true }, // إجمالي الحبات
  doses: [doseSchema], // أوقات الجرعات اليومية
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  finished: { type: Boolean, default: false } // هل انتهت كمية الدواء
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);

const express = require('express');
const router = express.Router();

const {addMedi} = require('../../services/Medicines/addMedi');
const {getMedi} = require('../../services/Medicines/getMedi');
const {getOneMedi} = require('../../services/Medicines/getOneMedi');
const {updateMedi} = require('../../services/Medicines/updateMedi');
const {deleteMedi} = require('../../services/Medicines/deleteMedi');


const {addMediValidator} = require('../../validators/Medicines/addMedi')
const {getOneMediValidator} = require('../../validators/Medicines/getOneMedi')
const {updateMediValidator} = require('../../validators/Medicines/updateMedi')
const {deleteMediValidator} = require('../../validators/Medicines/deleteMedi')


const {protect} = require('../../middlewares/Auth/protect')

router.post('/addMedi', addMediValidator, protect, addMedi);
router.get('/getMedi', protect, getMedi);
router.get('/getOneMedi/:id', protect, getOneMediValidator, getOneMedi);
router.put('/updateMedi/:id', protect, updateMediValidator, updateMedi);
router.delete('/deleteMedi/:id', protect, deleteMediValidator, deleteMedi);


module.exports = router;
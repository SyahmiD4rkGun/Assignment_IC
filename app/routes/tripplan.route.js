const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/crud.controller');

router.post('/create', product_controller.trip_create);
router.get('/:id', product_controller.trip_details);
router.put('/:id/update', product_controller.trip_update);
router.delete('/:id/delete', product_controller.trip_delete);
module.exports = router;
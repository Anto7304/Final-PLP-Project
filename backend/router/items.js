const express = require('express');
const router = express.Router();
const {postAll, deleteItem,updateItem,fetchAll,fetchOne} = require('../controllers/items.router');

router.post('/items', postAll)
router.get('/items',fetchAll)
router.get('/items/:id',fetchOne)
router.put('/items/:id',updateItem)
router.delete('/items/:id',deleteItem)



module.exports = router;
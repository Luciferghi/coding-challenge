const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.index)
router.post('/store', UserController.store)
router.post('/update', UserController.update)
router.get('/selector', UserController.listSelector)

module.exports = router
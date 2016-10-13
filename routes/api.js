const express = require ('express')
const router = express.Router()

router.use('/faceRec', require('./faceRec'))
router.use('/gallery', require('./gallery'))

module.exports = router

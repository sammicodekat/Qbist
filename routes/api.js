const express = require ('express')
const router = express.Router()

router.use('/faceRec', require('./faceRec'))

module.exports = router

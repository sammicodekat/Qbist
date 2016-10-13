const express = require('express')
const router = express.Router()
const FaceRec = require('../models/FaceRec')

router.use((req,res,next) => {
  res.handle = (err,data) => res.status( err ? 400 :200).send(err || data)
  next()
})

router.route('/')
.post(( req , res ) => {
  FaceRec.detectFace(req.body,res.handle)
})

module.exports = router

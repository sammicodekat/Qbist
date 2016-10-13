const express = require('express')
const router = express.Router()
const Gallery = require('../models/Gallery')

router.get('/', (req, res) => {
  Gallery.getArt()
    .then(artwork => {
      res.send(artwork)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

router.post('/', (req, res) => {
  Gallery.addArt(req.body)
    .then(Gallery.getArt)
    .then(artwork => {
      res.send(artwork)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// router.use((req,res,next) => {
//   res.handle = (err,data) => res.status( err ? 400 :200).send(err || data)
//   next()
// })
//
// router.route('/')
// .get((req, res) => {
//   Gallery.getArt(req.body, res.handle)
// })
// .post((req, res) => {
//   Gallery.addArt(req.body, res.handle)
// })

module.exports = router

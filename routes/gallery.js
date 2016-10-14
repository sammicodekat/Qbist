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

module.exports = router

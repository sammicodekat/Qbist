import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _faceRectangle = {}
let _faceLandmarks = {}
let _faceAttributes = {}
let _sourceImage = ''

class EmojiStore extends EventEmitter {
  constructor () {
    super()
    AppDispatcher.register(action => {
      switch (action.type) {
        case 'GOT_IMGDATA':
          _faceRectangle = action.payload.faceRectangle
          _faceLandmarks = action.payload.faceLandmarks
          _faceAttributes = action.payload.faceAttributes
          this.emit('CHANGE')
          break
        case 'STORE_SOURCE_IMG':
          _sourceImage = action.payload
          console.log('_sourceImage: ', _sourceImage)
          this.emit('CHANGE')
          break
      }
    })
  }

  startListening (cb) {
    this.on('CHANGE', cb)
  }

  stopListening (cb) {
    this.removeListener('CHANGE', cb)
  }

  getFaceRectangle () {
    return _faceRectangle
  }

  getFaceLandmarks () {
    return _faceLandmarks
  }

  getFaceAttributes () {
    return _faceAttributes
  }

  getSourceImg () {
    return _sourceImage
  }

}

export default new EmojiStore()

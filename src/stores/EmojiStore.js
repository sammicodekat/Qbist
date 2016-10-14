import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _sourceImage = ''
let _face = {}
let _emotion = {}
let _dataUrl = ''
let _artworks = []

class EmojiStore extends EventEmitter {
  constructor () {
    super()
    AppDispatcher.register(action => {
      switch (action.type) {
        case 'GOT_IMGDATA':
          _face = action.payload[0][0]
          _emotion = action.payload[1][0]
          this.emit('CHANGE')
          break
        case 'STORE_SOURCE_IMG':
          _sourceImage = action.payload
          this.emit('CHANGE')
          break
        case 'GOT_ARTWORKS':
          _artworks = action.payload
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

  getImgData () {
    return _face
  }

  getImgEmo () {
    return _emotion
  }

  getSourceImg () {
    return _sourceImage
  }
  getDataUrl () {
    return _dataUrl
  }
  getArtworks () {
    return _artworks
  }

}

export default new EmojiStore()

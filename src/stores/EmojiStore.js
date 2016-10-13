import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _imgData ={}
let _sourceImage = ''

class EmojiStore extends EventEmitter {
  constructor () {
    super()
    AppDispatcher.register(action => {
      switch (action.type) {
        case 'GOT_IMGDATA':
          _imgData = action.payload
          this.emit('CHANGE')
          break
        case 'STORE_SOURCE_IMG':
          _sourceImage = action.payload
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

  getImgData() {
    return _imgData
  }
  getSourceImg () {
    return _sourceImage
  }

}

export default new EmojiStore()

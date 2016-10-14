import API from '../API'
import AppDispatcher from '../AppDispatcher'

const EmojiActions = {
  upload (url) {
    API.upload(url)
  },
  saveArt(artwork){
    API.saveArt(artwork)
  },
  storeSourceImg (url) {
    AppDispatcher.dispatch({
      type: 'STORE_SOURCE_IMG',
      payload: url
    })
  },
  getArt(){
    API.getArtwork()
  }
}

export default EmojiActions

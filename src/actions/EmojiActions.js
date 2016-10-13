import API from '../API'
import AppDispatcher from '../AppDispatcher'

const EmojiActions = {
  upload (url) {
    API.upload(url)
  },

  storeSourceImg (url) {
    AppDispatcher.dispatch({
      type: 'STORE_SOURCE_IMG',
      payload: url
    })
  }
}

export default EmojiActions

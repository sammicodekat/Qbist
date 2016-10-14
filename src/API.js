import { get, post } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  upload (url) {
    post('/api/faceRec/', {url: url})
    .then(res => {
      ServerActions.gotImgData(res.data)
    })
    .catch(console.error)
  },
  saveArt(artwork){
    post('/api/gallery/', artwork)
    .then(res => {
      ServerActions.gotArtworks(res.data)
    })
    .catch(console.error)
  },
   getArtwork(){
    get('/api/gallery/')
    .then(res => {
      ServerActions.gotArtworks(res.data)
    })
    .catch(console.error)
  }

}

export default API

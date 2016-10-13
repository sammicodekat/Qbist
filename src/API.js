import { post } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  upload (url) {
    post('/api/faceRec/', {url: url})
    .then(res => {
      ServerActions.gotImgData(res.data)
    })
    .catch(console.error)
  }
}

export default API

import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  gotImgData (imgData) {
    AppDispatcher.dispatch({
      type: 'GOT_IMGDATA',
      payload: imgData
    })
  }
}
export default ServerActions

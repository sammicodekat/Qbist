import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  gotImgData (imgData) {
    AppDispatcher.dispatch({
      type: 'GOT_IMGDATA',
      payload: imgData
    })
  },
  gotArtworks (artworks) {
    AppDispatcher.dispatch({
      type: 'GOT_ARTWORKS',
      payload: artworks
    })
  }
}
export default ServerActions

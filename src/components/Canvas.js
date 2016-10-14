import React, { Component } from 'react'
import EmojiActions from '../actions/EmojiActions'

export default class Canvas extends Component {
  constructor () {
    super()
    this.updateCanvas = this.updateCanvas.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  componentDidMount () {
    this.updateCanvas()
  }

  componentDidUpdate () {
    this.updateCanvas()
  }

  updateCanvas () {
    const {canvas} = this.refs
    const {imgData, imgEmo} = this.props
    if (imgData.faceAttributes) {
      const {faceAttributes, faceLandmarks, faceRectangle} = imgData
      let landmarks = faceLandmarks
      const {facialHair, gender, glasses, headPose, smile} = faceAttributes
      let {pupilLeft, eyeLeftOuter, eyeLeftTop, eyeLeftBottom, eyeLeftInner} = landmarks
      let {pupilRight, eyeRightOuter, eyeRightTop, eyeRightBottom, eyeRightInner} = landmarks
      let {eyebrowLeftOuter, eyebrowLeftInner, eyebrowRightOuter, eyebrowRightInner} = landmarks
      let {noseRootLeft, noseLeftAlarOutTip} = landmarks
      let {underLipBottom, underLipTop, upperLipBottom, upperLipTop, mouthLeft, mouthRight} = landmarks
      let {top, left, width, height} = faceRectangle
      let {scores} = imgEmo
      let emoSorted = Object.keys(scores).sort((a, b) => scores[b] - scores[a])
      let emotion = emoSorted[0]

      // let{anger,contempt,disgust,fear,happiness,neutral,sadness,surprise}=imgEmo.scores

      const relW = faceRectangle.width / 700
      const relH = faceRectangle.height / 700

      for (var coord in landmarks) {
        landmarks[coord].x = (landmarks[coord].x - faceRectangle.left) / relW
        landmarks[coord].y = (landmarks[coord].y - faceRectangle.top) / relH
      }

      const ctx = canvas.getContext('2d')

      ctx.clearRect(0, 0, 700, 700)
      this._createNew(ctx, emotion, null, 0, 0, emotion)
      .then(() => this._createNew(ctx, 'head', 11, 0, 0, emotion))
      .then(() => this._createNew(ctx, 'nose', 15, noseLeftAlarOutTip.x, noseRootLeft.y, emotion))
      .then(() => this._createNew(ctx, 'eye', 17, eyeLeftOuter.x, eyeLeftTop.y, emotion))
      .then(() => this._createNew(ctx, 'eye', 17, eyeRightInner.x, eyeRightTop.y, emotion))
      .then(() => this._createNew(ctx, 'pupil', 7, pupilLeft.x, pupilLeft.y, emotion))
      .then(() => this._createNew(ctx, 'pupil', 7, pupilRight.x, pupilRight.y, emotion))
      .then(() => this._createNew(ctx, 'topLip', 14, mouthLeft.x, upperLipTop.y, emotion))
      .then(() => this._createNew(ctx, 'bottomLip', 14, mouthLeft.x, underLipBottom.y, emotion))
      .then(() => this._createNew(ctx, 'brow', 18, eyebrowLeftOuter.x, eyebrowLeftOuter.y, emotion))
      .then(() => this._createNew(ctx, 'brow', 18, eyebrowRightInner.x, eyebrowRightInner.y, emotion))
      .then(() => { if (glasses !== 'NoGlasses') return this._createNew(ctx, glasses, 3, noseRootLeft.x - noseRootLeft.x, noseRootLeft.y - 50) })
      .catch((error) => console.log('error: ', error))
      // if (facialHair.beard > 0.2 && facialHair.beard < 5) this._createNew(ctx, 'beardLight', 1)
    }
    // ctx.fillRect(300, 300, 500, 500)
  }

  _createNew (ctx, item, itemNum, xp, yp, emotion) {
    return new Promise((resolve, reject) => {
      let source
      if (!itemNum) { source = `./images/${item}.jpg` } else {
        let num = (Math.floor(Math.random() * itemNum) + 1)
        source = `./images/${item}${num}.png`
      }
      item = new Image()
      item.src = source
      item.onload = () => ctx.drawImage(item, xp, yp)
      resolve()
    })
  }

  handleCreate (e) {
    e.preventDefault()
    const { canvas } = this.refs
    let dataUrl = canvas.toDataURL('images/png')
    let {author, name} = this.refs
    let artwork = {
      title: name.value,
      author: author.value,
      image: dataUrl
    }

    author.value = ''
    name.value = ''
    EmojiActions.saveArt(artwork)
  }

  render () {
    return (
      <div>
        <canvas ref="canvas" width={700} height={700} />
        <div className="row">
          <form onSubmit={(e) => this.handleCreate(e)}>
            <input type="text" className="artTitle" ref="name" placeholder="ENTER ARTWORK TITLE" required />
            <input type="text" className="artistName" ref="author" placeholder="enter artist name" required />
            <button className="saveBtn">Save Art</button>
          </form>
        </div>
      </div>
    )
  }
}

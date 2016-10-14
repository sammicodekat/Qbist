import React, { Component } from 'react'
import EmojiActions from "../actions/EmojiActions"

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
    const {imgData,imgEmo} = this.props
    if (imgData.faceAttributes) {
      const {faceAttributes, faceLandmarks, faceRectangle} = imgData
      let landmarks = faceLandmarks
      const {age,facialHair, gender, glasses, headPose, smile} = faceAttributes
      let {pupilLeft, eyeLeftOuter, eyeLeftTop, eyeLeftBottom, eyeLeftInner} = landmarks
      let {pupilRight, eyeRightOuter, eyeRightTop, eyeRightBottom, eyeRightInner} = landmarks
      let {eyebrowLeftOuter, eyebrowLeftInner, eyebrowRightOuter, eyebrowRightInner} = landmarks
      let {noseRootLeft, noseLeftAlarOutTip} = landmarks
      let {underLipBottom, underLipTop, upperLipBottom, upperLipTop, mouthLeft, mouthRight} = landmarks
      let {top, left, width, height} = faceRectangle
      let {scores} = imgEmo
      let emoSorted = Object.keys(scores).sort((a,b) => scores[b]-scores[a])
      let emotion = emoSorted[0]

      // let{anger,contempt,disgust,fear,happiness,neutral,sadness,surprise}=imgEmo.scores


      const relW = faceRectangle.width / 600
      const relH = faceRectangle.height / 600

      for (var coord in landmarks) {
        landmarks[coord].x = (landmarks[coord].x - faceRectangle.left) / relW
        landmarks[coord].y = (landmarks[coord].y - faceRectangle.top) / relH
      }

      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, 600, 600)
      this._createNew(ctx, 'head', 5, 0, 0)
      this._createNew(ctx, 'eye', 7, eyeLeftOuter.x, eyeLeftTop.y)
      this._createNew(ctx, 'eye', 7, eyeRightInner.x, eyeRightTop.y)
      this._createNew(ctx, 'nose', 4, noseLeftAlarOutTip.x, noseRootLeft.y)
      this._createNew(ctx, 'pupil', 7, pupilLeft.x, pupilLeft.y)
      this._createNew(ctx, 'pupil', 7, pupilRight.x, pupilRight.y)
      this._createNew(ctx, 'topLip', 4, mouthLeft.x, upperLipTop.y)
      this._createNew(ctx, 'bottomLip', 4, mouthLeft.x, underLipBottom.y)
      this._createNew(ctx, 'brow', 10, eyebrowLeftOuter.x, eyebrowLeftOuter.y)
      this._createNew(ctx, 'brow', 10, eyebrowRightInner.x, eyebrowRightInner.y)
      if (glasses !== 'NoGlasses') this._createNew(ctx, 'ReadingGlasses', 3, noseRootLeft.x - noseRootLeft.x, noseRootLeft.y - 50)
    }
    // ctx.fillRect(300, 300, 500, 500)
  }

  _createNew (ctx, item, itemNum, xp, yp) {
    let num = (Math.floor(Math.random() * itemNum) + 1)
    let source = `./images/${item}${num}.png`
    item = new Image()
    item.src = source
    if (item === 'head') {
      ctx.save()
      ctx.translate(300, 300)
      ctx.rotate(this.props.faceAttributes.headPose.roll * Math.PI / 180)
      item.onload = () => ctx.drawImage(item, -xp, -yp)
      ctx.restore()
    } else {
      item.onload = () => ctx.drawImage(item, xp, yp)
    }
  }

  handleCreate (e) {
    e.preventDefault()
    const { canvas } = this.refs
    let dataUrl = canvas.toDataURL('images/png')
    let {author,name} = this.refs
    let artwork = {
      title: name.value,
      author: author.value,
      image:dataUrl
    }
    author.value = ''
    name.value = ''
    EmojiActions.saveArt(artwork)
  }

  render () {
    return (
      <div>
        <canvas ref="canvas" width={600} height={600} />
        <div className="row">
          <form onSubmit={(e) => this.handleCreate(e)}>
            <input type="text" className="searchBar" ref="author" placeholder="please enter your name" required />
            <input type="text" className="searchBar" ref="name" placeholder="name...." required />
            <button >Submit Art</button>
          </form>
        </div>
      </div>
    )
  }
}

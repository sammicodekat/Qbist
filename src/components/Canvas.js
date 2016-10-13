import React, { Component } from 'react'

export default class Canvas extends Component {
  constructor () {
    super()
    this.updateCanvas = this.updateCanvas.bind(this)
  }

  componentDidMount () {
    this.updateCanvas()
  }

  componentDidUpdate () {
    this.updateCanvas()
  }

  updateCanvas () {
    const {canvas} = this.refs
    const {imgData} = this.props
    if (imgData.faceAttributes) {
      const {faceAttributes, faceLandmarks, faceRectangle} = imgData
      let landmarks = faceLandmarks
      const {age,facialHair, gender, glasses, headPose, smile} = faceAttributes
      let {eyeLeftOuter, eyeLeftTop, eyeLeftBottom, eyeLeftInner} = landmarks
      let {eyeRightOuter, eyeRightTop, eyeRightBottom, eyeRightInner} = landmarks
      let {noseRootLeft} = landmarks
      let {pupilRight, pupilLeft, underLipBottom, underLipTop, upperLipBottom, upperLipTop} = landmarks
      let {top, left, width, height} = faceRectangle

      const relW = faceRectangle.width / 600
      const relH = faceRectangle.height / 600

      for (var coord in landmarks) {
        landmarks[coord].x = (landmarks[coord].x - faceRectangle.left) / relW
        landmarks[coord].y = (landmarks[coord].y - faceRectangle.top) / relH
      }

      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, 600, 600)
      setTimeout(this._createNew(ctx, 'head', 1, 50, 50), 6000)
      setTimeout(this._createNew(ctx, 'eye', 7, eyeLeftTop.x, eyeLeftTop.y), 6000)
      setTimeout(this._createNew(ctx, 'eye', 7, eyeRightTop.x, eyeRightTop.y), 6000)
      setTimeout(this._createNew(ctx, 'nose', 4, noseRootLeft.x, noseRootLeft.y), 6000)
      setTimeout(this._createNew(ctx, 'pupil', 7, pupilLeft.x, pupilLeft.y), 6000)
      setTimeout(this._createNew(ctx, 'pupil', 7, pupilRight.x, pupilRight.y), 6000)
      setTimeout(this._createNew(ctx, 'topLip', 4, upperLipTop.x, upperLipTop.y), 6000)
      setTimeout(this._createNew(ctx, 'bottomLip', 4, underLipBottom.x, underLipBottom.y), 6000)
    }
    // ctx.fillRect(300, 300, 500, 500)
  }

  _createNew (ctx, item, itemNum, xp, yp) {
    let num = (Math.floor(Math.random() * itemNum) + 1)
    let source = `./images/${item}${num}.png`
    item = new Image()
    item.src = source
    if (item === 'head') {
      ctx.translate(300, 300)
      ctx.rotate(headPose.roll*Math.PI/180)
      item.onload = () => ctx.drawImage(item, -xp, -yp)
      ctx.restore()
    } else {
      item.onload = () => ctx.drawImage(item, xp, yp)
    }
  }

  render () {
    return (
      <div>
        <canvas ref="canvas" width={600} height={600} />
      </div>
    )
  }
}

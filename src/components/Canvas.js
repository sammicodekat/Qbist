import React, { Component } from 'react'

export default class Canvas extends Component {
  constructor(){
    super()
    this.updateCanvas=this.updateCanvas.bind(this);
  }

  componentDidMount () {
    this.updateCanvas()
  }

  componentDidUpdate (){
    this.updateCanvas()
  }

  updateCanvas () {

    const {canvas} = this.refs
    const {imgData} = this.props
    if(imgData.faceAttributes){
    const {faceAttributes,faceLandmarks,faceRectangle} = imgData
    let landmarks = faceLandmarks
    const {age,facialHair,gender,glasses,headPose,smile} = faceAttributes
    let {eyeLeftOuter,eyeLeftTop,eyeLeftBottom,eyeLeftInner} = landmarks
    let {eyeRightOuter,eyeRightTop,eyeRightBottom,eyeRightInner} = landmarks
    let {noseRootLeft} = landmarks
    let {pupilRight,pupilLeft,underLipBottom,underLipTop,upperLipBottom,upperLipTop} = landmarks
    let {top,left,width,height} = faceRectangle;

    const relW = faceRectangle.width/600;
    const relH = faceRectangle.height/600;

    for ( var coord in landmarks){
      landmarks[coord].x = (landmarks[coord].x - faceRectangle.left)/relW
      landmarks[coord].y = (landmarks[coord].y - faceRectangle.top)/relH
    }

    console.log("imgData",imgData);
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0,0,600,600);
    this._createNew("eye01",eyeLeftOuter.x,eyeLeftOuter.y,ctx)
    this._createNew("eye01",eyeRightInner.x,eyeRightInner.y,ctx)
    this._createNew("nose01",noseRootLeft.x-50,noseRootLeft.y+50,ctx)
    this._createNew('pupil01',pupilLeft.x,pupilLeft.y+25,ctx)
    this._createNew('pupil01',pupilRight.x,pupilRight.y+25,ctx)
    this._createNew('topLip01',upperLipTop.x,upperLipTop.y,ctx)
    this._createNew('bottomLip01',underLipBottom.x,underLipBottom.y,ctx)

    // this._createNew("wideEye",300,300,ctx)
  }
    // ctx.fillRect(300, 300, 500, 500)
  }

  _createNew(item,xp,yp,ctx){
    let source = `./images/${item}.png`
    item = new Image()
    item.src = source;
    item.onload = () => ctx.drawImage(item, xp, yp)
  }

  render () {
    return (
      <div>
        <canvas ref="canvas" width={600} height={600} />
      </div>
    )
  }
}

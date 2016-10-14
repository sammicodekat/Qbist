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
      const {facialHair, gender, glasses, headPose} = faceAttributes
      let {pupilLeft, eyeLeftOuter, eyeLeftTop, eyeLeftBottom, eyeLeftInner} = landmarks
      let {pupilRight, eyeRightOuter, eyeRightTop, eyeRightBottom, eyeRightInner} = landmarks
      let {eyebrowLeftOuter, eyebrowLeftInner, eyebrowRightOuter, eyebrowRightInner} = landmarks
      let {noseRootLeft, noseLeftAlarOutTip} = landmarks
      let {underLipBottom, underLipTop, upperLipBottom, upperLipTop, mouthLeft, mouthRight} = landmarks
      let {top, left, width, height} = faceRectangle
      let {moustache,beard} = facialHair
      let {scores} = imgEmo
      let emoSorted = Object.keys(scores).sort((a, b) => scores[b] - scores[a])
      let emotion = emoSorted[0]
      var b , m , g = ""
      var nh1 ,nbl1,nbr1,nl1,nel1,ner1 = 1;
      var nh2 ,nbl2,nbr2,nl2,nel2,ner2 = 1;
      switch(emotion){
        case "anger":
        case "contempt":
        case "disgust":
        case "fear":
        case "sadness":
        nl1 = 5
        nl2 = 7
        nbl1 = 1
        nbl2 = 4
        nbr1 = 5
        nbr2 = 8
        nel1 = 1
        nel2 = 6
        ner1 = 7
        ner2 = 12
        break;
        case "happiness":
        case "surprise":
        nl1 = 1
        nl2 = 4
        break;
        case "neutral":
        default:
        nl1 = 8
        nl2 = 12
        nbl1 = 9
        nbl2 = 12
        nbr1 = 13
        nbr2 = 16
        nel1 = 13
        nel2 = 20
        ner1 = 13
        ner2 = 20
        break;
      }
      if (beard > 0.2 && beard < 0.5) { b = "beardLight" } else if ( beard >= 0.5 ) {b = "beardHeavy"}
      if (moustache > 0.2 && moustache < 0.5) { m = "mustacheLight" } else if ( moustache >= 0.5 ) {m = "mustacheHeavy"}
      const relW = faceRectangle.width / 700
      const relH = faceRectangle.height / 700

      for (var coord in landmarks) {
        landmarks[coord].x = (landmarks[coord].x - faceRectangle.left) / relW
        landmarks[coord].y = (landmarks[coord].y - faceRectangle.top) / relH
      }
      const ctx = canvas.getContext('2d')

      ctx.clearRect(0, 0, 700, 700)
      this._createNew(ctx, emotion, null,null, 0, 0, emotion)
      .then(this._createNew(ctx, 'head', 1, 8, 0, 0, emotion))
      .then(this._createNew(ctx, 'brow', nbl1,nbl2, eyebrowLeftOuter.x, eyebrowLeftOuter.y, emotion))
      .then(this._createNew(ctx, 'brow', nbr1,nbr2, eyebrowRightInner.x, eyebrowRightInner.y, emotion))
      .then(this._createNew(ctx, 'nose', 1,15, noseLeftAlarOutTip.x, noseRootLeft.y, emotion))
      .then(this._createNew(ctx, 'topLip', nl1,nl2, mouthLeft.x, upperLipTop.y, emotion))
      .then(this._createNew(ctx, 'bottomLip', nl1,nl2, mouthLeft.x, underLipTop.y, emotion))
      .then(this._createNew(ctx, b, 1,1, mouthLeft.x, upperLipTop.y, emotion))
      .then(this._createNew(ctx, m, 1,4, mouthLeft.x, upperLipTop.y-100, emotion))
      .then(()=>{

          console.log('glasses: ', glasses)
        if (glasses === 'Sunglasses') {
          return this._createNew(ctx, glasses, 1,3, eyeLeftOuter.x, noseRootLeft.y - 50)
        } else {
          (this._createNew(ctx, 'eye', nel1,nel2, eyeLeftOuter.x, eyeLeftTop.y, emotion))
          .then(this._createNew(ctx, 'eye',ner1 ,ner2, eyeRightInner.x, eyeRightTop.y, emotion))
          .then(this._createNew(ctx, 'pupil', 1,5, pupilLeft.x, pupilLeft.y, emotion))
          .then(this._createNew(ctx, 'pupil', 1,5, pupilRight.x, pupilRight.y, emotion))
          .then(()=>{ if (glasses === 'ReadingGlasses') return this._createNew(ctx, glasses, 1,3, noseRootLeft.x - eyeLeftOuter.x, noseRootLeft.y - 50)})
        }})
      }
    }

    _createNew (ctx, item, itemNum1,itemNum2, xp, yp, emotion) {
      let promise = new Promise((resolve, reject) => {
        let source
        if (!itemNum2) { source = `./images/${item}.png` } else {
          var num = (Math.floor(Math.random() * (itemNum2-itemNum1 +1))+itemNum1)
          source = `./images/${item}${num}.png`
        }
        item = new Image()
        item.src = source
        item.onload = () => ctx.drawImage(item, xp, yp)
        resolve()
      })
      return promise
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

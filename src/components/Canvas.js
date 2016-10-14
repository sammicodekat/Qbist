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

  updateCanvas (relW,relH,emotion,moustache,beard,gender, glasses, headPose) {
      let {pupilLeft, eyeLeftOuter, eyeLeftTop, eyeLeftBottom, eyeLeftInner} = landmarks
      let {pupilRight, eyeRightOuter, eyeRightTop, eyeRightBottom, eyeRightInner} = landmarks
      let {eyebrowLeftOuter, eyebrowLeftInner, eyebrowRightOuter, eyebrowRightInner} = landmarks
      let {noseRootLeft, noseLeftAlarOutTip} = landmarks
      let {underLipBottom, underLipTop, upperLipBottom, upperLipTop, mouthLeft, mouthRight} = landmarks
      var b , m , g = ""
      var nh ,nbl,nbr,nn,nl,nel,ner,npl,npr = 0;
      switch(gender){
        case "female":

        break;
        case "male":

        break;
      }
      if (beard > 0.2 && beard < 0.5) { b = "beardLight" } else if ( beard >= 0.5 ) {b = "beardHeavy"}
      if (moustache > 0.2 && moustache < 0.5) { m = "mustacheLight" } else if ( moustache >= 0.5 ) {m = "mustacheHeavy"}

      // let{anger,contempt,disgust,fear,happiness,neutral,sadness,surprise}=imgEmo.scores
      const ctx = canvas.getContext('2d')

      ctx.clearRect(0, 0, 700, 700)
      this._createNew(ctx, emotion, null, 0, 0, emotion)
      .then(this._createNew(ctx, 'head', nh, 0, 0, emotion))
      .then(this._createNew(ctx, 'brow', nbl, eyebrowLeftOuter.x, eyebrowLeftOuter.y, emotion))
      .then(this._createNew(ctx, 'brow', nbr, eyebrowRightInner.x, eyebrowRightInner.y, emotion))
      .then(this._createNew(ctx, 'nose', nn, noseLeftAlarOutTip.x, noseRootLeft.y, emotion))
      .then(this._createNew(ctx, 'topLip', nl, mouthLeft.x, upperLipTop.y, emotion))
      .then(this._createNew(ctx, 'bottomLip', nl, mouthLeft.x, underLipTop.y, emotion))
      .then(this._createNew(ctx, b, 1, mouthLeft.x, upperLipTop.y, emotion))
      .then(this._createNew(ctx, m, 4, mouthLeft.x, upperLipTop.y-100, emotion))
      .then(()=>{ if (glasses === 'sunglasses') return this._createNew(ctx, glasses, 3, eyeLeftOuter.x, noseRootLeft.y - 50)
        else {
          (this._createNew(ctx, 'eye', nel, eyeLeftOuter.x, eyeLeftTop.y, emotion))
          .then(this._createNew(ctx, 'eye',ner , eyeRightInner.x, eyeRightTop.y, emotion))
          .then(this._createNew(ctx, 'pupil', npl, pupilLeft.x, pupilLeft.y, emotion))
          .then(this._createNew(ctx, 'pupil', npr, pupilRight.x, pupilRight.y, emotion))
          .then(()=>{ if (glasses === 'ReadingGlasses') return this._createNew(ctx, glasses, 3, noseRootLeft.x - eyeLeftOuter.x, noseRootLeft.y - 50)})
        }})
      }

    _createNew (ctx, item, itemNum, xp, yp, emotion) {
      let promise = new Promise((resolve, reject) => {
        let source
        console.log(item)
        if (!itemNum) { source = `./images/${item}.jpg` } else {
          var num = (Math.floor(Math.random() * itemNum +1))
          source = `./images/${item}${num}.png`
        }
        item = new Image()
        item.src = source
        item.onload = () => ctx.drawImage(item, xp, yp)
        resolve(console.log(source))
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
        var nh ,nbl,nbr,nn,nl,nel,ner,npl,npr = 0;
        switch(gender){
          case "female":

          break;
          case "male":

          break;
        }
        if (beard > 0.2 && beard < 0.5) { b = "beardLight" } else if ( beard >= 0.5 ) {b = "beardHeavy"}
        if (moustache > 0.2 && moustache < 0.5) { m = "mustacheLight" } else if ( moustache >= 0.5 ) {m = "mustacheHeavy"}

        // let{anger,contempt,disgust,fear,happiness,neutral,sadness,surprise}=imgEmo.scores

        const relW = faceRectangle.width / 700
        const relH = faceRectangle.height / 700

        for (var coord in landmarks) {
          landmarks[coord].x = (landmarks[coord].x - faceRectangle.left) / relW
          landmarks[coord].y = (landmarks[coord].y - faceRectangle.top) / relH
        }
      }
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

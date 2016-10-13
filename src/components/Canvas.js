import React, { Component } from 'react'

export default class Canvas extends Component {
  componentDidMount () {
    this.updateCanvas()
  }

  updateCanvas () {
    const ctx = this.refs.canvas.getContext('2d')
    let wideEye = new Image()
    wideEye.src = './images/wideEye.png'
    wideEye.onload = () => ctx.drawImage(wideEye, 300, 300)
    // ctx.fillRect(300, 300, 500, 500)
  }

  render () {
    return (
      <div>
        <canvas ref="canvas" width={600} height={600} />
      </div>
    )
  }
}

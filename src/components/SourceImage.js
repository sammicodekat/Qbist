import React, { Component } from 'react'

export default class Canvas extends Component {
  render () {
    const { sourceImg } = this.props
    return (
      <div className="sourceImg">
        {sourceImg ? <img src={sourceImg} alt="SourceImage" /> : null}
      </div>
    )
  }
}

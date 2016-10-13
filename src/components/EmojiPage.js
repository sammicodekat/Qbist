import React, { Component } from 'react'
import EmojiStore from '../stores/EmojiStore'
import UploadBar from './UploadBar'
import { Grid } from 'semantic-ui-react'
const { Column, Row } = Grid

export default class SearchPage extends Component {
  constructor () {
    super();

    this.state = {
      imgData: EmojiStore.getImgData()
    }
    this._onChange = this._onChange.bind(this);
  }
  componentWillMount() {
    EmojiStore.startListening(this._onChange)
  }

  componentWillUnmount(){
    EmojiStore.stopListening(this._onChange)
  }

  _onChange(){
    this.setState({
      imgData: EmojiStore.getImgData()
    })
  }

  render(){
    const {imgData} = this.state;
    console.log(imgData);
    return (
      <Grid>
        <Row color='orange' textAlign='center'>
          <Column><UploadBar/></Column>
        </Row>
        <Row>
          <h1>hihihihih</h1>
        </Row>
      </Grid>
    )
  }
}

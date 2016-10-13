import React, { Component } from 'react';
import ToAPIActions from '../actions/ToAPIActions'
import { Card, Icon, Image ,Grid ,Button , Label ,Rating ,List, Container} from 'semantic-ui-react'
const { Column, Row } = Grid

export default class Lists extends Component {
  constructor(){
    super();
    this._like= this._like.bind(this);
  }

 _like(tweet){
  ToAPIActions.save(tweet);
 }

  render(){
    const {imgData} = this.props;
    {if(imgData){
      return (
        <Container>
          <List relaxed = 'very' animated verticalAlign='middle'>
            {
              imgData.map ( tweet => {
                let {created_at, id, text} = tweet;
                let image = tweet.user.profile_image_url
                let name = tweet.user.name
                return (
                  <List.Item key ={id}>
                    <Image avatar src={image} />
                    <div onClick = {this._like.bind(null,tweet)} ><Button
                      color='red'
                      content='Save Tweet'
                      icon='heart'
                      size ="mini"
                      /></div>
                    <List.Header as='a'>{name}</List.Header>
                    <List.Content>
                      <List.Description>
                        {text}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                )
              })}
            </List>
          </Container>
        )
      }
    }
  }
}

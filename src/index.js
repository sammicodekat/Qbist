import React from 'react'
import { render } from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import Layout from './components/Layout'
import EmojiPage from './components/EmojiPage'

render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={EmojiPage} />
    </Route>
  </Router>,
  document.getElementById('root')
)

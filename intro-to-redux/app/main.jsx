'use strict'
import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'

import Jokes from './components/Jokes'
import NotFound from './components/NotFound'

const ExampleApp = ({children}) => <div>{children}</div>

render (
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/jokes" />
        <Route path="/jokes" component={Jokes} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>,
  document.getElementById('main')
)

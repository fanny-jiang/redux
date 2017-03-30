import React, { Component } from 'react'

import jokes, {randomJoke} from '../jokes'

import {createStore, combineReducers} from 'redux'

// const gotoJoke = id => ({
//   type: 'GOTO_JOKE',
//   jokeId: id
// })

const NEXT_JOKE = 'NEXT_JOKE'
const nextJoke = () => ({
  type: NEXT_JOKE
})

const ANSWER_JOKE = 'ANSWER_JOKE'
const answerJoke = () => ({
  type: ANSWER_JOKE
})


const reducer = (
  state={
    joke: randomJoke(),
    answered: false,
  },
  action
) => {
  switch(action.type) {
  case NEXT_JOKE:
    return {
      joke: randomJoke(),
      answered: false,
    }
  case ANSWER_JOKE:
    // Much like with the JSX spread operator, the spread should probably
    // go first.
    //   <SomeComponent {...this.state} someProp={2} />
    return {
      ...state,
      answered: true
    }
  }
  return state
}

const jokeReducer =
  (state=randomJoke(), action) => {
    if (action.type === NEXT_JOKE) {
      return randomJoke()
    }
    return state
  }

const answeredReducer = (state=false, action) => {
  switch (action.type) {
    case ANSWER_JOKE: return true
    case NEXT_JOKE: return false
  }
  return state
}

const store = createStore(
  combineReducers({
    joke: jokeReducer,
    answered: answeredReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

window.store = store
window.nextJoke = nextJoke
window.answerJoke = answerJoke

// Redux
// 1. Store: A state container
//   - Holds state
//   - Can be subscribe()d to
//   - dispatch(action)
//
// 2. Reducer: Describes how an action changes the state
//   - reducer(currentState: State, action: Action) -> State
//
// 3. Action Creators: Functions that return actions

// States: should be plain JS objects
// Actions: should be plain JS objects


export default class BonesJokes extends Component {
  componentDidMount() {
    this.setState(store.getState())
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  nextJoke = () => store.dispatch(nextJoke())

  answer = () => store.dispatch(answerJoke())

  render() {
    if (!this.state) { return null }

    const {joke, answered} = this.state    
    return (
      <div onClick={answered ? this.nextJoke : this.answer}>
        <h1>{joke.q}</h1>
        {answered && <h2>{joke.a}</h2>}
        <cite>~xoxo, bones</cite>
      </div>
    )
  }
}
import reducer from '../redux/reducers/lyrics-reducer';
import playerReducer from '../redux/reducers/player-reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import  thunkMiddleware  from 'redux-thunk';

export default createStore(
    combineReducers({
        lyrics: reducer,
        player: playerReducer
    })
    , applyMiddleware(createLogger(), thunkMiddleware));


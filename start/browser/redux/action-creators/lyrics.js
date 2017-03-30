import {SET_LYRICS} from '../constants';

export const setLyrics = (text) => (
  {type: SET_LYRICS,
  lyric: text}
  )

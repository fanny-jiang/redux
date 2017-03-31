import { SET_LYRICS, START_PLAYING, STOP_PLAYING, SET_CURRENT_SONG, SET_LIST } from '../../react/constants';
import axios from 'axios';

export const setLyrics = (text) => (
  {type: SET_LYRICS,
  lyric: text}
  )

export const fetchLyrics = function (artist, song) {
  return function (dispatch, getState) {
    axios.get(`/api/lyrics/${artist}/${song}`)
    .then(res => {
      dispatch(setLyrics(res.data.lyric))
    })
    .catch(console.error)
  }
}

export const startPlaying = ({ type: START_PLAYING });

const stopPlaying = () => ({ type: STOP_PLAYING });

const setCurrentSong = (currentSong) => ({
  type: SET_CURRENT_SONG,
  currentSong
});

const setCurrentSongList = (currentSongList) => ({
  type: SET_LIST,
  currentSongList
});


// const fetchAlbumsFromServer =() => {
//   return dispatch => {
//     axios.get('/api/albums')
//       .then(res => res.data)
//       // use the dispatch method the thunkMiddleware gave us
//       .then(albums => dispatch(receiveAlbumsFromServer(albums)));
//   }
// }

// const playSong = songId => {
//   return dispatch => {
//     // side effects, like using the audio element belong in async action creators too, even if they aren't "async"
//     audio.play()
//     dispatch(selectSong(songId));
//   }
// }

// const doSeveralThings = (stuffId, thingsId) => {
//   return dispatch => {
//     // we can also use async action creators to compose several actions into one!
//     dispatch(doStuff(stuffId));
//     dispatch(doThing(thingId));
//   }
// }
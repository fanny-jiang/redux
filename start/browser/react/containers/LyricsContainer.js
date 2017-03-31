import React, {Component} from 'react'
import store from '../store'
import Lyrics from '../components/Lyrics'
import {setLyrics} from '../../redux/action-creators/lyrics'
import axios from 'axios'

export default class LyricsContainer extends Component {
  constructor(props){
    super(props)
    this.state = Object.assign({
      artistQuery: '',
      songQuery: ''
    }, store.getState())
    this.setArtist = this.setArtist.bind(this)
    this.setSong = this.setSong.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    store.subscribe(function (){
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
      store.unsubscribe()
  }

  setArtist(artist){
    this.setState({artistQuery: artist})
  }

  setSong(song){
    this.setState({songQuery: song})
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.get(`/api/lyrics/${this.state.artistQuery}/${this.state.songQuery}`)
    .then(res => {
      store.dispatch(setLyrics(res.data.lyric))
    })
    .catch(console.error)
  }

  render(){
    return(
      <div>
        <Lyrics
          text={this.state.text}
          setArtist={this.setArtist}
          setSong={this.setSong}
          artistQuery={this.state.artistQuery}
          songQuery={this.state.songQuery}
          handleSubmit={this.handleSubmit} />
      </div>
           )
  }

}

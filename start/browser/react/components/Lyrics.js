import React from 'react'

export default function Lyrics (props){

  const artistChange = e => {
    props.setArtist(e.target.value)
  }

  const songChange = e => {
    props.setSong(e.target.value)
  }

  return(
      <div id='lyrics'>
        <form onSubmit={props.handleSubmit}>
          <div>
            <h3>Artist Name</h3>
              <input type='text' value={props.artistQuery} onChange={artistChange}></input>
            <h3>Song Name</h3>
              <input type='text' value={props.songQuery} onChange={songChange}></input>
            </div>
            <br />
            <pre>{props.text || 'Search above!'}</pre>
          <button type='submit'>Submit</button>
      </form>
      </div>
     )

}

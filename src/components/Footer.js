import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
      <footer>
        <small>This music player is combined with react & php api</small>
        <hr />
        <p style={{marginTop: "10px"}}><small>I developed this application for myself & everyone who got messies with their journey after work and just want to listen some songs</small></p>
        <p><small>Thanks, <a style={{color: "goldenrod"}} href="https://btkdevkh.com" target="_blank" rel="noreferrer">Btkdevkh</a></small></p>
      </footer>
    )
  }
}

export default Footer
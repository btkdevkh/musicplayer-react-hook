import React, { Component } from 'react';
import { getAllSongs } from '../api/songs';
import { config } from '../config';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: null,
      isPlay: false,
      idx: 0
    }

    this.myRefBarIPro = React.createRef();
    this.myRefAudio = React.createRef();
  }
  
  componentDidMount = () => {
    getAllSongs()
      .then((res) => {
        // console.log(res);
        // this.setState({ songs: res.songs })

        // Php testing
        this.setState({ songs: res })
        this.play();

        // Select an element by using ref
        this.myRefAudio.current.addEventListener('timeupdate', this.updateProgressBar);
        // Listener for ending song
        this.myRefAudio.current.onended = async() => {
          this.next()
        };

      })
      .catch(err => err)
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.idx !== this.state.idx) {
      // console.log(prevState.songs[this.state.idx]);
      // this.setState({ songs: this.state.songs })
      this.play();
    }
  }

  play = () => {    
    // document.querySelector("audio").play();
    this.myRefAudio.current.play().catch(error => error);
    this.setState({ isPlay: true });
  }

  pause = () => {
    this.myRefAudio.current.pause();
    this.setState({ isPlay: false });
  }

  prev = () => {
    this.setState((oldState) => {
      return { idx: oldState.idx - 1 }
    })
    
    if(this.state.idx <= 0) {
      this.setState((oldState) => {
        return { 
          idx: oldState.idx = this.state.songs.length - 1 
        }
      })
    }

    this.play();
  }

  next = () => {
    // If song idex is >= length of songs
    if(this.state.idx >= this.state.songs.length - 1) {
      // Set songs's state index to initial(0)
      this.setState({ idx: 0 })
    } else {
      // If song index is < length of songs,
      // set song's state index to next song(+1)
      this.setState((oldState) => {
        return { idx: oldState.idx + 1 }
      })
    }
    
    this.play();
  }

  updateProgressBar = (e) => {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100

    // Select an element by using ref
    const barInProgress = this.myRefBarIPro.current;
    barInProgress.style.backgroundColor = "palevioletred";
    barInProgress.style.width = `${progressPercent}%`
  }

  setProgress = (e) => {
    const width = e.target.clientWidth;
    const clicktX = e.nativeEvent.offsetX;

    const audio = this.myRefAudio.current;
    const duration = audio.duration;

    audio.currentTime = (clicktX / width) * duration;
  }

  render() {

    return (
      <div className="music-container">
        <div 
          className={
            this.state.isPlay === false ?
            "music-info" :
            "music-info play"
          }
        >
          {
            this.state.songs !== null &&
            this.state.idx !== null ?
            <>
              {
                this.state.isPlay === false ? "" :
                <h3 className="title">
                  {this.state.songs[this.state.idx].title}
                </h3>
              }

              {
                this.state.isPlay === false ? "" :
                <h5 className="title">
                  {this.state.songs[this.state.idx].singer}
                </h5>
              }
              
              <div className="cover">
                <img 
                  src={`${config.api_pict}/${this.state.songs[this.state.idx].photo}`}
                  alt="album-cover" 
                />
              </div>
              
              <audio
                ref={this.myRefAudio}
                src={`${config.api_music}/${this.state.songs[this.state.idx].songName}`}
              >
              </audio>
            </> : ""
          }
        </div>

        <div 
          className="btn-controls">
          <button
            onClick={() => {
              this.prev()
            }}
          >
            <i className="fas fa-backward"></i>
          </button>
          <button
            onClick={() => {
              this.state.isPlay === false ?
              this.play() : 
              this.pause();
            }}
          >
            <i className={
                this.state.isPlay === false ?
                "fas fa-play fa-2x" :
                "fas fa-pause fa-2x"
              }
            ></i>
          </button>
          <button
            onClick={() => { 
              this.next()
            }}
          >
            <i className="fas fa-forward"></i>
          </button>
        </div>

        <div
          className={
            this.state.isPlay === false ?
            "progress-bar" :
            "progress-bar play"
          }
          onClick={(e) => {
            this.setProgress(e);
          }}
        >
          <div 
            ref={this.myRefBarIPro}
            className={
              this.state.isPlay === false ?
              "bar-in-progress" :
              "bar-in-progress play"
            }
          ></div>
        </div>
      </div>
    )
  }
}

export default Player

import { Fragment, useEffect, useRef, useState } from 'react';
import { getAllSongs } from '../api/songs';
import { config } from '../config';
import { usePrevious } from '../utils/usePrevious';

const Player = () => {

  const [songs, setSongs] = useState([]);
  const [idx, setIdx] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setSuffle] = useState(false);
  const [vol, setVol] = useState(true);

  const prevIdx = usePrevious(idx);

  const myRefAudio = useRef();
  const myRefBarIPro = useRef();

  const setProgress = (e) => {
    const width = e.target.clientWidth;
    const clicktX = e.nativeEvent.offsetX;

    const audio = myRefAudio.current;
    const duration = audio.duration;

    audio.currentTime = (clicktX / width) * duration;
  }

  const updateProgressBar = (e) => {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100

    const barInProgress = myRefBarIPro.current;

    barInProgress.style.backgroundColor = "palevioletred";
    barInProgress.style.width = `${progressPercent}%`;
  }

  const loadSong = () => {
    getAllSongs()
    .then(res => {
      setSongs(res);
      myRefAudio.current.addEventListener('timeupdate', updateProgressBar);
    })
    .catch(err => err);
  }

  const shuffleMode = () => {
    setIdx(Math.floor(Math.random() * songs.length));
  }

  const setVolume = () => {
    setVol(o => !o)
  }
  
  const updateVoluume = () => {
    console.log(123);
  }

  const play = () => {
    setIsPlay(true);
    myRefAudio.current
      .play()
      .catch(error => error);
  }

  const pause = () => {
    setIsPlay(false);
    myRefAudio.current.pause();
  }

  const prev = () => {
    if(idx <= 0) {
      setIdx(o => o = songs.length - 1);
    } else {
      setIdx(o => o - 1);
    }
    play();
  }

  const next = () => {
    if(idx >= songs.length - 1) {
      setIdx(o => o = 0);
    } else {
      setIdx(o => o + 1);
    }
    play();
  }

  useEffect(() => {
    songs.length === 0 && loadSong();
    songs.length && prevIdx !== idx && play();

    const volumeAudio = myRefAudio.current
    if(volumeAudio) {
      //vol ? volumeAudio.volume = 1 : volumeAudio.volume = 0;
    };
    // eslint-disable-next-line
  }, [prevIdx, isPlay, idx, songs, repeat, shuffle, vol])

  return (
    <div className="music-container">
      <div className={ isPlay === false ? "music-info" : "music-info play" }>
        {
          songs.length &&
          <Fragment>
            <h3 className="title">{songs[idx].title}</h3>
            <h5 className="title">{songs[idx].singer}</h5>

            <div className="cover">
              <img src={`${config.api_pict}/${songs[idx].photo}`} alt="album-cover" />
            </div>
            
            <audio ref={myRefAudio} src={`${config.api_music}/${songs[idx].songName}`} onEnded={shuffle === false ? next : shuffleMode} loop={repeat}></audio>
          </Fragment>
        }
      </div>

      <div className="btn-controls">
        <button onClick={shuffle === false ? prev : shuffleMode}><i className="fas fa-backward"></i></button>
        <button onClick={() => { isPlay ? pause() : play() } }>
          <i className={isPlay === false ? "fas fa-play fa-2x" : "fas fa-pause fa-2x"}></i>
        </button>
        <button onClick={shuffle === false ? next : shuffleMode}>
          <i className="fas fa-forward"></i>
        </button>
      </div>

      <div className="repeat">
        <button disabled={isPlay === false ? true : false} onClick={() => setRepeat(o => !o)}>
          <i className={repeat === false ? 'fas fa-redo' : 'fas fa-redo repeat'}></i>
        </button>
        <button disabled={isPlay === false ? true : false} onClick={() => setSuffle(o => !o)}>
          <i className={shuffle === false ? 'fas fa-random' : 'fas fa-random shuffle'}></i>
        </button>

        <button className="vol" disabled={isPlay === false ? true : false} onClick={() => setVolume()}>
          <i className={'fas fa-volume-up'}></i> <span onClick={updateVoluume} className={'volBar'}></span>
        </button>
      </div>

      <div className={ isPlay === false ? "progress-bar" : "progress-bar play"}
        onClick={(e) => {
          setProgress(e);
        }}
      >
        <div ref={myRefBarIPro} className={ isPlay === false ? "bar-in-progress" : "bar-in-progress play" }></div>
      </div>
    </div>
  )
}

export default Player; 

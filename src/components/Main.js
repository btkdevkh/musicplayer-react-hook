import Player from './Player';
import cambodia from '../assets/img/cambodia.png';
import france from '../assets/img/france.png';

const Main = () => {
  return (
    <main className="main-bg">
      <div className="music-fake">
        <div className={"music-info play"}>
          <div className="cover">
            <img src={cambodia} alt="album-cover" />
          </div>
        </div>
      </div>

      <Player />
      
      <div className="music-fake">
        <div className="music-info play">
          <div className="cover">
            <img src={france} alt="album-cover" />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Main;

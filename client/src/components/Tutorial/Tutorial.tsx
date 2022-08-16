import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Tutorial = () => (
  <strong>
    <Popup
      trigger={(open) => (
        <button className="how-to-play-btn" autoFocus>
          How to play
        </button>
      )}
      position="bottom center"
      on="focus"
      closeOnDocumentClick
    >
      <strong>HOW TO PLAY </strong>
    </Popup>
  </strong>
);
export default Tutorial;

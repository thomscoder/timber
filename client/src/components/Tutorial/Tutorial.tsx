import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRecoilValue } from 'recoil';
import { gameDifficultyState, scoreToWinState } from '../../atoms/atoms';
import LinkedinLogo from '../../assets/linkedin.png';
import GithubLogo from '../../assets/github.png';

import './Tutorial.css';
// @ts-ignore
function Tutorial(props) {
  const gameDifficulty = useRecoilValue(gameDifficultyState);
  const scoreToWin = useRecoilValue(scoreToWinState);

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">How to play</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Gameplay is quite simple...</h5>
        <p>You have a grid that looks like this:</p>
        <div
          style={{
            ...gridExampleStyles,
          }}
        >
          <div className="letter-tutorial">A</div>
          <br />
          <div className="letter-tutorial">B</div>
          <div className="letter-tutorial">C</div>
          <div className="letter-tutorial">M</div>
          <div className="letter-tutorial">D</div>
          <div className="letter-tutorial">K</div>
          <div className="letter-tutorial">Y</div>
          <div className="letter-tutorial">G</div>
          <div className="letter-tutorial">E</div>
        </div>
        <p style={{ ...styles }}>Select one letter...</p>
        <div
          style={{
            ...gridExampleStyles,
          }}
        >
          <div className="letter-tutorial selected-letter">A</div>
          <br />
          <div className="letter-tutorial">B</div>
          <div className="letter-tutorial">C</div>
          <div className="letter-tutorial">M</div>
          <div className="letter-tutorial">D</div>
          <div className="letter-tutorial">K</div>
          <div className="letter-tutorial">Y</div>
          <div className="letter-tutorial">G</div>
          <div className="letter-tutorial">E</div>
        </div>
        <p style={{ ...styles }}>...select another one...</p>
        <div
          style={{
            ...gridExampleStyles,
          }}
        >
          <div className="letter-tutorial selected-letter">A</div>
          <br />
          <div className="letter-tutorial">B</div>
          <div className="letter-tutorial">C</div>
          <div className="letter-tutorial selected-letter">M</div>
          <div className="letter-tutorial">D</div>
          <div className="letter-tutorial">K</div>
          <div className="letter-tutorial">Y</div>
          <div className="letter-tutorial">G</div>
          <div className="letter-tutorial">E</div>
        </div>
        <p style={{ ...styles }}>...and another one...</p>
        <div
          style={{
            ...gridExampleStyles,
          }}
        >
          <div className="letter-tutorial selected-letter">A</div>
          <br />
          <div className="letter-tutorial">B</div>
          <div className="letter-tutorial">C</div>
          <div className="letter-tutorial selected-letter">M</div>
          <div className="letter-tutorial">D</div>
          <div className="letter-tutorial">K</div>
          <div className="letter-tutorial selected-letter">Y</div>
          <div className="letter-tutorial">G</div>
          <div className="letter-tutorial">E</div>
        </div>
        <p style={{ ...styles }}>Congratulations you have found a word!</p>
        <button>Submit it!</button>
        <p style={{ ...styles }}>Timber checks if the submitted word is found in the database and adds its length to the score in case of success, otherwise reduces it by the word's length (only in easy mode).</p>
        <p>The goal is to reach the desired score.</p>
        <p>If with just one long word or with multiple short words is up to you.</p>

        <span>The score to reach looks like this: </span>
        <span style={{ color: '#000' }} id={gameDifficulty}>
          {scoreToWin} points
        </span>
        <span> and it is randomly generated so it varies at every refresh.</span>

        <hr />
        <h5>Be careful!</h5>

        <p>Once the word is submitted Timber increases the difficulty by removing the selected letters, whether the words was found or not.</p>
        <p>
          <small>The letters of the word AMY are removed</small>
        </p>
        <div
          style={{
            ...gridExampleStyles,
          }}
        >
          <div className="letter-tutorial"></div>
          <br />
          <div className="letter-tutorial">B</div>
          <div className="letter-tutorial">C</div>
          <div className="letter-tutorial"></div>
          <div className="letter-tutorial">D</div>
          <div className="letter-tutorial">K</div>
          <div className="letter-tutorial"></div>
          <div className="letter-tutorial">G</div>
          <div className="letter-tutorial">E</div>
        </div>
        <p style={{ ...styles }}>...and it doesn't end there...</p>
        <p>
          The selected letter DO NOT need to be adjacent to each other, but if they're not Timber will calculate the path to connect the selected letters and will ALSO REMOVE ALL THE LETTERS contained in the path.
          <br />
        </p>
        <div className="letter-tutorial selected-letter">A</div>
        <br />
        <div className="letter-tutorial selected-letter">B</div>
        <div className="letter-tutorial path-letter">C</div>
        <div className="letter-tutorial path-letter">D</div>
        <div className="letter-tutorial selected-letter">F</div>
        <p style={{ ...styles }}>In this case even the letter C-D will be removed.</p>

        <p>Also you cannot overlap a path eheh... so, connect letters that are reachable</p>
        <div className="letter-tutorial selected-letter">A</div>
        <br />
        <div className="letter-tutorial path-letter">B</div>
        <div className="letter-tutorial">C</div>
        <div style={{ display: 'block' }} className="letter-tutorial path-letter">
          D
        </div>
        <div className="letter-tutorial">E</div>
        <div className="letter-tutorial path-letter">G</div>
        <div className="letter-tutorial selected-letter">F</div>
        <p style={{ ...styles }}>For example if I connect A with F - Timber creates the path A-B-D-G</p>
        <p>If on a second moment I want to connect E with C....I CAN'T because there's no viable path.</p>
        <div
          style={{
            ...gridExampleStyles,
          }}
        >
          <div className="letter-tutorial selected-letter">A</div>
          <br />
          <div className="letter-tutorial">B</div>
          <div className="letter-tutorial">C</div>
          <div className="letter-tutorial">K</div>
          <div className="letter-tutorial path-letter">D</div>
          <div className="letter-tutorial">M</div>
          <div className="letter-tutorial">E</div>
          <div className="letter-tutorial">G</div>
          <div className="letter-tutorial selected-letter">F</div>
        </div>
        <p style={{ ...styles }}>But if I, now, want to connect C with E, now I CAN because there are two possible viable paths (C-M-G-E or C-B-K-E)</p>

        <small>Hence the name Timber: the letters are chopped down like trees lol</small>
        <br />

        <hr />
        <p>If you change your mind on a letter, simply retap it and it will be deselected along with the drawn path (only once per submitted word).</p>
        <p>You can shuffle the grid as many times as you want UNTIL you tap on a letter.</p>
        <p>Have fun!</p>
        <hr />
        <p>
          <small>
            Contacts:{' '}
            <a href="https://linkedin.com/in/thomas-albertini" target="_blank">
              <img src={LinkedinLogo} alt="link to linkedin profile" width={40} />
            </a>
            <a href="https://github.com/thomscoder/timber" target="_blank">
              <img src={GithubLogo} alt="link to linkedin profile" width={20} />
            </a>
          </small>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button id="close" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const styles: React.CSSProperties = {
  marginTop: '10px',
};

const gridExampleStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  alignItems: 'center',
  width: '100px',
};
export default Tutorial;

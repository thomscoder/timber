import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useRecoilState } from 'recoil';

import { gameDifficultyState, scoreToWinState } from '../../atoms/atoms';

function Difficulty() {
  const [gameDifficulty, setGameDifficulty] = useRecoilState(gameDifficultyState);
  const [scoreToWin, setScoreToWin] = useRecoilState(scoreToWinState);

  const handleSelect = (e: any) => {
    setGameDifficulty(e);
    switch (e) {
      case 'medium':
        setScoreToWin(Math.floor(Math.random() * (16 - 13 + 1)) + 13);
        break;
      case 'hard':
        setScoreToWin(Math.floor(Math.random() * (19 - 16 + 1)) + 16);
        break;
      case 'extreme':
        setScoreToWin(20);
        break;
      default:
        setScoreToWin(Math.floor(Math.random() * (12 - 10 + 1)) + 10);
        break;
    }
  };

  return (
    <>
      <div>
        <DropdownButton as={ButtonGroup} id={gameDifficulty} size="sm" variant="secondary" title={`${scoreToWin} points`} onSelect={handleSelect}>
          <Dropdown.Item className="easy" eventKey="easy">
            Easy
          </Dropdown.Item>
          <Dropdown.Item className="medium" eventKey="medium">
            Medium
          </Dropdown.Item>
          <Dropdown.Item className="hard" eventKey="hard">
            Hard
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item className="extreme" eventKey="extreme">
            Extreme
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </>
  );
}

export default Difficulty;

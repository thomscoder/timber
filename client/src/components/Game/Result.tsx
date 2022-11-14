import { useRecoilValue, useSetRecoilState } from 'recoil';
import { scoreToWinState } from '../../atoms/atoms';
import { ResultProps } from '../../utils/types';

function Result({ score, playAgain }: ResultProps) {
  const scoreToWin = useRecoilValue(scoreToWinState);

  return (
    <>
      {score >= scoreToWin ? (
        <div id="win">
          <h2>You win!</h2>
          <p>You scored {score} points</p>
          <button onClick={playAgain}>Play again</button>
        </div>
      ) : (
        <div id="loss">
          <h2>You lost!</h2>
          <p>
            You scored <b>{score}</b> points
          </p>
          <button onClick={playAgain}>Play again</button>
        </div>
      )}
    </>
  );
}

export default Result;

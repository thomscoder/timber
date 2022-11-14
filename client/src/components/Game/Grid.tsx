import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { activateCell, submitWordAction, reset } from '../../actions/gridActions';
import { gameDifficultyState, scoreToWinState } from '../../atoms/atoms';
import TimberGrid from '../../utils/grid';
import { GridProps, TGrid } from '../../utils/types';
import { capitalizeFirstLetter, CELL_SIZE } from '../../utils/utils';

// css
import './Grid.css';
import Result from './Result';

function Grid({ database: trie, alphabet }: GridProps): JSX.Element {
  const [grid, setGrid] = useState<TGrid>([]);
  const [words, setWords] = useState<Map<string, string>>(new Map());
  const [letters, setLetters] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [allowShuffle, setAllowShuffle] = useState<boolean>(true);
  const [finish, setFinish] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // global state
  const scoreToWin = useRecoilValue(scoreToWinState);
  const gameDifficulty = useRecoilValue(gameDifficultyState);

  const toggleCell = (e: MouseEvent, y: number, x: number) => {
    const lettersArr = [...letters, (e.target as HTMLElement).innerText.toLowerCase()];
    const { grid: newGrid, letters: lettersClicked } = activateCell(grid, [y, x], lettersArr);
    setAllowShuffle(false);
    setGrid([...newGrid]);
    setLetters([...lettersClicked]);
  };

  const shuffleGrid = () => {
    const timberGrid = new TimberGrid();
    timberGrid
      .generate(alphabet)
      .then((grid) => setGrid(grid))
      .catch(console.log)
      .finally(() => setLoading(false));
  };

  const playAgain = () => {
    setGrid([]);
    setWords(new Map());
    setLetters([]);
    setScore(0);
    setAllowShuffle(true);
    setFinish(false);
    setLoading(true);
    shuffleGrid();
    reset();
  };

  const quitTheGame = () => {
    setFinish(true);
  };

  const submitWord = (e: FormEvent) => {
    e.preventDefault();

    const word = letters.join('');
    const found = trie.search(capitalizeFirstLetter(word));
    const { grid: newGrid, points, allBadIslands } = submitWordAction(grid);

    if (!found) {
      setWords((words) => words.set(word, 'word-not-found'));
      if (gameDifficulty === 'easy') setScore((p) => p - points);
      if (allBadIslands) {
        setFinish(true);
        return;
      }
    } else {
      setWords((words) => words.set(word, 'word-found'));
      setScore((p) => p + points);

      // Do not find the same word mulitple times
      trie?.deleteString(found);
    }

    setLetters([]);
    setGrid([...newGrid]);
  }; // End of submitWord()

  useEffect(() => {
    const timberGrid = new TimberGrid();
    timberGrid
      .generate(alphabet)
      .then((grid) => setGrid(grid))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="wrapper">
      {!finish ? (
        loading ? (
          <div id="loading">Creating grid...</div>
        ) : (
          <>
            <div className="words-wrapper">
              {[...Array.from(words.keys())].map((word, i) => (
                <span key={i} className={`${words.get(word)}`}>
                  {word}
                </span>
              ))}
            </div>
            <form onSubmit={submitWord}>
              <div className="grid">
                {grid.map((row, rowIndex) => (
                  <div key={rowIndex} className="timber-row">
                    {row.map((cell, cellIndex) => {
                      const letter = cell.letter;
                      const active = cell.active ? 'active' : '';
                      const belongsToPath = cell.belongsToPath ? 'belongsToPath' : '';
                      const oneCellIsland = cell.island.visited && cell.island.oneCellIsland ? 'oneCellIsland' : '';
                      return (
                        <div
                          key={cellIndex}
                          style={{
                            width: `${CELL_SIZE}px`,
                            height: `${CELL_SIZE}px`,
                          }}
                          className={`cell ${active} ${belongsToPath} ${oneCellIsland}`}
                          onClick={(e) => toggleCell(e, rowIndex, cellIndex)}
                        >
                          {letter}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="form-utils">
                <button id="submit" type="submit">
                  Submit
                </button>
                <span className="score">Score: {score}</span>
                {allowShuffle && (
                  <button id="shuffle" type="button" onClick={shuffleGrid}>
                    Shuffle
                  </button>
                )}
                {!allowShuffle && (
                  <button id="finish" className={`${scoreToWin <= score ? 'finish' : ''}`} type="button" onClick={quitTheGame}>
                    Finish
                  </button>
                )}
              </div>
            </form>
          </>
        )
      ) : (
        <>
          <Result score={score} playAgain={playAgain} />
        </>
      )}
    </div>
  );
}

export default Grid;

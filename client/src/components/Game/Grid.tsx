import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { activateCell, clearGrid } from '../../actions/gridActions';
import TimberGrid from '../../utils/grid';
import Timber from '../../utils/trie';
import { TGrid, GridProps } from '../../utils/types';
import { capitalizeFirstLetter, randomWords } from '../../utils/utils';

// css
import './Grid.css';

function Grid({ size: GRID_SIZE }: GridProps): JSX.Element {
  const [grid, setGrid] = useState<TGrid>([]);
  const [wordFound, setWordFound] = useState<string>('');
  const [letters, setLetters] = useState<string[]>([]);
  const [trie] = useState<Timber>(new Timber());
  const [score, setScore] = useState<number>(0);

  const toggleCell = (e: MouseEvent, y: number, x: number) => {
    const newGrid = activateCell(grid, [y, x]);
    setLetters([...letters, (e.target as HTMLElement).innerText.toLowerCase()]);
    setGrid([...newGrid]);
  };

  const submitWord = (e: FormEvent) => {
    e.preventDefault();

    const word = letters.join('');
    const found = trie.search(capitalizeFirstLetter(word));
    const { grid: newGrid, points } = clearGrid(grid);

    if (!found) {
      setWordFound('not found');
      setScore((p) => p - points);
    } else {
      setWordFound(found);
      setScore((p) => p + points);
    }

    setLetters([]);
    setGrid([...newGrid]);
  };

  useEffect(() => {
    const timberGrid = new TimberGrid(GRID_SIZE);

    for (let i = 0; i < randomWords.length; i++) {
      trie.insert(randomWords[i]);
    }
    return setGrid(timberGrid.generate());
  }, []);

  return (
    <form onSubmit={submitWord}>
      <div className={`grid ${wordFound === 'not found' ? 'shake' : ''}`}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => {
              const letter = cell.letter;
              const active = cell.active ? 'active' : '';
              const belongsToPath = cell.belongsToPath ? 'belongsToPath' : '';
              const oneCellIsland = cell.island.visited && cell.island.oneCellIsland ? 'oneCellIsland' : '';
              return (
                <div key={cellIndex} className={`${active} ${belongsToPath} ${oneCellIsland} cell`} onClick={(e) => toggleCell(e, rowIndex, cellIndex)}>
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button type="submit">Submit</button>
      {wordFound && <div className="word-found">{wordFound}</div>}
      <div className="points">{score}</div>
    </form>
  );
}

export default Grid;

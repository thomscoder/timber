import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { activateCell, clearGrid } from '../../actions/gridActions';
import TimberGrid, { TNode } from '../../utils/grid';
import Timber from '../../utils/trie';
import { capitalizeFirstLetter, randomWords } from '../../utils/utils';

// css
import './Grid.css';

type GridProps = {
  size: number;
};

function Grid({ size: GRID_SIZE }: GridProps): JSX.Element {
  const [grid, setGrid] = useState<TNode[][]>([]);
  const [wordFound, setWordFound] = useState<string>('');
  const [letters, setLetters] = useState<string[]>([]);
  const [trie, setTrie] = useState<Timber>(new Timber());
  const [points, setPoints] = useState<number>(0);

  const toggleCell = (e: MouseEvent, y: number, x: number) => {
    const newGrid = activateCell(grid, [y, x]);
    setLetters([...letters, (e.target as HTMLElement).innerText.toLowerCase()]);
    setGrid([...newGrid]);
  };

  const submitWord = (e: FormEvent) => {
    e.preventDefault();

    const word = letters.join('');
    const found = trie.search(capitalizeFirstLetter(word));
    const { grid: newGrid, wordOrder } = clearGrid(grid);

    if (!found) {
      setWordFound('not found');
      setPoints((p) => p - wordOrder);
    } else {
      setWordFound(found);
      setPoints((p) => p + wordOrder);
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
              return (
                <div key={cellIndex} className={`${active} ${belongsToPath} cell`} onClick={(e) => toggleCell(e, rowIndex, cellIndex)}>
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button type="submit">Submit</button>
      {wordFound && <div className="word-found">{wordFound}</div>}
      <div className="points">{points}</div>
    </form>
  );
}

export default Grid;

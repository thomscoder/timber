import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import { activateCell } from '../../actions/gridActions';
import TimberGrid from '../../utils/grid';

// css
import './Grid.css';

type GridProps = {
  size: number;
};

function Grid({ size: GRID_SIZE }: GridProps): JSX.Element {
  const timberGrid = new TimberGrid(GRID_SIZE);
  let letters: string[] = [];

  const [grid, setGrid] = useState<string[][][]>([]);
  const [wordFound, setWordFound] = useState<string>('');

  const toggleCell = (e: MouseEvent, y: number, x: number) => {
    const newGrid = activateCell(grid, [y, x]);
    console.log(newGrid);
    setGrid([...newGrid]);
  };

  const submitWord = (e: FormEvent) => {
    e.preventDefault();

    const word = letters.join('');
    setWordFound(word);
    letters = [];
  };

  useEffect(() => {
    return setGrid(timberGrid.generate());
  }, []);

  useEffect(() => {}, [wordFound]);

  return (
    <form onSubmit={submitWord}>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => {
              const [letter, ...rest] = cell;
              return (
                <div key={cellIndex} className={`${rest!} cell`} onClick={(e) => toggleCell(e, rowIndex, cellIndex)}>
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Grid;

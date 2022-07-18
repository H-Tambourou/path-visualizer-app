import { useState } from 'react';
import Menu from './components/Menu';
import Node from './components/Node';

const START_NODE_COL = 15;
const START_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
const FINISH_NODE_ROW = 10;

type NodeProps = {
  col: number;
  row: number;
  isBegining: boolean;
  isEnd: boolean;
  distance: number;
  isVisited: boolean;
  isWall: boolean;
  previousNode: NodeProps;
}

const getInitialGrid = () => {
  const grid = [];
  for(let row = 0; row < 20; row++){
    const currentRow = [];
    for(let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
}

const getNewGridWithWallToggled = (grid : any, row : number, col : number) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const createNode = (col : number, row : number) => {
  return {
    col,
    row,
    isBegining: col === START_NODE_COL && row === START_NODE_ROW,
    isEnd: col === FINISH_NODE_COL && row === FINISH_NODE_ROW,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };    
}

const Main = () => {
  const [grid, setGrid] = useState<any>(getInitialGrid());
  const [mouseIsPressed, setMouseIsPressed] = useState<boolean>(false);

  const handleMouseDown = (row : number, col : number) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }

  const handleMouseEnter = (row : number, col : number) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  }

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  }

  return(
    <div className="Main">
        <Menu />
        <div className='grid'>
          {grid.map((node : NodeProps, nodeIdx : number) => {
            const { col, row, isEnd, isBegining, isWall} = node;
            return (
              <Node
                key={nodeIdx}
                col={col}
                row={row}
                isBegining={isBegining}
                isEnd={isEnd}
                isWall={isWall}
                onMouseDown={(row : number, col : number) => handleMouseDown(row, col)}
                onMouseEnter={(row : number, col : number) =>
                  handleMouseEnter(row, col)
                }
                onMouseUp={() => handleMouseUp()}
              />
            )
          })}
        </div>
    </div>
  )
};

export default Main;
import { useState } from 'react';
import Menu from './components/Menu';
import Node from './components/Node';
import { dijkstra, getNodesInShortestPathOrder } from './dijkstra';

import { NodeProps } from './types';

const START_NODE_COL = 15;
const START_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
const FINISH_NODE_ROW = 10;

const getInitialGrid = () => {
  const grid = [];
  for(let row = 0; row < 20; row++){
    const currentRow = [];
    for(let col = 0; col < 42; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

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
};

const Main = () => {
  const [grid, setGrid] = useState<any>(getInitialGrid());
  const [mouseIsPressed, setMouseIsPressed] = useState<boolean>(false);
  const time = Date.now(); //without adding this to row id, react doesnt recreate the the elements

  const handleMouseDown = (row : number, col : number) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(!mouseIsPressed);
  };

  const handleMouseEnter = (row : number, col : number) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(!mouseIsPressed);
  };

  const animateDijkstra = (visitedNodesInOrder : any, nodesInShortestPathOrder : NodeProps[]) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`)!.className =
          "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder : NodeProps[]) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`)!.className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const clearPath = () => {
    setGrid(getInitialGrid());
  };

  return(
    <div className="Main">
        <Menu 
          Visualize={visualizeDijkstra}
          Clear={clearPath}
        />
        <div className='graph'>
        <div className='grid'>
          {grid.map((row : NodeProps[], rowId : number) => {
            return (
              <div key={rowId + time}>
                {row.map((node : NodeProps, nodeId : number) => {
                  const { col, row, isEnd, isBegining, isWall } = node;
                  return (
                    <Node
                      key={nodeId}
                      col={col}
                      row={row}
                      isBegining={isBegining}
                      isEnd={isEnd}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row : number, col : number) => handleMouseDown(row, col)}
                      onMouseEnter={(row : number, col : number) => handleMouseEnter(row, col)}
                      onMouseUp={() => handleMouseUp()}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
        </div>
    </div>
  )
};

export default Main;
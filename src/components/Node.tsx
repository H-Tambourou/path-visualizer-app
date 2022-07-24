interface NodeProps {
  col: number;
  row: number;
  isBegining: boolean;
  isEnd: boolean;
  isWall: boolean;
  mouseIsPressed: boolean;
  onMouseDown: (row : number, col : number) => void;
  onMouseEnter: (row : number, col : number) => void;
  onMouseUp: () => void;
};

const Node = ({ col, row, isBegining, isEnd, isWall, mouseIsPressed, onMouseDown, onMouseEnter, onMouseUp }:NodeProps) => {
  const status = isEnd
    ? "node-end"
    : isBegining
    ? "node-beginning"
    : isWall
    ? "node-wall"
    : "";

  return(
    <div
      id={`node-${row}-${col}`}
      className={`node ${status}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp}
    />
  )
}
export default Node;
interface NodeProps {
  key: number;
  col: number;
  row: number;
  isBegining: boolean;
  isEnd: boolean;
  isWall: boolean;
  onMouseDown: (row : number, col : number) => void;
  onMouseEnter: (row : number, col : number) => void;
  onMouseUp: () => void;
};

const Node = ({ key, col, row, isBegining, isEnd, isWall, onMouseDown, onMouseEnter, onMouseUp }:NodeProps) => {
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
      onMouseDown={() => onMouseDown}
      onMouseEnter={() => onMouseEnter}
      onMouseUp={() => onMouseUp}
    />
  )
}
export default Node;
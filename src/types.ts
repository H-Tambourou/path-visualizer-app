export type NodeProps = {
    col: number;
    row: number;
    isBegining: boolean;
    isEnd: boolean;
    distance: number;
    isVisited: boolean;
    isWall: boolean;
    previousNode: NodeProps;
};
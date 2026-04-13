import { type FC, type ReactElement, useState } from "react";

import styles from "./style.module.css";
const Game = () => {
  const [history, setHistory] = useState<string[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const onEveryMove = (square: string[]) => {
    // save the square
    const nextHistory = [...history, square];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (move: number) => {
    setCurrentMove(move);
  };

  const moves = history.map((_, move: number) => {
    let desc;
    if (move > 0) {
      desc = "# Go to move: " + move;
    } else {
      desc = "Go to Game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  const isCurrentX = currentMove % 2 === 0;
  const currentSquare = history[currentMove];
  return (
    <div className={styles.gameWrapper}>
      <div className={styles.gameboard}>
        <Board
          isCurrentX={isCurrentX}
          square={currentSquare}
          onPlay={onEveryMove}
        />
      </div>
      <div className={styles.gameInfo}>
        <ul className={styles.movesWrapper}>{moves}</ul>
      </div>
    </div>
  );
};

type BoardProps = {
  isCurrentX: boolean;
  square: string[];
  onPlay: (arg: string[]) => void;
};
const Board: FC<BoardProps> = (props) => {
  const { isCurrentX, square, onPlay } = props;

  const onCellClick = (whichCell: number) => {
    if (checkWinner() || square[whichCell]) return;

    const next = isCurrentX ? "X" : "O";

    const newState = [...square];
    newState[whichCell] = next;
    onPlay(newState);
  };

  const checkWinner = () => {
    /* 
     0 1 2
     3 4 5
     6 7 8
    */
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        square &&
        square[a] &&
        square[a] === square[b] &&
        square[a] === square[c]
      )
        return square[a];
    }

    return null;
  };

  let status = `Next Palyer is: ${isCurrentX ? "X" : "O"}`;

  const winner = checkWinner();
  if (winner) {
    status = `Winner: ${winner}`;
  }

  return (
    <div className={styles.boardOuter}>
      <span>{status}</span>
      <div className={styles.board}>
        <div className={styles.row}>
          <Cell id={0} key="cell_0" value={square[0]} onClick={onCellClick} />
          <Cell id={1} key="cell_1" value={square[1]} onClick={onCellClick} />
          <Cell id={2} key="cell_2" value={square[2]} onClick={onCellClick} />
        </div>

        <div className={styles.row}>
          <Cell id={3} key="cell_3" value={square[3]} onClick={onCellClick} />
          <Cell id={4} key="cell_4" value={square[4]} onClick={onCellClick} />
          <Cell id={5} key="cell_5" value={square[5]} onClick={onCellClick} />
        </div>

        <div className={styles.row}>
          <Cell id={6} key="cell_6" value={square[6]} onClick={onCellClick} />
          <Cell id={7} key="cell_7" value={square[7]} onClick={onCellClick} />
          <Cell id={8} key="cell_8" value={square[8]} onClick={onCellClick} />
        </div>
      </div>
    </div>
  );
};

type CellProps = {
  id: number;
  value?: string;
  onClick: (arg: number) => void;
};
const Cell: FC<CellProps> = (props): ReactElement => {
  const { id, value, onClick } = props;

  const onClickHandler = (e: any) => {
    e.stopPropagation();
    onClick(id);
  };
  return (
    <button className={styles.cell} onClick={onClickHandler}>
      {value}
    </button>
  );
};

export default Game;

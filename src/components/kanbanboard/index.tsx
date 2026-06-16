import { type FC, useState, useRef } from "react";
import styles from "./style.module.css";

type Card = {
  title: string;
  content?: string;
  id: number;
  onDragStart?: (arg?: any) => void;
  onDeleteTask?: (arg: number) => void;
};
type Columns = {
  title: string;
  id: number;
  cards: Card[];
  onDragEnter?: (arg?: any, arg2?: any) => void;
  onDragStart?: (arg?: any) => void;
  onDrop?: (arg?: any, arg2?: any) => void;
  onDeleteTask?: (arg: number) => void;
};
const columns: Columns[] = [
  {
    title: "TODO",
    id: 1,
    cards: [
      {
        title: "costco",
        id: 22,
        content: "lets shopping at costco",
      },
      {
        title: "dlf",
        id: 23,
        content: "lets shopping at dlf",
      },
    ],
  },
  {
    title: "In Progress",
    id: 2,
    cards: [],
  },
  {
    title: "Completed",
    id: 3,
    cards: [],
  },
];
const KanbanBoard = () => {
  const [columnsData, setColumnsData] = useState(columns);
  const [dragging, setDragging] = useState();
  const inpRef = useRef(null);

  const findCardItemInfo = (id?: number) => {
    let col: number = -1,
      car: number = -1;

    columnsData.forEach((column: Columns, colIdx: number) => {
      column.cards.forEach((card: Card, cardIdx: number) => {
        if (card.id === id) {
          col = colIdx;
          car = cardIdx;
          return;
        }
      });
    });
    return { colIdx: col, cardIdx: car };
  };

  const onDragEnter = (e: any, colId: number) => {
    e.preventDefault();
    if (!dragging) return;

    const newCol: Columns[] = structuredClone(columnsData);
    const { colIdx, cardIdx } = findCardItemInfo(+dragging);
    if (colIdx === colId) return;

    if (colIdx >= 0 && cardIdx >= 0) {
      const card = columnsData[colIdx].cards[cardIdx];
      newCol[colIdx].cards.splice(cardIdx, 1);
      newCol[colId - 1].cards.push(card);
    }
    setColumnsData(newCol);
  };

  const onDragStart = (e: any) => {
    setDragging(e.target.id);
  };

  const onAddTask = () => {
    if (inpRef.current) {
      // @ts-ignore
      const val = inpRef.current.value;
      const newCol: Columns[] = structuredClone(columnsData);
      newCol[0].cards.push({
        title: val,
        id: Date.now(),
      });
      // @ts-ignore
      inpRef.current.value = "";
      setColumnsData(newCol);
    }
  };

  const onDeleteTask = (id: number) => {
    const newCol: Columns[] = structuredClone(columnsData);
    const res = findCardItemInfo(id);
    const { colIdx, cardIdx } = res;

    if (colIdx >= 0 && cardIdx >= 0) {
      newCol[colIdx].cards.splice(cardIdx, 1);
    }
    setColumnsData(newCol);
  };

  return (
    <div className={styles.boardWrapper}>
      <div className={styles.addTask}>
        <input ref={inpRef} name="addTask" />
        <button onClick={onAddTask}>Add a Task</button>
      </div>
      <div className={styles.columnOuterWrapper}>
        {columnsData?.map((column: Columns) => (
          <ColumnComp
            {...column}
            onDragEnter={(e) => {
              onDragEnter(e, column.id);
            }}
            onDrop={onDragEnter}
            onDragStart={onDragStart}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};
// components: Columns, Cards
const ColumnComp: FC<Columns> = (props) => {
  const { title, cards, id, onDragEnter, onDragStart, onDrop, onDeleteTask } =
    props;

  return (
    <div
      className={styles.columnWrapper}
      onDragEnter={onDragEnter}
      onDragOver={onDragEnter}
      onDrop={(e) => {
        onDrop?.(e, id);
      }}
      id={"" + id}
    >
      <span className={styles.columnTitle}>{title}</span>
      <div className={styles.cardWrapper}>
        {cards?.map((card: Card) => (
          <Card
            {...card}
            onDragStart={onDragStart}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

const Card: FC<Card> = (props) => {
  const { title, id, onDragStart, onDeleteTask } = props;

  return (
    <div
      className={styles.card}
      draggable={true}
      onDragStart={onDragStart}
      id={"" + id}
    >
      <span>{title}</span>
      <button
        className={styles.btn}
        onClick={() => {
          onDeleteTask?.(id);
        }}
      >
        <i className={styles.cross}>x</i>
      </button>
    </div>
  );
};

export default KanbanBoard;

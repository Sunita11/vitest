import { useRef, useState, type FC, type ReactElement } from "react";
// create a todo list
type Item = {
  value: string;
  id: number;
};
let id = 0;
const TODOList = () => {
  const [listItem, setListItem] = useState<Item[]>([]);
  const inputRef = useRef(null);

  const onAddList = () => {
    const ele = inputRef.current;
    // @ts-ignore
    const val = ele?.value;
    if (val) {
      const newList = [...listItem];
      newList.push({ value: val, id: id++ });
      setListItem(newList);
      // @ts-ignore
      ele.value = "";
    }
  };

  const onEdit = (item: Item) => {
    const { value, id } = item;
    const newList = [...listItem];
    const idx = newList.findIndex((item) => item.id === id);
    console.log("edit: ", idx, value);
    if (idx > -1) {
      newList[idx].value = value;
      setListItem(newList);
    }
  };

  const onDelete = (id: number) => {
    const newList = [...listItem];
    const idx = newList.findIndex((item) => item.id === id);
    newList.splice(idx, 1);
    setListItem(newList);
  };
  return (
    <section>
      <div>
        <input ref={inputRef} />
        <button onClick={onAddList}>Add to List</button>
      </div>
      <div className="listWrapper">
        <ul>
          {listItem?.map((item) => (
            <li>
              <ListItem
                key={`${item.value}_${item.id}`}
                value={item.value}
                id={item.id}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

type ListItemProp = {
  value: string;
  id: number;
  onDelete: (arg: number) => void;
  onEdit: (arg: Item) => void;
};
const ListItem: FC<ListItemProp> = (props): ReactElement => {
  const { value, id, onDelete, onEdit } = props;
  const [inputVal, setInputVal] = useState<string>(value);
  const [isEdit, setEdit] = useState<boolean>(false);

  const editRef = useRef(null);

  const onDeleteHandler = () => {
    onDelete(id);
  };

  const onEditHandler = () => {
    if (isEdit) {
      // @ts-ignore
      const newVal = editRef.current.value;
      onEdit({ value: newVal, id });
    }
    setEdit(!isEdit);
  };

  const onChangeHandler = (e: any) => {
    const val = e.target.value;
    setInputVal(val);
  };

  return (
    <div>
      {isEdit ? (
        <input ref={editRef} value={inputVal} onChange={onChangeHandler} />
      ) : (
        <span>{value}</span>
      )}
      <button onClick={onEditHandler}>
        {isEdit ? "Done Editing" : "Edit"}
      </button>
      <button onClick={onDeleteHandler}>Delete</button>
    </div>
  );
};

export default TODOList;

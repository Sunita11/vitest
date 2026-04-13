import { type FC, useState, type ReactElement } from "react";

import styles from "./style.module.css";

interface Item {
  id: number;
  text: string;
  packed: boolean;
}
const PackagingList: FC = (): ReactElement => {
  const [data, setData] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<string>("");

  const onAdd = () => {
    if (newItem) {
      const newData = [...data];
      newData.push({
        id: Date.now(),
        text: newItem,
        packed: false,
      });
      setData(newData);
    }
    setNewItem("");
  };

  const onNewItemChange = (e: any) => {
    const val = e.target.value;
    setNewItem(val);
  };

  const onEdit = (id: number, val: string) => {
    const newData = data.map((item: Item) => {
      if (item.id === id) item.text = val;
      return item;
    });
    setData(newData);
  };
  const onDelete = (id: number) => {
    const idx = data.findIndex((item: Item) => item.id === id);
    if (idx > -1) {
      const newData = [...data];
      newData.splice(idx, 1);
      setData(newData);
    }
  };

  const onChange = (id: number) => {
    const newData = data.map((item: Item) => {
      if (item.id === id) item.packed = !item.packed;
      return item;
    });

    setData(newData);
  };

  const markAllUnpacked = () => {
    const newData = data.map((item: Item) => {
      item.packed = false;
      return item;
    });

    setData(newData);
  };

  const packed = data.filter((item: Item) => item.packed === true) ?? [];
  const notPacked = data.filter((item: Item) => item.packed === false) ?? [];
  return (
    <div className={styles.packagingWrapper}>
      <h4>Packing List</h4>
      <label className={styles.label} htmlFor="addItem">
        New Item Name
      </label>

      <div className={styles.inpWrapper}>
        <input
          name="addItem"
          id="addItem"
          value={newItem}
          placeholder="Enter Item"
          onChange={onNewItemChange}
        />

        <button className={styles.btnTop} onClick={onAdd} disabled={!newItem}>
          Add Item
        </button>
      </div>
      <div className={styles.grid}>
        <div className={styles.col}>
          <div>Unpacked Items</div>
          {notPacked.length > 0
            ? notPacked.map((item: Item) => (
                <ItemComp
                  key={`${item.text}_${item.packed}_${item.id}`}
                  {...item}
                  onChange={onChange}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            : "No Item to Show"}
        </div>
        <div className={styles.col}>
          <div>Packed Items</div>
          {packed.length > 0
            ? packed.map((item: Item) => (
                <ItemComp
                  key={`${item.text}_${item.packed}_${item.id}`}
                  {...item}
                  onChange={onChange}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            : "No Item to Show"}
        </div>
      </div>
      <button className={styles.btnBottom} onClick={markAllUnpacked}>
        Mark all as Unpacked
      </button>
    </div>
  );
};

interface ItemCompProp extends Item {
  onChange: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, val: string) => void;
}
const ItemComp: FC<ItemCompProp> = (props): ReactElement => {
  const { text, id, packed, onChange, onEdit, onDelete } = props;
  const [editMode, setEditMode] = useState(false);
  const [inp, setInp] = useState(text);
  const onChangeHandler = () => {
    onChange(id);
  };

  const onEditHandler = () => {
    setEditMode(true);
  };

  const onSaveHandler = () => {
    onEdit(id, inp);
    setEditMode(false);
  };
  const onInpChangeHandler = (e: any) => {
    const val = e.target.value;
    setInp(val);
  };

  const onDeleteHandler = () => {
    onDelete(id);
  };
  return (
    <div className={styles.outerItemWrapper}>
      <div>
        <input
          type="checkbox"
          id={"" + id}
          checked={packed}
          onChange={onChangeHandler}
        />
        {editMode ? (
          <input value={inp} onChange={onInpChangeHandler} />
        ) : (
          <label htmlFor={"" + id}>{text}</label>
        )}
      </div>
      <div>
        {editMode ? (
          <button className={styles.btn} onClick={onSaveHandler}>
            Save
          </button>
        ) : (
          <button className={styles.btn} onClick={onEditHandler}>
            Edit
          </button>
        )}
        <button className={styles.btn} onClick={onDeleteHandler}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default PackagingList;

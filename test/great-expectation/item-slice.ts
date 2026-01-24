import { createSlice } from "@reduxjs/toolkit";
import { v4 as id } from "uuid";

export type Item = {
  id: string;
  name: string;
  packed: boolean;
};

const initialState: Item[] = [];

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    add(items, action: { payload: Pick<Item, "name"> }) {
      const name = action.payload.name;
      const item = { id: `item-${id()}`, name, packed: false };
      items.push(item);
    },
    toggle(items, action: { payload: Pick<Item, "id"> }) {
      const id = action.payload.id;
      const item = items.find((item) => item.id === id);
      if (item) item.packed = !item?.packed;
    },
    update(items, action: { payload: Pick<Item, "id" | "name"> }) {
      const id = action.payload.id;
      const item = items.find((item) => item.id === id);
      if (item) item.name = action.payload.name;
    },

    remove(items, action: { payload: Pick<Item, "id"> }) {
      const id = action.payload.id;
      const itemIdx = items.findIndex((item) => item.id === id);
      if (itemIdx > -1) items.splice(itemIdx, 1);
    },
    markAllAsUpacked(items) {
      items.forEach((it) => {
        it.packed = false;
      });
    },
  },
});

export const { add, toggle, update, remove, markAllAsUpacked } =
  itemsSlice.actions;
export default itemsSlice.reducer;

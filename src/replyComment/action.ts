export const addNewComment = (tree: any, value: string) => {
  tree.items.push({
    id: Date.now(),
    value,
    items: [],
  });
  return tree;
};

export const addNewReplyComment = (tree: any, id: number, value: string) => {
  const queue = [...tree.items];
  let found = false;
  while (queue.length > 0 && !found) {
    let node = queue[0];
    if (node.id === id) {
      node.items = [
        {
          id: Date.now(),
          value,
          items: [],
        },
        ...node.items,
      ];
      found = true;
    }
    if (node?.items?.length > 0) queue.push(...node.items);
    queue.shift();
  }
  return tree;
};

export const editComment = (tree: any, id: number, value: string) => {
  const queue = [...tree.items];
  let found = false;
  while (queue.length > 0 && !found) {
    let node = queue[0];
    if (node.id === id) {
      node.value = value;
      found = true;
    }
    if (node?.items?.length > 0) queue.push(...node.items);
    queue.shift();
  }
  return tree;
};

export const deleteComment = (tree: any, id: number) => {
  for (let i = 0; i < tree.items.length; i++) {
    const currentItem = tree.items[i];
    if (currentItem.id === id) {
      tree.items.splice(i, 1);
    } else {
      deleteComment(currentItem, id);
    }
  }
  return tree;
};

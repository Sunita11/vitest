import { useState } from "react";
import {
  addNewComment,
  addNewReplyComment,
  editComment,
  deleteComment,
} from "./action";
import Comment from "./comment";

/* const comments = {
  id: 1,
  items: [
    {
      id: 1677252427307,
      name: "hello",
      items: [
        {
          id: 1677252434572,
          name: "hello world",
          items: [
            {
              id: 1677252449713,
              name: "hello world  134",
              items: [],
            },
          ],
        },
      ],
    },
    {
      id: 1677252457839,
      name: "reactjs",
      items: [
        {
          id: 1677252468098,
          name: "javascript",
          items: [],
        },
      ],
    },
  ],
}; */
const defaultComments = {
  id: 1,
  items: [],
};
export type OpType = "add" | "edit" | "reply" | "delete";
const ReplyCommentList = () => {
  const [commentsData, setCommentData] = useState(defaultComments);

  const callback = (type: OpType, id: number, value: string) => {
    let newTree = structuredClone(commentsData);
    switch (type) {
      case "add": {
        newTree = addNewComment(newTree, value);
        break;
      }
      case "edit": {
        newTree = editComment(newTree, id, value);
        break;
      }
      case "reply": {
        newTree = addNewReplyComment(newTree, id, value);
        break;
      }
      case "delete": {
        newTree = deleteComment(newTree, id);
        break;
      }
      default:
        break;
    }

    setCommentData(newTree);
  };

  return (
    <div>
      <Comment
        comment={commentsData}
        cb={callback}
        // onAdd={onAdd}
        // onEdit={onEdit}
        // onReply={onReply}
      />
    </div>
  );
};

export default ReplyCommentList;

import { type FC, useState, useRef } from "react";
import { ArrowUp, ArrowDown } from "./../icons";
import { type OpType } from "./../index";

import styles from "./style.module.css";

type CommentType = {
  comment: any;
  cb: (type: OpType, id: number, value: string) => void;
  // onAdd: (arg: string) => void;
  // onEdit: (id: number, value: string) => void;
  // onReply: (id: number, value: string) => void;
};
const Comment: FC<CommentType> = (props) => {
  const { comment, cb } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(comment.value);
  const [replyMode, setReplyMode] = useState<boolean>(false);

  const replyRef = useRef(null);
  const newCommentRef = useRef(null);

  const onNewCommentAdd = () => {
    // @ts-ignore
    const value = newCommentRef.current.value;
    cb?.("add", comment.id, value);
    // @ts-ignore
    newCommentRef.current.value = "";
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  const onChangeHandler = (e: any) => {
    const val = e.target.value;
    setValue(val);
  };

  const onEditSaveHandler = () => {
    // on save
    // onEdit(comment.id, value);
    cb?.("edit", comment.id, value);
    setIsEditMode(false);
  };

  const onReplyComment = () => {
    setReplyMode(true);
  };

  const onCancelReply = () => {
    setReplyMode(false);
  };
  const onSaveReply = () => {
    // on add a new comment
    // @ts-ignore
    const value = replyRef?.current?.value ?? "";
    if (value) {
      // onReply(comment.id, value);
      cb?.("reply", comment.id, value);
      // @ts-ignore
      replyRef.current.value = "";
      setReplyMode(false);
    }
  };

  const onDeleteHandler = () => {
    cb?.("delete", comment.id, value);
  };
  return (
    <div>
      <div
        className={
          comment.id === 1
            ? styles["inputContainer"]
            : styles["commentContainer"]
        }
      >
        {comment.id === 1 ? (
          <>
            <input
              type="text"
              className={styles["inputContainer__input"]}
              autoFocus
              ref={newCommentRef}
              placeholder="type__"
            />
            <Action
              classes="btn"
              onClickHandler={onNewCommentAdd}
              title="Comment"
            />
          </>
        ) : (
          <div>
            <button className={styles.iconBtn} onClick={toggleExpand}>
              {isExpanded ? <ArrowUp /> : <ArrowDown />}
            </button>
            {isEditMode ? (
              <>
                <input type="text" value={value} onChange={onChangeHandler} />
              </>
            ) : (
              <span style={{ wordWrap: "break-word" }}>{comment.value}</span>
            )}
            <div className={styles.btnGroup}>
              {isEditMode ? (
                <>
                  <Action
                    classes="btn"
                    onClickHandler={onEditSaveHandler}
                    title="Save"
                  />
                  <Action
                    classes="btn"
                    onClickHandler={toggleEditMode}
                    title="Cancel"
                  />
                </>
              ) : (
                <>
                  <Action
                    classes="btn"
                    onClickHandler={onReplyComment}
                    title="Reply"
                  />
                  <Action
                    classes="btn"
                    onClickHandler={toggleEditMode}
                    title="Edit"
                  />
                  <Action
                    classes="btn"
                    onClickHandler={onDeleteHandler}
                    title="Delete"
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Add a new comment */}
      {replyMode && (
        <div className={styles.reply}>
          <input type="text" ref={replyRef} />
          <div>
            <Action classes="btn" onClickHandler={onSaveReply} title="Save" />
            <Action
              classes="btn"
              onClickHandler={onCancelReply}
              title="Cancel"
            />
          </div>
        </div>
      )}
      {isExpanded && (
        <div className={styles.commentChildWrapper}>
          {comment?.items?.map((item: any) => (
            <Comment
              key={item.id}
              comment={item}
              cb={cb}
              // onAdd={onAdd}
              // onEdit={onEdit}
              // onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

type ActionType = {
  classes: string;
  title?: string;
  children?: React.ReactNode;
  onClickHandler: (arg?: any, ar2?: any, arg3?: any) => void;
};
const Action: FC<ActionType> = (props) => {
  const { classes, title, onClickHandler } = props;
  return (
    <button className={styles[classes]} onClick={onClickHandler}>
      {title || props.children}
    </button>
  );
};

export default Comment;

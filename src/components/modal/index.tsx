// Build a reusable modal component in React
import {
  type FC,
  type ReactElement,
  useRef,
  useReducer,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

import styles from "./style.module.css";

type ModalProps = {
  show: boolean;
  name: string;
  children: React.ReactNode;
  close: () => void;
};

type ReducerState = {
  modal: string[];
};
const initialState: ReducerState = { modal: [] };

const reducer = (
  state: ReducerState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case "show": {
      const newModal = [...state.modal];
      const val = action.payload;
      newModal.push(val);
      state.modal = newModal;
      return state;
    }
    case "hide": {
      const newModal = [...state.modal];
      const val = action.payload;
      const idx = newModal.indexOf(val);
      if (idx > -1) {
        newModal.slice(idx, 1);
      }
      state.modal = newModal;
      return state;
    }
    default:
      return state;
  }
};

const Modal: FC<ModalProps> = (props): ReactElement => {
  const { children, close, name, show } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const portalRef = useRef(document.getElementById("genericPortal"));
  const bodyRef = useRef(document.getElementsByTagName("body")[0]);

  useEffect(() => {
    if (bodyRef.current) {
      const isClassList = bodyRef.current.classList.contains("hideOverflow");

      if (state.modal.length > 0) {
        !isClassList && bodyRef.current.classList.add("hideOverflow");
      } else {
        isClassList && bodyRef.current.classList.remove("hideOverflow");
      }
    }
  }, [state.modal]);
  useEffect(() => {
    if (show) {
      dispatch({ type: "show", payload: name });
    } else {
      dispatch({ type: "hide", payload: name });
    }
  }, [show]);

  return portalRef.current ? (
    createPortal(
      <div className={`${styles.modalWrapper} ${show ? styles.show : ""}`}>
        <div className={styles.backdrop} onClick={close}></div>
        <div className={styles.content}>{children}</div>
      </div>,
      portalRef.current
    )
  ) : (
    <></>
  );
};

export default Modal;

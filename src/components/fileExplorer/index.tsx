import { type FC, useState } from "react";

import styles from "./style.module.css";

type FileSystemNode = {
  id: string;
  name: string;
  type: string;
};

const getComp = (data: any[]) => {
  const comp = [];
  if (data.length > 0) {
    let i = 0;
    while (i < data.length) {
      const child = data[i++];
      if (child.type === "folder") comp.push(<CompFolder {...child} />);
      if (child.type === "file") comp.push(<CompFile {...child} />);
    }
  }

  return comp;
};
const FileExplorer = ({ data }: { data: FileSystemNode }) => {
  return (
    <div className="file-explorer">
      <div>
        {/* TODO: Implement your file explorer UI here */}
        <p>Implement the file explorer component here</p>
        <div>{<CompFolder {...data} />}</div>
      </div>
    </div>
  );
};

const CompFile: FC<any> = (prop) => {
  const { name } = prop;

  return (
    <div className={styles.wrapper}>
      <i className={styles.icon}>📄</i>
      <div>{name}</div>
    </div>
  );
};

const CompFolder: FC<any> = (prop) => {
  const { name, children } = prop;
  const [expand, setExpand] = useState(false);
  let comp: any[] = [];
  if (children?.length > 0) {
    comp = getComp(children);
  }

  const toggle = () => {
    setExpand(!expand);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <div>
          <i className={styles.icon}>📁</i>
          <span>{name}</span>{" "}
        </div>

        <button className={styles.btn} onClick={toggle}>
          {expand ? "▼" : "▶"}
        </button>
      </div>
      {expand && (
        <ul className={styles.listwrapper}>
          {comp?.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileExplorer;

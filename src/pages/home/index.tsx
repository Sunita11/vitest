import { useState } from "react";
import AnalogClock from "../../components/analogClock";
import PageSpeed from "../../components/pageSpeed";
import useCustomTheme from "../../customHooks/theme";

import TrafficLight from "../../components/trafficLight";
import TODOList from "../../components/todo";
import InView from "../../components/inView";
import FileExplorer from "../../components/fileExplorer";
import Users from "../../components/exampleFetch";
import Modal from "../../components/modal";

import styles from "./style.module.css";

const fileSystemData = {
  id: "root",
  name: "root",
  type: "folder",
  children: [
    {
      id: "1",
      name: "src",
      type: "folder",
      children: [
        {
          id: "2",
          name: "components",
          type: "folder",
          children: [
            { id: "3", name: "Button.jsx", type: "file" },
            { id: "4", name: "Card.jsx", type: "file" },
          ],
        },
        { id: "5", name: "App.jsx", type: "file" },
        { id: "6", name: "index.js", type: "file" },
      ],
    },
    {
      id: "7",
      name: "public",
      type: "folder",
      children: [
        { id: "8", name: "index.html", type: "file" },
        { id: "9", name: "favicon.ico", type: "file" },
      ],
    },
    { id: "10", name: "package.json", type: "file" },
    { id: "11", name: "README.md", type: "file" },
  ],
};
function Home() {
  const { isDark, toggle } = useCustomTheme();
  const [fileData, setFileDate] = useState(fileSystemData);
  const [showDialog, setShowDialog] = useState(false);
  console.log("setFileDate: ", setFileDate);

  const toggleModal = () => {
    setShowDialog(!showDialog);
  };
  console.log("showDialog: ", showDialog);
  return (
    <>
      <div className={styles.componentWrapper}>
        <h4>Reusable Modal</h4>
        <button onClick={toggleModal}>Click for showing Modal</button>
        {showDialog && (
          <Modal name="example" show={showDialog} close={toggleModal}>
            <div>Modal content</div>
          </Modal>
        )}
      </div>

      <div className={styles.componentWrapper}>
        <h4>File Explorer</h4>
        <FileExplorer data={fileData} />
      </div>

      <div className={styles.componentWrapper}>
        <h4>Analog Clock</h4>
        <AnalogClock />
      </div>
      <div className={styles.componentWrapper}>
        <h4>PageSpeed</h4>
        <PageSpeed />
      </div>
      <div className={styles.componentWrapper}>
        <h4>Theme</h4>
        <button onClick={toggle}>
          Change Theme: {isDark ? "dark" : "light"}
        </button>
      </div>
      <div className={styles.componentWrapper}>
        <h4>Traffic Light</h4>
        <TrafficLight />
      </div>
      <div className={styles.componentWrapper}>
        <h4>ToDO List + InView </h4>
        <InView
          elementId="todolist"
          inViewCallback={(arg: any) => {
            console.log("todolist is visible", arg);
          }}
        >
          <TODOList />
        </InView>
      </div>
      <div className={styles.componentWrapper}>
        <h4>Implement a custom hook to fetch API data with caching </h4>
        <Users />
      </div>
    </>
  );
}

export default Home;

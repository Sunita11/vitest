import { useState } from "react";
import AnalogClock from "./analogClock";
import PageSpeed from "./pageSpeed";
import useCustomTheme from "./customHooks/theme";

import TrafficLight from "./trafficLight";
import TODOList from "./todo";
import ReplyCommentList from "./replyComment";
import InView from "./inView";
import FileExplorer from "./fileExplorer";
import KanbanBoard from "./kanbanboard";
import Users from "./examples/exampleFetch";

import "./App.css";

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
function App() {
  const { isDark, toggle } = useCustomTheme();
  const [fileData, setFileDate] = useState(fileSystemData);
  console.log("setFileDate: ", setFileDate);
  return (
    <>
      <main>
        <div className="component-wrapper">
          <h4>Kanban Board</h4>
          <KanbanBoard />
        </div>
        <div className="component-wrapper">
          <h4>File Explorer</h4>
          <FileExplorer data={fileData} />
        </div>
        <div className="component-wrapper">
          <h4>Social media reply section</h4>
          <ReplyCommentList />
        </div>
        <div className="component-wrapper">
          <h4>Analog Clock</h4>
          <AnalogClock />
        </div>
        <div className="component-wrapper">
          <h4>PageSpeed</h4>
          <PageSpeed />
        </div>
        <div className="component-wrapper">
          <h4>Theme</h4>
          <button onClick={toggle}>
            Change Theme: {isDark ? "dark" : "light"}
          </button>
        </div>
        <div className="component-wrapper">
          <h4>Traffic Light</h4>
          <TrafficLight />
        </div>
        <div className="component-wrapper">
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
        <div className="component-wrapper">
          <h4>Implement a custom hook to fetch API data with caching </h4>
          <Users />
        </div>
      </main>
    </>
  );
}

export default App;

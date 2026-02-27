import AnalogClock from "./analogClock";
import PageSpeed from "./pageSpeed";
import useCustomTheme from "./customHooks/theme";
import "./App.css";
import TrafficLight from "./customHooks/trafficLight";
import TODOList from "./todo";
import ReplyCommentList from "./replyComment";

function App() {
  const { isDark, toggle } = useCustomTheme();
  return (
    <>
      <main>
        <div>
          <h4>Social media reply section</h4>
          <ReplyCommentList />
        </div>
        <AnalogClock />
        <PageSpeed />
        <button onClick={toggle}>
          Change Theme: {isDark ? "dark" : "light"}
        </button>
        <div>
          <TrafficLight />
        </div>
        <div>
          <h4>ToDO List</h4>
          <TODOList />
        </div>
      </main>
    </>
  );
}

export default App;

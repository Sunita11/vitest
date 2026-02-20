import AnalogClock from "./analogClock";
import PageSpeed from "./pageSpeed";
import useCustomTheme from "./customHooks/theme";
import "./App.css";
import TrafficLight from "./customHooks/trafficLight";

function App() {
  const { isDark, toggle } = useCustomTheme();
  return (
    <>
      <main>
        <AnalogClock />
        <PageSpeed />
        <button onClick={toggle}>
          Change Theme: {isDark ? "dark" : "light"}
        </button>
        <div>
          <TrafficLight />
        </div>
      </main>
    </>
  );
}

export default App;

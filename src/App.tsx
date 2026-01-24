import { useState } from "react";
import AnalogClock from "./analogClock";
import PageSpeed from "./pageSpeed";
import "./App.css";

function App() {
  return (
    <>
      <main>
        <AnalogClock />
        <PageSpeed />
      </main>
    </>
  );
}

export default App;

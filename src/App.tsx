import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home";
import CheckAccessibilty from "./components/accessibilty";
import KanbanBoard from "./pages/kanban";
import Reply from "./pages/replyComment";
import Header from "./components/header";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="accessibility" element={<CheckAccessibilty />} />
          <Route path="kanban" element={<KanbanBoard />} />
          <Route path="reply" element={<Reply />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

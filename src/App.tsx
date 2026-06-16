import { BrowserRouter, Route, Routes } from "react-router";
import ErrorBoundary from "./components/errorboundary";
import Home from "./pages/home";
import CheckAccessibilty from "./components/accessibilty";
import KanbanBoard from "./pages/kanban";
import Reply from "./pages/replyComment";
import PackagingList from "./pages/packaging-list";
import RatingCard from "./pages/ratingCard";
import Tic from "./pages/tictactoe";
import VirtualList from "./pages/virtualisation";
import Dice from "./pages/dice";
import TODO from "./pages/todo";
import FileExp from "./pages/fileExplorer";

import { ThemeContextProvider } from "./context/theme";

import "./App.css";
import Layout from "./layout";

function App() {
  return (
    <ErrorBoundary fallback={<div>Error Fallback</div>}>
      <ThemeContextProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="dice" element={<Dice />} />
              <Route path="kanban" element={<KanbanBoard />} />
              <Route path="to-do-list" element={<TODO />} />
              <Route path="file-explorer" element={<FileExp />} />
              <Route path="reply" element={<Reply />} />
              <Route path="packaging-list" element={<PackagingList />} />
              <Route path="rating-card" element={<RatingCard />} />
              <Route path="tic-tac-toe" element={<Tic />} />
              <Route path="virtualisation" element={<VirtualList />} />
              <Route path="accessibility" element={<CheckAccessibilty />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeContextProvider>
    </ErrorBoundary>
  );
}

export default App;

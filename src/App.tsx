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
              <Route path="accessibility" element={<CheckAccessibilty />} />
              <Route path="kanban" element={<KanbanBoard />} />
              <Route path="reply" element={<Reply />} />
              <Route path="packaging-list" element={<PackagingList />} />
              <Route path="rating-card" element={<RatingCard />} />
              <Route path="tic-tac-toe" element={<Tic />} />
              <Route path="virtualisation" element={<VirtualList />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeContextProvider>
    </ErrorBoundary>
  );
}

export default App;

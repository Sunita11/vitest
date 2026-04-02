import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home";
import CheckAccessibilty from "./components/accessibilty";
import KanbanBoard from "./pages/kanban";
import Reply from "./pages/replyComment";
import Header from "./components/header";
import PackagingList from "./pages/packaging-list";
import RatingCard from "./pages/ratingCard";

import { ThemeContextProvider } from "./context/theme";

import "./App.css";

function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="accessibility" element={<CheckAccessibilty />} />
          <Route path="kanban" element={<KanbanBoard />} />
          <Route path="reply" element={<Reply />} />
          <Route path="packaging-list" element={<PackagingList />} />
          <Route path="rating-card" element={<RatingCard />} />
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;

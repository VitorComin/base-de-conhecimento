import { Space } from "antd";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import KnowledgeFoldersList from "./components/KnowledgeFoldersList";
import KnowledgesList from "./components/KnowledgesList";
import Knowledge from "./components/Knowledge";
import LayoutHeader from "./components/LayoutHeader";

function App() {
  return (
    <Router>
      <LayoutHeader />
      <Space
        style={{
          width: "100vw",
          height: "90vh",
          overflowX: "auto",
          justifyContent: "center",
          flexDirection: "column",
          alignContent: "start",
          display: "grid",
        }}
      >
        <Routes>
          <Route path="/" element={<KnowledgeFoldersList />} />
          <Route path="/folder/show/:id" element={<KnowledgesList />} />
          <Route path="/knowledge/show/:id" element={<Knowledge />} />
        </Routes>
      </Space>
    </Router>
  );
}

export default App;

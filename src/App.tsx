import { Input, Layout, Space, Typography } from "antd";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useKnowledge } from "./contexts/GeneralContext";
import KnowledgeFoldersList from "./components/KnowledgeFoldersList";
import KnowledgesList from "./components/KnowledgesList";
import Knowledge from "./components/Knowledge";

const { Header } = Layout;

function App() {
  const { handleSearch } = useKnowledge();

  return (
    <Router>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "10vh",
        }}
      >
        <Typography.Title
          style={{
            color: "white",
            margin: 0,
          }}
        >
          Knowledges
        </Typography.Title>
        <Input style={{ width: 200, height: 40 }} onChange={handleSearch} />
      </Header>
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

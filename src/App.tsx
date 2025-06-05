import { Input, Layout, Space, Typography } from "antd";
import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { KnowledgeProvider, useKnowledge } from "./contexts/GeneralContext";
import KnowledgeFoldersList from "./components/KnowledgeFoldersList";
import KnowledgesList from "./components/KnowledgesList";

const { Header } = Layout;

function App() {
  const { setFolders, setKnowledges } = useKnowledge();

  function search(value: any) {
    setFolders((folders: any) =>
      folders.filter((folder: any) => folder.title.includes(value.target.value))
    );

    setKnowledges((knowledges: any) =>
      knowledges.filter((knowledge: any) =>
        knowledge.title.includes(value.target.value)
      )
    );
  }
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
        <Input style={{ width: 200, height: 40 }} onChange={search} />
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
          <Route path="/folder" element={<KnowledgesList />} />
          {/*<Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Space>
    </Router>
  );
}

export default App;

import { Card, Input, Layout, Space, Typography } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import "./App.css";
import { folderKnowledges, knowledgeFolders } from "./utils/config";
import { useState } from "react";

const { Header } = Layout;

function App() {
  const [folders, setFolders] = useState(knowledgeFolders);
  const [knowledges, setKnowledges] = useState(folderKnowledges);
  const [view, setView] = useState("folder");

  function search(value: any) {
    setFolders(
      knowledgeFolders.filter((folder) =>
        folder.title.includes(value.target.value)
      )
    );

    setKnowledges(
      folderKnowledges.filter((knowledge) =>
        knowledge.title.includes(value.target.value)
      )
    );
  }

  return (
    <>
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
        {view === "folder" ? (
          folders.map((folder, index) => (
            <Card
              title={folder.title}
              variant="borderless"
              actions={[
                <EditOutlined key="edit" />,
                <EllipsisOutlined
                  key="ellipsis"
                  onClick={() => setView("knowledge")}
                />,
              ]}
              style={{ width: "80vw", marginTop: index === 0 ? 50 : 10 }}
            >
              <Typography.Paragraph ellipsis={{ rows: 1 }}>
                {folder.description}
              </Typography.Paragraph>
            </Card>
          ))
        ) : view === "knowledge" ? (
          knowledges.map((knowledge, index) => (
            <Card
              title={knowledge.title + " + " + knowledge.author}
              variant="borderless"
              actions={[
                <EditOutlined key="edit" />,
                <EllipsisOutlined
                  key="ellipsis"
                  onClick={() => setView("show")}
                />,
              ]}
              style={{ width: "80vw", marginTop: index === 0 ? 50 : 10 }}
            >
              <Typography.Paragraph ellipsis={{ rows: 1 }}>
                {knowledge.description}
              </Typography.Paragraph>
            </Card>
          ))
        ) : (
          <Card
            title={"Conhecimento - Gabriel"}
            variant="borderless"
            style={{ width: "80vw", marginTop: 50 }}
          >
            <Typography.Paragraph>
              {
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur animi ab expedita! Eaque, culpa eos earum vero fuga recusandae nesciunt tenetur dolor illum quod praesentium commodi, facere mollitia soluta nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur animi ab expedita! Eaque, culpa eos earum vero fuga recusandae nesciunt tenetur dolor illum quod praesentium commodi, facere mollitia soluta nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur animi ab expedita! Eaque, culpa eos earum vero fuga recusandae nesciunt tenetur dolor illum quod praesentium commodi, facere mollitia soluta nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur animi ab expedita! Eaque, culpa eos earum vero fuga recusandae nesciunt tenetur dolor illum quod praesentium commodi, facere mollitia soluta nobis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur animi ab expedita! Eaque, culpa eos earum vero fuga recusandae nesciunt tenetur dolor illum quod praesentium commodi, facere mollitia soluta nobis!"
              }
            </Typography.Paragraph>
          </Card>
        )}
      </Space>
    </>
  );
}

export default App;

import { Input, Layout, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useKnowledge } from "../../contexts/GeneralContext";

const { Header } = Layout;

const LayoutHeader: React.FC = () => {
  const navigate = useNavigate();
  const { handleSearch } = useKnowledge();

  return (
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
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        Knowledges
      </Typography.Title>
      <Input style={{ width: 200, height: 40 }} onChange={handleSearch} />
    </Header>
  );
};

export default LayoutHeader;

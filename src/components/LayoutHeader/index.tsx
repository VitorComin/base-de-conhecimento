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
        className="header-title"
        style={{
          color: "white",
          margin: 0,
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        Conhecimentos
      </Typography.Title>
      <Input
        className="header-input"
        style={{ width: 200, height: 40 }}
        onChange={handleSearch}
      />
    </Header>
  );
};

export default LayoutHeader;

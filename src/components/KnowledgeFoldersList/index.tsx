import { Card, Typography } from "antd";
import { useKnowledge } from "../../contexts/GeneralContext";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const KnowledgeFoldersList: React.FC = () => {
  const { folders } = useKnowledge();
  const navigate = useNavigate();

  return folders?.map((folder: any, index: any) => (
    <Card
      title={folder.title}
      variant="borderless"
      actions={[
        <EditOutlined key="edit" />,
        <EllipsisOutlined
          key="ellipsis"
          onClick={() => navigate("/folder/show")}
        />,
      ]}
      style={{ width: "80vw", marginTop: index === 0 ? 50 : 10 }}
    >
      <Typography.Paragraph ellipsis={{ rows: 1 }}>
        {folder.description}
      </Typography.Paragraph>
    </Card>
  ));
};

export default KnowledgeFoldersList;

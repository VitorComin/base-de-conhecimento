import { Card, Spin, Typography } from "antd";
import { useKnowledge } from "../../contexts/GeneralContext";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const KnowledgeFoldersList: React.FC = () => {
  const { folders, setFolders, originalFolders } = useKnowledge();
  const navigate = useNavigate();

  useEffect(() => {
    setFolders(originalFolders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalFolders]);

  return folders ? (
    folders?.map((folder: any, index: any) => (
      <Card
        title={folder.title}
        variant="borderless"
        actions={[
          <EditOutlined key="edit" />,
          <EllipsisOutlined
            key="ellipsis"
            onClick={() => navigate(`/folder/show/${folder.id}`)}
          />,
        ]}
        style={{ width: "80vw", marginTop: index === 0 ? 50 : 10 }}
      >
        <Typography.Paragraph ellipsis={{ rows: 1 }}>
          {folder.description}
        </Typography.Paragraph>
      </Card>
    ))
  ) : (
    <Spin style={{ padding: 50, margin: 50 }} />
  );
};

export default KnowledgeFoldersList;

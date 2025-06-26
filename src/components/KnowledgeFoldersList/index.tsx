import { Button, Card, message, Spin, Tag, Typography } from "antd";
import { useKnowledge } from "../../contexts/GeneralContext";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteFolder } from "../../services/KnowledgeFolders";
import { deleteKnowledge } from "../../services/Knowledges";

const KnowledgeFoldersList: React.FC = () => {
  const {
    folders,
    setFolders,
    originalFolders,
    setOriginalFolders,
    originalKnowledges,
    setOriginalKnowledges,
  } = useKnowledge();
  const [messageApi] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    setFolders(originalFolders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalFolders]);

  const handleDelete = async (id: number) => {
    const ok = await deleteFolder(id);
    if (ok) {
      const folderKnowledges = originalKnowledges.filter(
        (item: any) => item.folderId == id
      );

      if (folderKnowledges) {
        folderKnowledges.forEach(async (item: any) => {
          const ok = await deleteKnowledge(item.id);
          if (ok) {
            setOriginalKnowledges((prev: any[]) =>
              prev.filter((k) => k.id != item.id)
            );
          }
        });
      }
      setOriginalFolders((prev: any[]) => prev.filter((f) => f.id !== id));
      messageApi.open({
        type: "success",
        content: "Pasta (com seus conhecimentos) deletada!",
      });
    } else {
      alert("Erro ao deletar pasta.");
    }
  };

  return folders ? (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        size="large"
        onClick={() => navigate(`/folder/create`)}
        style={{ width: "80vw", marginTop: 50 }}
      >
        Criar Pasta
      </Button>{" "}
      {folders?.map((folder: any, index: any) => (
        <Card
          title={
            <Typography.Text
              onClick={() => navigate(`/folder/show/${folder.id}`)}
              style={{ cursor: "pointer" }}
            >
              {folder.title}
            </Typography.Text>
          }
          variant="borderless"
          actions={[
            <EditOutlined
              key="edit"
              onClick={() => navigate(`/folder/create/${folder.id}`)}
            />,
            <DeleteOutlined
              key="edit"
              onClick={() => handleDelete(folder.id)}
            />,
          ]}
          style={{
            width: "80vw",
            marginTop: index === 0 ? 50 : 10,
            marginBottom: index === folders?.length - 1 ? 30 : 0,
          }}
        >
          {Array.isArray(folder?.tags) &&
            folder.tags.map((tag: string) => (
              <Tag color="volcano" key={tag} style={{ marginBottom: 15 }}>
                {tag}
              </Tag>
            ))}
          <Typography.Paragraph ellipsis={{ rows: 1 }}>
            {folder.description}
          </Typography.Paragraph>
        </Card>
      ))}
    </>
  ) : (
    <Spin style={{ padding: 50, margin: 50 }} />
  );
};

export default KnowledgeFoldersList;

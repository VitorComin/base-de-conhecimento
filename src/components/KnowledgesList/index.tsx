import { Button, Card, message, Typography } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useKnowledge } from "../../contexts/GeneralContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { deleteKnowledge } from "../../services/Knowledges";

const KnowledgesList: React.FC = () => {
  const navigate = useNavigate();
  const [messageApi] = message.useMessage();
  const { id } = useParams<{ id: any }>();
  const {
    knowledges,
    setKnowledges,
    originalKnowledges,
    originalFolders,
    setOriginalKnowledges,
  } = useKnowledge();

  useEffect(() => {
    if (!id || !originalKnowledges) return;

    setKnowledges(originalKnowledges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, originalKnowledges]);

  const handleDelete = async (knowledgeId: number) => {
    const ok = await deleteKnowledge(knowledgeId);
    if (ok) {
      setOriginalKnowledges((prev: any[]) =>
        prev.filter((k) => k.id !== knowledgeId)
      );
      messageApi.open({
        type: "success",
        content: "Conhecimento deletado!",
      });
    } else {
      alert("Erro ao deletar conhecimento.");
    }
  };

  return (
    <>
      <Typography.Title>
        {originalFolders.find((item: any) => item.id == id).title}
      </Typography.Title>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        size="large"
        onClick={() => navigate(`/knowledge/create`)}
        style={{ width: "80vw", marginTop: 30 }}
      >
        Criar Conhecimento
      </Button>
      {knowledges
        ?.filter((knowledge: any) => knowledge.folderId == id)
        ?.map((knowledge: any, index: any) => (
          <Card
            title={
              <Typography.Text
                onClick={() => navigate(`/knowledge/show/${knowledge.id}`)}
                style={{ cursor: "pointer" }}
              >
                {knowledge.author + " - " + knowledge.title}
              </Typography.Text>
            }
            variant="borderless"
            key={index}
            actions={[
              <EditOutlined
                key="edit"
                onClick={() => navigate(`/knowledge/create/${knowledge.id}`)}
              />,
              <DeleteOutlined
                key="delete"
                onClick={() => handleDelete(knowledge.id)}
              />,
            ]}
            style={{
              width: "80vw",
              marginTop: index === 0 ? 50 : 10,
              marginBottom: index === knowledges?.length - 1 ? 30 : 0,
            }}
          >
            <Typography.Paragraph ellipsis={{ rows: 1 }}>
              {knowledge.description}
            </Typography.Paragraph>
          </Card>
        ))}
    </>
  );
};

export default KnowledgesList;

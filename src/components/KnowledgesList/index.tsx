import { Card, Typography } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useKnowledge } from "../../contexts/GeneralContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const KnowledgesList: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>();
  const { knowledges, setKnowledges, originalKnowledges } = useKnowledge();

  useEffect(() => {
    if (!id || !originalKnowledges) return;

    setKnowledges(originalKnowledges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, originalKnowledges]);

  return knowledges
    ?.filter((knowledge: any) => knowledge.folderId == id)
    ?.map((knowledge: any, index: any) => (
      <Card
        title={knowledge.author + " - " + knowledge.title}
        variant="borderless"
        key={index}
        actions={[
          <EditOutlined key="edit" />,
          <EllipsisOutlined
            key="ellipsis"
            onClick={() => navigate(`/knowledge/show/${knowledge.id}`)}
          />,
        ]}
        style={{ width: "80vw", marginTop: index === 0 ? 50 : 10 }}
      >
        <Typography.Paragraph ellipsis={{ rows: 1 }}>
          {knowledge.description}
        </Typography.Paragraph>
      </Card>
    ));
};

export default KnowledgesList;

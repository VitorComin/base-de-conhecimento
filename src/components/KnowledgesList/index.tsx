import { Card, Typography } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useKnowledge } from "../../contexts/GeneralContext";
import { useNavigate } from "react-router-dom";

const KnowledgesList: React.FC = () => {
  const navigate = useNavigate();
  const { knowledges } = useKnowledge();

  return knowledges?.map((knowledge: any, index: any) => (
    <Card
      title={knowledge.title + " + " + knowledge.author}
      variant="borderless"
      actions={[
        <EditOutlined key="edit" />,
        <EllipsisOutlined
          key="ellipsis"
          onClick={() => navigate("/knowledge/show")}
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

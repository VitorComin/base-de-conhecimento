import { Card, Typography } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useKnowledge } from "../../contexts/GeneralContext";

const KnowledgesList: React.FC = () => {
  const [view, setView] = useState("list");
  const { knowledges } = useKnowledge();

  return view === "list" ? (
    knowledges.map((knowledge: any, index: any) => (
      <Card
        title={knowledge.title + " + " + knowledge.author}
        variant="borderless"
        actions={[
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" onClick={() => setView("show")} />,
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
  );
};

export default KnowledgesList;

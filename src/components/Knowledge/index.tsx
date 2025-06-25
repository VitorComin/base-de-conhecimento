import { Card, Spin, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useKnowledge } from "../../contexts/GeneralContext";
import { useEffect, useState } from "react";

const Knowledge: React.FC = () => {
  const { id } = useParams<{ id: any }>();
  const { knowledges } = useKnowledge();
  const [knowledge, setKnowledge] = useState<any>(
    knowledges?.find((item: any) => item?.id == id)
  );

  useEffect(() => {
    if (id) {
      setKnowledge(knowledges?.find((item: any) => item?.id == id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, knowledges]);

  return knowledge ? (
    <>
      <Card
        title={knowledge?.title}
        variant="borderless"
        style={{ width: "80vw", marginTop: 50 }}
      >
        <Typography.Paragraph>{knowledge?.description}</Typography.Paragraph>
      </Card>
    </>
  ) : (
    <Spin style={{ margin: 50, padding: 50 }} />
  );
};

export default Knowledge;

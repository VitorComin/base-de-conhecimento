import { Card, Typography } from "antd";

const Knowledge: React.FC = () => {
  return (
    <>
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
    </>
  );
};

export default Knowledge;

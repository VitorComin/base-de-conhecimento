import { CheckOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { createFolder } from "../../services/KnowledgeFolders";
import { useNavigate } from "react-router-dom";

const FolderCreate: React.FC = () => {
  const [messageApi] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values: { title: string; description: string }) => {
    try {
      await createFolder(values);
      messageApi.open({
        type: "success",
        content: "Pasta criada!",
      });
      navigate("/");
    } catch (error) {
      messageApi.open({
        type: "error",
        content: `Erro na criação: ${error}`,
      });
    }
  };

  return (
    <Form
      layout="vertical"
      style={{ marginTop: "20vh", width: "50vw" }}
      onFinish={onFinish}
    >
      <Form.Item
        name="title"
        label="Título"
        required
        style={{ width: "100%" }}
        rules={[{ required: true, message: "O título é obrigatório." }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descrição"
        required
        style={{ width: "100%" }}
        rules={[{ required: true, message: "A descrição é obrigatória." }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          icon={<CheckOutlined />}
          style={{ width: "100%" }}
          type="primary"
          htmlType="submit"
        >
          Criar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FolderCreate;

import { CheckOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { createKnowledge } from "../../services/Knowledges";
import { useKnowledge } from "../../contexts/GeneralContext";

const { TextArea } = Input;

const KnowledgeCreate: React.FC = () => {
  const { originalFolders } = useKnowledge();
  const [messageApi] = message.useMessage();
  const navigate = useNavigate();

  const onFinish = async (values: {
    title: string;
    folderId: number;
    author: string;
    description: string;
  }) => {
    try {
      await createKnowledge(values);
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
      style={{ marginTop: "10vh", width: "50vw" }}
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
        name="folderId"
        label="Pasta"
        required
        style={{ width: "100%" }}
        rules={[{ required: true, message: "A pasta é obrigatória." }]}
      >
        <Select
          options={originalFolders?.map((folder: any) => ({
            label: folder.title,
            value: folder.id,
          }))}
        />
      </Form.Item>
      <Form.Item
        name="author"
        label="Autor"
        required
        style={{ width: "100%" }}
        rules={[{ required: true, message: "O autor é obrigatório." }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Texto"
        required
        style={{ width: "100%" }}
        rules={[{ required: true, message: "O texto é obrigatória." }]}
      >
        <TextArea rows={6} />
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

export default KnowledgeCreate;

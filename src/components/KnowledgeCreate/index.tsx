import { CheckOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { createKnowledge, updateKnowledge } from "../../services/Knowledges";
import { useKnowledge } from "../../contexts/GeneralContext";
import { useEffect } from "react";

const { TextArea } = Input;

const KnowledgeCreate: React.FC = () => {
  const { originalFolders, originalKnowledges } = useKnowledge();
  const [messageApi] = message.useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();

  const onFinish = async (values: {
    title: string;
    folderId: number;
    author: string;
    description: string;
  }) => {
    if (id) {
      const updated = await updateKnowledge(Number(id), values);
      if (updated) {
        messageApi.success("Conhecimento atualizado com sucesso!");
      } else {
        messageApi.error("Conhecimento não encontrado.");
      }
      navigate("/");
    }
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

  useEffect(() => {
    if (id) {
      const knowledge = originalKnowledges.find(
        (knowledge: any) => knowledge.id == id
      );

      form.setFieldsValue({
        title: knowledge.title,
        description: knowledge.description,
        folderId: knowledge.folderId,
        author: knowledge.author,
      });
    }
  });

  return (
    <Form
      form={form}
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
          {id ? "Editar" : "Criar"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default KnowledgeCreate;

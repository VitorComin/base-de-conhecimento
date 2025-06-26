import { CheckOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { createFolder, updateFolder } from "../../services/KnowledgeFolders";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useKnowledge } from "../../contexts/GeneralContext";

const FolderCreate: React.FC = () => {
  const { originalFolders, setOriginalFolders } = useKnowledge();
  const [messageApi] = message.useMessage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const folder = originalFolders?.find((folder: any) => folder.id == id);
      if (folder) {
        form.setFieldsValue({
          title: folder.title,
          description: folder.description,
        });
      }
    }
  });

  const onFinish = async (values: { title: string; description: string }) => {
    if (id) {
      const updated = await updateFolder(Number(id), values);
      setOriginalFolders((folders: any[]) =>
        folders.map((folder) => (folder.id === updated?.id ? updated : folder))
      );
      if (updated) {
        messageApi.success("Pasta atualizada!");
      } else {
        messageApi.error("Pasta não encontrada.");
      }
      navigate("/");
    } else {
      try {
        const folderCreated = await createFolder(values);
        setOriginalFolders((folders: any) => [...folders, folderCreated]);
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
    }
  };

  return (
    <Form
      form={form}
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
          {id ? "Editar" : "Criar"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FolderCreate;

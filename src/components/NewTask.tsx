import { Button, Form, Input } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { taskStore } from "../store";

export const NewTask: React.FC = (): React.JSX.Element => {
  const [form] = Form.useForm();
  const addTask = taskStore((state) => state.addTask);
  const onFinish = ({ title }: { title: string }) => {
    const id = crypto.randomUUID();
    addTask({ id, title });
    form.setFieldValue("title", undefined);
  };
  return (
    <Form form={form} layout="inline" onFinish={onFinish}>
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Please input your task!" }]}
      >
        <Input placeholder="Task description" />
      </Form.Item>

      <Button type="primary" icon={<SaveOutlined />} htmlType="submit" />
    </Form>
  );
};

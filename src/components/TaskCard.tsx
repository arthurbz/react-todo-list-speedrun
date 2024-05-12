import { Button, Card, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Task } from "../types";

interface Props {
  task: Task;
  onDelete: () => void;
}

export const TaskCard: React.FC<Props> = ({
  task,
  onDelete,
}): React.JSX.Element => {
  return (
    <Card>
      <Typography.Title level={3} style={{ margin: 0 }}>
        {task.title}
      </Typography.Title>

      <Button
        type="primary"
        icon={<DeleteOutlined />}
        style={{ backgroundColor: "red" }}
        onClick={onDelete}
      />
    </Card>
  );
};

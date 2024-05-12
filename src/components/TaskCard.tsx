import { Button, Card, Col, Row, Tag, Typography } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Task } from "../types";

interface Props {
  task: Task;
  onDelete: () => void;
  stepForward: () => void;
  stepBackward: () => void;
}

const tagColorMapped = {
  backlog: undefined,
  doing: "blue",
  done: "green",
};

export const TaskCard: React.FC<Props> = ({
  task,
  onDelete,
  stepForward,
  stepBackward,
}): React.JSX.Element => {
  return (
    <Card style={{ maxWidth: 320 }} styles={{ body: { maxWidth: 320 } }}>
      <Row>
        <Col span={20}>
          <Typography.Title level={3} style={{ margin: 0 }}>
            {task.title}
          </Typography.Title>
        </Col>

        <Button
          type="text"
          icon={<CloseOutlined />}
          style={{ color: "red" }}
          onClick={onDelete}
        />
      </Row>

      <Row>
        <Col>
          <Tag color={tagColorMapped[task.status]}>{task.status}</Tag>
        </Col>

        <Button
          disabled={task.status === "backlog"}
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={stepBackward}
        />

        <Button
          disabled={task.status === "done"}
          type="text"
          icon={<ArrowRightOutlined />}
          onClick={stepForward}
        />
      </Row>
    </Card>
  );
};

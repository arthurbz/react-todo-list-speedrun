import { Row, Col, Layout, List, Typography } from "antd";
import { TaskCard } from "./components/TaskCard";
import { NewTask } from "./components/NewTask";
import { taskStore } from "./store";

export const App: React.FC = (): React.JSX.Element => {
  const backlogTasks = taskStore((state) =>
    state.tasks.filter((task) => task.status === "backlog"),
  );
  const doingTasks = taskStore((state) =>
    state.tasks.filter((task) => task.status === "doing"),
  );
  const doneTasks = taskStore((state) =>
    state.tasks.filter((task) => task.status === "done"),
  );
  const removeTask = taskStore((state) => state.removeTask);
  const onDelete = (id: string) => removeTask(id);

  return (
    <Layout style={{ width: "100vw", height: "100vh", gap: 16, padding: 16 }}>
      <NewTask />

      <Layout.Content>
        <Row>
          <Col span={8}>
            <Typography.Title level={3}>BACKLOG</Typography.Title>
            <List
              itemLayout="vertical"
              dataSource={backlogTasks}
              renderItem={(task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={() => onDelete(task.id)}
                />
              )}
            />
          </Col>

          <Col span={8}>
            <Typography.Title level={3}>DOING</Typography.Title>
            <List
              itemLayout="vertical"
              dataSource={doingTasks}
              renderItem={(task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={() => onDelete(task.id)}
                />
              )}
            />
          </Col>

          <Col span={8}>
            <Typography.Title level={3}>DONE</Typography.Title>
            <List
              itemLayout="vertical"
              dataSource={doneTasks}
              renderItem={(task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={() => onDelete(task.id)}
                />
              )}
            />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

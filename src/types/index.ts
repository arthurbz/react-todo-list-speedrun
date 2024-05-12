export interface Task {
  id: string;
  title: string;
  status: "backlog" | "doing" | "done";
}

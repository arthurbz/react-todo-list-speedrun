export interface Task {
  id: string;
  title: string;
  status: Status;
}

export type Status = "backlog" | "doing" | "done";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Task } from "../types";

interface TaskStore {
  tasks: Array<Task>;
  addTask: ({ id, title }: { id: string; title: string }) => void;
  removeTask: (index: string) => void;
}

export const taskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: ({ id, title }) => {
        set((state) => ({
          tasks: [...state.tasks, { id, title, status: "backlog" }],
        }));
      },
      removeTask: (id: string) => {
        const index = get().tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
          // Use slice to remove the task at the found index
          const newTasks = [
            ...get().tasks.slice(0, index),
            ...get().tasks.slice(index + 1),
          ];
          set({ tasks: newTasks });
        }
      },
    }),
    {
      name: "tasks-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

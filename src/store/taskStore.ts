import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Status, Task } from "../types";

interface TaskStore {
  tasks: Array<Task>;
  addTask: ({ id, title }: { id: string; title: string }) => void;
  removeTask: (index: string) => void;
  stepForwardTask: (index: string) => void;
  stepBackwardTask: (index: string) => void;
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
          const newTasks = [
            ...get().tasks.slice(0, index),
            ...get().tasks.slice(index + 1),
          ];
          set({ tasks: newTasks });
        }
      },
      stepForwardTask: (id: string) => {
        const taskIndex = get().tasks.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
          const task = get().tasks[taskIndex];
          const statusSequence = ["backlog", "doing", "done"];
          const currentIndex = statusSequence.indexOf(task.status);
          if (currentIndex !== -1 && currentIndex < statusSequence.length - 1) {
            const newStatus = statusSequence[currentIndex + 1];
            const updatedTasks = [...get().tasks];
            updatedTasks[taskIndex] = { ...task, status: newStatus as Status };
            set({ tasks: updatedTasks });
          }
        }
      },
      stepBackwardTask: (id: string) => {
        const taskIndex = get().tasks.findIndex((task) => task.id === id);
        if (taskIndex !== -1) {
          const task = get().tasks[taskIndex];
          const statusSequence = ["backlog", "doing", "done"];
          const currentIndex = statusSequence.indexOf(task.status);
          if (currentIndex !== -1 && currentIndex > 0) {
            const newStatus = statusSequence[currentIndex - 1];
            const updatedTasks = [...get().tasks];
            updatedTasks[taskIndex] = { ...task, status: newStatus as Status };
            set({ tasks: updatedTasks });
          }
        }
      },
    }),
    {
      name: "tasks-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

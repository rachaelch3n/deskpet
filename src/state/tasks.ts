import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Task = { id: string; text: string; done: boolean; createdAt: number };

type Store = {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleDone: (id: string) => void;
  removeTask: (id: string) => void;
};

export const useTasks = create<Store>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (text) =>
        set((s) => ({ tasks: [{ id: String(Date.now()), text: text.trim(), done: false, createdAt: Date.now() }, ...s.tasks] })),
      toggleDone: (id) =>
        set((s) => ({ tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) })),
      removeTask: (id) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
    }),
    { name: "deskpet.tasks.v1" }
  )
);

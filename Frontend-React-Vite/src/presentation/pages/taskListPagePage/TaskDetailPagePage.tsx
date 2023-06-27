"use client";

import { TaskFetcherProvider } from "../../../application/todolist/contexts/taskFetcherContext";
import TaskDetailPage from "../../../presentation/todolist/pages/TaskDetailPage";

export default function TaskDetailPagePage() {
  return (
    <TaskFetcherProvider>
      <TaskDetailPage />
    </TaskFetcherProvider>
  );
}

"use client";

import { TaskListFetcherProvider } from "../../../application/todolist/contexts/taskListFetcherContext";
import TaskDetailPage from "../../../presentation/todolist/pages/TaskListPage";

export default function TaskListPagePage() {
  return (
    <TaskListFetcherProvider>
      <TaskDetailPage />
    </TaskListFetcherProvider>
  );
}

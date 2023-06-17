"use client";

import { TaskListFetcherProvider } from "../../../application/todolist/contexts/taskListFetcherContext";
import TaskListPage from "../../../presentation/todolist/pages/TaskListPage";

export default function TaskListPagePage() {
  return (
    <TaskListFetcherProvider>
      <TaskListPage />
    </TaskListFetcherProvider>
  );
}

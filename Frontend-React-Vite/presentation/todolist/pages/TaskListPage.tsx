"use client";

import { useContext, useEffect } from "react";
import TaskFetcherContext, {
  TaskFetcherState,
} from "../../../application/todolist/contexts/taskListFetcherContext";
import LoadingSpinner from "../../../presentation/@shared/components/LoadingSpinner";
import TaskList from "../components/TaskList";
import { Button } from 'antd';

const TaskDetailPage: React.FC = (props) => {
  const taskListFetcher = useContext(TaskFetcherContext);

  useEffect(() => {
    if (taskListFetcher.state === TaskFetcherState.INITIAL) {
      taskListFetcher.getAllTasks();
    }
  }, [taskListFetcher.state]);

  return (
    <main className="flex justify-center items-center h-screen flex-col gap-4">
      {taskListFetcher.state === TaskFetcherState.LOADING ||
      taskListFetcher.state === TaskFetcherState.INITIAL ? (
        <LoadingSpinner />
      ) : (
        taskListFetcher.taskList && <TaskList model={taskListFetcher.taskList} />
      )}
      <Button
        type="primary"
        onClick={() => {
          localStorage.clear();
        }}
      >
        Clear cache
      </Button>
    </main>
  );
};

export default TaskDetailPage;

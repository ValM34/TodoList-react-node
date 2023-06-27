"use client";

import { useParams } from 'react-router-dom';
import { useContext, useEffect } from "react";
import TaskFetcherContext, {
  TaskFetcherState,
} from "../../../application/todolist/contexts/taskFetcherContext";
import LoadingSpinner from "../../../presentation/@shared/components/LoadingSpinner";
import TaskCard from "../components/TaskCard";

const TaskDetailPage: React.FC = (props) => {
  const taskFetcher = useContext(TaskFetcherContext);
  const { id } = useParams();

  useEffect(() => {
    if (taskFetcher.state === TaskFetcherState.INITIAL) {
      taskFetcher.getTaskById(id);
    }
  }, [taskFetcher.state]);

  return (
    <main className="flex justify-center items-center h-screen flex-col gap-4">
      {taskFetcher.state === TaskFetcherState.LOADING ||
      taskFetcher.state === TaskFetcherState.INITIAL ? (
        <LoadingSpinner />
      ) : (
        taskFetcher.task && <TaskCard model={taskFetcher.task} />
      )}
      <button
        onClick={() => {
          localStorage.clear();
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Reset Cache
      </button>
    </main>
  );
};

export default TaskDetailPage;

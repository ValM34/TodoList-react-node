import { GetOneTaskById } from "../../../domain/todolist/usecases/getOneTaskById";
import React, { createContext, useState } from "react";
import { TaskModel } from "../models/taskModel";

export enum TaskFetcherState {
  INITIAL,
  LOADING,
  SUCCESS,
  ERROR,
}

const TaskFetcherContext = createContext({
  task: null as TaskModel | null,
  state: TaskFetcherState.INITIAL,
  getTaskById: (id: string) => {},
});

export const TaskFetcherProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [task, setTask] = useState<TaskModel | null>(null);
  const [state, setState] = useState(TaskFetcherState.INITIAL);

  const getTaskById = async (id: string) => {
    console.log("getTaskById");
    setState(TaskFetcherState.LOADING);
    try {
      const usecase = new GetOneTaskById();
      const task = await usecase.execute({ id });

      const taskModel = TaskModel.fromDomain(task);
      setTask(taskModel);
      setState(TaskFetcherState.SUCCESS);
    } catch (error) {
      console.log(error);
      setState(TaskFetcherState.ERROR);
    }
  };

  return (
    <TaskFetcherContext.Provider
      value={{
        task,
        state,
        getTaskById,
      }}
    >
      {children}
    </TaskFetcherContext.Provider>
  );
};

export default TaskFetcherContext;

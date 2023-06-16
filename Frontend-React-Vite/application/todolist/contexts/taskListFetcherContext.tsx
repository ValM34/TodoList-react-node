import { GetAllTasks } from "../../../domain/todolist/usecases/getAllTasks";
import React, { createContext, useState } from "react";
import { TaskModel } from "../models/taskModel";

export enum TaskFetcherState {
  INITIAL,
  LOADING,
  SUCCESS,
  ERROR,
}

const TaskFetcherContext = createContext({
  taskList: null as TaskModel[] | null,
  state: TaskFetcherState.INITIAL,
  getAllTasks: () => {},
});

export const TaskListFetcherProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [taskList, setTaskList] = useState<TaskModel[] | null>(null);
  const [state, setState] = useState(TaskFetcherState.INITIAL);

  const getAllTasks = async () => {
    console.log("getAllTasks");
    setState(TaskFetcherState.LOADING);
    try {
      const usecase = new GetAllTasks();
      const taskList = await usecase.execute();

      const taskListModel = TaskModel.fromDomainArray(taskList);
      setTaskList(taskListModel);
      setState(TaskFetcherState.SUCCESS);
    } catch (error) {
      console.log(error);
      setState(TaskFetcherState.ERROR);
    }
  };

  return (
    <TaskFetcherContext.Provider
      value={{
        taskList,
        state,
        getAllTasks,
      }}
    >
      {children}
    </TaskFetcherContext.Provider>
  );
};

export default TaskFetcherContext;

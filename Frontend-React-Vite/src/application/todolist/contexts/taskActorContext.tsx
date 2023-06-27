import React, { createContext, useState } from "react";
import { TaskModel } from "../models/taskModel";

export enum TaskActorState {
  INITIAL,
  LOADING,
  SUCCESS,
  ERROR,
}

const TaskActorContext = createContext({
  initialTask: null as TaskModel | null,
  setInitialTask: (task: TaskModel) => {},
  createTask: (task: TaskModel) => {},
  updateTask: (task: TaskModel) => {},
  deleteTask: (task: TaskModel) => {},
});

export const TaskActorProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [initialTask, setInitialTask] = useState<TaskModel | null>(null);

  const createTask = async (task: TaskModel) => {
    console.log("create");
    try {
      const usecase = new CreateTask();
      const task = await usecase.execute({ id });
    } catch (error) {
      console.log(error);
    }
  };
  const updateTask = async (task: TaskModel) => {
    console.log("update");
    try {
      const usecase = new UpdateTask();
      const task = await usecase.execute({ id });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (task: TaskModel) => {
    console.log("delete");
    try {
      const usecase = new DeleteTask();
      const task = await usecase.execute({ id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskActorContext.Provider
      value={{
        initialTask: initialTask,
        setInitialTask: setInitialTask,
        createTask: (task: TaskModel) => {},
        updateTask: (task: TaskModel) => {},
        deleteTask: (task: TaskModel) => {},
      }}
    >
      {children}
    </TaskActorContext.Provider>
  );
};

export default TaskActorContext;

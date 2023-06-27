import { TaskRepositoryImpl } from "../../../infrastructure/todolist/repositories/taskRepositoryImpl";
import { TaskRepository } from "../repositories/taskRepository";
import { Task } from "../entities/task";

export class GetAllTasks {
  // Replace with injection in the future
  taskRepository: TaskRepository = new TaskRepositoryImpl();
  constructor() {}

  async execute(): Promise<Task[]> {
    // Business logic
    const taskList = await this.taskRepository.getAllTasks();
    if (!taskList) {
      throw new Error("Task not found");
    }
    /*if (!task.AreValid()) {
      throw new Error("Task is not valid");
    }*/ // @TODO => Créer AreValid();

    // Return value (Output)
    return taskList;
  }
}

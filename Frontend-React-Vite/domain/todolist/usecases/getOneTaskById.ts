import { TaskRepositoryImpl } from "../../../infrastructure/todolist/repositories/taskRepositoryImpl";
import { TaskRepository } from "../repositories/taskRepository";
import { Task } from "../entities/task";

interface GetOneTaskByIdParams {
  id: string;
}

export class GetOneTaskById {
  // Replace with injection in the future
  taskRepository: TaskRepository = new TaskRepositoryImpl();
  constructor() {}

  async execute(params: GetOneTaskByIdParams): Promise<Task> {
    // Params validation (Input)
    if (!params.id) {
      throw new Error("Task id is required");
    }
    // Business logic
    const task = await this.taskRepository.getOneTaskById(params.id);
    if (!task) {
      throw new Error("Task not found");
    }
    if (!task.isValid()) {
      throw new Error("Task is not valid");
    }

    // Return value (Output)
    return task;
  }
}

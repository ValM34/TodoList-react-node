import { Task } from "../entities/task";

export interface TaskRepository {
  getOneTaskById(id: String): Promise<Task>;
  getAllTasks(): Promise<Task[]>;
}

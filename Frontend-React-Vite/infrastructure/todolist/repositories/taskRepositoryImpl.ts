import { Task } from "../../../domain/todolist/entities/task";
import { TaskLocalDataSourceImpl } from "../datasources/taskLocalDataSource";
import { TaskRemoteDataSourceImpl } from "../datasources/taskRemoteDataSource";
import { TaskRepository } from "../../../domain/todolist/repositories/taskRepository";

export class TaskRepositoryImpl implements TaskRepository {
  // Replace with injection in the future
  taskRemoteDataSource = new TaskRemoteDataSourceImpl();
  taskLocalDataSource = new TaskLocalDataSourceImpl();
  constructor() {}

  async getOneTaskById(id: string): Promise<Task> {
    // Check if task exists in cache
    try {
      const taskDto =
        this.taskLocalDataSource.getOneTaskByIdFromCache(id);
      // Convert to domain
      const task = taskDto.toDomain();
      // Return domain
      return task;
    } catch (error) {
      console.log("No task in cache, fetch from remote");
      // Task not found in cache so fetch it from remote
      const taskDto = await this.taskRemoteDataSource.getOneTaskById(
        id
      );
      // Save in cache
      this.taskLocalDataSource.saveOneTaskInCache(taskDto);
      // Convert to domain
      const task = taskDto.toDomain();
      // Return domain
      return task;
    }
  }

  async getAllTasks(): Promise<Task[]> {
    // Check if task exists in cache
    try {
      const tasksDto = this.taskLocalDataSource.getAllTasksFromCache();
      // Convert to domain
      const tasks = tasksDto.map(taskDto => taskDto.toDomain());
      // Return domain
      return tasks;
    } catch (error) {
      console.log("No task in cache, fetch from remote");
      // Task not found in cache so fetch it from remote
      const taskDtos = await this.taskRemoteDataSource.getAllTasks();
      // Save in cache
      this.taskLocalDataSource.saveAllTasksInCache(taskDtos);
      // Convert to domain
      const task = taskDtos.map(taskDto => taskDto.toDomain());
      // Return domain
      return task;
    }
  }
}

import { TaskDto } from "../dtos/taskDto";

interface TaskLocalDataSource {
  getOneTaskByIdFromCache(id: string): TaskDto;
  saveOneTaskInCache(task: TaskDto): void;
  clearCache(): void;
  getAllTasksFromCache(): TaskDto[];
  saveAllTasksInCache(tasksList: TaskDto[]): void;
}

export class TaskLocalDataSourceImpl implements TaskLocalDataSource {
  clearCache(): void {
    // Clear the cache
    localStorage.clear();
  }

  getOneTaskByIdFromCache(id: string): TaskDto {
    // Fetch the task
    const jsonString = localStorage.getItem(id);
    if (!jsonString) {
      throw new Error("Task not found in cache");
    }
    const task = TaskDto.fromJson(jsonString);
    return task;
  }

  saveOneTaskInCache(task: TaskDto): void {
    // Save the task using its id as key
    const jsonString = task.toJson();
    localStorage.setItem(task.id, jsonString);
  }

  getAllTasksFromCache(): TaskDto[] {
    // Fetch the tasks
    const jsonString = localStorage.getItem("tasksList");
    if (!jsonString) {
      throw new Error("Tasks not found in cache");
    }
    const taskDtos = TaskDto.fromJsonArray(jsonString);
    return taskDtos;
  }

  saveAllTasksInCache(tasksList: TaskDto[]): void {
    // Save the task using its id as key
    // const jsonString = tasksList.tasksListToJson(); @TODO faire en sorte que la méthode fonctionne
    const jsonString = JSON.stringify(tasksList);
    localStorage.setItem("tasksList", jsonString);
  }
}

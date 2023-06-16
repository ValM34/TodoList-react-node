import { Task } from "../../../domain/todolist/entities/task";

export class TaskModel {
  constructor(
    public readonly id: string,
    public readonly content: string,
    public readonly isDone: boolean,
    public readonly createdAt: string,
    public readonly updatedAt: string,
  ) {}

  // Domain conversion methods
  toDomain(): Task {
    return new Task(
      this.id,
      this.content,
      this.isDone,
      this.createdAt,
      this.updatedAt,
    );
  }

  // From domain to model
  static fromDomain(task: Task): TaskModel {
    return new TaskModel(
      task.id,
      task.content,
      task.isDone,
      task.createdAt,
      task.updatedAt,
    );
  }

  static fromDomainArray(taskArray: Task[]): TaskModel[] {
    return taskArray.map((task) => {
      return new TaskModel(
        task.id,
        task.content,
        task.isDone,
        task.createdAt,
        task.updatedAt
      );
    });
  }
}

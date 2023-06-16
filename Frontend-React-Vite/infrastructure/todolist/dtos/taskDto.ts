import { Task } from "../../../domain/todolist/entities/task";

export class TaskDto {
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

  toDomainArray(taskDtos: TaskDto[]): Task[] {
    return taskDtos.map((taskDto) => {
      return taskDto.toDomain();
    });
  }

  static fromDomain(task: Task): TaskDto {
    return new TaskDto(
      task.id,
      task.content,
      task.isDone,
      task.createdAt,
      task.updatedAt,
    );
  }

  // Json conversion methods
  toJson(): string {
    return JSON.stringify(this);
  }

  tasksListToJson(): string {
    return JSON.stringify(this);
  }

  static fromJson(json: string): TaskDto {
    const { id, content, isDone, createdAt, updatedAt } =
      JSON.parse(json);
    return new TaskDto(
      id,
      content,
      isDone,
      createdAt,
      updatedAt,
    );
  }

  static fromJsonArray(jsonArray: string[]): TaskDto[] {
    return jsonArray.map((json) => {
      const { id, content, isDone, createdAt, updatedAt } = JSON.parse(json);
      return new TaskDto(id, content, isDone, createdAt, updatedAt);
    });
  }

  // Immutability helpers methods
  copyWith({
    id = this.id,
    content = this.content,
    isDone = this.isDone,
    createdAt = this.createdAt,
    updatedAt = this.updatedAt,
  }: Partial<TaskDto>): TaskDto {
    return new TaskDto(
      id,
      content,
      isDone,
      createdAt,
      updatedAt,
    );
  }

  equals(other: TaskDto): boolean {
    return (
      this.id === other.id &&
      this.content === other.content
    );
  }
}

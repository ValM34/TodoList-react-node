import { Task } from "../../../domain/todolist/entities/task";

export class TaskDto {
  constructor(
    public readonly id: string,
    public readonly content: string,
    public readonly isDone: boolean,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly userId: string,
    public readonly title: string,
  ) {}

  // Domain conversion methods
  toDomain(): Task {
    return new Task(
      this.id,
      this.content,
      this.isDone,
      this.createdAt,
      this.updatedAt,
      this.userId,
      this.title,
    );
  }

  static fromDomain(task: Task): TaskDto {
    return new TaskDto(
      task.id,
      task.content,
      task.isDone,
      task.createdAt,
      task.updatedAt,
      task.userId,
      task.title,
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
    const { id, content, isDone, createdAt, updatedAt, userId, title } =
      JSON.parse(json);
    return new TaskDto(
      id,
      content,
      isDone,
      createdAt,
      updatedAt,
      userId,
      title,
    );
  }

  static fromJsonArray(jsonArray: string[]): TaskDto[] {
    const jsonParsed = JSON.parse(jsonArray);
    return jsonParsed.map((json) => {
      const { id, content, isDone, createdAt, updatedAt, userId, title } = json;
      return new TaskDto(id, content, isDone, createdAt, updatedAt, userId, title);
    });
  }

  // Immutability helpers methods
  copyWith({
    id = this.id,
    content = this.content,
    isDone = this.isDone,
    createdAt = this.createdAt,
    updatedAt = this.updatedAt,
    userId = this.updatedAt,
    title = this.title,
  }: Partial<TaskDto>): TaskDto {
    return new TaskDto(
      id,
      content,
      isDone,
      createdAt,
      updatedAt,
      userId,
      title,
    );
  }

  equals(other: TaskDto): boolean {
    return (
      this.id === other.id &&
      this.content === other.content &&
      this.title === other.title
    );
  }
}

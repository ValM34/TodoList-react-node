export class Task {
  constructor(
    public readonly id: string,
    public readonly content: string,
    public readonly isDone: boolean,
    public readonly createdAt: string,
    public readonly updatedAt: string,
  ) {}

  // Validation methods
  isValid(): boolean {
    return (
      this.content.length > 0 &&
      this.createdAt.length > 0 &&
      this.updatedAt.length > 0
    );
  }
  
  // Immutability helpers methods
  copyWith({
    id = this.id,
    content = this.content,
    isDone = this.isDone,
    createdAt = this.createdAt,
    updatedAt = this.updatedAt,
  }: Partial<Task>): Task{
    return new Task(id, content, isDone, createdAt, updatedAt);
  }

  // Equality methods
  equals(other: Task): boolean {
    return (
      this.id === other.id &&
      this.content === other.content
    );
  }

  // Factory methods
  static newEmpty(): Task {
    return new Task("1", "content", false, "", "")
  }
}
export class Task {
  constructor(
    public readonly id: string,
    public readonly content: string,
    public readonly isDone: boolean,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly userId: string,
    public readonly title: string,
  ) {}

  // Validation methods
  isValid(): boolean {
    return (
      this.content.length > 0 &&
      this.createdAt.length > 0 &&
      this.updatedAt.length > 0 &&
      this.title.length > 0
    );
  }
  
  // Immutability helpers methods
  copyWith({
    id = this.id,
    content = this.content,
    isDone = this.isDone,
    createdAt = this.createdAt,
    updatedAt = this.updatedAt,
    userId = this.userId,
    title = this.title,
  }: Partial<Task>): Task{
    return new Task(id, content, isDone, createdAt, updatedAt, userId, title);
  }

  // Equality methods
  equals(other: Task): boolean {
    return (
      this.id === other.id &&
      this.content === other.content &&
      this.isDone === other.isDone &&
      this.createdAt === other.createdAt &&
      this.updatedAt === other.updatedAt &&
      this.userId === other.userId &&
      this.title === other.title
    );
  }

  // Factory methods
  static newEmpty(): Task {
    return new Task("1", "content", false, "", "", "1", "");
  }
}
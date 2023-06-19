import { TaskDto } from "../dtos/taskDto";

interface TaskRemoteDataSource {
  getOneTaskById(id: string): Promise<TaskDto>;
  getAllTasks(): Promise<TaskDto[]>;
}

export class TaskRemoteDataSourceImpl implements TaskRemoteDataSource {
  async getOneTaskById(id: string): Promise<TaskDto> {
    // Simulate a remote call (normally using fetch or axios with id as param)
    return new Promise((resolve, reject) => {
      id = '27';
      const jwt = localStorage.getItem("token");
      fetch('http://127.0.0.1:3000/task/one/' + id, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": jwt
        }
      })
        .then(res => res.json())
        .then(res => {
          const task = new TaskDto(
            res[0].id,
            res[0].content,
            res[0].isDone,
            res[0].createdAt,
            res[0].updatedAt,
            res[0].userId,
            res[0].title,
          );
          console.log(task)
          resolve(task);
        })
    });
  }

  async getAllTasks(): Promise<TaskDto[]> {
    // Simulate a remote call (normally using fetch or axios with id as param)
    return new Promise((resolve, reject) => {
      const jwt = localStorage.getItem("token");
      fetch('http://127.0.0.1:3000/task/all', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": jwt
        }
      })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          resolve(res.map(task => {
            const taskDto = new TaskDto(
              task.id,
              task.content,
              task.isDone,
              task.createdAt,
              task.updatedAt,
              task.userId,
              task.title
            )
            return taskDto;
          }));
        })
    });
  }
}

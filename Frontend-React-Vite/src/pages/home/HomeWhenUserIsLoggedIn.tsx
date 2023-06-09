import { useState, useEffect } from "react";
import DeleteTask from './DeleteTask';

function HomeWhenUserIsLoggedIn() {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const ls = localStorage.getItem("token");
    fetch('http://127.0.0.1:3000/task/all', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": ls
      }
    })
      .then(res => res.json())
      .then(res => setTasks(res))
  }, [])

  const removeTask = (id) => {
    const taskIndex = tasks.findIndex(task => task['id'] == id);
    if(taskIndex !== -1){
      const updatedTask = [...tasks];
      updatedTask.splice(taskIndex, 1);
      setTasks(updatedTask);
    }
  }

  return (
    <>
      <div>
        <a href="./task/create">Créer une tâche</a>
      </div>
      <ul>
        {tasks !== null ? tasks.map(task => {
          return(
            <li key={task.id}>
              <a href={`./task/update/${task.id}`}>{task.content}</a>
              <div className={task.isDone ? "is-done" : "is-not-done"}></div>
              {task.id}
              <DeleteTask taskId={task.id} removeTask={removeTask} />
            </li>
          )
        }) : <li>Vous n'avez créé aucune tâche</li>}
      </ul>
    </>
  );
}

export default HomeWhenUserIsLoggedIn;
import { Button } from "antd";
import { useContext } from "react";
import { TaskActorContext } from "../contexts/taskActorContext";

function TaskDeleteButton({ taskId, removeTask }) {
  // const deleteTask = () => {
  //   const ls = localStorage.getItem("token");
  //   fetch("http://127.0.0.1:3000/task/delete", {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: ls,
  //     },
  //     body: JSON.stringify({
  //       id: taskId,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       removeTask(taskId);
  //     });
  // };

  useContext(TaskActorContext);

  return (
    <Button type="primary" onClick={deleteTask}>
      Supprimer
    </Button>
  );
}

export default TaskDeleteButton;

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function CreateTask() {

  const contentRef = useRef();
  const navigate = useNavigate();

  const createTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const ls = localStorage.getItem("token");
    fetch('http://127.0.0.1:3000/task/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": ls
      },
      body: JSON.stringify({
        content: contentRef.current.value
      })
    })
      .then(res => {
        if(res.status === 201){
          navigate("/");
        }
      })
  }

  return (
    <form>
      <label htmlFor="content">Contenu</label>
      <input type="text" ref={contentRef} name="content" id="content" />
      <button onClick={createTask}>Valider</button>
    </form>
  );
}

export default CreateTask;
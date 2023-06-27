import { useParams } from 'react-router-dom';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from 'antd';

function UpdateTask() {

const { TextArea } = Input;
const navigate = useNavigate();
const { id } = useParams();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    const ls = localStorage.getItem("token");
    fetch('http://127.0.0.1:3000/task/update', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": ls
      },
      body: JSON.stringify({
        title: values.title,
        content: values.content,
        id: id
      })
    })
      .then(res => res.json())
      .then(res => {
        if(res.task){
          const storage = localStorage.getItem("tasksList");
          let storageObject = JSON.parse(storage);
          const taskIndex = storageObject.findIndex(task => task.id === parseInt(id));
          console.log(taskIndex)
          if(taskIndex !== -1){
            storageObject.splice(taskIndex, 1, res.task);
            localStorage.setItem("tasksList", JSON.stringify(storageObject));
            navigate("/");
          }
        }
      })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const taskList = JSON.parse(localStorage.getItem("tasksList"));
  const taskListIndex = taskList.findIndex((task) => task.id === parseInt(id));
  const { title, content } = taskList[taskListIndex];

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ title: title, content: content }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Titre"
        name="title"
        rules={[{ required: true, message: 'Veuillez écrire le titre de la tâche.' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Contenu"
        name="content"
        rules={[{ required: false, message: 'Veuillez écrire le contenu de la tâche.' }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Valider
      </Button>
    </Form>
  );
}

export default UpdateTask;

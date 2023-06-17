import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from 'antd';

function CreateTask() {

const { TextArea } = Input;
const navigate = useNavigate();

const onFinish = (values: any) => {
  console.log('Success:', values);
  const ls = localStorage.getItem("token");
  fetch('http://127.0.0.1:3000/task/create', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": ls
    },
    body: JSON.stringify({
      content: values.content
    })
  })
    .then(res =>  res.json())
    .then(res => {
      if(res.task){
        const storage = localStorage.getItem("tasksList");
        let storageObject = JSON.parse(storage);
        storageObject.push(res.task);
        localStorage.setItem("tasksList", JSON.stringify(storageObject));
        navigate("/")
      }
    })
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Contenu"
        name="content"
        rules={[{ required: true, message: 'Veuillez écrire le contenu de la tâche.' }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CreateTask;

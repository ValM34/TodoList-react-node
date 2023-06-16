import { TaskModel } from "../../../application/todolist/models/taskModel";
import { Card, Col, Row, Button, theme } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
const { useToken } = theme;
import DeleteTask from './DeleteTask';
import { useState } from 'react';

interface TaskListProps {
  model: TaskModel[];
}

const TaskList: React.FC<TaskListProps> = ({ model }) => {
  const { token } = useToken();
  const [tasks, setTasks] = useState(model);
  const removeTask = (id) => {
    const taskIndex = tasks.findIndex(task => task['id'] == id);
    if(taskIndex !== -1){
      console.log('removetask')

      const updatedTask = [...tasks];
      updatedTask.splice(taskIndex, 1);
      setTasks(updatedTask);
    }
  }

  return (
    <ul>
      <Row gutter={[16, 16]} style={{ padding: "20px 0" }}>
        {tasks.map((task: TaskModel) => (
          <Col span={8} key={task.id}>
            <Card bordered={false}>
              <div>{task.content}</div>
              {task.isDone ?
                <>
                  <CheckCircleOutlined style={{ fontSize: "20px", position: "absolute", right: "10px", top: "10px", color: "#00b96b" }} />
                  <a className="is-not-done" href="#">Marquer comme non terminée</a>
                </>
                : 
                <>
                <CloseCircleOutlined style={{ fontSize: "20px", position: "absolute", right: "10px", top: "10px", color: "red" }} />
                  <a className="is-done" href="#">Marquer comme faite</a>
                </>
              }
              <DeleteTask taskId={task.id} removeTask={removeTask} />
            </Card>
          </Col>
        ))}
      </Row>
    </ul>
  );
}

export default TaskList;

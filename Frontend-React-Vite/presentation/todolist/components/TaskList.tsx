import { TaskModel } from "../../../application/todolist/models/taskModel";
import { Card, Col, Row, Button, Tabs, theme } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
const { useToken } = theme;
import DeleteTask from './DeleteTask';
import React, { useState, useContext } from 'react';
import type { TabsProps } from 'antd';
import { DarkModeContext } from '../../../src/DarkModeProvider';


interface TaskListProps {
  model: TaskModel[];
}

const TaskList: React.FC<TaskListProps> = ({ model }) => {
  const {darkMode} = useContext(DarkModeContext);
  const { token } = useToken();
  const [tasks, setTasks] = useState(model);
  const removeTask = (id) => {
    const taskIndex = tasks.findIndex(task => task['id'] == id);
    if(taskIndex !== -1){
      console.log('remove task from cache')
      const updatedTask = [...tasks];
      updatedTask.splice(taskIndex, 1);
      localStorage.setItem("tasksList", JSON.stringify(updatedTask));
      setTasks(updatedTask);
    }
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Tâches en cours`,
      children:
        <Row gutter={[16, 16]}>
          {tasks.map((task: TaskModel) => (
            <React.Fragment key={task.id}>
              {!task.isDone ?
                <Col span={8}>
                  <Card title={task.title} bordered={false} className={`card-task ${darkMode.className}`} style={{color: darkMode.textColorPrimary}}>
                    <div className="task-content">{task.content}</div>
                    <CloseCircleOutlined style={{ fontSize: "20px", position: "absolute", right: "10px", top: "10px", color: darkMode.errorColor }} />
                    <a href="#">Marquer comme terminée</a>
                    <DeleteTask taskId={task.id} removeTask={removeTask} />
                  </Card>
                </Col>
                : 
              ""}
            </React.Fragment>
          ))}
        </Row>
      ,
    },
    {
      key: '2',
      label: `Tâches terminées`,
      children:
      <Row gutter={[16, 16]}>
        {tasks.map((task: TaskModel) => (
          <React.Fragment key={task.id}>
            {task.isDone ?
              <Col span={8} key={task.id}>
                <Card title={task.title} bordered={false} className={`card-task ${darkMode.className}`} style={{color: darkMode.textColorPrimary}}>
                  <div className="task-content">{task.content}</div>
                  <CheckCircleOutlined style={{ fontSize: "20px", position: "absolute", right: "10px", top: "10px", color: darkMode.succesColor }} />
                  <a href="#">Marquer comme non terminée</a>
                  <DeleteTask taskId={task.id} removeTask={removeTask} />
                </Card>
              </Col>
              : 
              ""}
          </React.Fragment>
        ))}
      </Row>
      ,
    },
    {
      key: '3',
      label: `Toutes les tâches`,
      children:
      <Row gutter={[16, 16]}>
        {tasks.map((task: TaskModel) => (
          <React.Fragment key={task.id}>
            <Col span={8} key={task.id}>
              <Card title={task.title} bordered={false} className={`card-task ${darkMode.className}`} style={{color: darkMode.textColorPrimary}}>
                <div className="task-content">{task.content}</div>
                {task.isDone ? 
                    <>
                      <CheckCircleOutlined style={{ fontSize: "20px", position: "absolute", right: "10px", top: "10px", color: "#00b96b" }} />
                      <a href="#">Marquer comme non terminée</a>
                    </>
                  :
                    <>
                      <CloseCircleOutlined style={{ fontSize: "20px", position: "absolute", right: "10px", top: "10px", color: darkMode.errorColor }} />
                      <a href="#">Marquer comme terminée</a>
                    </>
                }
                <DeleteTask taskId={task.id} removeTask={removeTask} />
              </Card>
            </Col>

          </React.Fragment>
        ))}
      </Row>
      ,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <ul>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </ul>
  );
}

export default TaskList;

import { TaskModel } from "../../../application/todolist/models/taskModel";
import { Card, theme } from 'antd';
const { useToken } = theme;

interface TaskCardProps {
  model: TaskModel;
}

const TaskCard: React.FC<TaskCardProps> = ({ model }) => {
  const { token } = useToken();
  return (
    <Card style={{ width: 300, backgroundColor: token.colorPrimary, borderColor: token.colorPrimary }}>
      <p>{model.content}</p>
    </Card>
  );
};

export default TaskCard;

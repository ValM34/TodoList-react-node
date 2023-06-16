import { useState, useRef } from "react";
import TaskListPagePage from '../taskListPagePage/TaskListPagePage';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ConnexionForm from './ConnexionForm';
import SubscriptionForm from './SubscriptionForm';

const onChange = (key: string) => {
  console.log(key);
};

const Home: React.FC = ({ connectGlobal }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const verifyConnexion = () => {
    const ls = localStorage.getItem("token");
    fetch('http://127.0.0.1:3000/user/verify', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": ls
      }
    })
      .then(res => res.json())
      .then(res => {
        if(res.userId > 0){
          setIsLoggedIn(true);
        }
      })
  }
  verifyConnexion();
  
  const connect = () => {
    setIsLoggedIn(true)
    connectGlobal();
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Connexion`,
      children:
        <ConnexionForm connect={connect} />
      ,
    },
    {
      key: '2',
      label: `Inscription`,
      children:
        <SubscriptionForm />
      ,
    },
  ];

  // Remplacer par la vérification du token
  if(isLoggedIn){
    return <TaskListPagePage />
  }

  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
}

export default Home;
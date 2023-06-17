import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import CreateTask from "./pages/createTask/CreateTask";
import UpdateTask from "./pages/updateTask/UpdateTask";
import Header from "./layouts/header/Header";
import Error404 from "./pages/errors/error404/Error404";
import ProductDetailPage from "./pages/productDetailPagePage/ProductDetailPagePage";
import TaskDetailPage from "./pages/taskDetailPagePage/TaskDetailPagePage";
import { ConfigProvider, theme, Breadcrumb, Layout } from 'antd';
import './app.scss';

const { Content, Footer } = Layout;
const { useToken } = theme;

function App() {
  const { token } = useToken();
  
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
        if (res.userId > 0) {
          setIsLoggedIn(true);
        }
      })
  }
  verifyConnexion();

  const connectGlobal = () => setIsLoggedIn(true);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
        components: {
          Card: {
            colorPrimary: 'grey',
            colorBgContainer: '#b9ffe1',
          },
        },
      }}
    >
      <Router>
        <Layout className="layout" style={{ background: "white" }}>
          <Header isLoggedIn={isLoggedIn} />
          <Content style={{ padding: '0 50px', display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 67px - 58px)" }}>
            {/*<Breadcrumb
              items={[
                { title: 'Home' },
                { title: 'App' },
                { title: '@TODO rendre dynamique le breadcrumb' }
              ]}
              style={{ maxWidth: "1200px", width: "100%" }}
            />*/}
            <div className="site-layout-content" style={{ background: 'white', maxWidth: "1200px", width: "100%", padding: "20px 0" }}>
                <Routes>
                  <Route path="/" element={<Home connectGlobal={connectGlobal} />} />
                  <Route path="/user" element={<User />} />
                  <Route path="/task/create" element={<CreateTask />} />
                  <Route path="/task/update/:id" element={<UpdateTask />} />
                  <Route path="/product/test" element={<ProductDetailPage />} />
                  <Route path="/task/test/:id" element={<TaskDetailPage />} />
                  <Route path="*" element={<Error404 />} />
                </Routes>
            </div>
          </Content>
          <div style={{ display: "flex", justifyContent: "center", padding: "24px 50px", background: "#00b96b" }}>
            <div style={{ display: "block", width: "100%", maxWidth: "1200px"}}>
              <Footer style={{ padding: "0", background: "#00b96b", color: "white" }}>Todolist créée par Valentin Moreau | Stack: React.js (Vite) - Express.js - MySQL - AntDesign - React router</Footer>
            </div>
          </div>
        </Layout>
      </Router>
    </ConfigProvider>
  )
}

export default App;
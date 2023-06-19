import { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import CreateTask from "./pages/createTask/CreateTask";
import UpdateTask from "./pages/updateTask/UpdateTask";
import Header from "./layouts/header/Header";
import Error404 from "./pages/errors/error404/Error404";
import ProductDetailPage from "./pages/productDetailPagePage/ProductDetailPagePage";
import TaskDetailPage from "./pages/taskDetailPagePage/TaskDetailPagePage";
import { ConfigProvider, Breadcrumb, Layout } from 'antd';
import './app.scss';
import { DarkModeContext } from "./DarkModeProvider";

const { Content, Footer } = Layout;

function App() {  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const {darkMode} = useContext(DarkModeContext);

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
          colorPrimary: darkMode.primaryColor,
        },
        components: {
          Card: {
            colorBgContainer: darkMode.secondaryColor,
          },
          Tabs: {
            colorPrimary: darkMode.primaryColor,
            colorText: darkMode.textColorPrimary
          },
        },
      }}
    >
      <Router>
        <Layout className="layout" style={{ background: "white" }}>
          <Header isLoggedIn={isLoggedIn} />
          <Content style={{ padding: '0 50px', display: "flex", flexDirection: "column", alignItems: "center", minHeight: "calc(100vh - 67px - 58px)", backgroundColor: darkMode.backgroundMainColor }}>
            {/*<Breadcrumb
              items={[
                { title: 'Home' },
                { title: 'App' },
                { title: '@TODO rendre dynamique le breadcrumb' }
              ]}
              style={{ maxWidth: "1200px", width: "100%" }}
            />*/}
            <div className="site-layout-content" style={{ background: darkMode.backgroundMainColor, maxWidth: "1200px", width: "100%", padding: "20px 0" }}>
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
          <div style={{ display: "flex", justifyContent: "center", padding: "24px 50px", backgroundColor: darkMode.primaryColor }}>
            <div style={{ display: "block", width: "100%", maxWidth: "1200px"}}>
              <Footer style={{ padding: "0", backgroundColor: darkMode.primaryColor, color: "white" }}>Todolist créée par Valentin Moreau | Stack: React.js (Vite) - Express.js - MySQL - AntDesign - React router</Footer>
            </div>
          </div>
        </Layout>
      </Router>
    </ConfigProvider>
  )
}

export default App;
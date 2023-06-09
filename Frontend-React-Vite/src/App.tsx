import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import CreateTask from "./pages/createTask/CreateTask";
import UpdateTask from "./pages/updateTask/UpdateTask";
import Header from "./layouts/header/Header";
import Error404 from "./pages/errors/error404/Error404";

function App() {
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

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/task/create" element={<CreateTask />} />
        <Route path="/task/update/:id" element={<UpdateTask />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  )
}

export default App;
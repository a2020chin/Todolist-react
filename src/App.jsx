import { useState } from 'react'
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Todolist from "./components/Todolist"

import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./components/Context";
import { Layout } from './components/Layout';
import IsMember from './components/IsMember';


function App() {
  const [token, setToken] = useState(null);

  return (
      <AuthContext.Provider value={{ token, setToken }}>
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
          </Route>
          <Route element={<IsMember />} >
              <Route path="/todolist" element={<Todolist />} />
          </Route>
        </Routes>
      </AuthContext.Provider>
  )
}

export default App

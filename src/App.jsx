import { useState } from 'react'
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Todolist from "./components/Todolist"
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./components/Context";
import { Layout } from './components/Layout';


function App() {
  const [token, setToken] = useState(null);

  return (
    <div className="bg-[#FFD370] h-screen">
      <AuthContext.Provider value={{ token, setToken }}>
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/todolist" element={<Todolist />} >
               {/* <Route index element={<TourList />} />
               <Route path=":Id" element={<TourDetail />} /> */}
              </Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  )
}

export default App

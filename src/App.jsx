// import { useState } from 'react'
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Routes, Route, Link,Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="container h-screen flex justify-center items-center">
        <div className="text-orange-200 mr-24">
          <Link to='/'><img className="mb-4" src="./src/assets/images/title.png" alt="" /></Link>
          <img className="hidden md:block" src="./src/assets/images/main.png" alt="" />
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </>
  );
}

function App() {
  //  

  return (
    <div className="bg-[#FFD370] h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/tour" element={<Tour />} >
             <Route index element={<TourList />} />
             <Route path=":Id" element={<TourDetail />} />
            </Route> */}
        </Route>
      </Routes>
    </div>
  )
}

export default App

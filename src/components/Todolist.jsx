import { Link, Outlet } from "react-router-dom"

const Todolist = () => {


  return (
    <>
      <div className="h-screen bg-[#FFD370] md:bg-todo-bg">
        <header className="container flex justify-between py-4 items-center">
          <Link to='/todolist'><img className="" src="./images/title.png" alt="" /></Link>
          <div className="flex items-center">
            <h2 className="font-bold mr-6">的代辦</h2>
            <input className="p-2 rounded-xl cursor-pointer hover:ring-4" type="button" value="登出" />
          </div>
        </header>
        <Outlet/>
      </div>
    </>
  )
}
export default Todolist
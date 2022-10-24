import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom"
import axios from "axios";
import { useAuth } from "./Context";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);




const Todolist = () => {

  const {token, setToken} = useAuth();
  const [todos, setTodos]= useState([]);
  const [todoValue,setTodoValue] = useState("")
  const _url = 'https://todoo.5xcamp.us/todos'

  axios.defaults.headers.common['Authorization'] = token || localStorage.getItem('token');



  useEffect(() => {
    getTodo()
  },[]);

  const getTodo = async () => {
    await axios.get(_url).then((response) => {
      console.log(response)
      setTodos(response.data?.todos)
    }).catch(() => {
      MySwal.fire({
        icon: 'error',
        title: '資料獲取失敗'
      })
    })
  }
  const setTodo = async (e) => {
    e.preventDefault()

    if(todoValue.trim() === ''){
      setTodoValue('')
      document.querySelector('#inputTodo')

      return MySwal.fire({
        icon: 'error',
        title: '不可為空白',
      })
    }

    let data = {
      content: todoValue.trim(),
    }

    await axios.post(_url,data).then(() => {
      toast.success('新增代辦事項成功', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: '',
        theme: "colored",
        });
      getTodo()
    }).catch(() => {
      toast.error('請輸入資料', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: '',
        theme: "colored",
        })
    })
  }

  return (
    <>
      <div className="h-screen bg-[#FFD370] md:bg-todo-bg">
        <header className="container flex justify-between py-4 items-center">
          <Link to='/todolist'><img className="" src="./images/title.png" alt="" /></Link>
          <div className="flex items-center">
            <h2 className="font-bold mr-6">{localStorage.getItem('nickName')}的代辦</h2>
            <input className="p-2 rounded-xl cursor-pointer hover:ring-4" type="button" value="登出" />
          </div>
        </header>
        <div className="w-1/2 mx-auto">
          <div className="relative w-full">
            <input className="w-full py-3 pl-4 mb-6 rounded-[10px] shadow-[0px_0px_15px_rgba(0,0,0,0.15)]" type="text" name="inputTodo" id="inputTodo" placeholder="新增待辦事項"
            onChange={(e)=>{setTodoValue(e.target.value)}} />
            <a className="absolute right-1 top-1 w-10 h-10 bg-[#333333] rounded-[10px] text-white text-[20px] p-[10px]" href="#"
            onClick={setTodo}>
              <i className="fa fa-plus align-super"></i>
            </a>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
export default Todolist
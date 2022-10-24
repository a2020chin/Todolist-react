import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom"
import axios from "axios";
import { useAuth } from "./Context";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);







const NullTodo = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <h2 className="mt-[60px] mb-4 text-3xl">目前尚無待辦事項</h2>
        <img className="w-1/2" src="./images/empty1.svg" alt="" />
      </div>
    </>
  )
}



const Todolist = () => {

  const {token, setToken} = useAuth();
  const [todos, setTodos]= useState([]);
  const [todoValue,setTodoValue] = useState("")
  const _url = 'https://todoo.5xcamp.us/todos'

  axios.defaults.headers.common['Authorization'] = token || localStorage.getItem('token');





  useEffect(() => {
    getTodo()
  },[]);

  const getTodo =  () => {
     axios.get(_url).then((response) => {
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
      document.querySelector('#inputTodo').focus()

      return MySwal.fire({
        icon: 'error',
        title: '不可為空白',
      })
    }

    let data = {
      content: todoValue.trim(),
    }

    await axios.post(_url,data).then(() => {
      setTodoValue('')
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
      document.querySelector('#inputTodo').focus()
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
      document.querySelector('#inputTodo').focus()
    })
  }
  const rmTodo = async(todolist) => {
    await axios.delete(`${_url}/${todolist.id}`).then((response) => {
      getTodo()
      toast.success('刪除成功', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: '',
        theme: "colored",
        })
    }).catch(() => {
      toast.error('刪除資料失敗', {
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

  const TodoRender = (props) => {
    return (
      <>
        <li>
          <label htmlFor="">
            <input type="checkbox" id="" defaultChecked={props.completed_at} />
            <p>{props.content}</p>
          </label>
          <a href="#" onClick={(e)=>{
            e.preventDefault()
            rmTodo()
          }}></a>
        </li>
      </>
    )
  }
  const Render = () => {
    // console.log(todos)
    return todos.map((item, i)=>{ 
      console.log(item)
      return <TodoRender key={i} props={item} />
    })
  }


  const TodoMenu = () => {

    const [state, setState] = useState('all')
  
  
    const changeState = (e, state) => {
      e.preventDefault()
      setState(state)
    }
  
    return (
      <>
        <div className="bg-white rounded-[10px]">
          <ul className="flex justify-between">
            <li className="w-1/3"><a className={`block py-4 text-center text-sm  border-b-2  ${state === 'all'? 'text-[#333333] border-[#333333]':'text-[#9F9A91] border-[#EFEFEF]'}`} onClick={(e)=>{changeState(e,'all')}} href="#">全部</a></li>
            <li className="w-1/3"><a className={`block py-4 text-center text-sm  border-b-2  ${state === 'active'? 'text-[#333333] border-[#333333]':'text-[#9F9A91] border-[#EFEFEF]'}`} onClick={(e)=>{changeState(e,'active')}} href="#">待完成</a></li>
            <li className="w-1/3"><a className={`block py-4 text-center text-sm  border-b-2  ${state === 'completed'? 'text-[#333333] border-[#333333]':'text-[#9F9A91] border-[#EFEFEF]'}`} onClick={(e)=>{changeState(e,'completed')}} href="#">已完成</a></li>
          </ul>
          <ul>
            {Render()}
          </ul>
        </div>
      </>
    )
  }


  return (
    <>
      <div className="h-screen bg-[#FFD370] md:bg-todo-bg">
        <header className="container flex justify-between py-4 items-center">
          <Link to='/todolist'><img className="" src="./images/title.png" alt="" /></Link>
          <div className="flex items-center">
            <h1 className="font-bold mr-6">{localStorage.getItem('nickName')}的代辦</h1>
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
          { todos.length != 0 ? <TodoMenu /> : <NullTodo />}
        </div>
        <ToastContainer />
      </div>
    </>
  )
}
export default Todolist
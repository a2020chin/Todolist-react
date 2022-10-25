import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
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
  const [todos, setTodos]= useState([]); // 存todo資料
  const [todoValue,setTodoValue] = useState("") //addtodo資料
  const [state, setState] = useState('all') //判斷全部、已完成、未完成的分類
  const _url = 'https://todoo.5xcamp.us/todos'
  const navigate = useNavigate();

  axios.defaults.headers.common['Authorization'] = token || localStorage.getItem('token');



  useEffect(() => {
    getTodo()
  },[]);

  const signOut = () => {
    setToken(null)
    localStorage.removeItem('token');
    localStorage.removeItem('nickName');
    
    axios.delete(`https://todoo.5xcamp.us/users/sign_out`).then(() =>{
    navigate('/')
    MySwal.fire({
      icon: 'success',
      title: '登出成功'
    }).catch(errors => {
      console.log(errors)
    })
  })
}

  const getTodo = () => {
    axios.get(_url).then((response) => {
      // console.log(response)
      setTodos(response.data?.todos)
    })
  }
  const setTodo = (e) => {
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

    axios.post(_url,data).then(() => {
      setTodoValue('')
      toast.success('新增代辦事項成功', {
        position: "bottom-right", 
        autoClose: 2000,
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
        autoClose: 2000,
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
  const rmTodo = async (todolist, isAll = false) => {
    if(!isAll){
      await axios.delete(`${_url}/${todolist.id}`).then((response) => {
        getTodo()
        toast.success('刪除成功', {
          position: "bottom-right",
          autoClose: 2000,
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
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: '',
          theme: "colored",
          })
      })
    }else{
      await axios.delete(`${_url}/${todolist.id}`)
    }
  }
  const toggleTodo = (todolist) => {
    axios.patch(`${_url}/${todolist.id}/toggle`).then((response) => {
      toast.success('代辦更新完成', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: '',
        theme: "colored",
        }
      )
      todolist.completed_at = todolist.completed_at ? false : true
    }).catch(() => {
      toast.error('toggle失败', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: '',
        theme: "colored",
  })
  })
  }
  const rmActiveTodoAll = async () => {
    const needDelete = todos.filter((item)=>{return item.completed_at})
    const test = needDelete.map((item)=>{
      return new Promise(async (resolve) => {
        await rmTodo(item ,true)
        resolve()
      })
    })
    await Promise.all(test)
    console.log(needDelete , test)
    
    getTodo()
  }



  const TodoRender = ({props}) => {
    return (
      <>
        <li className="flex justify-between items-center group">
          <label className="w-full flex items-center py-4 ml-6 border-b-[1px] border-[#E5E5E5]" htmlFor={props.id}>
            <input className="w-5 h-5 rounded-[5px] mr-4 peer todocheck" type="checkbox" id={props.id} defaultChecked={props.completed_at} onChange={()=>toggleTodo(props)} />
            <p className="peer-checked:line-through peer-checked:text-[#9F9A91]">{props.content}</p>
          </label>
          <a href="#" className="mx-4 text-[24px] lg:invisible lg:group-hover:visible"
          onClick={(e)=>{
            e.preventDefault()
            rmTodo(props)
          }}>
            <i className="fa-solid fa-x"></i>
          </a>
        </li>
      </>
    )
  }
  const Render = () => {
    switch(state){
      case 'all':
        return todos.map((item, i)=>{
          return <TodoRender key={i} props={item} />
        })
      case 'inactive':
        return todos.filter((item)=>{return !item.completed_at}).map((item, i)=>{
          return <TodoRender key={i} props={item} />
        })
      case 'completed':
        return todos.filter((item)=>{return item.completed_at}).map((item, i)=>{
          return <TodoRender key={i} props={item} />
      })
    }
  }


  const TodoMenu = () => {
  
    const changeState = (e, state) => {
      e.preventDefault()
      setState(state)
    }
  
    return (
      <>
        <div className="bg-white rounded-[10px] shadow-[0px_0px_15px_rgba(0,0,0,0.15)]">
          <ul className="flex justify-between mb-2">
            <li className="w-1/3"><a className={`block py-4 text-center text-sm  border-b-2  ${state === 'all'? 'text-[#333333] border-[#333333]':'text-[#9F9A91] border-[#EFEFEF]'}`} onClick={(e)=>{changeState(e,'all')}} href="#">全部</a></li>
            <li className="w-1/3"><a className={`block py-4 text-center text-sm  border-b-2  ${state === 'inactive'? 'text-[#333333] border-[#333333]':'text-[#9F9A91] border-[#EFEFEF]'}`} onClick={(e)=>{changeState(e,'inactive')}} href="#">待完成</a></li>
            <li className="w-1/3"><a className={`block py-4 text-center text-sm  border-b-2  ${state === 'completed'? 'text-[#333333] border-[#333333]':'text-[#9F9A91] border-[#EFEFEF]'}`} onClick={(e)=>{changeState(e,'completed')}} href="#">已完成</a></li>
          </ul>
          <ul>
            {Render()}
          </ul>
          <div className="flex justify-between items-center mt-6 pb-8">
            <p className="ml-6">{todos.filter((item)=>{return !item.completed_at}).length} 個待完成事項</p>
            <a className="text-[#9F9A91] mr-12" href="#" onClick={(e)=>{
              e.preventDefault()
              rmActiveTodoAll()
            }}>清除已完成項目</a>
          </div>
        </div>
      </>
    )
  }


  return (
    <>
      <div className="h-full bg-[#FFD370] md:bg-todo-bg">
        <header className="container flex justify-between py-4 items-center">
          <Link to='/todolist'><img className="w-60 md:w-full" src="./images/title.png" alt="" /></Link>
          <div className="flex items-center">
            <h1 className="hidden font-bold mr-6 md:block">{localStorage.getItem('nickName')}的代辦</h1>
            <input className="p-2 rounded-xl cursor-pointer hover:ring-4" type="button" value="登出" onClick={()=>{signOut()}} />
          </div>
        </header>
        <div className="container pb-9 md:w-1/2 md:mx-auto">
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
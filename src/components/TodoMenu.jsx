import { useState } from "react"


const todoRender = (props) => {
  const {todolist} = props
  return (
    <>
      <li>
				<label htmlFor={todolist.id}>
					<input type="checkbox" name="" id={todolist.id} defaultChecked={todolist.completed_at} />
					<p>{todolist.content}</p>
				</label>
      </li>
    </>
  )
}

const TodoMenu = () => {
  const [state, setState] = useState('all')
  const stateClass = `text-[#333333] border-[#333333]`


  const changeState = (e, state) => {
    e.preventDefault()
    setState(state)
  }

  return (
    <>
      <div className="bg-white rounded-[10px]">
        <ul className="flex justify-between">
          <li className="w-1/3"><a className={`block py-4 text-center text-sm text-[#9F9A91] border-b-2 border-[#EFEFEF] ${state === 'all'? stateClass:''}`} onClick={(e)=>{changeState(e,'all')}} href="#">全部</a></li>
          <li className="w-1/3"><a className={`block py-4 text-center text-sm text-[#9F9A91] border-b-2 border-[#EFEFEF] ${state === 'active'? stateClass:''}`} onClick={(e)=>{changeState(e,'active')}} href="#">待完成</a></li>
          <li className="w-1/3"><a className={`block py-4 text-center text-sm text-[#9F9A91] border-b-2 border-[#EFEFEF] ${state === 'completed'? stateClass:''}`} onClick={(e)=>{changeState(e,'completed')}} href="#">已完成</a></li>
        </ul>
				<ul>
					<todoRender />
				</ul>
      </div>
    </>
  )
}



export default TodoMenu
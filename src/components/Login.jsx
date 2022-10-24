import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { logIn } from "../services/UserApi";
import { useAuth } from "./Context";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal)


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();
  const { setToken } = useAuth();

  const onSubmit = async (user) => {

    let data = { user };
    console.log(data)

    await logIn(data).then( (response) => {
      setToken(response.headers.authorization);
      MySwal.fire({
        icon: 'success',
        title: response.data.message ? response.data.message : '登入成功',
        text: `歡迎 ${response.data.nickname ? response.data.nickname : 'Anonymous'}`
      })
      navigate('/todolist')
      localStorage.setItem('token', response.headers.authorization)
      localStorage.setItem('nickName', response.data.nickname ? response.data.nickname : 'Anonymous')
      // console.log(response)
    }).catch((errors) => {
      MySwal.fire({
        icon: 'error',
        title: errors.response.data.error ? errors.response.data.error : '登入失敗',
      })
      // console.log(errors)
    })
  }

  

  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-6">最實用的線上代辦事項服務</h2>
        <label className="block font-bold text-sm mb-1" htmlFor="email">Email</label>
        <input className="mb-1 w-full rounded-[10px] py-3 px-4 focus:ring-4 focus:outline-0" id="email" type="text" placeholder="請輸入Email" {...register("email",{
          required: {
            value: true,
            message: '請輸入資料內容!'
          },
          pattern: {
            value: /^\S+@\S+$/i,
            message: '格式有誤!請重新輸入'
          }
        })} />
        <p className="text-[#d87355] font-bold text-sm mb-4">{errors.email?.message}</p>

        <label className="block font-bold text-sm mb-1" htmlFor="password">密碼</label>
        <input className="mb-1 w-full rounded-[10px] py-3 px-4 focus:ring-4 focus:outline-0" id="password" type="password" placeholder="請輸入密碼" {...register("password",{
          required: {
            value: true,
            message: '請輸入資料內容!'
          },
          minLength: {
            value: 6,
            message: '密碼長度至少6位字元'
          }
        })} />
        <p className="text-[#d87355] font-bold text-sm mb-6">{errors.password?.message}</p>

        <input className="bg-[#333333] py-3 px-12 font-bold text-white rounded-[10px] self-center cursor-pointer hover:ring-2" type="submit" value="登入" />
        <br />
        <Link className="font-bold self-center" to="/signup">註冊帳號</Link>
      </form>
    </>
  );
}

export default Login;
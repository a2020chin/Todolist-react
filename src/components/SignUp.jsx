import { Link , useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { signUp } from "../services/UserApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal)


const SignUp = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  let navigate = useNavigate()


    const onSubmit = async (user) => {
    let data = { user };

    await signUp(data).then((response) => {
      MySwal.fire({
        icon: 'success',
        title: response.data.message ? response.data.message : '註冊成功',
        text: `歡迎新會員 ${response.data.nickname ? response.data.nickname : 'Anonymous'}`
      })
      navigate('/')
      // console.log(response)
    }).catch((errors) => {
      MySwal.fire({
        icon: 'error',
        title: errors.response.data.message ? errors.response.data.message : '註冊失敗',
        text: errors.response.data.error ? errors.response.data.error : '格式錯誤'
      })
      console.log(errors)
    })
  }


  return(
    <>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-6">註冊帳號</h2>
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

        <label className="block font-bold text-sm mb-1" htmlFor="nickname">您的暱稱</label>
        <input className="mb-1 w-full rounded-[10px] py-3 px-4 focus:ring-4 focus:outline-0" id="nickname" type="nickname" placeholder="請輸入您的暱稱" {...register("nickname",{
          required: {
            value: true,
            message: '請輸入資料內容!'
          },
        })} />
        <p className="text-[#d87355] font-bold text-sm mb-4">{errors.nickname?.message}</p>

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
        <p className="text-[#d87355] font-bold text-sm mb-4">{errors.password?.message}</p>

        <label className="block font-bold text-sm mb-1" htmlFor="password2">再次輸入密碼</label>
        <input className="mb-1 w-full rounded-[10px] py-3 px-4 focus:ring-4 focus:outline-0" id="password2" type="password" placeholder="再次輸入密碼" {...register("password2",{
          required: {
            value: true,
            message: '請輸入資料內容!'
          },
          validate: (value) => {
            if (watch('password') != value){
              return "兩次密碼輸入不同"
            }
          }
        })} />
        <p className="text-[#d87355] font-bold text-sm mb-6">{errors.password2?.message}</p>


        <input className="bg-[#333333] py-3 px-12 font-bold text-white rounded-[10px] self-center cursor-pointer hover:ring-2" type="submit" value="註冊" />
        <br />
        <Link className="font-bold self-center" to="/">登入</Link>
      </form>
    </>
  )
}
export default SignUp;
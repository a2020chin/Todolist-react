import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';


const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
//   const onSubmit = data => {
//     const _url = "https://todoo.5xcamp.us/users/sign_in";
//     let myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     fetch(_url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             user: data
//         })
//     })
//     .then(res => {
//         console.log(res)
//         if(res.status===401){
//             throw new Error('登入失敗，請重新檢驗！');
//         }
//         setToken(res.headers.get("authorization"));
//         return res.json()
//     })
//     .then(res => {
//         navigate('/todo')
//     })
//     .catch(err=>{
//         console.log(err)
//         return MySwal.fire({
//             title: err.message,
//             })
//     })
// }
  
  return (
    <main>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-6">最實用的線上代辦事項服務</h2>
        <label className="block font-bold text-sm mb-1" for="email">Email</label>
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

        <label className="block font-bold text-sm mb-1" for="password">密碼</label>
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
    </main>
  );
}

export default Login;
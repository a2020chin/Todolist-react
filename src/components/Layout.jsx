import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <div className="bg-[#FFD370] h-screen">
        <div className="container h-screen flex flex-col justify-center items-center md:flex-row">
          <div className="text-orange-200 md:mr-24">
            <Link to='/'><img className="mb-4" src="./images/title.png" alt="" /></Link>
            <img className="hidden md:block" src="./images/main.png" alt="" />
          </div>
          <div className="w-4/5 md:w-1/5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

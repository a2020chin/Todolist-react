import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <div className="container h-screen flex justify-center items-center">
        <div className="text-orange-200 mr-24">
          <Link to='/'><img className="mb-4" src="./images/title.png" alt="" /></Link>
          <img className="hidden md:block" src="./images/main.png" alt="" />
        </div>
        <div className="w-1/5">
          <Outlet />
        </div>
      </div>
    </>
  );
}

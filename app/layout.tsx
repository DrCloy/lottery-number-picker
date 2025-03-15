import { NavLink, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <nav className="w-full flex flex-row justify-center p-4 bg-gray-800 text-white">
        <ul className="w-auto flex flex-row gap-4">
          <li className="font-bold text-xl">
            <NavLink to="/">역대 번호 조회</NavLink>
          </li>
          <li className="font-bold text-xl">
            <NavLink to="/random">무작위 번호 추첨</NavLink>
          </li>
        </ul>
      </nav>
      <main className="container mx-auto p-4 grow-1 flex flex-col">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white shrink-0">
        <p className="text-center p-4">&copy; {new Date().getFullYear()} React Router App</p>
      </footer>
    </>
  );
}

import { NavLink, Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <nav className="fixed w-full flex flex-col justify-center gap-4 p-4 bg-gray-300 dark:bg-gray-800 text-black dark:text-white">
        <h1 className="text-4xl font-bold text-center">Random Lottery</h1>
        <ul className="w-auto flex flex-row justify-center space-x-10">
          <li className="font-bold text-xl hover:underline">
            <NavLink to="/">역대 번호 조회</NavLink>
          </li>
          <li className="font-bold text-xl hover:underline">
            <NavLink to="/random">무작위 번호 추첨</NavLink>
          </li>
        </ul>
      </nav>
      <main className="container mx-auto p-4 grow-1 flex flex-col items-center mt-30">
        <Outlet />
      </main>
      <footer className="bg-gray-300 dark:bg-gray-800 text-black dark:text-white shrink-0">
        <p className="text-center p-4">&copy; {new Date().getFullYear()} React Router App</p>
      </footer>
    </>
  );
}

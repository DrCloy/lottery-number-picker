import { NavLink, Outlet } from "react-router";
import type { Route } from "./+types/layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "로또 번호 자동 생성하기" },
    { name: "description", content: "로또 번호 자동 생성 페이지" },
  ];
}

export default function Layout() {
  return (
    <>
      <nav className="fixed w-full min-w-md flex flex-col justify-center gap-4 p-4 bg-gray-300 dark:bg-gray-600 text-black dark:text-white">
        <h1 className="text-4xl font-bold text-center">Random Lottery</h1>
        <ul className="w-auto flex flex-row justify-center space-x-10">
          <li className="font-bold text-xl hover:underline">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-black dark:text-white"
              }
            >
              역대 번호 조회
            </NavLink>
          </li>
          <li className="font-bold text-xl hover:underline">
            <NavLink
              to="/random"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-black dark:text-white"
              }
            >
              무작위 번호 추첨
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="w-full grow-1 flex flex-col items-center mt-35">
        <Outlet />
      </main>
      <footer className="w-full text-sm bg-gray-300 dark:bg-gray-600 text-black dark:text-gray-300 shrink-0 mt-4">
        <p className="text-center p-4">&copy; {new Date().getFullYear()} Random Lottery</p>
      </footer>
    </>
  );
}

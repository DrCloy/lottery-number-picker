import { Form } from "react-router";
import type { Route } from "./+types/random";
import { useRef } from "react";

const useConditionRef = () => {
  const conditionIncludeRef = useRef<HTMLInputElement>(null);
  const conditionExcludeRef = useRef<HTMLInputElement>(null);
  const conditionTopRef = useRef<HTMLInputElement>(null);

  const setCondition = (name: string, checked: boolean) => {
    switch (name) {
      case "condition_include":
        if (checked && conditionTopRef.current) {
          conditionTopRef.current.checked = false;
        }
        conditionIncludeRef.current!.checked = checked;
        break;
      case "condition_exclude":
        if (checked && conditionTopRef.current) {
          conditionTopRef.current.checked = false;
        }
        conditionExcludeRef.current!.checked = checked;
        break;
      case "condition_top":
        if (checked) {
          if (conditionIncludeRef.current) conditionIncludeRef.current.checked = false;
          if (conditionExcludeRef.current) conditionExcludeRef.current.checked = false;
        }
        conditionTopRef.current!.checked = checked;
        break;
    }
  };

  return {
    conditionRef: {
      conditionIncludeRef,
      conditionExcludeRef,
      conditionTopRef,
    },
    setCondition,
  };
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Hello from Vercel" };
}

export default function Random({ loaderData }: Route.ComponentProps) {
  const { conditionRef, setCondition } = useConditionRef();

  return (
    <>
      <div className="container flex flex-col items-center">
        <h2 className="font-bold text-2xl">랜덤 번호 생성</h2>
        <div className="m-2 p-4 w-full h-50% flex flex-col bg-gray-300 dark:bg-gray-600 rounded border-2 border-gray-400 dark:border-gray-500">
          <Form className="flex flex-col">
            <div className="flex space-x-4">
              <label className="font-bold">조건을 선택해주세요</label>
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  name="condition_include"
                  value="condition_include"
                  onChange={(e) => setCondition(e.target.name, e.target.checked)}
                  ref={conditionRef.conditionIncludeRef}
                />
                <label>특정 번호 포함</label>
              </div>
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  name="condition_exclude"
                  value="condition_exclude"
                  onChange={(e) => setCondition(e.target.name, e.target.checked)}
                  ref={conditionRef.conditionExcludeRef}
                />
                <label>특정 번호 제외</label>
              </div>
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  name="condition_top"
                  value="condition_top"
                  onChange={(e) => setCondition(e.target.name, e.target.checked)}
                  ref={conditionRef.conditionTopRef}
                />
                <label>최다 당첨 번호</label>
              </div>
            </div>
            <div>
              <label>포함할 번호</label>
              <select>
                {Array.from({ length: 45 }, (_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

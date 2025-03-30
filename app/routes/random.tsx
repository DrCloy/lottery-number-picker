import { Form } from "react-router";
import type { Route } from "./+types/random";
import { useRef } from "react";
import { useObservable } from "~/useObservable";
import { di } from "~/di";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Random() {
  const lotteryService = useObservable(di.lotteryService);
  const generatedNumbers = lotteryService.getGeneratedRandomNumbers();

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
                  checked={lotteryService.getIsIncludeSelected()}
                  onChange={() => lotteryService.selectIncludeNumbers()}
                />
                <label>특정 번호 포함</label>
              </div>
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  name="condition_exclude"
                  checked={lotteryService.getIsExcludeSelected()}
                  onChange={() => lotteryService.selectExcludeNumbers()}
                />
                <label>특정 번호 제외</label>
              </div>
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  name="condition_top"
                  checked={lotteryService.getIsMostWinningSelected()}
                  onChange={() => lotteryService.selectMostWinningNumbers()}
                />
                <label>최다 당첨 번호</label>
              </div>
            </div>
            <div>
              <label>포함할 번호</label>
              <input
                type="text"
                name="include_numbers"
                value={lotteryService.getIncludedNumberString()}
                onChange={(e) => lotteryService.setIncludedNumberString(e.target.value)}
                disabled={!lotteryService.getIsIncludeSelected()}
                className="border-2 border-gray-400 dark:border-gray-500 rounded p-2 disabled:opacity-50"
                placeholder="ex) 1,2,3,4,5"
              />
              <label>제외할 번호</label>
              <input
                type="text"
                name="exclude_numbers"
                value={lotteryService.getExcludedNumberString()}
                onChange={(e) => lotteryService.setExcludedNumberString(e.target.value)}
                disabled={!lotteryService.getIsExcludeSelected()}
                className="border-2 border-gray-400 dark:border-gray-500 rounded p-2 disabled:opacity-50"
                placeholder="ex) 1,2,3,4,5"
              />
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => lotteryService.generateRandomNumbers()}
              >
                Generate Random Numbers
              </button>
            </div>
          </Form>

          {generatedNumbers.length > 0 && (
            <div className="mt-4">
              <h3 className="font-bold">생성된 번호</h3>
              <div className="flex space-x-2">
                {generatedNumbers.map((number, index) => (
                  <span key={index} className="bg-gray-200 dark:bg-gray-700 p-2 rounded">
                    {number}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

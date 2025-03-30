import { useState } from "react";
import type { LotteryModel } from "~/lotteryService";
import LotteryBall from "./LotteryBall";

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

export default function LotteryCard({ lottery }: { lottery: LotteryModel }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full flex flex-col justify-center items-center space-y-2 bg-gray-200 dark:bg-gray-800 border border-gray-400 dark:border-gray-900 p-4 rounded-lg gap-4">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-bold">{lottery.id}</h2>
        <div className="flex flex-wrap justify-center space-x-4">
          {lottery.numbers.map((number) => (
            <LotteryBall key={number} number={number} />
          ))}
        </div>
        <button className="text-lg font-bold underline" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m5 15 7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 9-7 7-7-7"
              />
            </svg>
          )}
        </button>
      </div>
      {isExpanded && (
        <div className="w-full flex flex-col items-center space-y-2">
          <p>추첨 일자: {formatDate(lottery.date)}</p>
          <p>당첨 금액: {lottery.prize.toLocaleString()}원</p>
          <p>당첨자 수: {lottery.winners.toLocaleString()}명</p>
          <p>1인 당 당첨 금액: {Math.floor(lottery.prize / lottery.winners).toLocaleString()}원</p>
        </div>
      )}
    </div>
  );
}

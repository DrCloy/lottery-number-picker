import type React from "react";

type Props = {
  number: number;
};

export default function LotteryBall({ number }: Props): React.ReactElement {
  const color =
    number <= 10
      ? "#fbc400"
      : number <= 20
        ? "#69c8f2"
        : number <= 30
          ? "#ff7272"
          : number <= 40
            ? "#aaaaaa"
            : "#b0d840";
  return (
    <div
      className="w-10 h-10 flex items-center justify-center rounded-full text-black font-bold"
      style={{ backgroundColor: color }}
    >
      {number}
    </div>
  );
}

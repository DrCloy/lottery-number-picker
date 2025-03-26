import { getLotteries } from "~/data";
import type { Route } from "./+types/home";
import LotteryCard from "~/components/LotteryCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "로또 번호 자동 생성하기" },
    { name: "description", content: "로또 번호 자동 생성 페이지" },
  ];
}

export async function loader() {
  const lotteries = await getLotteries();
  return { lotteries };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { lotteries } = loaderData;

  return (
    <div className="container flex justify-center items-center h-full w-full bg-gray-100 dark:bg-gray-600 rounded-xl p-2">
      <div className="flex flex-col items-center space-y-1 w-full">
        {lotteries.map((lottery) => (
          <LotteryCard key={lottery.id} lottery={lottery} />
        ))}
      </div>
    </div>
  );
}

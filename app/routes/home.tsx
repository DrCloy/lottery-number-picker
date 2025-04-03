import { di } from "~/di";
import LotteryCard from "~/components/LotteryCard";
import { useObservable } from "~/useObservable";

export default function Home() {
  const lotteryService = useObservable(di.lotteryService);
  const lotteries = lotteryService.getAllLotteries();

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

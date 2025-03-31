import * as LotteryData from "../db.json";
import type { LotteryModel, LotteryRepository } from "./lotteryService";

export class LotteryRepositoryImpl implements LotteryRepository {
  private lotteries: LotteryModel[] = [];

  constructor() {
    LotteryData.lottery.forEach((lottery) => {
      this.lotteries.push({
        id: lottery.id,
        date: new Date(`${lottery.drwNoDate}T00:00:00+09:00`),
        numbers: [
          lottery.drwtNo1,
          lottery.drwtNo2,
          lottery.drwtNo3,
          lottery.drwtNo4,
          lottery.drwtNo5,
          lottery.drwtNo6,
        ],
        prize: lottery.firstWinamnt,
        winners: lottery.firstPrzwnerCo,
      });
    });
  }

  public async getAllLotteries(): Promise<LotteryModel[]> {
    return this.lotteries.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  public async findLotteryByNumbers(numbers: number[]): Promise<LotteryModel | null> {
    return (
      this.lotteries.find((lottery) => lottery.numbers.join(",") === numbers.join(",")) || null
    );
  }
}

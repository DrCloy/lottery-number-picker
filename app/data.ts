export type LotteryModel = {
  id: number;
  date: Date;
  numbers: number[];
  prize: number;
  winners: number;
};

type RandomNumberCondition =
  | {
      type: "include";
      numbers: number[];
    }
  | {
      type: "exclude";
      numbers: number[];
    }
  | {
      type: "most-winning";
    };

export interface LotteryRepository {
  getAllLotteries(): Promise<LotteryModel[]>;
  findLotteryByNumbers(numbers: number[]): Promise<LotteryModel | null>;
}

export class LotteryService {
  private lotteryDB: LotteryRepository;

  constructor(lotteryDB: LotteryRepository) {
    this.lotteryDB = lotteryDB;
  }

  public async getLotteries(): Promise<LotteryModel[]> {
    return await this.lotteryDB.getAllLotteries();
  }

  public async getRandomNumbers(condition: RandomNumberCondition): Promise<number[]> {
    if (condition.type === "most-winning") {
      // Get the most winning number combination from the database
      const lotteries = await this.lotteryDB.getAllLotteries();
      const numbersCount = new Map<string, number>();

      lotteries.forEach((lottery) => {
        const key = lottery.numbers.join(",");
        numbersCount.set(key, (numbersCount.get(key) || 0) + 1);
      });

      const mostWinningNumbers = Array.from(numbersCount.entries()).sort(
        (a, b) => b[1] - a[1]
      )[0][0];
      return mostWinningNumbers.split(",").map((number) => parseInt(number, 10));
    }

    const randomNumbers = [] as number[];

    if (condition.type === "include") {
      // Include the specified numbers
      randomNumbers.push(...condition.numbers);
    }

    // Generate 6 random numbers
    while (randomNumbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;

      if (condition.type === "exclude" && condition.numbers.includes(randomNumber)) {
        // Exclude the specified numbers
        continue;
      }
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }

    // Sort the numbers in ascending order
    randomNumbers.sort((a, b) => a - b);

    // Check if the numbers already exist in the database
    const existingLottery = await this.lotteryDB.findLotteryByNumbers(randomNumbers);
    if (existingLottery) {
      // If the numbers already exist, generate new numbers
      return this.getRandomNumbers(condition);
    }

    return randomNumbers;
  }
}

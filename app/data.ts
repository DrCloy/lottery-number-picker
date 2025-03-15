import * as LotteryData from "../db.json";

export type LotteryModel = {
  id: number;
  date: Date;
  numbers: number[];
  prize: number;
  winners: number;
};

type RandomNumberCondition =
  | {
      type: "include" | "exclude";
      numbers: number[];
    }
  | {
      type: "most-winning";
    };

// In-memory database
const lotteryDB = {
  lotteries: [] as LotteryModel[],

  async getAllLotteries(): Promise<LotteryModel[]> {
    // Return all lotteries from the database, sorted by date in descending order
    return this.lotteries.sort((a, b) => b.date.getTime() - a.date.getTime());
  },

  async findLotteryByNumbers(numbers: number[]): Promise<LotteryModel | undefined> {
    // Find a lottery by its numbers
    return this.lotteries.find((lottery) => lottery.numbers.join(",") === numbers.join(","));
  },

  async createLottery(lottery: LotteryModel): Promise<void> {
    // Create a new lottery
    this.lotteries.push(lottery);
  },
};

// Functions to interact with the database
export async function getLotteries(): Promise<LotteryModel[]> {
  return await lotteryDB.getAllLotteries();
}

export async function getRandomNumbers(condition: RandomNumberCondition): Promise<number[]> {
  if (condition.type === "most-winning") {
    // Get the most winning number combination from the database
    const lotteries = await lotteryDB.getAllLotteries();
    const numbersCount = new Map<string, number>();

    lotteries.forEach((lottery) => {
      const key = lottery.numbers.join(",");
      numbersCount.set(key, (numbersCount.get(key) || 0) + 1);
    });

    const mostWinningNumbers = Array.from(numbersCount.entries()).sort((a, b) => b[1] - a[1])[0][0];
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
  const existingLottery = await lotteryDB.findLotteryByNumbers(randomNumbers);
  if (existingLottery) {
    // If the numbers already exist, generate new numbers
    return getRandomNumbers(condition);
  }

  return randomNumbers;
}

// Get lottery data from "../db.json"
LotteryData.lottery.forEach((lottery) => {
  lotteryDB.createLottery({
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

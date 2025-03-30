import { Observable } from "./observable";

export type LotteryModel = {
  id: number;
  date: Date;
  numbers: number[];
  prize: number;
  winners: number;
};

type RandomNumberCondition = {
  isMostWinning: boolean;
  isInclude: boolean;
  isExclude: boolean;
  includedNumberString: string;
  excludedNumberString: string;
};

export interface LotteryRepository {
  getAllLotteries(): Promise<LotteryModel[]>;
  findLotteryByNumbers(numbers: number[]): Promise<LotteryModel | null>;
}

export class LotteryService extends Observable {
  private lotteryDB: LotteryRepository;
  private lotteryListCache: LotteryModel[] = [];
  private condition: RandomNumberCondition = {
    isMostWinning: false,
    isInclude: false,
    isExclude: false,
    includedNumberString: "",
    excludedNumberString: "",
  };
  private generatedRandomNumbers: number[] = [];

  constructor(lotteryDB: LotteryRepository) {
    super();
    this.lotteryDB = lotteryDB;
  }

  private isNumberStringValid(numberString: string): boolean {
    // Only accept numbers, spaces, commas
    const regex = /^[0-9\s,]*$/;
    const test = regex.test(numberString);
    if (!test) return false;

    // Parse
    const numbers = numberString
      .split(",")
      .map((num) => num.trim())
      .filter((num) => num !== "")
      .map((num) => parseInt(num, 10))
      .filter((num) => !isNaN(num));

    // Check if numbers all numbers are between 1 and 45
    const isValid = numbers.every((num) => num >= 1 && num <= 45);
    if (!isValid) return false;

    return true;
  }

  private async getRandomNumbers(): Promise<number[]> {
    // if (condition.type === "most-winning") {
    //   // Get the most winning number combination from the database
    //   const lotteries = await this.lotteryDB.getAllLotteries();
    //   const numbersCount = new Map<string, number>();

    //   lotteries.forEach((lottery) => {
    //     const key = lottery.numbers.join(",");
    //     numbersCount.set(key, (numbersCount.get(key) || 0) + 1);
    //   });

    //   const mostWinningNumbers = Array.from(numbersCount.entries()).sort(
    //     (a, b) => b[1] - a[1]
    //   )[0][0];
    //   return mostWinningNumbers.split(",").map((number) => parseInt(number, 10));
    // }

    // const randomNumbers = [] as number[];

    // if (condition.type === "include") {
    //   // Include the specified numbers
    //   randomNumbers.push(...condition.numbers);
    // }

    // // Generate 6 random numbers
    // while (randomNumbers.length < 6) {
    //   const randomNumber = Math.floor(Math.random() * 45) + 1;

    //   if (condition.type === "exclude" && condition.numbers.includes(randomNumber)) {
    //     // Exclude the specified numbers
    //     continue;
    //   }
    //   if (!randomNumbers.includes(randomNumber)) {
    //     randomNumbers.push(randomNumber);
    //   }
    // }

    // // Sort the numbers in ascending order
    // randomNumbers.sort((a, b) => a - b);

    // // Check if the numbers already exist in the database
    // const existingLottery = await this.lotteryDB.findLotteryByNumbers(randomNumbers);
    // if (existingLottery) {
    //   // If the numbers already exist, generate new numbers
    //   return this.getRandomNumbers(condition);
    // }

    // return randomNumbers;
    return [2, 4, 6, 8, 10, 12]; // Placeholder for testing
  }

  //============================

  public getAllLotteries(): LotteryModel[] {
    if (this.lotteryListCache.length === 0) {
      this.lotteryDB.getAllLotteries().then((lotteries) => {
        this.lotteryListCache = lotteries;
        this.notify();
      });
    }
    return this.lotteryListCache;
  }

  public async generateRandomNumbers(): Promise<void> {
    const numbers = await this.getRandomNumbers();
    this.generatedRandomNumbers = numbers;
    this.notify();
  }

  //============================

  public selectIncludeNumbers() {
    this.condition.isMostWinning = false;
    this.condition.isInclude = !this.condition.isInclude;
    this.notify();
  }

  public getIsIncludeSelected() {
    return this.condition.isInclude;
  }

  public getIncludedNumberString() {
    return this.condition.includedNumberString;
  }

  public setIncludedNumberString(value: string) {
    if (!this.isNumberStringValid(value)) return;
    this.condition.includedNumberString = value;
    this.notify();
  }

  public selectExcludeNumbers() {
    this.condition.isMostWinning = false;
    this.condition.isExclude = !this.condition.isExclude;
    this.notify();
  }

  public getIsExcludeSelected() {
    return this.condition.isExclude;
  }

  public getExcludedNumberString() {
    return this.condition.excludedNumberString;
  }

  public setExcludedNumberString(value: string) {
    if (!this.isNumberStringValid(value)) return;
    this.condition.excludedNumberString = value;
    this.notify();
  }

  public selectMostWinningNumbers() {
    this.condition.isMostWinning = !this.condition.isMostWinning;
    if (this.condition.isMostWinning) {
      this.condition.isInclude = false;
      this.condition.isExclude = false;
    }
    this.notify();
  }

  public getIsMostWinningSelected() {
    return this.condition.isMostWinning;
  }

  public getGeneratedRandomNumbers() {
    return this.generatedRandomNumbers;
  }
}

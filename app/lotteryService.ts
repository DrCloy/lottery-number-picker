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
  includedNumbers: number[];
  excludedNumbers: number[];
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
    includedNumbers: [],
    excludedNumbers: [],
  };
  private generatedRandomNumbers: number[] = [];

  constructor(lotteryDB: LotteryRepository) {
    super();
    this.lotteryDB = lotteryDB;
  }

  private async getRandomNumbers(): Promise<number[]> {
    const lotteries = await this.lotteryDB.getAllLotteries();

    if (this.condition.isMostWinning) {
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

    const randomNumbers: number[] = [];
    if (this.condition.isInclude) {
      randomNumbers.push(...this.condition.includedNumbers.filter((num) => num !== 0));
    }

    while (randomNumbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;

      if (this.condition.isExclude && this.condition.excludedNumbers.includes(randomNumber)) {
        continue;
      }

      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }

    return randomNumbers.sort((a, b) => a - b);
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

  public getIncludedNumbers() {
    return this.condition.includedNumbers;
  }

  public setIncludedNumbers(value: number[]) {
    this.condition.includedNumbers = value;
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

  public getExcludedNumbers() {
    return this.condition.excludedNumbers;
  }

  public setExcludedNumbers(value: number[]) {
    this.condition.excludedNumbers = value;
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

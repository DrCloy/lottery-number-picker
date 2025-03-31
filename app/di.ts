import { LotteryService, type LotteryRepository } from "./lotteryService";
import { LotteryRepositoryImpl } from "./lotteryRepositoryImpl";

const lotteryRepository: LotteryRepository = new LotteryRepositoryImpl();
const lotteryService = new LotteryService(lotteryRepository);

export const di = {
  lotteryService,
  lotteryRepository,
};

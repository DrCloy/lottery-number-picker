import { LotteryService, type LotteryRepository } from "./data";
import { LotteryRepositoryImpl } from "./lotteryRepositoryImpl";

const lotteryRepository: LotteryRepository = new LotteryRepositoryImpl();
export const lotteryService = new LotteryService(lotteryRepository);

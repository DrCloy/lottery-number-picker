import { useObservable } from "~/useObservable";
import { di } from "~/di";
import LotteryBall from "~/components/LotteryBall";

const LotteryNumberSelect = ({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled: boolean;
}) => {
  return (
    <select
      className="border-2 border-gray-400 dark:border-gray-500 rounded p-2 disabled:opacity-50"
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {[...Array(46).keys()].map((num) => (
        <option key={num} value={num}>
          {num === 0 ? "---" : num}
        </option>
      ))}
    </select>
  );
};

const LotteryNumberSelectBar = ({
  numbers,
  onChange,
  disabled,
}: {
  numbers: number[];
  onChange: (numbers: number[]) => void;
  disabled: boolean;
}) => {
  return (
    <div className="flex space-x-2">
      {[...Array(6).keys()].map((index) => (
        <LotteryNumberSelect
          key={index}
          value={numbers[index]}
          onChange={(e) => {
            const newNumbers = [...numbers];
            newNumbers[index] = parseInt(e.target.value, 10);
            onChange(newNumbers);
          }}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default function Random() {
  const lotteryService = useObservable(di.lotteryService);
  const generatedNumbers = lotteryService.getGeneratedRandomNumbers();

  return (
    <>
      <div className="container flex flex-col items-center">
        <h2 className="font-bold text-2xl">무작위 번호 추첨</h2>
        <div className="m-2 p-4 w-full h-50% flex flex-col bg-gray-300 dark:bg-gray-600 rounded border-2 border-gray-400 dark:border-gray-500">
          <div className="flex flex-col">
            <div className="flex space-x-4">
              <label className="font-bold">조건을 선택해주세요</label>
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  name="condition_include"
                  checked={lotteryService.getIsIncludeSelected()}
                  onChange={() => lotteryService.selectIncludeNumbers()}
                />
                <label>특정 번호 포함</label>
              </div>
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  name="condition_exclude"
                  checked={lotteryService.getIsExcludeSelected()}
                  onChange={() => lotteryService.selectExcludeNumbers()}
                />
                <label>특정 번호 제외</label>
              </div>
              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  name="condition_top"
                  checked={lotteryService.getIsMostWinningSelected()}
                  onChange={() => lotteryService.selectMostWinningNumbers()}
                />
                <label>최다 당첨 번호</label>
              </div>
            </div>
            <div className="flex flex-col space-y-2 mt-4">
              <label className="font-semibold" htmlFor="lottery_numbers">
                포함할 번호
              </label>
              <LotteryNumberSelectBar
                numbers={lotteryService.getIncludedNumbers()}
                onChange={(newNumbers) => lotteryService.setIncludedNumbers(newNumbers)}
                disabled={!lotteryService.getIsIncludeSelected()}
              />
              <label className="font-semibold mt-4" htmlFor="lottery_numbers">
                제외할 번호
              </label>
              <LotteryNumberSelectBar
                numbers={lotteryService.getExcludedNumbers()}
                onChange={(newNumbers) => lotteryService.setExcludedNumbers(newNumbers)}
                disabled={!lotteryService.getIsExcludeSelected()}
              />
            </div>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => lotteryService.generateRandomNumbers()}
            >
              번호 생성하기
            </button>
          </div>

          {generatedNumbers.length > 0 && (
            <div className="mt-4">
              <h3 className="font-bold">생성된 번호</h3>
              <div className="flex space-x-2 mt-2">
                {generatedNumbers.map((number, index) => (
                  <LotteryBall key={index} number={number} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

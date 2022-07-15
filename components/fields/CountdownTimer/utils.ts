import type { timeRemainingStruct } from "@components/fields/CountdownTimer/types";

export const getFutureTime = (minutesInTheFuture: number): number => {
  const futureDate = new Date();
  const millisecondsInFuture = minutesInTheFuture * 60 * 1000;
  futureDate.setTime(futureDate.getTime() + millisecondsInFuture);
  return futureDate.getTime();
};

export const calculateTimeRemaining = (
  timeElapsed: number
): timeRemainingStruct => ({
  minutes: Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60))
    .toFixed()
    .padStart(2, "0"),
  seconds: Math.floor((timeElapsed % (1000 * 60)) / 1000)
    .toFixed()
    .padStart(2, "0"),
  milliseconds: (timeElapsed % 1000).toFixed().padStart(3, "0"),
});

export const calculatePercentageRemaining = (
  timeElapsedInMilliseconds: number,
  totalMilliseconds: number,
  timeInMinutes: number
): number => {
  const ratioBetweenTimes = timeElapsedInMilliseconds % totalMilliseconds;

  return (ratioBetweenTimes / (60 * 1000 * timeInMinutes)) * 100;
};

export const formatTimeRemaining = (timeRemaining: timeRemainingStruct) => `
${
  timeRemaining.minutes !== "00"
    ? parseInt(timeRemaining.minutes).toString() +
      " minute" +
      (timeRemaining.minutes !== "01" ? "s" : "")
    : ""
}
${
  timeRemaining.seconds !== "00"
    ? (parseInt(timeRemaining.minutes) !== 0 ? " and " : "") +
      parseInt(timeRemaining.seconds).toString() +
      " second" +
      (timeRemaining.seconds !== "01" ? "s" : "")
    : ""
} 
 remaining 
`;

export function generateAssistiveText(timeRemaining: timeRemainingStruct) {
  const parsedMinutes = parseInt(timeRemaining.minutes);
  const parsedSeconds = parseInt(timeRemaining.seconds);

  const secondsIntervals = [30, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  if (parsedMinutes >= 1) {
    return `${parsedMinutes + 1} minutes remaining`;
  } else if (secondsIntervals.includes(parsedSeconds)) {
    if (parsedSeconds === 0) {
      return "Countdown complete";
    }
    return `${parsedSeconds} second${parsedSeconds !== 1 ? "s" : ""} remaining`;
  }
  return "";
}

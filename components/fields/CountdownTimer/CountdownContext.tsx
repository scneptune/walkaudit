import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
} from "react";

import {
  calculatePercentageRemaining,
  calculateTimeRemaining,
  getFutureTime,
} from "@components/fields/CountdownTimer/utils";

import type {
  CountdownClockProps,
  CountdownContextProps,
} from "@components/fields/CountdownTimer/types";
import type { MutableRefObject } from "react";

const CountdownContext = createContext<CountdownContextProps>({
  percentTilComplete: 0,
  timeRemaining: {
    minutes: "00",
    seconds: "00",
    milliseconds: "000",
  },
  countdownActive: false,
  setCountdownStatus: function () {},
  resetCountdown: function () {},
});

export function CountdownProvider({
  countdownTimeInMinutes,
  onCountdownEnd,
  onCountdownReset,
  onCountdownStart,
  clockId,
  children,
}: CountdownClockProps) {
  const requestRef = useRef() as MutableRefObject<number>;

  const [countdownActive, setCountdownStatus] = useState(false);

  /**
   * This is the countdownTime converted from minutes to milliseconds
   */
  const millisecondsFromCountdownTime = useMemo(
    () => countdownTimeInMinutes * (60 * 1000),
    [countdownTimeInMinutes]
  );
  /**
   * This is the relative amount of time that must pass
   * from now until when the timer is expired,
   * ie.
   * if now is 5:30pm and 5 minutes is our countdownTime,
   * this variable represents the time as 5:35pm in milliseconds
   */
  const millisecondsRelativeToCountdownTime = useMemo(
    () => getFutureTime(countdownTimeInMinutes),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countdownTimeInMinutes, countdownActive]
  );

  const [percentTilComplete, setPercentComplete] = useState(100);
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(millisecondsFromCountdownTime)
  );

  const countdown = useCallback(() => {
    const currentTimeInMilliseconds = new Date().getTime();

    const timeElapsedInMilliseconds =
      millisecondsRelativeToCountdownTime - currentTimeInMilliseconds;

    if (timeElapsedInMilliseconds < 0) {
      /**
       * We don't need to be hyper accurate with counting down to the last millisecond
       * this is just a timer for helping users count people, not an accurate stopwatch,
       * so I'm going to reset the counter close to when the time is up
       * and your are within milliseconds of the end.
       */

      setTimeRemaining(calculateTimeRemaining(0));
      setPercentComplete(0);
      cancelAnimationFrame(requestRef.current);
      if (typeof onCountdownEnd !== "undefined") {
        onCountdownEnd();
      }
      return;
    }

    const timeRemainingClock = calculateTimeRemaining(
      timeElapsedInMilliseconds
    );

    setTimeRemaining(timeRemainingClock);

    const percentageRemaining = calculatePercentageRemaining(
      timeElapsedInMilliseconds,
      millisecondsFromCountdownTime,
      countdownTimeInMinutes
    );

    setPercentComplete(percentageRemaining);

    requestRef.current = requestAnimationFrame(countdown);
  }, [
    millisecondsRelativeToCountdownTime,
    millisecondsFromCountdownTime,
    countdownTimeInMinutes,
    onCountdownEnd,
  ]);

  useEffect(() => {
    if (countdownActive) {
      if (onCountdownStart) {
        onCountdownStart();
      }
      requestRef.current = requestAnimationFrame(countdown);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [countdown, countdownActive, onCountdownStart]);

  const resetCountdown = () => {
    setPercentComplete(100);
    setTimeRemaining(calculateTimeRemaining(millisecondsFromCountdownTime));
    setCountdownStatus(false);
    if (typeof onCountdownReset === "function") {
      onCountdownReset();
    }
  };

  const countdownContextValue: CountdownContextProps = {
    timeRemaining,
    percentTilComplete,
    setCountdownStatus,
    countdownActive,
    clockId,
    resetCountdown,
  };

  return (
    <CountdownContext.Provider value={countdownContextValue}>
      {children}
    </CountdownContext.Provider>
  );
}

export default CountdownContext;

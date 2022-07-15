import type { Dispatch, ReactNode, SetStateAction } from "react";

export type timeRemainingStruct = {
  minutes: string;
  seconds: string;
  milliseconds: string;
};

export interface CountdownContextProps {
  percentTilComplete: number;
  timeRemaining: timeRemainingStruct;
  setCountdownStatus: Dispatch<SetStateAction<boolean>>;
  resetCountdown: () => void;
  countdownActive: boolean;
  clockId?: string;
}

export interface CountdownClockProps {
  countdownTimeInMinutes: number;
  onCountdownEnd?: () => void;
  onCountdownReset?: () => void;
  onCountdownStart?: () => void;
  children: ReactNode;
  clockId?: string | "counterClock";
}

export interface CountdownTimerProps {
  countdownInMinutes: number | 5;
  clockId: string;
  onCountdownReset?: () => void;
  onCountdownStart?: () => void;
  onCountdownEnd?: () => void;
}

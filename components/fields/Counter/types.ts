import type { AriaNumberFieldProps } from "@react-types/numberfield";

export type CounterState = [
  currentCounterState: number,
  setCounterState: () => Promise<void>
];

export interface CounterProps extends AriaNumberFieldProps {}

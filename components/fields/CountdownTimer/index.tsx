import styled from "@emotion/styled";
import React, { useState } from "react";

import AccessibilityAnnouncement from "@components/fields/CountdownTimer/AccessibilityAnnouncement";
import Countdown, {
  CountdownProvider,
} from "@components/fields/CountdownTimer/CountdownContext";
import CountdownControls from "@components/fields/CountdownTimer/CountdownControls";

import CircularClock from "./CircularClock";

import type { CountdownTimerProps } from "@components/fields/CountdownTimer/types";

export default function CountdownTimer({
  countdownInMinutes = 5,
  clockId = "countdownTimer-1",
  onCountdownStart,
  onCountdownReset,
  onCountdownEnd,
}: CountdownTimerProps) {
  return (
    <CountdownProvider
      countdownTimeInMinutes={countdownInMinutes}
      clockId={clockId}
      onCountdownStart={onCountdownStart}
      onCountdownReset={onCountdownReset}
      onCountdownEnd={onCountdownEnd}
    >
      <CircularClock />
      <CountdownControls />
      <AccessibilityAnnouncement />
    </CountdownProvider>
  );
}

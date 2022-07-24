import React, { useState } from "react";

import styled from "@emotion/styled";
import Countdown, {
  CountdownProvider,
} from "@components/fields/CountdownTimer/CountdownContext";

import CircularClock from "./CircularClock";
import AccessibilityAnnouncement from "@components/fields/CountdownTimer/AccessibilityAnnouncement";
import { CountdownTimerProps } from "@components/fields/CountdownTimer/types";
import CountdownControls from "@components/fields/CountdownTimer/CountdownControls";

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

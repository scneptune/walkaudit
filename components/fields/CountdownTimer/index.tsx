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
  onCountdownEnd,
}: CountdownTimerProps) {
  return (
    <CountdownProvider
      countdownTimeInMinutes={countdownInMinutes}
      clockId={clockId}
      onCountdownEnd={onCountdownEnd}
    >
      <AccessibilityAnnouncement />
      <CircularClock />
      <CountdownControls />
    </CountdownProvider>
  );
}

// const Container = styled("div")`
//   padding: 1em 0em;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   @media only screen and (min-width: 600px) {
//     flex-direction: row;
//     align-items: center;
//   }
// `;

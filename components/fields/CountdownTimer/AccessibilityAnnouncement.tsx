import React, { useContext, useEffect, useState } from "react";
import CountdownContext from "@components/fields/CountdownTimer/CountdownContext";
import {
  formatTimeRemaining,
  generateAssistiveText,
} from "@components/fields/CountdownTimer/utils";
import styled from "@emotion/styled";

export default function AccessibilityAnnouncement() {
  const { timeRemaining, clockId, countdownActive } =
    useContext(CountdownContext);

  const [assistiveText, setAssistiveText] = useState<string>("");

  useEffect(() => {
    if (countdownActive) {
      setAssistiveText(generateAssistiveText(timeRemaining));
    }
  }, [timeRemaining?.minutes, timeRemaining?.seconds, countdownActive]);

  const hasAssistiveText = assistiveText !== "";

  return (
    <HiddenAccessibleLiveRegion
      role={hasAssistiveText ? "alert" : "timer"}
      aria-live={hasAssistiveText ? "assertive" : undefined}
      id={clockId}
    >
      {hasAssistiveText ? assistiveText : formatTimeRemaining(timeRemaining)}
    </HiddenAccessibleLiveRegion>
  );
}

const HiddenAccessibleLiveRegion = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

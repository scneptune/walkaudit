import React, { useCallback, useContext } from "react";
import { CountdownContextProps } from "@components/fields/CountdownTimer/types";
import CountdownContext from "@components/fields/CountdownTimer/CountdownContext";
import Icon from "@components/atoms/Icon";
import styled from "@emotion/styled";
import Button from "@components/atoms/Button";
import { FontSizeScale } from "@components/theming";

export default function CountdownControls(): JSX.Element {
  const { setCountdownStatus, clockId, countdownActive, resetCountdown } =
    useContext<CountdownContextProps>(CountdownContext);

  const handleTimerStart = useCallback(
    (_ev: any) => {
      setCountdownStatus((value: boolean) => !value);
      if (countdownActive) {
        resetCountdown();
      }
    },
    [countdownActive]
  );

  return (
    <ControlContainer>
      <StopwatchButton aria-controls={clockId} onPress={handleTimerStart}>
        <Icon
          title={countdownActive ? "pause icon" : "play icon"}
          iconName={countdownActive ? "av_timer" : "play_circle_filled"}
          width="40px"
          height="40px"
        />
        <span>{countdownActive ? "Reset Timer" : "Start Timer"}</span>
      </StopwatchButton>
    </ControlContainer>
  );
}

const ControlContainer = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ResetButton = styled(Button)`
  justify-content: space-between;
  margin: 1em;
  font-size: ${FontSizeScale.Body};
  & > * {
    display: flex;
    padding-left: 5px;
    padding-right: 5px;
  }
`;

const StopwatchButton = styled(Button)`
  justify-content: space-between;
  margin: 1em;
  font-size: ${FontSizeScale.Body};
  & > * {
    display: flex;
    padding-left: 5px;
    padding-right: 5px;
  }
`;

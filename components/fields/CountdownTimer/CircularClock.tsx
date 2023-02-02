import styled from "@emotion/styled";
import React, { useCallback, useContext } from "react";

import CountdownContext from "@components/fields/CountdownTimer/CountdownContext";
import { ColorThemes, FontSizeScale } from "@components/theming";

import type { CountdownContextProps } from "@components/fields/CountdownTimer/types";

export default function CircularClock(): JSX.Element {
  const { timeRemaining, clockId, percentTilComplete }: CountdownContextProps =
    useContext(CountdownContext);
  const circleProgress: number =
    440 - Math.round((440 * percentTilComplete) / 100);

  return (
    <OuterContainer>
      <SvgContainer>
        <title>Countdown Circlular Clock</title>
        <SvgProgressCircleBg cx="80" cy="80" r="70" />
        <SvgProgressCircle
          cx="80"
          cy="80"
          r="70"
          style={{ strokeDashoffset: circleProgress }}
        />
      </SvgContainer>
      <TimeStamp className={percentTilComplete === 0 ? "timesUp" : undefined}>
        <TimeUnit>{timeRemaining.minutes}</TimeUnit>
        <TimeUnitSeperator>:</TimeUnitSeperator>
        <TimeUnit>{timeRemaining.seconds}</TimeUnit>
        <TimeUnitSeperator>:</TimeUnitSeperator>
        <TimeUnitSuperSet>{timeRemaining.milliseconds}</TimeUnitSuperSet>
      </TimeStamp>
    </OuterContainer>
  );
}

const OuterContainer = styled("div")`
  position: relative;
  width: 170px;
  height: 170px;
  margin: 1em;
  transform: rotate(-90deg);
`;

const SvgContainer = styled("svg")`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SvgProgressCircle = styled("circle")`
  width: 100%;
  height: 100%;
  fill: none;
  stroke-width: 20;
  stroke-dasharray: 440;
  stroke-dashoffset: 440;
  stroke: ${ColorThemes.BrandSwatches.Base};
  stroke-linecap: round;
  transform: translate(5px, 5px);
  filter: drop-shadow(0 0 2px ${ColorThemes.BrandSwatches.Base});
  transition: stroke-dashoffset 1ms ease-in-out;
  position: relative;
  z-index: 1;
`;

const SvgProgressCircleBg = styled(SvgProgressCircle)`
  stroke-dashoffset: 0;
  stroke: #d0dde7;
  z-index: 0;
  position: relative;
  filter: none;
`;

const TimeStamp = styled("span")`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 0.25em 0.5em;
  color: ${ColorThemes.BaseSwatches.Black.Base};
  border-radius: 0.25em;
  transform: translate(-50%, -50%) rotate(90deg);
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;

  @keyframes heartBeat {
    0% {
      transform: translate(-50%, -50%) rotate(90deg) scale(1);
    }

    14% {
      transform: translate(-50%, -50%) rotate(90deg) scale(1.3);
    }

    28% {
      transform: translate(-50%, -50%) rotate(90deg) scale(1);
    }

    42% {
      transform: translate(-50%, -50%) rotate(90deg) scale(1.3);
    }

    70% {
      transform: translate(-50%, -50%) rotate(90deg) scale(1);
    }
  }

  &.timesUp {
    animation-name: heartBeat;
    animation-duration: 1.3s;
    animation-timing-function: ease-in-out;
  }
`;

const TimeUnit = styled("span")`
  display: flex;
  font-size: ${FontSizeScale.Heading5};
  line-height: 1.25;
  font-weight: 700;
  font-family: "Lato", "system-ui", sans-serif;
`;

const TimeUnitSeperator = styled(TimeUnit)`
  margin: 0 0.125em;
`;

const TimeUnitSuperSet = styled(TimeUnit)`
  font-weight: 500;
  font-size: ${FontSizeScale.Body};
  align-self: center;
`;

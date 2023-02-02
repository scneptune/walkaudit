import styled from "@emotion/styled";
import { useNumberFieldState } from "@react-stately/numberfield";
import React, { MutableRefObject, useRef } from "react";
import { useButton, useLocale, useNumberField } from "react-aria";

import { ColorThemes, FontSizeScale } from "@components/theming";

import type { CounterProps } from "@components/fields/Counter/types";
import type { RefObject } from "react";
import type { NumberFieldState } from "react-stately";

export default function Counter(props: CounterProps) {
  const inputRef = useRef() as RefObject<HTMLInputElement>;
  const incrementRef = useRef() as RefObject<HTMLButtonElement>;
  const decrementRef = useRef() as RefObject<HTMLButtonElement>;

  const { locale } = useLocale();

  const state: NumberFieldState = useNumberFieldState({ ...props, locale });

  const {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props, state, inputRef);

  const { buttonProps: incrementProps } = useButton(
    incrementButtonProps,
    incrementRef
  );

  const { buttonProps: decrementProps } = useButton(
    decrementButtonProps,
    decrementRef
  );

  return (
    <CounterContainer>
      <CounterLabel {...labelProps}>{props.label}</CounterLabel>
      <CounterFieldGroup {...groupProps}>
        <IconButton {...incrementProps} ref={incrementRef}>
          <span>+ 1</span>
        </IconButton>
        <CounterFieldInput {...inputProps} ref={inputRef} />
        <IconButton {...decrementProps} ref={decrementRef}>
          <span>- 1</span>
        </IconButton>
      </CounterFieldGroup>
    </CounterContainer>
  );
}

const CounterContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

const CounterLabel = styled("label")`
  max-width: 180px;
  width: 100%;
  display: inline-flex;
  margin: 1em;
`;

const CounterFieldGroup = styled("div")`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  max-width: 180px;
`;

const IconButton = styled("button")`
  align-items: center;
  appearance: none;
  background-color: #fff;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  box-sizing: border-box;
  color: ${ColorThemes.BaseSwatches.Black.Base};
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-size: ${FontSizeScale.Heading5};
  font-weight: 500;
  height: 48px;
  justify-content: center;
  letter-spacing: 0.25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 2px 24px;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;

  will-change: transform, opacity;
  z-index: 0;

  &:hover {
    background: #f6f9fe;
    color: ${ColorThemes.BrandSwatches.Base};
    font-weight: 700;
  }

  &:active {
    box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%),
      0 8px 12px 6px rgb(60 64 67 / 15%);
    outline: none;
  }

  &:focus {
    outline: none;
    border: 2px solid #4285f4;
  }

  &:not(:disabled) {
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
      rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
  }

  &:not(:disabled):hover {
    box-shadow: rgba(60, 64, 67, 0.3) 0 2px 3px 0,
      rgba(60, 64, 67, 0.15) 0 6px 10px 4px;
  }

  &:not(:disabled):focus {
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
      rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
  }

  &:not(:disabled):active {
    box-shadow: rgba(60, 64, 67, 0.3) 0 4px 4px 0,
      rgba(60, 64, 67, 0.15) 0 8px 12px 6px;
  }

  &:disabled {
    background-color: #c3c3c3;
    color: #ffffff;
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
      rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
  }
`;

const CounterFieldInput = styled("input")`
  font-size: ${FontSizeScale.Heading4};
  font-weight: 700;
  line-height: 1.5;
  padding: 0.5em 1em;
  border-radius: 6px;
  margin: 1em 0;
  text-align: center;
  width: auto;
  max-width: 100%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
`;

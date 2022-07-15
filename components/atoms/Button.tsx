import React, { AriaAttributes, forwardRef, LegacyRef, RefObject } from "react";
import styled from "@emotion/styled";
import { ColorThemes, FontSizeScale } from "@components/theming";
import { useButton } from "react-aria";
import { AriaButtonProps } from "@react-types/button";

type ButtonRef = RefObject<HTMLElement>;

export interface ButtonProps extends AriaButtonProps {
  className?: string | undefined;
}

const Button = forwardRef<ButtonRef, ButtonProps>(function Button(props, ref) {
  const { buttonProps } = useButton(props, ref as ButtonRef);
  return (
    <ButtonStyle
      {...buttonProps}
      className={props.className}
      ref={ref as LegacyRef<HTMLButtonElement>}
    >
      {props.children}
    </ButtonStyle>
  );
});

const ButtonStyle = styled("button")`
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

export default Button;

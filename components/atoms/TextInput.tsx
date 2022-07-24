import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { ColorThemes, FontSizeScale } from "@components/theming";
import { useTextField } from "react-aria";
import type { ForwardedRef, LegacyRef, RefObject, ReactNode } from "react";
import type { AriaTextFieldOptions } from "@react-aria/textfield";

type LayoutType = "horizontal" | "vertical";

interface InputComponentProps extends AriaTextFieldOptions<"input"> {
  layout?: LayoutType;
  children?: ReactNode;
}

const TextInput = forwardRef<ForwardedRef<HTMLInputElement>, InputComponentProps>(
  function TextInput(props, ref) {
    const { label, layout = "vertical" } = props;
    const { labelProps, inputProps, descriptionProps, errorMessageProps } =
      useTextField(props, ref as RefObject<HTMLInputElement>);
    return (
      <FieldWrapper layout={layout}>
        <Label {...labelProps}>{label}</Label>
        {props.children ? (
          <InputChildCombo
            className={inputProps.disabled ? "disabled" : undefined}
            ref={ref as LegacyRef<HTMLDivElement>}
          >
            <InputUnstyled {...inputProps} />
            {props.children}
          </InputChildCombo>
        ) : (
          <InputStyled
            {...inputProps}
            ref={ref as LegacyRef<HTMLInputElement>}
          />
        )}

        {props.description && (
          <InputDescription {...descriptionProps}>
            {props.description}
          </InputDescription>
        )}
        {props.errorMessage && (
          <InputErrorMessage {...errorMessageProps}>
            {props.errorMessage}
          </InputErrorMessage>
        )}
      </FieldWrapper>
    );
  }
);

const FieldWrapper = styled("div")<{ layout: LayoutType }>`
  display: flex;
  flex-direction: ${({ layout }) => (layout === "vertical" ? "column" : "row")};
  align-content: center;
  position: relative;
  margin: 1.75em 0 1em;
  width: 100%;
`;

const Label = styled("label")`
  display: inline-flex;
  font-size: ${FontSizeScale.Body};
  color: ${ColorThemes.BaseSwatches.Black.Base};
  line-height: 1.5em;
  margin-bottom: 0.75em;
`;

const InputStyled = styled("input")`
  align-items: center;
  appearance: none;
  background-color: ${ColorThemes.BaseSwatches.White.Lighter};
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  box-sizing: border-box;
  color: ${ColorThemes.BaseSwatches.Black.Base};
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-size: ${FontSizeScale.Body};
  font-weight: 400;
  justify-content: center;
  letter-spacing: 0.25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 1em 1em;
  position: relative;
  text-align: left;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
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
    background-color: ${ColorThemes.BaseSwatches.White.Darker};
    color: ${ColorThemes.BaseSwatches.White.Lighter};
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
      rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
  }
`;

const InputChildCombo = styled("div")`
  align-items: center;
  appearance: none;
  background-color: ${ColorThemes.BaseSwatches.White.Lighter};
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0 6px 10px 0, rgba(0, 0, 0, 0.12) 0 1px 18px 0;
  box-sizing: border-box;
  color: ${ColorThemes.BaseSwatches.Black.Base};
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-size: ${FontSizeScale.Body};
  font-weight: 400;
  justify-content: space-between;
  letter-spacing: 0.25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 0.5em 0.65em;
  position: relative;
  text-align: left;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 15ms linear 30ms, transform 270ms cubic-bezier(0, 0, 0.2, 1) 0ms;
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

  &:not(.disabled) {
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
      rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
  }

  &:not(.disabled):hover {
    box-shadow: rgba(60, 64, 67, 0.3) 0 2px 3px 0,
      rgba(60, 64, 67, 0.15) 0 6px 10px 4px;
  }

  &:not(.disabled):focus {
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
      rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
  }

  &:not(.disabled):active {
    box-shadow: rgba(60, 64, 67, 0.3) 0 4px 4px 0,
      rgba(60, 64, 67, 0.15) 0 8px 12px 6px;
  }

  &.disabled {
    background-color: ${ColorThemes.BaseSwatches.White.Darker};
    color: ${ColorThemes.BaseSwatches.White.Lighter};
    box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
      rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
  }
`;

const InputUnstyled = styled("input")`
  appearance: none;
  background: transparent;
  outline: none;
  border: none;
  color: currentColor;
  font-size: inherit;
  &:focus {
    outline: none;
  }
  &:disabled {
    background: transparent;
  }
`;

const InputDescription = styled("div")`
  display: inline-flex;
  margin: 0.75em 0;
  color: ${ColorThemes.BaseSwatches.Black.Lighter};
  font-size: ${FontSizeScale.Small};
  font-weight: 400;
  width: 100%;
`;

const InputErrorMessage = styled("div")`
  display: inline-flex;
  font-weight: 700;
  margin: 0.75em 0;
  width: 100%;
  color: ${ColorThemes.StateSwatches.Failure};
  font-size: ${FontSizeScale.Body};
  letter-spacing: 2.5px;
`;

export default TextInput;

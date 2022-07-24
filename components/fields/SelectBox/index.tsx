import React, { RefObject, useRef } from "react";

import styled from "@emotion/styled";
import {
  HiddenSelect,
  useButton,
  useFocusRing,
  useSelect,
  mergeProps,
} from "react-aria";
import { useSelectState } from "react-stately";
import SelectList from "@components/fields/SelectBox/SelectList";
import type {
  SelectFieldButtonProps,
  SelectBoxProps,
} from "@components/fields/SelectBox/types";
import Icon from "@components/atoms/Icon";
import { FontSizeScale, ColorThemes } from "@components/theming";

export default function Select(props: SelectBoxProps) {
  const state = useSelectState(props);
  const ref = useRef() as RefObject<HTMLButtonElement>;
  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref
  );
  const { buttonProps } = useButton(triggerProps, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <FieldWrapper>
      <label {...labelProps}>{props.label}</label>
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props?.name}
      />
      <SelectFieldButton
        {...mergeProps(buttonProps, focusProps)}
        isFocusVisible={isFocusVisible}
        isOpen={state.isOpen}
        ref={ref}
      >
        <SelectFieldValue {...valueProps}>
          {state.selectedItem
            ? state.selectedItem.rendered
            : props.placeholder ?? "Select an option"}
        </SelectFieldValue>
        <SelectFieldIndicator iconName="unfold_more" />
      </SelectFieldButton>
      {state.isOpen && <SelectList {...menuProps} state={state} />}
    </FieldWrapper>
  );
}

const FieldWrapper = styled("div")`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  margin-top: 20px;
  width: 100%;
`;

const SelectFieldButton = styled("button")<SelectFieldButtonProps>`
  appearance: none;
  background: ${(props) =>
    props.isOpen
      ? ColorThemes.BaseSwatches.White.Base
      : ColorThemes.BaseSwatches.White.Lighter};
  border: 1px solid;
  padding: 1em 0.75em 1em 1em;
  margin-top: 6px;
  outline: none;
  border-color: ${(props) =>
    props.isFocusVisible
      ? ColorThemes.BrandSwatches.Secondary
      : ColorThemes.BaseSwatches.White.Darker};
  box-shadow: ${(props) =>
    props.isFocusVisible ? "0 0 0 3px rgba(143, 188, 143, 0.5)" : ""};
  border-radius: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  width: auto;
  text-align: left;
  touch-action: manipulation;
  font-size: ${FontSizeScale.Body};

  color: black;
`;

const SelectFieldValue = styled.span`
  display: inline-flex;
  align-items: center;
`;

const SelectFieldIndicator = styled(Icon)`
  width: 40px;
  height: 40px;
  padding: 6px 2px;
  margin: 0 4px;
  background: ${ColorThemes.BrandSwatches.Base};
  border-radius: 4px;
  color: ${ColorThemes.BaseSwatches.White.Lighter};
`;

import React, { useRef } from "react";

import styled from "@emotion/styled";
import {
  HiddenSelect,
  useButton,
  useFocusRing,
  useSelect,
  mergeProps,
} from "react-aria";
import { useSelectState } from "react-stately";
import SelectList from "./SelectList";
import type { SelectFieldButtonProps } from "./types";
import type { AriaSelectProps } from "@react-types/select";
import Icon from "@components/Icon";

export default function Select<T extends object>(props: AriaSelectProps<T>) {
  const state = useSelectState(props);
  const ref = useRef(null);
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
        name={props.name}
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
            : "Select an option"}
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
`;

const SelectFieldButton = styled("button")<SelectFieldButtonProps>`
  appearance: none;
  background: ${(props) => (props.isOpen ? "#eee" : "white")};
  border: 1px solid;
  padding: 6px 2px 6px 8px;
  margin-top: 6px;
  outline: none;
  border-color: ${(props) => (props.isFocusVisible ? "seagreen" : "lightgray")};
  box-shadow: ${(props) =>
    props.isFocusVisible ? "0 0 0 3px rgba(143, 188, 143, 0.5)" : ""};
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 210px;
  text-align: left;
  font-size: 14px;
  color: black;
`;

const SelectFieldValue = styled.span`
  display: inline-flex;
  align-items: center;
`;

const SelectFieldIndicator = styled(Icon)`
  width: 18px;
  height: 18px;
  padding: 6px 2px;
  margin: 0 4px;
  background: seagreen;
  border-radius: 4px;
  color: white;
`;

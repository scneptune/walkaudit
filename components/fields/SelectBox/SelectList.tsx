import { useRef } from "react";
import styled from "@emotion/styled";
import { useListBox } from "react-aria";
import Popover from "@components/atoms/Popover";
import Option from "@components/fields/SelectBox/Option";
import type { SelectListProps } from "./types";
import type { RefObject } from "react";

export default function SelectList(props: SelectListProps) {
  const listBoxRef = useRef() as RefObject<HTMLUListElement>;
  const popOverRef = useRef() as RefObject<HTMLDivElement>;
  let { state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);
  return (
    <Popover
      isOpen={state.isOpen}
      onClose={state.close}
      popoverStyle="top: 100%; border-radius: 24px;"
      isDismissable={false}
      shouldCloseOnBlur
      ref={popOverRef}
    >
      <SelectListWrapper {...listBoxProps} ref={listBoxRef}>
        {Array.from(state.collection).map((item) => (
          <Option key={item.key} item={item} state={state} />
        ))}
      </SelectListWrapper>
    </Popover>
  );
}

const SelectListWrapper = styled("ul")`
  padding: 0;
  list-style: none;
  max-height: 300px;
  overflow: auto;
  margin: 4px 0;
  outline: none;
`;

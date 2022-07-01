import { useRef } from "react";
import styled from "@emotion/styled";
import { useListBox } from "react-aria";
import Popover from "@components/containers/Popover";
import Option from "./Option";
import type { SelectListProps } from "./types";
import type { MutableRefObject } from "react";

export default function SelectList(props: SelectListProps) {
  const ref: MutableRefObject<T> = useRef(null);
  let { listBoxRef = ref, state } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);
  return (
    <Popover isOpen={state.isOpen} onClose={state.close}>
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

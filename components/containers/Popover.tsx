import React, { useRef } from "react";
import { useOverlay, DismissButton, FocusScope } from "react-aria";
import styled from "@emotion/styled";

import type { RefObject, ReactNode } from "react";

interface PopoverProps {
  popoverRef?: RefObject<HTMLDivElement>;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const Wrapper = styled.div`
  position: absolute;
  top: 100%;
  z-index: 1;
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 4px;
  margin-top: 6px;
  box-shadow: 0 4px 8px #eee;
  background: #ffffff;
`;

export default function Popover(props: PopoverProps) {
  let ref = useRef<HTMLDivElement>(null);
  let { popoverRef = ref, isOpen, onClose, children } = props;

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  let { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: false,
    },
    popoverRef
  );

  // Add a hidden <DismissButton> component at the end of the popover
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope restoreFocus>
      <Wrapper {...overlayProps} ref={popoverRef}>
        {children}
        <DismissButton onDismiss={onClose} />
      </Wrapper>
    </FocusScope>
  );
}

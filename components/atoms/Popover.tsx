import styled from "@emotion/styled";
import React, { forwardRef } from "react";
import { useOverlay, DismissButton, FocusScope } from "react-aria";

import { ColorThemes, FontSizeScale } from "@components/theming";

import type { PopoverProps } from "@react-types/overlays";
import type { RefObject, ForwardedRef, ReactNode, HTMLAttributes } from "react";

interface PopoverComponentProps extends PopoverProps {
  popoverRef?: RefObject<HTMLDivElement>;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  popoverStyle?: string;
}

interface PopoverArrowProps extends HTMLAttributes<HTMLElement> {
  arrowProps: HTMLAttributes<HTMLElement>;
}

const Popover = forwardRef(function Popover(
  props: PopoverComponentProps,
  forwardRef: ForwardedRef<HTMLDivElement>
) {
  const { isOpen, onClose, children } = props;

  // Handle events that should cause the popup to close,
  // e.g. blur, clicking outside, or pressing the escape key.
  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      ...props,
    },
    forwardRef as RefObject<HTMLDivElement>
  );

  // Add a hidden <DismissButton> component at the end of the popover
  // to allow screen reader users to dismiss the popup easily.
  return (
    <FocusScope restoreFocus>
      <Wrapper {...overlayProps} {...props} ref={forwardRef}>
        {children}
        <DismissButton onDismiss={onClose} />
      </Wrapper>
    </FocusScope>
  );
});

const Wrapper = styled.div<PopoverComponentProps>`
  position: absolute;
  z-index: 1;
  width: 100%;
  margin-top: 6px;
  box-sizing: border-box;
  font-size: ${FontSizeScale.Body};
  border: 1px solid ${ColorThemes.BaseSwatches.White.Lighter};
  box-shadow: 0px 5px 15px 0px rgb(0 0 0 / 30%);
  padding: 0.75em 1.5em;
  line-height: 2;
  color: ${ColorThemes.BaseSwatches.Black.Base};
  background: ${ColorThemes.BaseSwatches.White.Lighter};
  ${(props) => props?.popoverStyle ?? ""}
`;

export const PopoverArrow = styled("div")<PopoverArrowProps>`
  width: 50px;
  height: 25px;
  position: absolute;
  top: 100%;
  left: ${({ arrowProps }) => arrowProps?.style?.left}px;
  transform: translateX(-50%);
  overflow: hidden;
  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 20px;
    height: 20px;
    background: ${ColorThemes.BaseSwatches.White.Lighter};
    transform: translateX(0%) translateY(0%) rotate(45deg);
  }
`;

export default Popover;

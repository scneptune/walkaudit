import type { AriaListBoxOptions } from "@react-aria/listbox";
import type { RefObject, HTMLAttributes } from "react";
import type { ListState } from "react-stately";
import type { Node } from "@react-types/shared";
import type { AriaSelectProps } from "@react-types/select";

export interface SelectBoxProps extends AriaSelectProps<T> {
  name: string;
}
export interface SelectListState extends ListState<unknown> {
  isOpen: boolean;
  close: () => void;
}

export interface SelectListProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: RefObject<HTMLUListElement>;
  state: SelectListState;
}

export interface OptionProps {
  item: Node<unknown>;
  state: SelectListState;
}

export interface ListItemProps {
  isFocused?: boolean;
  isSelected?: boolean;
}

export interface SelectFieldButtonProps {
  isOpen?: boolean;
  isFocusVisible?: boolean;
}

export interface OptionContextValue {
  labelProps: HTMLAttributes<HTMLElement>;
  descriptionProps: HTMLAttributes<HTMLElement>;
}

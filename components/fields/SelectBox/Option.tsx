import styled from "@emotion/styled";
import { createContext, useRef, useContext } from "react";
import { useOption } from "@react-aria/listbox";
import Icon from "@components/atoms/Icon";
import type { ReactNode } from "react";
import type {
  OptionContextValue,
  ListItemProps,
  OptionProps,
} from "@components/fields/SelectBox/types";
import { ColorThemes } from "@components/theming";

const OptionContext = createContext<OptionContextValue>({
  labelProps: {},
  descriptionProps: {},
});

export default function Option({ item, state }: OptionProps): JSX.Element {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, labelProps, descriptionProps, isSelected, isFocused } =
    useOption(
      {
        key: item.key,
      },
      state,
      ref
    );

  return (
    <OptionLiWrapper
      {...optionProps}
      ref={ref}
      isFocused={isFocused}
      isSelected={isSelected}
    >
      <OptionContent>
        <OptionContext.Provider value={{ labelProps, descriptionProps }}>
          {item.rendered}
        </OptionContext.Provider>
        {isSelected && <SelectedIcon aria-hidden="true" iconName="check" />}
      </OptionContent>
    </OptionLiWrapper>
  );
}

export function OptionLabel({ children }: { children: ReactNode }) {
  let { labelProps } = useContext(OptionContext);
  return <div {...labelProps}>{children}</div>;
}

export function OptionDescription({ children }: { children: ReactNode }) {
  let { descriptionProps } = useContext(OptionContext);
  return (
    <StyledDescription {...descriptionProps}>{children}</StyledDescription>
  );
}

// Styled Component Markup
const OptionLiWrapper = styled("li")<ListItemProps>`
  background: ${({ isFocused }) =>
    isFocused ? ColorThemes.BrandSwatches.Secondary : ""};
  color: ${({ isFocused, isSelected }) =>
    isFocused
      ? ColorThemes.BaseSwatches.White.Lighter
      : isSelected
      ? ColorThemes.BrandSwatches.Secondary
      : ColorThemes.BrandSwatches.Tertiary};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
  font-weight: ${({ isSelected }) => (isSelected ? "600" : "normal")};
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: default;
  outline: none;
`;
const OptionContent = styled("div")`
  display: flex;
  align-items: center;
`;

const SelectedIcon = styled(Icon)`
  fill: ${ColorThemes.BrandSwatches.Secondary};
`;

const StyledDescription = styled("div")`
  font-weight: normal;
  font-size: 12px;
`;

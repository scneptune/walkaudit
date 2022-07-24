import React, { MutableRefObject } from "react";

import { useTab, useTabList, useTabPanel } from "react-aria";
import { useTabListState } from "@react-stately/tabs";
import { TabListProps } from "@react-types/tabs";
import styled from "@emotion/styled";
import type { TabListState } from "react-stately";

export default function Tabs(props: TabListProps<T>) {
  let state = useTabListState(props);
  let ref: MutableRefObject<T> = React.useRef();
  let { tabListProps } = useTabList(props, state, ref);
  return (
    <div>
      <TabListWrapper {...tabListProps} ref={ref}>
        {Array.from(state.collection).map((item) => (
          <Tab key={item.key} item={item} state={state} />
        ))}
      </TabListWrapper>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </div>
  );
}

export function Tab({ item, state }: { item: any; state: TabListState<T> }) {
  let { key, rendered } = item;
  let ref: MutableRefObject<T> = React.useRef();
  let { tabProps } = useTab({ key }, state, ref);
  let isSelected = state.selectedKey === key;
  let isDisabled = state.disabledKeys.has(key);
  return (
    <TabItemWrapper
      {...tabProps}
      isSelected={isSelected}
      isDisabled={isDisabled}
      ref={ref}
    >
      {rendered}
    </TabItemWrapper>
  );
}

export function TabPanel({ state, ...props }) {
  let ref: MutableRefObject<T> = React.useRef();
  let { tabPanelProps } = useTabPanel(props, state, ref);
  return (
    <TabPanelWrapper {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </TabPanelWrapper>
  );
}

type TabItemWrapperProps = {
  isDisabled?: boolean;
  isSelected: boolean;
};

const TabListWrapper = styled("ul")`
  list-display-type: none;
  margin: 0;
  padding-left: 0;
  display: flex;
  border-bottom: 1px solid grey;
`;

const TabItemWrapper = styled("li")<TabItemWrapperProps>`
  padding: 10px;
  list-style-type: none;
  cursor: pointer;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : undefined)};
  border-bottom: ${({ isSelected }) =>
    isSelected ? "3px solid #222222" : undefined};
`;

const TabPanelWrapper = styled("div")`
  padding: 10px;
`;

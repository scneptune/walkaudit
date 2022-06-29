import React from "react";
import styled from "@emotion/styled";

export type IconProps = {
  iconName: string;
  title?: string;
  width?: string | number;
  height?: string | number;
};

export default function Icon({ iconName, title, ...svgProps }: IconProps) {
  return (
    <SVGWrapper {...svgProps}>
      <title>{title ?? iconName}</title>
      <use xlinkHref={`#symbol-defs_svg__icon-${iconName}`} />
    </SVGWrapper>
  );
}

const SVGWrapper = styled("svg")`
  display: inline-block;
  width: ${({ width }) => width ?? "1em"};
  height: ${({ height }) => height ?? "1em"};
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
`;

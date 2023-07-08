import React from "react";

type Props = {
  children: React.ReactNode;
  style?: {
    flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  };
};

export default function useChildren(props: Props) {
  return React.useMemo(() => {
    if (props.children === undefined) return [];
    const flexDirection = props.style?.flexDirection ?? "row";
    const children: React.ReactElement[] = Array.isArray(props.children) ? props.children : [props.children];
    switch (flexDirection) {
      case "row-reverse":
      case "column-reverse":
        return [...children].reverse();
      default:
        return children;
    }
  }, [props.children, props.style?.flexDirection]);
}

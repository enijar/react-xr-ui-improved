import React from "react";
import { StyleProps } from "@/lib/types";

export type UpdateStyleArgs = Partial<StyleProps> | ((style: StyleProps) => Partial<StyleProps>);

export type UseStyle = [StyleProps, (args: UpdateStyleArgs) => void];

export default function useStyle(styles?: Partial<StyleProps>): UseStyle {
  const styleProps = React.useMemo<StyleProps>(() => {
    const props = styles ?? {};
    return {
      backgroundColor: props.backgroundColor ?? "transparent",
      backgroundImage: props.backgroundImage ?? "none",
      backgroundSize: props.backgroundSize ?? "contain",
      backgroundPosition: props.backgroundPosition ?? ["50%", "50%"],
      opacity: props.opacity ?? 1,
      flexDirection: props.flexDirection ?? "column",
      gap: props.gap ?? 0,
      alignItems: props.alignItems ?? "start",
      justifyContent: props.justifyContent ?? "start",
      overflow: props.overflow ?? "visible",
      borderRadius: props.borderRadius ?? 0,
      zIndex: props.zIndex ?? 0,
      color: props.color ?? "#000000",
      fontFamily: props.fontFamily ?? "https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff",
      fontSize: props.fontSize ?? 0.1,
      textAlign: props.textAlign ?? "left",
      lineHeight: props.lineHeight ?? 1,
      verticalAlign: props.verticalAlign ?? "top",
      outlineWidth: props.outlineWidth ?? 0,
      outlineColor: props.outlineColor ?? "#000000",
      outlineOpacity: props.outlineOpacity ?? 1,
      outlineOffsetX: props.outlineOffsetX ?? 0,
      outlineOffsetY: props.outlineOffsetY ?? 0,
    };
  }, [styles]);

  const [style, setStyle] = React.useState(styleProps);

  React.useEffect(() => {
    setStyle(styleProps);
  }, [styleProps]);

  const updateStyle = React.useCallback((stylesOrFn: UpdateStyleArgs) => {
    if (typeof stylesOrFn === "function") {
      setStyle((style) => {
        const updatedStyle = stylesOrFn(style);
        return { ...style, ...updatedStyle };
      });
    } else {
      setStyle((style) => {
        return { ...style, ...stylesOrFn };
      });
    }
  }, []);

  return [style, updateStyle];
}

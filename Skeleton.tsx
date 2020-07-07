import { Animated, StyleProp, ViewStyle } from "react-native";
import React, { ReactElement, useEffect } from "react";

import styled from "styled-components/native";

export interface Props {
  variant?: "text" | "circle" | "rect";
  width?: number | string;
  height?: number | string;
  color?: string;
  animation?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface VariantProps {
  borderRadius: number | string;
}

const handleVariant = (
  variant: string | undefined
): VariantProps | undefined => {
  if (variant === "text") {
    return { borderRadius: 10 };
  }
  if (variant === "rect") {
    //   return { borderRadius: 0 };
  }
  if (variant === "circle") {
    return { borderRadius: "50%" };
  }
  return undefined;
};

const Skeleton = ({
  variant,
  width,
  height,
  color,
  animation,
  children,
  style,
}: Props): ReactElement => {
  const opacity = new Animated.Value(0.3);

  useEffect((): void => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animation]);

  return (
    <Skeletons
      as={Animated.View}
      style={[
        { width },
        { height },
        handleVariant(variant),
        animation ? { opacity } : undefined,
        children
          ? { width: children.width, height: children.height }
          : undefined,
        { backgroundColor: color },
        style,
      ]}
    >
      {children}
    </Skeletons>
  );
};

export default Skeleton;

Skeleton.defaultProps = {
  variant: "text",
  width: 300,
  height: 20,
  color: "#e7e7e7",
  animation: true,
};

const Skeletons = styled.View`
  background-color: lightgray;
`;

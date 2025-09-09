import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  ViewStyle,
} from "react-native";

type ButtonProps = PressableProps & {
  isLoading?: boolean;
};

export function Button({ children, style, isLoading, ...props }: ButtonProps) {
  return (
    <Pressable
      style={[
        {
          backgroundColor: "white",
          padding: 14,
          borderRadius: 14,
          width: "100%",
          opacity: isLoading ? 0.7 : 1,
        },
        style as ViewStyle,
      ]}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="black" />
      ) : typeof children === "string" ? (
        <Text style={{ textAlign: "center", fontWeight: "500" }}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

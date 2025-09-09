import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

type SwitchProps = {
  value?: boolean;
  onValueChange?: (val: boolean) => void;
  disabled?: boolean;
};

export function Switch({
  value = false,
  onValueChange,
  disabled,
}: SwitchProps) {
  const [isOn, setIsOn] = useState(value);
  const translateX = useRef(new Animated.Value(value ? 20 : 0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isOn ? 20 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOn]);

  const toggleSwitch = () => {
    if (disabled) return;
    const newValue = !isOn;
    setIsOn(newValue);
    onValueChange?.(newValue);
  };

  return (
    <Pressable
      onPress={toggleSwitch}
      style={[
        styles.container,
        {
          backgroundColor: isOn ? "#4ade80" : "#d1d5db",
          opacity: disabled ? 0.6 : 1,
        },
      ]}
    >
      <Animated.View style={[styles.circle, { transform: [{ translateX }] }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 28,
    borderRadius: 20,
    padding: 4,
    justifyContent: "center",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

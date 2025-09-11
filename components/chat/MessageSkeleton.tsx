import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

interface Props {
  isCurrentUser?: boolean;
}

const MessageSkeleton: React.FC<Props> = ({ isCurrentUser = false }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    animate();
  }, [opacity]);

  if (isCurrentUser) {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 15,
          backgroundColor: "#007AFF",
          marginLeft: "auto",
          borderRadius: 20,
          alignSelf: "flex-start",
          maxWidth: "90%",
        }}
      >
        <Animated.View
          style={{
            opacity,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            height: 16,
            borderRadius: 8,
            width: "80%",
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: "row",
        padding: 15,
        backgroundColor: "#14131a",
        borderRadius: 20,
        alignSelf: "flex-start",
        maxWidth: "90%",
      }}
    >
      <Animated.View
        style={{
          opacity,
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          marginRight: 8,
        }}
      />
      <View style={{ flexShrink: 1 }}>
        <Animated.View
          style={{
            opacity,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            height: 14,
            borderRadius: 7,
            width: 80,
            marginBottom: 7,
          }}
        />
        <Animated.View
          style={{
            opacity,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            height: 16,
            borderRadius: 8,
            width: "100%",
          }}
        />
      </View>
    </View>
  );
};

export default MessageSkeleton;
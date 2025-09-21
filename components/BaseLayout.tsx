import { Colors } from "@/constants/colors";
import React from "react";
import { SafeAreaView, StatusBar, View, ViewStyle } from "react-native";

interface BaseLayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  showStatusBar?: boolean;
  backgroundColor?: string;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({
  children,
  style,
  showStatusBar = true,
  backgroundColor = Colors.background?.middle,
}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      {showStatusBar && (
        <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      )}
      <View
        style={[{ flex: 1, backgroundColor: Colors.background?.middle }, style]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

export default BaseLayout;

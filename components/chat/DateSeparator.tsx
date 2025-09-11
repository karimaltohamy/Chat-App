import React from "react";
import { Text, View } from "react-native";
import { Colors, GlassStyles } from '@/constants/colors';

const DateSeparator = ({ label }: { label: string }) => (
  <View style={{ alignItems: "center", marginVertical: 16 }}>
    <View style={{
      backgroundColor: Colors.glass.secondary,
      borderWidth: 1,
      borderColor: Colors.border.light,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      ...GlassStyles.shadow,
    }}>
      <Text style={{ 
        color: Colors.text.secondary, 
        fontWeight: "600",
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1
      }}>{label}</Text>
    </View>
  </View>
);

export default DateSeparator;

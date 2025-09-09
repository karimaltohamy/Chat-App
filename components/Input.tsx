import React from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { Text } from "./Text";

interface InputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  name: string;
  placeholder?: string;
  type?: string; // optional, in case you want to handle custom types
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  name,
  placeholder,
  type,
  ...rest
}) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 8 }}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
        {...rest}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          borderRadius: 8,
          color: "white",
        }}
        placeholderTextColor={"#999"}
      />
    </View>
  );
};

export default Input;

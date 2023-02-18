import React from "react";
import { TextInput, StyleSheet } from "react-native";

interface ButtonProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  otherOptions?: any;
}

const Input = ({ onChange, value, placeholder, otherOptions }: ButtonProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      value={value}
      onChangeText={onChange}
      {...otherOptions}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    width: "100%",
    height: 50,
    padding: 5,
    borderRadius: 4,
  },
});

import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { colors, spacing, typography } from "../theme";
import Text from "./text/text";

export default function Input({
  title,
  placeholder = null,
  value,
  keyboardType = "default",
  customStyles,
  onChangeText,
  multiline = false,
}) {
  const [selected, setSelected] = React.useState(false);
  const isSelected = selected;

  const onFocus = () => {
    setSelected(true);
  };

  const onBlur = () => {
    setSelected(false);
  };

  return (
    <View>
      <Text preset="medium" style={styles.title}>
        {title}
      </Text>
      <TextInput
        onFocus={onFocus}
        onBlur={onBlur}
        style={[
          styles.input,
          customStyles,
          isSelected && styles.selectedBorderColor,
          multiline && styles.supportMultiline,
        ]}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        autoCorrect={false}
        multiline={multiline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginHorizontal: spacing[1],
    marginVertical: spacing[2],
  },
  input: {
    backgroundColor: "#F7F8FD",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F7F8FD",
    padding: spacing[3],
    marginBottom: spacing[7],
    fontFamily: typography.regular,
  },
  selectedBorderColor: {
    borderColor: colors.lightGrey,
  },
  supportMultiline: {
    maxHeight: 250,
  },
});

import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { colors, spacing, typography } from "../theme";
import Text from "./text/text";

export default function PasswordInput({
  title,
  hint = null,
  placeholder = null,
  onChangeText,
}) {
  const [selected, setSelected] = React.useState(false);
  const isSelected = selected;

  return (
    <View>
      <Text preset="medium" style={styles.title}>
        {title}
      </Text>
      {hint && (
        <Text preset="regular" style={styles.hint}>
          {hint}
        </Text>
      )}
      <TextInput
        onFocus={() => setSelected(true)}
        onBlur={() => setSelected(false)}
        style={[styles.input, isSelected && styles.selectedBorderColor]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        autoCorrect={false}
        secureTextEntry={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginHorizontal: spacing[1],
    marginVertical: spacing[2],
  },
  hint: {
    marginHorizontal: spacing[1],
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
});

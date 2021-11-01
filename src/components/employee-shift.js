import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing } from "../theme";
import Text from "./text/text";

export default function EmployeeShift({ title, shifts, setShifts }) {
  const isSelected = shifts.includes(title);

  const changeShift = () => {
    setShifts(title);
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={changeShift}>
        <View style={[styles.circle, isSelected && styles.selectedCircle]}>
          <Text
            style={[styles.text, isSelected && styles.selectedText]}
            preset="small"
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: spacing[1],
  },
  circle: {
    height: 40,
    width: 40,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: colors.black,
    backgroundColor: "white",
  },
  selectedCircle: {
    backgroundColor: "black",
  },
  text: {
    color: colors.black,
  },
  selectedText: {
    color: colors.white,
  },
});

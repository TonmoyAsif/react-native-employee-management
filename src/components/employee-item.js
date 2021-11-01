import React from "react";
import {
  View,
  StyleSheet,
  Image
} from "react-native";
import { spacing, colors } from "../theme";
import Text from "./text/text";
import { Entypo } from "@expo/vector-icons";

export default function EmployeeItem({ employee }) {
  const { id, name, age, gender, shifts, image } = employee;

  return (
    <View>
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <View>
          <Text preset="medium" numberOfLine={1}>
            {name}
          </Text>
          <View style={styles.information}>
            <Text preset="small">{gender}</Text>
            <Entypo name="dot-single" size={24} color={colors.lightGrey} />
            <Text preset="small">{age}</Text>
          </View>
          <View style={styles.shifts}>
            {shifts.map((shift, index) => {
              return (
                <View key={index} style={styles.circle}>
                  <Text style={styles.text} preset="small">
                    {shift}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: spacing[4],
  },
  information: {
    flexDirection: "row",
    margin: spacing[1],
  },
  line: {
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    marginVertical: spacing[2],
    marginRight: spacing[7],
    marginLeft: spacing[14],
  },
  shifts: {
    flexDirection: "row",
  },
  circle: {
    height: 40,
    width: 40,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderColor: colors.black,
    backgroundColor: "black",
    marginHorizontal: spacing[1],
  },
  text: {
    color: colors.white,
  },
});

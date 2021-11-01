import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Text from "../components/text/text";
import PageHeader from "../components/page-header";
import { colors, spacing } from "../theme";
import Input from "../components/input";
import RadioInput from "../components/radio-input";
import EmployeeShift from "../components/employee-shift";
import Button from "../components/button";
import { firebase } from "../config";
import LogService from "../services/LogService";
import EmployeeImage from "../components/employee-image";

const SHIFT_OPTIONS = [
  { name: "Sat", value: "Sat" },
  { name: "Sun", value: "Sun" },
  { name: "Mon", value: "Mon" },
  { name: "Tue", value: "Tue" },
  { name: "Wed", value: "Wed" },
  { name: "Thu", value: "Thu" },
  { name: "Fri", value: "Fri" },
];

const GENDER_OPTIONS = ["Male", "Female"];

export default function Create({ navigation, user }) {
  const [name, setName] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const [gender, setGender] = React.useState(null);
  const [shifts, setShifts] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const userId = user.uid;

  const changeShifts = (title) => {
    const isSelected = shifts.includes(title);
    if (isSelected) {
      const newArray = shifts.filter((shift) => shift !== title);
      setShifts(newArray);
    } else {
      const newArray = [...shifts, title];
      setShifts(newArray);
    }
  };

  const onSave = () => {
    if (name == null || age == null || gender == null) {
      LogService.showWarningMessage("Name, Age & Gender can not be empty");
      return;
    }

    const noteRef = firebase.firestore().collection("employees");
    setLoading(true);
    const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      name,
      age,
      gender,
      shifts,
      image,
      authorId: userId,
      createdAt: timeStamp,
      updatedAt: timeStamp,
    };
    noteRef
      .add(data)
      .then((_doc) => {
        setLoading(false);
        navigation.navigate("Home");
        LogService.showSuccessMessage("Employee created successfully");
      })
      .catch((error) => {
        setLoading(false);
        LogService.showErrorMessage(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Create Employee" showBackButton={true} />
      <View>
        <EmployeeImage image={image} setImage={setImage} />
        <View style={styles.inputContainer}>
          <Input
            title="Name"
            placeholder="Enter Name"
            onChangeText={(text) => setName(text)}
          />
          <Input
            title="Age"
            placeholder="Enter Age"
            keyboardType="numeric"
            onChangeText={(text) => setAge(text)}
          />
          <View style={styles.genderView}>
            <Text preset="medium" style={styles.genderText}>
              Select gender
            </Text>
            {GENDER_OPTIONS.map((option, index) => (
              <RadioInput
                key={index}
                label={option}
                value={gender}
                setValue={setGender}
              />
            ))}
          </View>
          <View style={styles.themeView}>
            <Text preset="medium" style={styles.themeText}>
              Select shifts:
            </Text>
            <View style={{ flexDirection: "row" }}>
              {SHIFT_OPTIONS.map((option, index) => (
                <EmployeeShift
                  key={index}
                  title={option.name}
                  shifts={shifts}
                  setShifts={changeShifts}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.black} />
        ) : (
          <Button title="Create" onPress={onSave} />
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    marginTop: spacing[6],
    marginHorizontal: spacing[4],
  },
  genderView: {
    marginTop: spacing[2],
  },
  genderText: {
    marginBottom: spacing[4],
  },
  themeView: {
    marginTop: spacing[8],
  },
  themeText: {
    marginBottom: spacing[2],
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: spacing[5],
  },
});

import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../theme";
import Text from "../components/text/text";
import Input from "../components/input";
import PasswordInput from "../components/password-input";
import Button from "../components/button";
import { firebase } from "../config";
import LogService from "../services/LogService";

export default function Signup() {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const signup = () => {
    if (email == null || password == null) {
      LogService.showWarningMessage("Please fill all the fields");
      return;
    }

    if (password.length < 8) {
      LogService.showWarningMessage("Password should be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      LogService.showWarningMessage("Password and Confirm password should be same");
      return;
    }

    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const userProfileData = {
          id: uid,
          email: email,
        };
        const userRef = firebase.firestore().collection("users");
        userRef.doc(uid).set(userProfileData);
        LogService.showSuccessMessage("Registration successful");
        setLoading(false);
      })
      .catch((error) => {
        LogService.showErrorMessage(error.message);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Input
          title="Email"
          placeholder="Enter Email"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <PasswordInput
          title="Password"
          hint="Must be at least 8 letters"
          placeholder="Enter Password"
          onChangeText={(text) => setPassword(text)}
          customStyles={styles.password}
        />
        <PasswordInput
          title="Confirm password"
          hint="Must match"
          placeholder="Re-enter Password"
          onChangeText={(text) => setConfirmPassword(text)}
          customStyles={styles.password}
        />
        {loading ? (
          <ActivityIndicator size="large" color={colors.black} />
        ) : (
          <Button
            title="Submit"
            customStyles={styles.button}
            onPress={signup}
          />
        )}
      </View>
      <View style={styles.footer}>
        <Text preset="small" style={styles.footerText}>
          By continuing, you accept the{" "}
          <Text preset="small" style={styles.footerInnerText}>
            Terms of Use
          </Text>{" "}
          and{" "}
          <Text preset="small" style={styles.footerInnerText}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    marginHorizontal: spacing[6],
    marginTop: spacing[10],
  },
  password: {
    marginBottom: spacing[2],
  },
  button: {
    marginTop: spacing[7],
    alignSelf: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: spacing[4],
  },
  footerText: {
    textAlign: "center",
  },
  footerInnerText: {
    color: colors.lightGreen,
  },
});

import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "../theme";
import { firebase } from "../config";
import PageHeader from "../components/page-header";
import EmptyEmployees from "../components/empty-employees";
import EmployeeItem from "../components/employee-item";

export default function Home({ user }) {
  const [employees, setEmployees] = React.useState([]);
  const employeeRef = firebase.firestore().collection("employees");
  const userId = user.uid;

  React.useEffect(() => {
    const subscriber = employeeRef
      .where("authorId", "==", userId)
      .orderBy("updatedAt", "desc")
      .onSnapshot((snapshot) => {
        const newEmployees = [];
        snapshot.forEach((doc) => {
          newEmployees.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setEmployees(newEmployees);
      });
    return subscriber;
  }, []);

  const renderItem = ({ item }) => <EmployeeItem employee={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader
        title="My Employees"
        showAddNoteButton={employees.length > 0}
      />
      {employees.length === 0 ? (
        <EmptyEmployees />
      ) : (
        <FlatList
          data={employees}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
          contentContainerStyle={{ margin: spacing[6] }}
          ItemSeparatorComponent={() => <View style={styles.item_separator} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item_separator: {
    marginBottom: spacing[6],
  },
});

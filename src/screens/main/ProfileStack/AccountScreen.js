import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "./styles";

const AccountScreen = ({ navigation }) => {
  return (
    <View style={styles.listContainer}>
      <Text styles={styles.title}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
};

export default AccountScreen;

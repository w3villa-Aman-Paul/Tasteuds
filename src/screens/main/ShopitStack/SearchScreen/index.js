import { SafeAreaView, TextInput } from "react-native";
import { styles } from "./styles";
import React from "react";

const SearchScreen = () => {
  const [text, setText] = React.useState("");
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        editable
        maxLength={20}
        placeholder={"Search"}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

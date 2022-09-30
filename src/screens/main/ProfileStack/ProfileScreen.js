import * as React from "react";
import { connect, useSelector } from "react-redux";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { globalStyles } from "../../../styles/global";
import { colors } from "../../../res/palette";
import { LinearGradient } from "expo-linear-gradient";
import {
  Pen,
  User,
  Home,
  ShoppingBag,
  Heart,
  Gift,
  ChevronRight,
} from "../../../library/icons";
import { Divider, Button } from "react-native-elements";
import {
  accountLogout,
  accountRetrieve,
  retrieveAddress,
  userLogout,
} from "../../../redux";
import { styles } from "./styles";
const list = [
  {
    title: "Reset Password",
    icon: <User size={24} style={{ color: colors.black }} />,
    name: "ResetPassword",
  },
  {
    title: "Saved Address",
    icon: <Home size={24} style={{ color: colors.black }} />,
    name: "SavedAddress",
  },
  {
    title: "My Orders",
    icon: <ShoppingBag size={24} style={{ color: colors.black }} />,
    name: "Orders",
  },
  {
    title: "Offers",
    icon: <Gift size={24} style={{ color: colors.black }} />,
    name: "Offers",
  },
];

const ProfileScreen = ({ dispatch, navigation }) => {
  const { account } = useSelector((state) => state.account);
  const { isAuth } = useSelector((state) => state.auth);

  const [userName, setUserName] = React.useState("");

  React.useEffect(() => {
    if (isAuth) {
      setUserName(account.email);
    } else {
      setUserName("");
    }
  }, [isAuth, account.email]);

  React.useEffect(() => {
    dispatch(retrieveAddress());
  }, [isAuth]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ ...styles.mainContainer }}>
        <View style={{ ...styles.jumbotron }}>
          <LinearGradient
            // Background Linear Gradient
            start={[1, 0]}
            end={[1, 1]}
            colors={["#EE3168", "#C1236F"]}
            style={styles.centeredContent}
          >
            <View style={styles.centeredContent}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeNWA656CRe97bqFdSiLSLH-gp6tfGFKMURg&usqp=CAU",
                }}
                style={styles.avatar}
              />
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>{userName}</Text>
                <Pen size={24} style={{ color: colors.white }} />
              </View>
            </View>
          </LinearGradient>
        </View>
        <View style={{ ...globalStyles.container, height: 290 }}>
          <Button
            title="SignIn"
            buttonStyle={{ ...styles.buttonBlockStyle, ...styles.btnLink }}
            titleStyle={globalStyles.latoBold16}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          />
          <Button
            title="SignUp"
            buttonStyle={{ ...styles.buttonBlockStyle }}
            titleStyle={globalStyles.latoBold16}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default connect()(ProfileScreen);

import * as React from "react";
import { connect, useSelector } from "react-redux";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronRight, Support } from "../icons";
import { Divider, Button } from "react-native-elements";
import { globalStyles } from "../../styles/global";
import { colors } from "../../res/palette";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { userLogout } from "../../redux/actions/authActions";

function CustomDrawerContent({ dispatch, ...props }) {
  const { account } = useSelector((state) => state.account);
  const { email } = account;

  return (
    <DrawerContentScrollView {...props}>
      {/* <View style={styles.jumbotron}>
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
              <Text style={styles.profileName}>{email}</Text>
              <ChevronRight size={20} style={{ color: colors.white }} />
            </View>
          </View>
        </LinearGradient>
      </View> */}
      <Divider />
      <DrawerItemList {...props} />
      <Divider />
      <DrawerItem
        label="Support & More"
        labelStyle={styles.menuTitle}
        icon={({ color, size }) => (
          <Support size={size} style={{ color, ...globalStyles.label }} />
        )}
        onPress={() => {}}
      />
      <DrawerItem
        label="FAQs"
        labelStyle={styles.subMenuTitle}
        onPress={() => {}}
      />
      <DrawerItem
        label="Contact Us"
        labelStyle={styles.subMenuTitle}
        onPress={() => {}}
      />
      <DrawerItem
        label="Privacy Policy"
        labelStyle={styles.subMenuTitle}
        onPress={() => {}}
      />
      <Button
        title="Logout Account"
        type="outline"
        containerStyle={styles.btnOutlineContainer}
        buttonStyle={styles.btnOutline}
        titleStyle={styles.titleStyle}
        onPress={() => dispatch(userLogout())}
      />
    </DrawerContentScrollView>
  );
}

export default connect()(CustomDrawerContent);

const styles = StyleSheet.create({
  centeredContent: {
    ...globalStyles.containerFluid,
    ...globalStyles.centeredContent,
  },
  jumbotron: {
    width: "100%",
    height: 168,
    backgroundColor: "#f5f5f5",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  profileDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  profileName: {
    ...globalStyles.latoBold16,
    color: colors.white,
    marginRight: 4,
  },
  titleStyle: {
    fontFamily: "lato-bold",
    color: colors.primary,
  },
  btnOutlineContainer: {
    flex: 1,
    marginRight: 16,
  },
  btnOutline: {
    ...globalStyles.btn,
    borderWidth: 1,
    width: "90%",
    alignSelf: "center",
    marginTop: 40,
  },
  menuTitle: {
    ...globalStyles.label,
    fontSize: 14,
  },
  subMenuTitle: {
    ...globalStyles.label,
    marginLeft: 60,
  },
});

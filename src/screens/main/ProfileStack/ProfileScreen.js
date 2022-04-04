import * as React from "react";
import { connect, useSelector } from "react-redux";
import { View, Text, Image, TouchableOpacity } from "react-native";
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
import { accountLogout, accountRetrieve, retrieveAddress, userLogout } from "../../../redux";
import { styles } from "./styles";
const list = [

  // {
  //   title: "Account",
  //   icon: <User size={24} style={{ color: colors.black }} />,
  //   name: "Account",
  // },
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
    title: "Favourites",
    icon: <Heart size={24} style={{ color: colors.black }} />,
    name: "Favourites",
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
  }, [isAuth])

  React.useEffect(() => {
    dispatch(retrieveAddress());
  }, [])

  return (
    <View style={styles.mainContainer}>
      <View style={styles.jumbotron}>
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
      <View>
        <Divider />
        {list.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate(item.name)}
          >
            <View style={styles.listContainer}>
              <View style={styles.listIcon}>{item.icon}</View>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.listIcon}>
                <ChevronRight size={24} style={{ color: colors.black }} />
              </View>
            </View>
            <Divider />
          </TouchableOpacity>
        ))}
      </View>

      <View style={globalStyles.container}>
        <Button
          title="Logout Account"
          buttonStyle={styles.buttonBlockStyle}
          titleStyle={globalStyles.latoBold16}
          onPress={() => {
            dispatch(userLogout());
            dispatch(accountLogout());
            navigation.navigate("Shop");
          }}
        />
      </View>
    </View>
  );
};

export default connect()(ProfileScreen);

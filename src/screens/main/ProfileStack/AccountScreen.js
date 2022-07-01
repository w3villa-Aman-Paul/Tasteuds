import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { colors } from "../../../res/palette";
import { accountRetrieve, retrieveAddress, userLogout } from "../../../redux";

const AccountScreen = ({ dispatch, navigation, address, account, acc }) => {
  const { isAuth } = useSelector((state) => state.auth);

  let user = address.filter((add) => add.id === account?.id);

  useEffect(() => {
    dispatch(accountRetrieve());
    dispatch(retrieveAddress());
  }, [isAuth]);

  return (
    <ScrollView style={styles.scrollContainer}>
      {isAuth ? (
        <>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.text}>MIN SIDE</Text>
              <View style={styles.ImageContainer}>
                <Image
                  style={styles.image}
                  source={require("../../../../assets/images/Header-Icon/red_circle.png")}
                />
              </View>
            </View>

            <View style={styles.body}>
              <View style={styles.first}>
                <Text style={styles.textbtn}>KONTOINFORMASJON</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("SavedAddress")}
                >
                  <Text style={styles.textbtn}>ENDRE</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.second}>
                <Text style={styles.text}>E-POST</Text>
                <Text>{acc.email}</Text>
              </View>

              <View style={styles.second}>
                <Text style={styles.text}>TELEFONNUMMER</Text>
                <Text>{user[0]?.phone}</Text>
              </View>

              <View style={styles.second}>
                <Text style={styles.text}>ADRESSE</Text>
                <Text>{user[0]?.address1}</Text>
                <Text>
                  {user[0]?.zipcode} {user[0]?.country_name}
                </Text>
              </View>
            </View>

            <View style={styles.body}>
              <View style={styles.first}>
                <Text style={styles.textbtn}>MINE BESTILLINGER</Text>
              </View>
              <View style={styles.first}>
                <Text>24/04/2022</Text>
                <Text>KR 2 155,00</Text>
                <TouchableOpacity>
                  <Text style={styles.textbtn}>SE DETALJER</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.first}>
                <Text>28/04/2022 </Text>
                <Text>KR 455,00</Text>
                <TouchableOpacity>
                  <Text style={styles.textbtn}>SE DETALJER</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.primary,
              }}
            >
              <TouchableOpacity
                style={{ ...styles.button, marginBottom: 10, marginTop: 10 }}
                onPress={() => {
                  dispatch(userLogout());
                }}
              >
                <Text style={styles.text2}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.loginContainer}>
          <View style={styles.btnbody}>
            <Image
              source={require("../../../../assets/images/logo-mark.png")}
              style={styles.image2}
            />
            <TouchableOpacity
              style={{ ...styles.button, marginBottom: 10 }}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.text2}>SignIn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.text2}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  address: state.checkout.address,
  account: state.account.account.default_shipping_address,
  acc: state.account.account,
});

export default connect(mapStateToProps)(AccountScreen);

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    width: "100%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "column",
    marginTop: 30,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.black,
    fontSize: 14,
    fontFamily: "lato-bold",
  },
  textbtn: {
    color: colors.btnLink,
    fontSize: 14,
  },
  ImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderColor: colors.black,
    borderWidth: 1,
    width: 80,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  body: {
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    borderColor: "transparent",
    padding: 10,
    elevation: 5,
    backgroundColor: colors.white,
    marginBottom: 30,
  },
  first: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 5,
    marginBottom: 15,
  },
  second: {
    marginBottom: 15,
  },
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  btnbody: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "70%",
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.btnLink,
    borderWidth: 1,
    borderColor: "transparent",
  },
  text2: {
    color: colors.white,
    fontSize: 14,
    fontFamily: "lato-bold",
  },
  image2: {
    width: "80%",
    resizeMode: "contain",
  },
});

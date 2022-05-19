import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Divider, RadioButton } from "react-native-paper";
import { deleteAdd, getCountriesList, retrieveAddress } from "../../../redux";
import ActivityIndicatorCard from "../../../library/components/ActivityIndicatorCard";
import { CheckBox, Icon } from "react-native-elements";
import { colors } from "../../../res/palette";

const SavedAddress = ({ dispatch, navigation, address, saving }) => {
  const [check, setCheck] = useState(false);
  const [index, setIndex] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { status } = useSelector((state) => state.checkout);

  useEffect(() => {
    if (status === 204) {
      dispatch(retrieveAddress());
    }
  }, [status]);

  useEffect(() => {
    dispatch(retrieveAddress());
    dispatch(getCountriesList());
  }, []);

  const setAddress = (id) => {
    navigation.navigate("ShippingAddress", { Id: id });
  };

  const updateAdd = (id) => {
    navigation.navigate("updateAddress", { updateId: id });
  };

  const deleteAddress = (id) => {
    Alert.alert("Warning", "Are you sure you want to delete ?", [
      { text: "Cancel" },
      { text: "Delete", onPress: () => dispatch(deleteAdd(null, id, {})) },
    ]);
  };

  if (saving) {
    return <ActivityIndicatorCard />;
  } else {
    return (
      <>
        <ScrollView>
          <View style={styles.body}>
            {address?.map((add, i) => {
              return (
                <View key={add.id} style={styles.addContent}>
                  <View style={styles.addList}>
                    <View style={styles.content}>
                      <CheckBox
                        size={28}
                        checked={index === i ? check : false}
                        onPress={() => {
                          setIndex(i);
                          setCheck(!check);
                          setSelectedAddress(add);
                        }}
                      />
                      <View style={styles.second}>
                        <Text style={styles.addText}>{add.address1}</Text>
                        <Text style={styles.addSubText}>
                          {add.city}, {add.zipcode}
                        </Text>
                        <Text style={styles.addSubText}>
                          {add.country_name}
                        </Text>
                      </View>
                    </View>
                    <Divider style={styles.divider} />
                    <View style={styles.btnGroup}>
                      <TouchableOpacity
                        style={styles.btn1}
                        onPress={() => updateAdd(add.id)}
                      >
                        <Icon
                          name="update"
                          type="material-icons"
                          color={colors.white}
                          size={28}
                        />
                        <Text style={styles.text}>Update</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.btn2}
                        onPress={() => deleteAddress(add.id)}
                      >
                        <Icon
                          name="delete"
                          type="ant-design"
                          color={colors.white}
                          size={28}
                        />
                        <Text style={styles.text}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <SafeAreaView>
          <View style={styles.btn_container}>
            <TouchableOpacity
              style={styles.btn_body}
              onPress={
                selectedAddress !== null
                  ? () => setAddress(selectedAddress.id)
                  : () => navigation.navigate("AddAdress")
              }
            >
              <Text style={styles.text}>
                {selectedAddress !== null ? "Select" : "Add Address"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  address: state.checkout.address,
  saving: state.checkout.saving,
});

export default connect(mapStateToProps)(SavedAddress);

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  addContent: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    elevation: 10,
    borderWidth: 1,
    borderColor: "transparent",
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  second: {
    width: "80%",
    marginRight: 5,
  },
  addText: {
    fontSize: 18,
    textAlign: "left",
    color: "#000000",
    fontFamily: "lato-bold",
  },
  addSubText: {
    fontSize: 14,
    textAlign: "left",
    color: "#000000",
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
  btnGroup: {
    flexDirection: "row",
    marginLeft: 15,
    alignItems: "center",
  },
  btnText: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "#ffffff",
    fontWeight: "bold",
  },
  btn_container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 70,
    backgroundColor: "#232332",
    elevation: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  btn_body: {
    width: "70%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EB1741",
    padding: 15,
    borderWidth: 1,
    borderColor: "transparent",
  },
  text: {
    color: "#fff",
    fontFamily: "lato-medium",
    fontSize: 14,
  },
  content: {
    flexDirection: "row",
  },
  btn1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.skyBlue,
    marginRight: 10,
  },
  btn2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.btnLink,
  },
  text: {
    color: colors.white,
    marginLeft: 5,
  },
});

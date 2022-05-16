import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Divider, RadioButton } from "react-native-paper";
import { deleteAdd, getCountriesList, retrieveAddress } from "../../../redux";
import ActivityIndicatorCard from "../../../library/components/ActivityIndicatorCard";

const SavedAddress = ({ dispatch, navigation, address, saving }) => {
  const { status } = useSelector((state) => state.checkout);

  const deleteAddress = (id) => {
    dispatch(deleteAdd(null, id, {}));
  };

  useEffect(() => {
    if (status === 204) {
      dispatch(retrieveAddress());
    }
  }, [status]);

  useEffect(() => {
    dispatch(retrieveAddress());
    dispatch(getCountriesList());
  }, []);

  if (saving) {
    return <ActivityIndicatorCard />;
  } else {
    return (
      <>
        <ScrollView>
          <View style={styles.body}>
            {address?.map((add) => {
              return (
                <View key={add.id} style={styles.addContent}>
                  <View style={styles.addList}>
                    <Text style={styles.addText}>{add.address1}</Text>
                    <Text style={styles.addSubText}>
                      {add.city}, {add.zipcode}
                    </Text>
                    <Text style={styles.addSubText}>{add.country_name}</Text>
                    <Divider style={styles.divider} />
                    <View style={styles.btnGroup}>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.navigate("updateAdd")}
                      >
                        <Text style={styles.btnText}>Update</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btn}
                        onPress={() => deleteAddress(add.id)}
                      >
                        <Text style={styles.btnText}>Delete</Text>
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
              onPress={() => navigation.navigate("AddAdress")}
            >
              <Text style={styles.text}>Add Address</Text>
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
    elevation: 5,
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  addText: {
    fontSize: 18,
    textAlign: "left",
    color: "#000000",
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
    // justifyContent: "center",
  },
  btn: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#0080ff",
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
});

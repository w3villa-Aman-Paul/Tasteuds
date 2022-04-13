import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { Divider, RadioButton } from "react-native-paper";
import { NavigationType } from "react-router-dom";
import { deleteAdd, retrieveAddress } from "../../../redux";

const SavedAddress = ({ dispatch, navigation }) => {
  const Address = useSelector((state) => state.checkout.address);
  const { status } = useSelector((state) => state.checkout);

  const deleteAddress = (id) => {
    dispatch(deleteAdd(null, id, {}));
  };

  useEffect(() => {
    if (status === 204) {
      dispatch(retrieveAddress());
    }
  }, [status]);

  useEffect(() => dispatch(retrieveAddress()), []);

  return (
    <ScrollView>
      <View style={styles.body}>
        {Address?.map((address) => (
          <>
            <View style={styles.addContent}>
              <View key={address?.id} style={styles.addList}>
                <Text style={styles.addText}>{address?.address1}</Text>
                <Text style={styles.addSubText}>
                  {address?.city}, {address.zipcode}
                </Text>
                <Text style={styles.addSubText}>{address?.country_name}</Text>
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
                    onPress={() => deleteAddress(address?.id)}
                  >
                    <Text style={styles.btnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        ))}
      </View>
    </ScrollView>
  );
};

export default connect()(SavedAddress);

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
  },
  btnGroup: {
    flexDirection: "row",
    justifyContent: "center",
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
});

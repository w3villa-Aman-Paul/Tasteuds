import { Button, SafeAreaView, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import * as React from "react";
import { connect, useSelector } from 'react-redux';
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "react-native-elements";
import { TextInput } from "react-native-paper";
import { retrieveAddress } from "../../../redux";

const AccountScreen = ({ dispatch, navigation }) => {
  const Address = useSelector(state => state.checkout.address);
  const { account } = useSelector((state) => state.account);
  const add = { ...Address };
  const { email } = account;
  React.useEffect(() => {
    dispatch(retrieveAddress());
  }, [])

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.profile_container}>
          <LinearGradient
            // Background Linear Gradient
            start={[1, 0]}
            end={[1, 1]}
            colors={["#0080ff", "#000000"]}
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
                <Text style={styles.profileName}>{add[0].firstname}</Text>
                <Text style={styles.profileContact}>{add[0].phone}</Text>
                <Text style={styles.profileContact}>{email}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.content}>
          <View style={styles.inputBox}>
            <Text style={styles.formText}>First Name</Text>
            <TextInput
              style={styles.formInput}
             value={add[0].firstname}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.formText}>Last Name</Text>
            <TextInput
              style={styles.formInput}
              value={add[0].firstname}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.formText}>Email</Text>
            <TextInput
              style={styles.formInput}
              value={email}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.formText}>Contact Number</Text>
            <TextInput
              style={styles.formInput}
              value={add[0].phone}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.formText}>Address</Text>
            <TextInput
              style={styles.formInput}
              multiline
             value={add[0].address1}
            />
          </View>

          <View style={styles.formBtn}>
            <TouchableOpacity
              style={styles.primary}
            >
              <Text style={styles.textBtn}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.primary}
            >
              <Text style={styles.textBtn}>Submit</Text>
            </TouchableOpacity>
          </View>

        </View>
        {/* <View style={styles.content}>
          <Text style={styles.orderText}>My Orders</Text>
          <Divider />
          <TouchableOpacity 
          onPress={() => navigation.navigate('Orders')}
          >
            <Text style={styles.linkText}>VIEW ALL ORDERS</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.orderText}>My Orders</Text>
          <Divider />
          <TouchableOpacity 
          onPress={() => navigation.navigate('Orders')}
          >
            <Text style={styles.linkText}>VIEW ALL ORDERS</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.orderText}>My Orders</Text>
          <Divider />
          <TouchableOpacity 
          onPress={() => navigation.navigate('Orders')}
          >
            <Text style={styles.linkText}>VIEW ALL ORDERS</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.orderText}>My Orders</Text>
          <Divider />
          <TouchableOpacity 
          onPress={() => navigation.navigate('Orders')}
          >
            <Text style={styles.linkText}>VIEW ALL ORDERS</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default connect()(AccountScreen);

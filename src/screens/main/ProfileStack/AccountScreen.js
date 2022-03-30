import { Button, SafeAreaView, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "react-native-elements";
import { TextInput } from "react-native-paper";

const AccountScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.profile_container}>
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
                <Text style={styles.profileName}>Sheikh Mohsin</Text>
                <Text style={styles.profileContact}>+91 7302238567</Text>
                <Text style={styles.profileContact}>momohsin046@gmail.com</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.content}>
          <View style={styles.inputBox}>
            <Text style={styles.formText}>First Name</Text>
            <TextInput 
             style={styles.formInput}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.formText}>Last Name</Text>
            <TextInput 
             style={styles.formInput}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.formText}>Email</Text>
            <TextInput 
             style={styles.formInput}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.formText}>Contact Number</Text>
            <TextInput 
             style={styles.formInput}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.formText}>Address</Text>
            <TextInput 
             style={styles.formInput}
             multiline
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

export default AccountScreen;

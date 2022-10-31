import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { createStackNavigator } from "@react-navigation/stack";
import FoodFooter from "./FoodFooter";
import { connect } from "react-redux";
import ProducersFooter from "./ProducersFooter";
import CustomBackdrop from "../BackdropComponent/CustomBackdrop";

const filterNavigator = createStackNavigator();

const FilterFooter = ({
  value,
  snapPoints,
  onClose,
  bottomSheetContent,
  isModelVisible,
  setModelVisible,
  setIsOpen,
}) => {
  const BackdropComponent = (backdropProps) => (
    // <BottomSheetBackdrop
    //   {...backdropProps}
    //   enableTouchThrough={true}
    //   style={{ height: "100%", flex: 1, backgroundColor: "#fff" }}
    // />
    <View
      {...backdropProps}
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
      onPress={() => setModelVisible(false)}
    ></View>
  );

  return (
    <BottomSheet
      ref={value}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={onClose}
      backdropComponent={CustomBackdrop}
      onBackdropPress={() => setIsOpen(false)}
      style={{ flex: 1 }}
      handleStyle={styles.handle}
      isVisible={isModelVisible}
      modalProps={{
        animationType: "fade",
        hardwareAccelerated: true,
        onRequestClose: () => {
          setModelVisible(false);
        },
      }}
    >
      <BottomSheetView style={styles.container}>
        <filterNavigator.Navigator>
          <filterNavigator.Screen
            name="Main"
            component={bottomSheetContent}
            options={{ headerShown: false }}
          />
          <filterNavigator.Screen
            name="food"
            component={FoodFooter}
            options={{
              headerShown: false,
            }}
          />
          <filterNavigator.Screen
            name="producers"
            component={ProducersFooter}
            options={{ headerShown: false }}
          />
          <filterNavigator.Screen
            name="Fav Quantity"
            component={bottomSheetContent}
            options={{ headerShown: false }}
          />
        </filterNavigator.Navigator>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default connect()(FilterFooter);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232332",
  },
  handle: {
    display: "none",
  },
});

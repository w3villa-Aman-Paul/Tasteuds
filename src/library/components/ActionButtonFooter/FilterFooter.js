import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { colors } from "../../../res/palette";
import { createStackNavigator } from "@react-navigation/stack";
import FoodFooter from "./FoodFooter";
import { connect } from "react-redux";
import ProducersFooter from "./ProducersFooter";

const filterNavigator = createStackNavigator();

const FilterFooter = ({
  value,
  snapPoints,
  onClose,
  bottomSheetContent,
  onPress,
}) => {
  return (
    <BottomSheet
      ref={value}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={onClose}
      style={{ flex: 1 }}
      handleStyle={styles.handle}
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

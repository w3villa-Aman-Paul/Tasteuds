import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { stubArray } from "lodash";
import { colors } from "../../../res/palette";

const FilterFooter = ({ value, snapPoints, onClose, bottomSheetContent }) => {
  return (
    <BottomSheet
      ref={value}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={onClose}
      // style={{ backgroundColor: "#232332" }}
      handleStyle={styles.handle}
      handleIndicatorStyle={styles.indicator}
    >
      <BottomSheetView style={styles.container}>
        <View>{bottomSheetContent()}</View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default FilterFooter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232332",
  },
  handle: {
    backgroundColor: "#232332",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  indicator: {
    backgroundColor: colors.white,
  },
});

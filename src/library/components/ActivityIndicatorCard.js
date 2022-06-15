import * as React from "react";
import { View, ActivityIndicator } from "react-native";
import { colors } from "../../res/palette";
import { globalStyles } from "../../styles/global";

const ActivityIndicatorCard = () => (
  <View style={[globalStyles.containerFluid, globalStyles.centeredContent]}>
    <ActivityIndicator size="large" color={colors.btnLink} />
  </View>
);

export default ActivityIndicatorCard;

import * as React from "react";
import { View, ScrollView } from "react-native";
import ProductCard from "../../../library/components/ProductCard";
import { globalStyles } from "../../../styles/global";
import { connect } from "react-redux";

const FavouritesScreen = ({ navigation, favorites }) => {
  return (
    <ScrollView>
      <View style={globalStyles.container}>
        {
          favorites.map((ele) => (
            <ProductCard
              key={ele.id}
              imageSource={ele.images[0].styles[3].url}
              {...ele}
            />
          ))
        }
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  favorites: state.products.favorites,
});

export default connect(mapStateToProps)(FavouritesScreen);

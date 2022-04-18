import * as React from "react";
import { View, ScrollView, Text } from "react-native";
import ProductCard from "../../../library/components/ProductCard";
import { globalStyles } from "../../../styles/global";
import { connect, useSelector } from "react-redux";

const FavouritesScreen = ({ navigation, favorites }) => {
  const favorite = useSelector((state) => state.products.favourites);
  console.log(favorite);

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Favourites</Text>
        {favorites.map((ele) => (
          <ProductCard
            key={ele.id}
            imageSource={ele.images[0].styles[3].url}
            {...ele}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  favorites: state.products.favorites,
});

export default connect(mapStateToProps)(FavouritesScreen);

import React from "react";
import { FlatList } from "react-native";
import ProductItem from "./ProductItem";

const ProductList = ({ products }) => {
  const renderItem = ({ item }) => <ProductItem product={item} />;

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default ProductList;

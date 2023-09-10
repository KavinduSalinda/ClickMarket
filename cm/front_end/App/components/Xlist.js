import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Xlist = () => {
  return (
    <View style={styles.container}>
      {products.map((product) => (
        <View key={product.id} style={styles.productItem}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>Price: ${product.price}</Text>
        </View>
      ))}
    </View>
  )
}

export default Xlist

const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    productItem: {
      marginBottom: 16,
    },
    productName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    productPrice: {
      fontSize: 16,
      color: '#777',
    },
})
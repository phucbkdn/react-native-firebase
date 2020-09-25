import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ordersStore from '../streams/orders'

export default function TabTwoScreen() {
  const [countData, setCountData] = useState({ orders: []})
  useLayoutEffect(() => {
    ordersStore.subscribe(setCountData)
    ordersStore.incr()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.wrapper}>
        {countData.orders && countData.orders.map((item: Props) => (
          <Text style={styles.title} key={item._key}>{item.Price}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 20,
    paddingRight: 20,
    justifyContent: "space-between",
  } as ViewStyle,
});

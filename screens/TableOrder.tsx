import { StackScreenProps } from '@react-navigation/stack';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native'
import { Text, TouchableOpacity, View } from 'react-native';
import { Category } from '../components/Category'
import { RootStackParamList } from '../types';
import categoriesStore from '../streams/categories'
import tableStore from '../streams/tables'
import ordersStore from '../streams/orders'
import { tableOrderStyles } from './styles/TableOrder.styles'
import currencyFormatter from 'currency-formatter'
import moment from 'moment'

export default function TableOrder({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  const [categoriesData, setCategoriesData] = useState({ categories<Props>: []})
  const [categories, setCategories] = useState<Props>([])
  const { params } = useRoute()
  useLayoutEffect(() => {
    categoriesStore.subscribe(setCategoriesData)
    categoriesStore.init()
  }, [])

  useEffect(() => {
    setCategories(categoriesData.categories)
  }, [categoriesData.categories])

  const processOrder = () => {
    tableStore.process(params.id, true)
  }

  const price = categoriesData.categories.reduce((accumulator, current) => accumulator + (current.count * current.price), 0);

  const submitOrder = () => {
    const obj = categoriesData.categories.reduce(function(acc, cur, i) {
      acc[cur.name] = cur.count;
      return acc;
    }, {});

    ordersStore.createOrder({
      ...obj,
      Price: price,
      Created: moment().format('DD-MM-YYYY'),
      Time: moment().format('hh:mm')
    })
    tableStore.process(params.id, false)
    navigation.goBack()
  }

  return (
    <View style={tableOrderStyles.container}>
      <Text style={tableOrderStyles.title}>{params.name}</Text>
      <View style={tableOrderStyles.wrapper}>
        {categoriesData.categories && categoriesData.categories.map((item: Props) => (
          <Category id={item.id} key={item._key + item.id} name={item.name} price={item.price} count={item.count} />
        ))}
      </View>
      <View style={tableOrderStyles.priceWrapper}>
        <Text style={tableOrderStyles.title}>Total:  </Text>
        <Text style={tableOrderStyles.title}>{currencyFormatter.format(price, { locale: 'VN' })}</Text>
      </View>
      <View style={tableOrderStyles.priceWrapper}>
        <TouchableOpacity style={tableOrderStyles.button} onPress={processOrder}>
            <Text style={tableOrderStyles.linkText}>Process</Text>
          </TouchableOpacity>
        <TouchableOpacity style={tableOrderStyles.button} onPress={submitOrder}>
          <Text style={tableOrderStyles.linkText}>Order</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={tableOrderStyles.link}>
        <Text style={tableOrderStyles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}

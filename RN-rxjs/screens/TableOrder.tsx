import { StackScreenProps } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native'
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Category } from '../components/Category'
import { RootStackParamList } from '../types';
import tableStore from '../streams/tables'
import { tableOrderStyles } from './styles/TableOrder.styles'
import currencyFormatter from 'currency-formatter'
import moment from 'moment'
import { combineLatest } from 'rxjs';
import withObservableStream from '../streams'
import { createOrder } from '../streams/orders'
import fetchCategory$ from '../streams/categories'
import { incr, decr } from '../helpers'
import { CategoryModel } from '../models'
import { Screen } from '../components/screen/screen'
import { color, spacing } from '../themes'

interface Props extends CategoryModel{
  id: string,
  _key: string,
}

interface TableOrderModel extends StackScreenProps<RootStackParamList, 'NotFound'>{
  categories: Array<Props>,
  createOrder: Function,
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

const TableOrder = ({
  navigation,
  categories,
  createOrder,
}: TableOrderModel) => {
  const { params } = useRoute()
  const processOrder = () => {
    tableStore.process(params.id, true)
  }
  const [categoriesData, setCategories] = useState(categories || [])
  const [discount, setDiscount] = useState(0)
  useEffect(() => {
    console.log(categories)
    setCategories(categories)
  }, [categories])
  let price = categoriesData.reduce((accumulator, current) => accumulator + (current.count * current.price), 0);
  price = price * (1 - discount / 100 )
  const submitOrder = () => {
    const obj = categoriesData.reduce(function(acc, cur) {
      acc[cur.name] = cur.count;
      return acc;
    }, {});

    createOrder({
      ...obj,
      price: price,
      created: moment().format('DD-MM-YYYY'),
      time: moment().format('hh:mm')
    })
    tableStore.process(params.id, false)
    navigation.goBack()
  }

  const incrValue = (id: string) => {
    setCategories(incr(id, categoriesData))
  }

  const decrValue = (id: string) => {
    setCategories(decr(id, categoriesData))
  }

  const handleChangeDiscount = (value) => {
    setDiscount(value ? parseFloat(value) : 0)
  }
  return (
    <View style={tableOrderStyles.container}>
      <Screen
        style={CONTAINER}
        preset="scroll"
        backgroundColor={color.transparent}
      >
        <Text style={tableOrderStyles.title}>{params.name}</Text>
        <View style={tableOrderStyles.wrapper}>
          {categoriesData.map((item: Props) => (
            <Category
              id={item.id}
              key={item._key + item.id}
              name={item.name}
              price={item.price}
              count={item.count}
              incrValue={incrValue}
              decrValue={decrValue}
            />
          ))}
        </View>
        <View style={tableOrderStyles.discountWrapper}>
          <Text style={tableOrderStyles.title}>Discount( % ):  </Text>
          <TextInput
            style={tableOrderStyles.input}
            keyboardType="numeric"
            onChangeText={handleChangeDiscount}
          />
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
      </Screen>
    </View>
  );
}

// Defined actions for order subject
export const cartActions = {
  createOrder: (data: any) => createOrder(data),
};

export default withObservableStream(
  combineLatest(
    fetchCategory$,
    (categories) => ({
      categories
    }),
  ),
  cartActions,
  {
    categories: []
  },
)(TableOrder);

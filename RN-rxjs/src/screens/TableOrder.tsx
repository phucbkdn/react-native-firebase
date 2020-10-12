// Libs
import { StackScreenProps } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { Text, TouchableOpacity, View, TextInput } from 'react-native'
import moment from 'moment'
import { connect } from '../state/RXState'
import {  counterActions } from '../reducers/categories'

// Helpers
import { updateOrder } from '../streams/tables'
import { createOrder } from '../streams/orders'
import { CategoryModel } from '../models'
import { color } from '../themes'
import { tableOrderStyles } from './styles/TableOrder.styles'
import { RootStackParamList } from '../types'

// Components
import Discount from '../components/Discount'
import { Category } from '../components/Category'
import { Screen } from '../components/screen/screen'

interface TableOrderModel {
  categories: Array<CategoryModel>,
  navigation: StackScreenProps<RootStackParamList, 'NotFound'>,
  increment: Function,
  decrement: Function,
  discountChange: Function,
  discount: number,
}

const TableOrder = ({
  navigation,
  categories,
  increment,
  decrement,
  discountChange,
  discount
}: TableOrderModel) => {
  const { params } = useRoute()
  const [categoriesData, setCategories] = useState<CategoryModel[]>([])
  useEffect(()=> {
    if (categories) {
      setCategories(categories)
    }
  }, [categories])

  let price = categoriesData.reduce((accumulator, current) => accumulator + (current.count * current.price), 0);
  price = price * (1 - discount / 100 )

  const submitOrder = () => {
    const obj = categoriesData.reduce((acc, cur) => ({...acc, [cur.name]: cur.count}), {});
    createOrder({
      ...obj,
      price: price,
      created: moment().format('DD-MM-YYYY'),
      time: moment().format('hh:mm')
    })
    updateOrder(params.id, false)
    navigation.goBack()
  }

  const incrValue = (id: string) => {
    increment(id)
  }

  const decrValue = (id: string) => {
    decrement(id)
  }

  const handleChangeDiscount = (value: string) => {
    discountChange(value ? parseFloat(value) : 0)
  }

  const processOrder = () => {
    updateOrder(params.id, true)
  }

  return (
    <View style={tableOrderStyles.container}>
      <Screen
        style={tableOrderStyles.screen}
        preset="scroll"
        backgroundColor={color.transparent}
      >
        <Text style={tableOrderStyles.title}>{params.name}</Text>
        <View style={tableOrderStyles.wrapper}>
          {categoriesData.map((item: CategoryModel) => (
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
        <Discount />
        <View style={tableOrderStyles.priceWrapper}>
          <TouchableOpacity style={tableOrderStyles.button} onPress={processOrder}>
              <Text style={tableOrderStyles.linkText}>Process</Text>
            </TouchableOpacity>
          <TouchableOpacity disabled={price === 0} style={tableOrderStyles.button} onPress={submitOrder}>
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

export default connect(({ counter = {} }) => ({ categories: counter ? counter.categories : [], discount: counter.discount }), counterActions)(TableOrder)

// Libs
import { StackScreenProps } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { Text, TouchableOpacity, View, TextInput } from 'react-native'
import moment from 'moment'

// Helpers
import { updateOrder } from '../streams/tables'
import { createOrder } from '../streams/orders'
import { CategoryModel } from '../models'
import { color } from '../themes'
import categoriesService from '../store/categories'
import useUnmount from '../hooks/useUnmount'
import { tableOrderStyles } from './styles/TableOrder.styles'
import { RootStackParamList } from '../types'

// Components
import { Discount } from '../components/Discount'
import { Category } from '../components/Category'
import { Screen } from '../components/screen/screen'

interface Props extends CategoryModel{
  id: string,
  _key: string,
}

interface TableOrderModel {
  categories: Array<Props>,
  // createOrder: Function,
  navigation: StackScreenProps<RootStackParamList, 'NotFound'>
}

const TableOrder12 = ({
  navigation,
  // categories,
  // createOrder,
}: TableOrderModel) => {
  const { params } = useRoute()
  const [categoriesData, setCategories] = useState([])
  const [discount, setDiscount] = useState(0)
  useEffect(()=> {
    categoriesService.getStore()
      .subscribe(it => {
        setCategories(it.categories)
        setDiscount(it.discount)
      })
      categoriesService.getCategories()

      return () => categoriesService.getStore().unsubscribe()
  }, [])
  useUnmount(() => {
    categoriesService.getStore().unsubscribe()
    categoriesService.unSubscribe()
  })

  let price = categoriesData.reduce((accumulator, current) => accumulator + (current.count * current.price), 0);
  price = price * (1 - discount / 100 )

  const submitOrder = () => {
    const obj = categoriesData.reduce((acc, cur) => ({...acc, [cur.name]: cur.count}), {});
    console.log('obj', obj)
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
    categoriesService.incr(id)
  }

  const decrValue = (id: string) => {
    categoriesService.decr(id)
  }

  const handleChangeDiscount = (value: string) => {
    // setDiscount(value ? parseFloat(value) : 0)
    categoriesService.discount(value ? parseFloat(value) : 0)
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

// Defined actions for order subject
export const cartActions = {
  createOrder: (data: any) => createOrder(data),
};

export default TableOrder12

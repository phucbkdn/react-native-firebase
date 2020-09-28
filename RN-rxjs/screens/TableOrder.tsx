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


interface Props extends CategoryModel{
  id: string,
  _key: string,
}

interface TableOrderModel extends StackScreenProps<RootStackParamList, 'NotFound'>{
  categories: Array<Props>,
  createOrder: Function,
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
  useEffect(() => {
    console.log(categories)
    setCategories(categories)
  }, [categories])
  const price = categoriesData.reduce((accumulator, current) => accumulator + (current.count * current.price), 0);

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

  return (
    <View style={tableOrderStyles.container}>
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
      <View style={tableOrderStyles.priceWrapper}>
        <Text style={tableOrderStyles.title}>Discount( % ):  </Text>
        <TextInput />
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

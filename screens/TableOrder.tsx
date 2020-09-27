import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { useRoute } from '@react-navigation/native'
import { Text, TouchableOpacity, View } from 'react-native';
import { Category } from '../components/Category'
import { RootStackParamList } from '../types';
import tableStore from '../streams/tables'
import { tableOrderStyles } from './styles/TableOrder.styles'
import currencyFormatter from 'currency-formatter'
import moment from 'moment'
import { BehaviorSubject, combineLatest } from 'rxjs';
import withObservableStream from '../streams'
import { createOrder } from '../streams/orders'
import fetchCategory$ from '../streams/categories'
import { incr, decr } from '../helpers'

const TableOrder = ({
  navigation,
  categories,
  createOrder,
  incrValue,
  decrValue
}: StackScreenProps<RootStackParamList, 'NotFound'>) => {
  const { params } = useRoute()
  const processOrder = () => {
    tableStore.process(params.id, true)
  }

  const price = categories.reduce((accumulator, current) => accumulator + (current.count * current.price), 0);

  const submitOrder = () => {
    const obj = categories.reduce(function(acc, cur, i) {
      acc[cur.name] = cur.count;
      return acc;
    }, {});

    createOrder({
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
        {categories.map((item: Props) => (
          <Category
            id={item.id}
            key={item._key + item.id}
            name={item.name}
            price={item.price}
            count={item.count}
            categories={categories}
            incrValue={incrValue}
            decrValue={decrValue}
          />
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

// Defined actions for order subject
const categorySubject = new BehaviorSubject([]);

export const cartActions = {
  createOrder: (data: any) => createOrder(data),
  incrValue: (id, categories) => categorySubject.next(incr(id, categories)),
  decrValue: (id, categories) => categorySubject.next(decr(id, categories)),
};

export default withObservableStream(
  combineLatest(
    categorySubject,
    fetchCategory$,
    (category, categories) => ({
      categories,
    }),
  ),
  cartActions,
  {
    categories: []
  },
)(TableOrder);

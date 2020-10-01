import React, { FC, memo, useState, useEffect } from 'react'
import {
  View,
  Text,
} from 'react-native'
import currencyFormatter from 'currency-formatter'
import { discountStyles } from './styles/discount.styles'
import categoriesService from '../store/categories'
import useUnmount from '../hooks/useUnmount'

export const Discount: FC = memo(() => {
  const [categoriesData, setCategories] = useState([])
  const [discount, setDiscount] = useState(0)
  useEffect(()=> {
    categoriesService.getStore()
      .subscribe(it => {
        setCategories(it.categories)
        setDiscount(it.discount)
      })
      categoriesService.getCategories()
  }, [])
  useUnmount(() => {
    categoriesService.getStore().unsubscribe()
  })

  let price = categoriesData.reduce((accumulator, current) => accumulator + (current.count * current.price), 0);
  const discountPrice = price * discount / 100
  price = price - discountPrice

  return (
    <View style={discountStyles.container}>
      <View style={discountStyles.priceWrapper}>
        <Text style={discountStyles.title}>Discount:  </Text>
        <Text style={discountStyles.title}>{currencyFormatter.format(discountPrice, { locale: 'VN' })}</Text>
      </View>
      <View style={discountStyles.priceWrapper}>
        <Text style={discountStyles.title}>Total:  </Text>
        <Text style={discountStyles.title}>{currencyFormatter.format(price, { locale: 'VN' })}</Text>
      </View>
    </View>
  )}
)

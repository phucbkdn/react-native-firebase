import React, { FC, memo } from 'react'
import {
  View,
  Text,
} from 'react-native'
import currencyFormatter from 'currency-formatter'
import { discountStyles } from './styles/discount.styles'
import { connect } from '../state/RXState'
import { CategoryModel } from '../models'

interface TableOrderModel {
  categories: Array<CategoryModel>,
  discount: number,
}

export const Discount: FC<TableOrderModel> = memo(({categories = [], discount}: TableOrderModel) => {
  let price = categories.reduce((accumulator, current) => accumulator + (current.count * current.price), 0);
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

export default connect(({ counter = {} }) => ({ categories: counter ? counter.categories : [], discount: counter.discount }), [])(Discount)

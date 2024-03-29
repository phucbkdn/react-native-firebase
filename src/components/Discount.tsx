import React, { FC, memo, useContext } from 'react'
import { View, Text } from 'react-native'
import currencyFormatter from 'currency-formatter'
import { discountStyles } from './styles/discount.styles'
import { CategoryModel } from '../models'
import { LocaleContext } from '../provider'

interface TableOrderModel {
  categories: Array<CategoryModel>
  discount: number
}

export const Discount: FC<TableOrderModel> = memo(
  ({ categories = [], discount }: TableOrderModel) => {
    let price = categories.reduce(
      (accumulator, current) => accumulator + current.count * current.price,
      0
    )
    const { locale } = useContext(LocaleContext)
    const discountPrice = (price * discount) / 100
    price = price - discountPrice

    return (
      <View style={discountStyles.container}>
        <View style={discountStyles.priceWrapper}>
          <Text style={discountStyles.title}>Discount: </Text>
          <Text style={discountStyles.title}>
            {currencyFormatter.format(discountPrice, { locale })}
          </Text>
        </View>
        <View style={discountStyles.priceWrapper}>
          <Text style={discountStyles.title}>Total: </Text>
          <Text style={discountStyles.title}>
            {currencyFormatter.format(price, { locale })}
          </Text>
        </View>
      </View>
    )
  }
)

export default Discount

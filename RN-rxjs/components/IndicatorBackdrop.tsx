import React, { FC } from 'react'

// Components
import { View, ActivityIndicator } from 'react-native'

// Styles
import styles from './styles/indicator.styles'
import { palette } from '../themes'

const Indicator: FC<> = () => (
  <View style={styles.backdrops}>
    <ActivityIndicator
      size='large'
      color={palette.dustyGray}
    />
  </View>
)

export default Indicator

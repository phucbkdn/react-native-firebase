import React, { FC, memo } from 'react'
import { View, ViewStyle } from 'react-native'
import { Icon } from 'react-native-elements'
import { iconStyles } from './styles/icon.styles'

interface IProps {
  style: ViewStyle
  icon: any
}

const BaseIcon: FC<IProps> = ({ style, icon }: IProps) => (
  <View style={[iconStyles.container, style]}>
    <Icon
      size={24}
      color="white"
      type="material"
      name="notifications"
      {...icon}
    />
  </View>
)

BaseIcon.defaultProps = {
  style: {},
  icon: {},
}

export default memo<IProps>(BaseIcon)

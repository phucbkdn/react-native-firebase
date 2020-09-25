import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from '../components/Themed';
import countStore from '../streams/tables'
import { Table } from '../components/Table'
import { tabOneScreenStyles } from './styles/TabOneScreen.styles'
import { TableModel } from '../models'

export default function TabOneScreen() {
  const [countData, setCountData] = useState({ tables<TableModel>: []})

  useLayoutEffect(() => {
    countStore.subscribe(setCountData)
    countStore.incr()
  }, [])

    return (
      <View style={tabOneScreenStyles.container}>
        <Text style={tabOneScreenStyles.title}>Tab One</Text>
        <View style={tabOneScreenStyles.wrapper}>
          {countData.tables && countData.tables.map((item: TableModel) => (
            <Table key={item._key} id={item._key} name={item.name} active={item.active} />
          ))}
        </View>
      </View>
    );
}

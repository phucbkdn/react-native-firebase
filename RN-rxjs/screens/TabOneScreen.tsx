import React from 'react';
import { View } from 'react-native';
import { map } from 'rxjs/operators'
import { Text } from '../components/Themed';
import { fetchOrders } from '../streams/tables'
import { Table } from '../components/Table'
import { tabOneScreenStyles } from './styles/TabOneScreen.styles'
import { TableModel } from '../models'
import withObservableStream from '../streams'

const TabOneScreen = ({ tables }) => {

    return (
      <View style={tabOneScreenStyles.container}>
        <Text style={tabOneScreenStyles.title}>Tab One</Text>
        <View style={tabOneScreenStyles.wrapper}>
          {tables.map((item: TableModel) => (
            <Table key={item._key} id={item._key} name={item.name} active={item.active} />
          ))}
        </View>
      </View>
    );
}

export default withObservableStream(
  fetchOrders.pipe(map(tables => ({ tables }))),
  {},
  {
    tables: []
  },
)(TabOneScreen);

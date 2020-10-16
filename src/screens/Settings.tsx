import React, { useState, useEffect, useContext, useCallback, FC } from 'react'
import { View, Text, Switch } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'

import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

import {
  registerForPushNotificationsAsync,
  sendPushNotification,
} from '../services/notifications'
import useStatusBar from '../hooks/useStatusBar'
import { logout, uploadAvatar, saveExpoPushToken } from '../services'
import { AuthUserContext } from '../provider'
import BaseIcon from '../components/Icon'
import Indicator from '../components/IndicatorBackdrop'
import { settingsStyles } from './styles/Settings.styles'

const Settings: FC = () => {
  useStatusBar('dark-content')

  const [expoPushToken, setExpoPushToken] = useState('')
  const { user, setUser } = useContext(AuthUserContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (!token) return

      setExpoPushToken(token)
      saveExpoPushToken(token)
    })
  }, [])

  async function handleSignOut() {
    try {
      await logout()
    } catch (error) {
      console.log(error)
    }
  }

  async function getPermissionAsync() {
    if (Constants.platform?.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
  }

  async function _pickImage() {
    try {
      await getPermissionAsync()

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      })

      if (!result.cancelled) {
        setLoading(true)
        const response = await fetch(result.uri)
        const blob = await response.blob()
        uploadAvatar(blob, result.uri, (new_user) => {
          setUser(new_user)
          forceUpdate()
          setLoading(false)
        })
      }
    } catch {}
  }

  return (
    <View style={settingsStyles.scroll}>
      {loading && <Indicator />}
      <View style={settingsStyles.userRow}>
        <View style={settingsStyles.userImage}>
          <Avatar
            rounded
            size="large"
            source={{
              uri:
                user?.photoURL ??
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>{user?.displayName}</Text>
          <Text
            style={{
              color: 'gray',
              fontSize: 16,
            }}
          >
            {user?.email}
          </Text>
        </View>
      </View>
      <View style={settingsStyles.textWrapper}>
        <Text style={settingsStyles.text}>Account</Text>
      </View>
      <View>
        <ListItem
          style={settingsStyles.listItemContainer}
          onPress={() =>
            sendPushNotification({
              to: expoPushToken,
              sound: 'default',
              title: 'Original Title',
              body: 'And here is the body!',
              data: { data: 'goes here' },
            })
          }
        >
          <BaseIcon
            style={{
              backgroundColor: '#FFADF2',
            }}
            icon={{
              type: 'material',
              name: 'notifications',
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Push notification</ListItem.Title>
          </ListItem.Content>
          <Switch onValueChange={() => {}} value={true} />
        </ListItem>

        <ListItem style={settingsStyles.listItemContainer} onPress={_pickImage}>
          <BaseIcon
            style={{
              backgroundColor: '#57DCE7',
            }}
            icon={{
              type: 'material',
              name: 'add-a-photo',
            }}
          />
          <ListItem.Content>
            <ListItem.Title>Upload avatar</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          onPress={handleSignOut}
          style={settingsStyles.listItemContainer}
        >
          <ListItem.Content>
            <ListItem.Title style={settingsStyles.logoutText}>
              Sign out
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </View>
  )
}

export default Settings

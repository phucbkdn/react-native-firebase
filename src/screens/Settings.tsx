import React, { useState, useEffect, useContext, useCallback, FC } from 'react'
import { Switch, Alert } from 'react-native'
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

// Themes
import { View, Text } from '../components/Themed'
import { color } from '../themes'

const Settings: FC = () => {
  useStatusBar('dark-content')

  const [expoPushToken, setExpoPushToken] = useState('')
  const { user, setUser, setTheme, theme } = useContext(AuthUserContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [, updateState] = useState()
  const [darkMode, setDarkMode] = useState(false)
  const forceUpdate = useCallback(() => updateState({}), [])
  const styles = settingsStyles(theme)

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
        if (!blob || blob.size === 0) {
          Alert.alert('Upload Avatar Error')
          return
        }

        uploadAvatar(blob, result.uri, (new_user) => {
          setUser(new_user)
          forceUpdate()
          setLoading(false)
        })
      }
    } catch {}
  }

  const switchMode = () => {
    setTheme(!darkMode ? 'dark' : 'light')
    setDarkMode(!darkMode)
  }

  return (
    <View style={styles.scroll}>
      {loading && <Indicator />}
      <View style={styles.userRow}>
        <View style={styles.userImage}>
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
          <Text style={styles.title}>{user?.displayName}</Text>
          <Text style={styles.title}>{user?.email}</Text>
        </View>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>Account</Text>
      </View>
      <View>
        <ListItem
          containerStyle={styles.listItemContainer}
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
              backgroundColor: color.lavenderRose,
            }}
            icon={{
              type: 'material',
              name: 'notifications',
            }}
          />
          <ListItem.Content>
            <Text>Push notification</Text>
          </ListItem.Content>
          <Switch onValueChange={() => {}} value={true} />
        </ListItem>
        <ListItem containerStyle={styles.listItemContainer}>
          <BaseIcon
            style={{
              backgroundColor: color.lavenderRose,
            }}
            icon={{
              type: 'material',
              name: 'sync',
            }}
          />
          <ListItem.Content>
            <Text>Dark mode</Text>
          </ListItem.Content>
          <Switch onValueChange={switchMode} value={darkMode} />
        </ListItem>

        <ListItem
          containerStyle={styles.listItemContainer}
          onPress={_pickImage}
        >
          <BaseIcon
            style={{
              backgroundColor: color.turquoiseBlue,
            }}
            icon={{
              type: 'material',
              name: 'add-a-photo',
            }}
          />
          <ListItem.Content>
            <Text>Upload avatar</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
        <ListItem
          onPress={handleSignOut}
          containerStyle={styles.listItemContainer}
        >
          <ListItem.Content>
            <ListItem.Title style={styles.logoutText}>Sign out</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View>
    </View>
  )
}

export default Settings

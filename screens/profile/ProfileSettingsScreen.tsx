import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootStackScreenProps } from '../../types'

export default function ProfileSettingsScreen({ navigation }: RootStackScreenProps<'ProfileSettings'>) {
  const logout = () => {
    AsyncStorage.setItem('user', '')
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Launcher' }],
        });
      })
  }

  return (
    <View style={styles.container}>
      <Button
        title="Logout"
        onPress={() => logout()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
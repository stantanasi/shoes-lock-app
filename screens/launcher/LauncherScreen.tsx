import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { RootStackScreenProps } from '../../types'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function LauncherScreen({ navigation }: RootStackScreenProps<'Launcher'>) {

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((value) => {
        if (value) {
          const user = JSON.parse(value);

          navigation.reset({
            index: 0,
            routes: [{ name: 'Root' }],
          });
        }
      })
  }, [])

  return (
    <View style={styles.container}>
      <Text>LauncherScreen</Text>
      <View style={styles.buttons}>
        <Button
          title='Login'
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          title='Sign In'
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
  },
})
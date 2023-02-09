import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../../types'

export default function LauncherScreen({ navigation }: RootStackScreenProps<'Launcher'>) {
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
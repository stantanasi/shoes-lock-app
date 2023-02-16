import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUser, User } from '../../services/users';
import { RootTabScreenProps } from '../../types';

export default function ProfileScreen({ navigation }: RootTabScreenProps<'Profile'>) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((value) => {
        if (!value) throw new Error()

        return getUser(JSON.parse(value).uid)
      })
      .then((value) => setUser(value))
      .catch(() => {
        console.error('Une erreur est survenue')
        navigation.reset({
          index: 0,
          routes: [],
        })
        navigation.navigate('Launcher')
      })
  }, [])

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://avatars.githubusercontent.com/u/72262554?v=4' }}
        style={styles.profilePic}
      />
      <Text>{user?.name ?? ''}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  profilePic: {
    width: 150,
    height: 150,
  },
})
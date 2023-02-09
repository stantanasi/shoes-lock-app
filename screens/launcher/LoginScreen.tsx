import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../../firebase';
import { RootStackScreenProps } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: RootStackScreenProps<'Login'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (email: string, password: string) => {
    auth.signInWithEmailAndPassword(email, password)
      .then((credentials) => {
        const user = credentials.user;
        if (!user) throw new Error('User is null');

        AsyncStorage.setItem('user', JSON.stringify({ uid: user.uid }));
        return user;
      })
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Root' }],
        });
      })
      .catch((error) => console.error(error));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder='Email'
        style={styles.email}
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        placeholder='Password'
        style={styles.password}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      <Button
        title='Login'
        onPress={() => {
          if (email.trim() === '') return;
          if (password.trim() === '') return;

          login(email, password);
        }}
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
  title: {},
  email: {},
  password: {},
})
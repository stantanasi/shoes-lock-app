import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { auth, fireDB } from '../../firebase';
import { RootStackScreenProps } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }: RootStackScreenProps<'Register'>) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = (name: string, email: string, password: string) => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(async (credentials) => {
        const user = credentials.user;
        if (!user) throw new Error('User is null');

        await fireDB
          .collection('user')
          .add({
            uid: user.uid,
            name: name,
          });
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
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        placeholder='Name'
        style={styles.name}
        value={name}
        onChangeText={(value) => setName(value)}
      />
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
        title='Sign In'
        onPress={() => {
          if (name.trim() === '') return;
          if (email.trim() === '') return;
          if (password.trim() === '') return;

          register(name, email, password);
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
  name: {},
  email: {},
  password: {},
})
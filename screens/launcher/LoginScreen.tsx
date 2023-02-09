import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
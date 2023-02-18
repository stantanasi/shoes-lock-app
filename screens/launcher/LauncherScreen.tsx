import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { RootStackScreenProps } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SquareButton from "../../components/atoms/square-button";
import Spacer from "../../components/atoms/spacer";

export default function LauncherScreen({
  navigation,
}: RootStackScreenProps<"Launcher">) {
  useEffect(() => {
    AsyncStorage.getItem("user").then((value) => {
      if (value) {
        const user = JSON.parse(value);

        navigation.reset({
          index: 0,
          routes: [{ name: "Root" }],
        });
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <SquareButton onPress={() => navigation.navigate("Login")}>
          Log in your account here !
        </SquareButton>
        <Spacer width={10} />
        <SquareButton onPress={() => navigation.navigate("Register")}>
          Not a member yet ? Register here !
        </SquareButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  box: {
    flexDirection: "row",
    height: 160,
  },
});

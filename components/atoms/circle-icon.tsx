import React from "react";
import { View, Pressable, StyleSheet, Image } from "react-native";

interface CircleIconProps {
  onPress: () => void;
  url: any;
}

const CircleIcon = ({ onPress, url }: CircleIconProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.circleBtn}>
        <Image style={styles.img} source={url} />
      </View>
    </Pressable>
  );
};

export default CircleIcon;

const styles = StyleSheet.create({
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 20,
    height: 20,
  },
});

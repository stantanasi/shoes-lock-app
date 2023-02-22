import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RootTabScreenProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { getOrders, Order } from "../../services/order";
import OrderItemBox from "../../components/organisms/order-item-box";
import { useIsFocused } from "@react-navigation/native";

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<"Profile">) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [orders, setOrders] = useState<Order[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && updateOrders();
  }, [isFocused]);

  let profilePic;
  if (user.profilePic) {
    profilePic = (
      <Image source={{ uri: user.profilePic }} style={styles.profilePic} />
    );
  } else {
    profilePic = (
      <Image
        source={require("../../assets/images/user-icon.png")}
        style={styles.profilePic}
      />
    );
  }

  function updateOrders() {
    if (user) {
      getOrders(user.uid).then((res) => {
        console.log("Orders res: ", res);
        setOrders(res);
      });
    } else {
      console.error("User undefined");
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {profilePic}
        <Text>{user.name}</Text>
        <View>
          {orders.map((order, index) => {
            return <OrderItemBox key={index} order={order} />;
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  profilePic: {
    width: 150,
    height: 150,
  },
});

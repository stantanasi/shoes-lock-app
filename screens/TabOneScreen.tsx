import { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { addToCart, removeFromCart, RootState, updateCart } from "../redux";
import { getShoes, Shoe } from "../services/shoes";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [quantity, setQuantity] = useState<string>("1");
  useEffect(() => {
    getShoes().then((res) => {
      console.log("res: ", res);
      setShoes(res);
      console.log("Shoes : ", shoes);
    });
  }, []);

  function addItemToCart(i: number): any {
    dispatch(addToCart(shoes[i]));
    console.log("Cart : " + JSON.stringify(cart));
  }

  function removeItemFromCart(id: string): any {
    dispatch(removeFromCart(id));
    console.log("Cart : " + JSON.stringify(cart));
  }

  function changeQuantityFromCart(id: string, quantity: string): any {
    const quantityNum: number = parseInt(quantity);
    console.log("Number quantity : ", quantityNum);
    dispatch(
      updateCart({
        id: id,
        quantity: quantityNum,
      })
    );
    console.log("Cart : " + JSON.stringify(cart));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <View style={styles.buttonDesk}>
        <View style={styles.buttonContainer}>
          <Button title="Add 1" onPress={() => addItemToCart(0)}></Button>
          <Button title="Add 2" onPress={() => addItemToCart(1)}></Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Remove 1"
            onPress={() => removeItemFromCart("M1Tm5XDjL4bCfP7ggrDm")}
          ></Button>
          <Button
            title="Remove 2"
            onPress={() => removeItemFromCart("YSGRHbTfAV0XdOXX79Or")}
          ></Button>
        </View>
        <TextInput
          placeholder="Quantity"
          onChangeText={setQuantity}
          value={quantity}
          keyboardType="number-pad"
          maxLength={2}
        ></TextInput>
        <View style={styles.buttonContainer}>
          <Button
            title="Update 1"
            onPress={() =>
              changeQuantityFromCart("M1Tm5XDjL4bCfP7ggrDm", quantity)
            }
          ></Button>
          <Button
            title="Update 2"
            onPress={() =>
              changeQuantityFromCart("YSGRHbTfAV0XdOXX79Or", quantity)
            }
          ></Button>
        </View>
      </View>
      <Text>{JSON.stringify(shoes)}</Text>
      <Text>{JSON.stringify(cart)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    borderColor: "#000",
    borderWidth: 2,
    alignContent: "space-between",
    justifyContent: "space-around",
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
  },
  buttonDesk: {
    width: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

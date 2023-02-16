import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, RootState } from "../redux";
import { Shoe } from "../services/shoes";
import Spacer from "./atoms/spacer";

interface ShopItemProps {
  shoe: Shoe;
}

export default function ShopItem({ shoe }: ShopItemProps) {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  function addItemToCart(): any {
    dispatch(addToCart(shoe));
    console.log("Cart : " + JSON.stringify(cart));
  }

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: shoe.img }} style={styles.img} />
      </View>
      <Spacer width={10}></Spacer>
      <View style={styles.infoBox}>
        <View style={styles.textBox}>
          <Text style={styles.textTitle}>{shoe.name}</Text>
          <Text style={styles.textPrice}>{shoe.price} €</Text>
        </View>
        <View style={styles.actionBox}>
          <Pressable
            style={styles.button}
            onPress={() => {
              addItemToCart();
            }}
          >
            <Text style={styles.buttonText}>AJOUTER AU PANIER</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: { color: "#fff", fontWeight: "bold" },
  button: {
    color: "#fff",
    backgroundColor: "#7c7979",
    borderRadius: 6,
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    // borderWidth: 2,
    // borderColor: "#ff0000",
    borderRadius: 20,
    backgroundColor: "#ebebeb",
  },
  scroll: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoBox: {
    width: 150,
  },
  actionBox: {
    width: "100%",
  },
  textBox: {
    width: "100%",
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textPrice: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  img: {
    height: 200,
    width: 200,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ebebeb",
    borderRadius: 18,
  },
});

import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Spacer from "../components/atoms/spacer";
import CartItemBox from "../components/organisms/cart-item-box";
import { Text, View } from "../components/Themed";
import {
  addToCart,
  addToFavorites,
  removeFromCart,
  removeFromFavorites,
  RootState,
  updateCart,
} from "../redux";
import { createOrder, Order } from "../services/order";
import { getShoes, Shoe } from "../services/shoes";

export default function CartScreen() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const favorites = useSelector((state: RootState) => state.favorites);
  const user = useSelector((state: RootState) => state.user);
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [quantity, setQuantity] = useState<string>("1");
  useEffect(() => {
    getShoes().then((res) => {
      console.log("res: ", res);
      setShoes(res);
      console.log("Shoes : ", shoes);
    });
  }, []);

  function addItemToCart(shoe: Shoe): any {
    dispatch(addToCart(shoe));
    console.log("Cart : " + JSON.stringify(cart));
  }

  function createNewOrder(): any {
    const newOrder: Order = {
      items: cart,
      deliveryAddress: user.address,
      status: "pending",
      userID: user.uid,
    };
    createOrder(newOrder);
    console.log("Cart : " + JSON.stringify(cart));
  }

  function removeItemFromCart(id: string, removeAll?: boolean): any {
    dispatch(removeFromCart({ shoeID: id, removeAll: removeAll }));
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

  let finishOrderButton;
  if (cart[0]) {
    finishOrderButton = (
      <Button
        title="Proceed to checkout"
        onPress={() => {
          createNewOrder();
        }}
      />
    );
  } else {
    finishOrderButton = <View></View>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Cart</Text>
        <Spacer height={40} />
        <View style={styles.list}>
          {cart.map((shoe) => (
            <CartItemBox
              key={shoe.id}
              item={shoe}
              removeItem={(id: string, removeAll?: boolean) => {
                removeItemFromCart(id, removeAll);
              }}
              addItem={(shoe: Shoe) => {
                addItemToCart(shoe);
              }}
            />
          ))}
        </View>
        <View>{finishOrderButton}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 30,
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "italic",
  },
  list: {
    flexDirection: "column",
    flex: 1,
    width: "100%",
  },
});

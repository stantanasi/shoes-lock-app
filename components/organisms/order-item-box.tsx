import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable, Modal } from "react-native";
import { getItemCount, getOrderTotalPrice, Order } from "../../services/order";
import Spacer from "../atoms/spacer";

interface BoxItemProps {
  order: Order;
}

export default function OrderItemBox({ order: order }: BoxItemProps) {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {}, []);

  return (
    <View>
      <Modal transparent={true} animationType="slide" visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Order number : {order.id}</Text>
            <Text>Order status : {order.status}</Text>
            <Spacer height={10}></Spacer>
            {order.items.map((item, index) => {
              let promoText;
              if (item.promo) {
                promoText = (
                  <View>
                    <Text>Promo : {item.promo}%</Text>
                  </View>
                );
              } else {
                promoText = <View></View>;
              }
              return (
                <View key={index} style={{}}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: 250,
                      borderRadius: 20,
                      backgroundColor: "#ebebeb",
                    }}
                  >
                    <View>
                      <Image source={{ uri: item.img }} style={styles.img} />
                    </View>
                    <Spacer width={10}></Spacer>
                    <View style={styles.textBox}>
                      <Spacer height={2} />
                      <Text>{item.name}</Text>
                      <Text>Quant. : {item.quantity}</Text>
                      <Text>Price : {item.price}</Text>
                      {promoText}
                    </View>
                  </View>
                  <Spacer height={10}></Spacer>
                </View>
              );
            })}
            <Text>Total price : {getOrderTotalPrice(order)}</Text>
            <Spacer height={10}></Spacer>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.btnText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <View style={styles.upbox}>
          <Text style={styles.text}>Order id : {order.id?.slice(0, 5)}...</Text>
          <Text style={styles.text}>
            Comprend {getItemCount(order)} articles
          </Text>
        </View>
        <Spacer height={10} />
        <View style={styles.downbox}>
          <Pressable
            style={styles.orderButton}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.btnText}>Show details</Text>
          </Pressable>
        </View>
      </View>
      <Spacer height={10} />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  orderButton: {
    color: "#fff",
    backgroundColor: "#acacac",
    borderRadius: 6,
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    padding: 5,
    paddingRight: 40,
    paddingLeft: 40,
    paddingBottom: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  textBox: {
    width: "100%",
  },
  upbox: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  shoesname: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontStyle: "italic",
    // fontWeight: "bold",
  },
  btnText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    // borderWidth: 2,
    // borderColor: "#000",
  },
  btnPress: {
    // borderWidth: 2,
    // borderColor: "#000",
    width: 20,
    alignItems: "center",
  },
  downbox: {
    alignItems: "center",
    justifyContent: "center",
  },
  downbox2: {
    alignItems: "center",
    backgroundColor: "#00ccff5",
    flex: 1,
    flexDirection: "row",
  },
  img: {
    height: 80,
    width: 80,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ebebeb",
    borderRadius: 18,
  },
});

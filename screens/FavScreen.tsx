import { StyleSheet, ScrollView } from "react-native";
import Spacer from "../components/atoms/spacer";
import ItemBox from "../components/organisms/item-box";
import { Text, View } from "../components/Themed";
import { Shoe } from "../services/shoes";

export default function FavScreen() {
  const tempShoes: Shoe[] = [
    {
      id: "1",
      name: "Air Jordan 1",
      brandID: 1,
      price: 120,
      img: "https://myalpins.com/1680-large_default/nike-air-jordan-1-mid-noir-blanc.jpg",
      promo: 0,
    },
    {
      id: "2",
      name: "Yeezy Boost 350 ",
      brandID: 2,
      price: 120,
      img: "https://www.pngall.com/wp-content/uploads/2016/06/Adidas-Shoes-Free-Download-PNG.png",
      promo: 0,
    },
  ];
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
        <Spacer height={40} />
        <View style={styles.list}>
          {tempShoes.map((shoe, index) => (
            <ItemBox key={index} favOption item={shoe} removeItem={() => {}} />
          ))}
        </View>
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

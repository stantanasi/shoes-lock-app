import { fireDB } from "../firebase";

export function getShoes(): Array<Shoe> | undefined {
  let shoesList: Array<Shoe> = [];

  fireDB.collection("shoes").onSnapshot((res) => {
    res.forEach((doc) => {
      console.log(doc.data());
      const stringValue = JSON.stringify(doc.data());
      const value: Shoe = JSON.parse(stringValue);
      shoesList.push(value);
    });
    console.log("Shoes list : ", shoesList);
    return shoesList;
  });

  return;
}

export function createShoe(shoe: Shoe): void {
  fireDB
    .collection("shoes")
    .add(shoe)
    .then(() => {
      console.log("Shoe created");
    })
    .catch(() => {
      console.log("Error shoe creation");
    });
}

export type Shoe = {
  name: string;
  img: string;
  price: number;
  brandID: number;
};

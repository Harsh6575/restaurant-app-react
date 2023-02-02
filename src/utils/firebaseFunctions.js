import { collection, doc, getDocs, orderBy, query, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase.config';

//save item to firebase firestore database 
export const saveItem = async (data) => {
    await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
        merge: true
    });
};

//get all food items from the store 
export const getAllFoodItems = async () => {
    const items = await getDocs(query(collection(firestore,"foodItems"),orderBy("id","desc")));
    return items.docs.map((doc)=> doc.data());
}
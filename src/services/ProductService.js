import { db } from '../config/firebaseConfig'; // Firebase config dosyasından db'yi içe aktarıyoruz
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

const productCollectionRef = collection(db, "products");

// Ürün ekleme
export const addProduct = async (productData) => {
  try {
    const newProduct = await addDoc(productCollectionRef, productData);
    return newProduct.id;
  } catch (error) {
    console.error("Ürün eklenirken hata oluştu: ", error);
    throw error;
  }
};

// Ürün güncelleme
export const updateProduct = async (id, updatedProductData) => {
  try {
    const productDoc = doc(db, "products", id);
    await updateDoc(productDoc, updatedProductData);
    console.log("Ürün başarıyla güncellendi.");
  } catch (error) {
    console.error("Ürün güncellenirken hata oluştu: ", error);
    throw error;
  }
};

// Ürün silme
export const deleteProduct = async (id) => {
  try {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    console.log("Ürün başarıyla silindi.");
  } catch (error) {
    console.error("Ürün silinirken hata oluştu: ", error);
    throw error;
  }
};

// Ürünleri listeleme
export const getAllProducts = async () => {
  try {
    const data = await getDocs(productCollectionRef);
    return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.error("Ürünler listelenirken hata oluştu:", error);
    throw error;
  }
};

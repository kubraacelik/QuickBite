import axios from "axios";
import { createContext, useEffect, useState } from "react";

// bileşen ağacındaki diğer bileşenlere veri aktarımında kullanılır
export const StoreContext = createContext(null);

// props aracılığıyla alt bileşenlere veri aktarır.
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({}); // Sepet öğeleri
  const url = "http://localhost:4000"; // API URL'si
  const [token, setToken] = useState(""); // Kullanıcı token'ı
  const [food_list, setFoodList] = useState([]); // Yemek listesi

  // Belirtilen itemId ile sepetin güncellenmesini sağlar. Eğer öğe yoksa sepetin içine 1 ekler; varsa, mevcut miktarı artırır.
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    // Eğer kullanıcı oturum açmışsa, API'ye öğe eklemek için bir POST isteği gönderir.
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Belirtilen itemId ile sepetten öğe çıkarır. Eğer öğenin miktarı sıfırdan fazla ise azaltır.
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    // Kullanıcı oturum açmışsa, API'ye öğe çıkarmak için bir POST isteği gönderir.
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Sepetteki toplam tutarı hesaplar. Her bir öğenin fiyatı ile miktarını çarparak toplam tutarı oluşturur.
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // API'den yemek listesini almak için bir GET isteği gönderir. Gelen veriyi food_list state'ine kaydeder.
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  // Kullanıcının sepet verilerini yükler. API'den kullanıcıya ait sepet verisini almak için bir POST isteği gönderir.
  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  // Bileşen yüklendiğinde çalışır. Yemek listesini çeker ve eğer kullanıcı daha önce oturum açmışsa token'ı alarak sepet verilerini yükler.
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  // Alt bileşenler bu değerlere erişebilir.
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  // contextValue değerini alt bileşenlere sağlayan bileşendir.
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

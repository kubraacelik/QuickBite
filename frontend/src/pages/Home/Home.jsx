import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";

const Home = () => {
  // Kullanıcılar, ExploreMenu bileşeni aracılığıyla kategorileri seçebilir ve bu seçim FoodDisplay bileşenine iletilir, 
  // böylece kullanıcılara seçilen kategoriye ait yemekler sunulur. useState hook'u, kategori durumunu yönetmek için kullanılır 
  // ve bu durum bileşenler arasında veri akışını sağlar.
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;

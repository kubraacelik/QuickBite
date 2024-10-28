import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

// category, mevcut kategori durumunu, setCategory ise kategori durumunu güncellemek için kullanılan bir fonksiyondur.  
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Savor a curated selection of exquisite dishes crafted from premium
        ingredients. Experience exceptional dining with every meal.
      </p>

      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            // Eğer kategori, tıklanan öğenin adıyla eşleşiyorsa kategori "All" olarak değiştirilir, yoksa kategori tıklanan öğenin adıyla güncellenir.
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;

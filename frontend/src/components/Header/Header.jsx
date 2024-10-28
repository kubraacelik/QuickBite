import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Indulge in Your Favorite Flavors</h2>
        <p>
          Explore a diverse menu of gourmet dishes, crafted with the finest
          ingredients to satisfy every craving. Treat yourself to an
          unforgettable dining experience with flavors that delight, delivered
          right to your door.
        </p>
        <button>
          <a href="#food-display">View Menu</a>
        </button>
      </div>
    </div>
  );
};

export default Header;

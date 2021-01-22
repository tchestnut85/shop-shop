import Cart from '../components/Cart';
import CategoryMenu from "../components/CategoryMenu";
import ProductList from "../components/ProductList";
import React from "react";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;

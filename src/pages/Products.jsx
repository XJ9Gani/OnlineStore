import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import imageHolder from "../assets/defaultImageHolder.webp";
import heartIcon from "../assets/heart.svg";
import {
  getProducts,
  filterProducts,
  resetFilteredProducts,
  filterProductsByCategory,
} from "../store/productSlice/productSlice";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const dispatch = useDispatch();
  const { products, filteredProducts, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        const data = await response.data;
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    getCategories();
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(filterProductsByCategory(selectedCategory));
    } else {
      dispatch(resetFilteredProducts());
    }
  }, [selectedCategory, dispatch]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleFilterChange = (e) => {
    dispatch(filterProducts(e.target.value));
  };

  const handleResetFilter = () => {
    dispatch(resetFilteredProducts());
    setSelectedCategory("");
  };

  return (
    <section>
      <div className="sticky lg:top-[75px] z-10 md:top-0 max-sm:top-0">
        <ul className="flex justify-between max-sm:flex-wrap max-sm:justify-center">
          {categories.length === 0 ? (
            <>Loading...</>
          ) : (
            categories.map((el) => (
              <button
                key={el.id}
                className="bg-white border w-[200px] h-[50px]  max-sm:w-[130px] max-sm:h-[50px] max-sm:text-[0.8rem] hover:bg-slate-600 hover:text-white hover:translate-y-2 transition-all ease-in-out shadow-md"
                onClick={() => handleCategoryClick(el.name)}
              >
                {el.name}
              </button>
            ))
          )}
        </ul>
      </div>
      <div className="flex justify-center gap-3 ">
        <input
          className="w-[400px] h-[50px] p-[1rem] transition-all duration-200 ease-in-out block border shadow-lg my-10 focus:w-[500px] md:w-[300px] max-sm:w-[200px]"
          type="text"
          placeholder="Search products"
          onChange={handleFilterChange}
        />
        <button
          className="bg-black h-[50px] text-xl text-white my-10 "
          onClick={handleResetFilter}
        >
          Reset Filter
        </button>
      </div>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <ul className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 w-[90vw] mx-auto">
        {filteredProducts.map((product) => (
          <NavLink
            className="mx-auto"
            to={`/product/${product.id}`}
            key={product.id}
          >
            <li className="w-[300px] transition ease-in-out duration-200 h-[350px] overflow-hidden border shadow-md rounded-lg my-[40px] hover:shadow-lg hover:translate-y-4">
              <img
                src={product.image || imageHolder}
                className="w-full h-[250px] shadow-md"
                alt={product.name}
              />
              <div className="flex">
                <button className="p-[0.5rem]"></button>
                <h1 className="text-2xl w-full text-black text-center">
                  {product.name}
                </h1>
              </div>
            </li>
          </NavLink>
        ))}
      </ul>
    </section>
  );
};

export default Products;

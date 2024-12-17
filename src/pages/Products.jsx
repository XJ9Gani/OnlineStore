import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import imageHolder from "../assets/defaultImageHolder.webp";
import heartIcon from "../assets/heart.svg";
import {
  getProducts,
  filterProducts,
  resetFilteredProducts,
} from "../store/productSlice/productSlice";
import { Link, NavLink } from "react-router-dom";
import Category from "../components/Category";

const Products = () => {
  const dispatch = useDispatch();
  const { products, filteredProducts, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(getProducts());
    }
  }, [status, dispatch]);

  const handleFilterChange = (e) => {
    dispatch(filterProducts(e.target.value));
  };

  const handleResetFilter = () => {
    dispatch(resetFilteredProducts());
  };

  return (
    <div>
      <div className="flex justify-center gap-3 ">
        <input
          className="w-[400px] h-[50px] p-[1rem] transition-all duration-200 ease-in-out   block border shadow-lg my-10  focus:w-[600px] "
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
      <Category />
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      <ul className="grid grid-cols-4 w-[90vw] mx-auto">
        {(filteredProducts.length ? filteredProducts : products).map(
          (product) => (
            <NavLink to={`/product/${product.id}`} key={product.id}>
              <li className="w-[300px] h-[400px] overflow-hidden border shadow-md rounded-lg my-[40px]">
                <img
                  src={product.image || imageHolder}
                  className="w-full h-[250px] shadow-md"
                />
                <div className="flex">
                  <button>
                    <img className="w-[30px]" src={heartIcon} alt="" />
                  </button>
                  <h1 className="text-2xl w-full  text-black text-center">
                    {product.name}
                  </h1>
                </div>
              </li>
            </NavLink>
          )
        )}
      </ul>
    </div>
  );
};

export default Products;

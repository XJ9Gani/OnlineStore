import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/productSlice/productSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      console.log("User not logged in.");
    }
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error loading product details");
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const addToCartHandler = () => {
    if (!user) {
      alert("Please log in first.");
      return;
    }

    const basketObj = {
      id: product.id,
      productName: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      username: user.username,
    };

    const currentBasket = JSON.parse(localStorage.getItem(user.username)) || [];

    const existingProductIndex = currentBasket.findIndex(
      (item) => item.id === basketObj.id
    );

    if (existingProductIndex !== -1) {
      currentBasket[existingProductIndex].quantity += 1;
    } else {
      currentBasket.push(basketObj);
    }

    localStorage.setItem(user.username, JSON.stringify(currentBasket));

    dispatch(addToCart(basketObj));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mx-auto w-[80vw] md:w-[50vw] max-sm:flex-col flex my-[10px]">
      <img
        src={product.image}
        className="w-[400px] h-[500px] object-cover"
        alt={product.name}
      />
      <div>
        <h1 className="text-5xl text-center w-[800px] max-sm:w-[300px]  ">
          {product.name}
        </h1>
        <div className="mx-[10px] flex flex-col justify-around my-[100px] h-[40vh]">
          <h1 className="text-5xl font-bold ">Details:</h1>
          <p className="text-2xl">{product.description}</p>
          <p>
            <span className="text-2xl font-bold">Category:</span>
            {product.category}
          </p>
          <p>
            <span className="text-2xl font-bold">Brand:</span>
            {product.details.brand}
          </p>
          <p>
            <span className="text-2xl font-bold">Price:</span>
            {product.price}₸
          </p>
          <button
            onClick={addToCartHandler}
            className="w-[300px] h-[50px] shadow-md bg-black text-white hover:bg-white hover:text-black hover:border-2 transition-all duration-200"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

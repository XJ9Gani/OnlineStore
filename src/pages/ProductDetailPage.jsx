import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="mx-auto w-[80vw]   flex my-[10px]">
      <img
        src={product.image}
        className="w-[400px] h-[500px] object-cover"
        alt=""
      />
      <div>
        <h1 className="text-5xl text-center w-[800px]">{product.name}</h1>
        <div className="flex flex-col justify-around my-[100px] h-[40vh]">
          <h1 className="text-5xl font-bold">Details:</h1>
          <p className="text-2xl">{product.description}</p>
          <p>
            <span className="text-2xl font-bold">Category:</span>
            {product.category}
          </p>
          <p>
            {" "}
            <span className="text-2xl font-bold">Brand:</span>
            {product.details.brand}
          </p>
          <p>
            {" "}
            <span className="text-2xl font-bold">Price:</span>
            {product.price}₸
          </p>
        </div>
        <button className="w-[300px] h-[50px]">Busket</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;

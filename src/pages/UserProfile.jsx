import React, { useEffect, useState } from "react";
import imageHolder from "../assets/defaultImageHolder.webp";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const { status, error } = useSelector((state) => state.user);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      const userBasket =
        JSON.parse(localStorage.getItem(currentUser.username)) || [];
      setUserProducts(userBasket);
    }
  }, [currentUser]);

  return (
    <section className="w-[90vw] h-[100vh] mx-auto border shadow-sm p-6">
      <div className="flex justify-center items-center flex-col">
        <img
          className="w-[200px] h-[200px] border rounded-full object-cover"
          src={currentUser?.img || imageHolder}
          alt={currentUser?.username}
        />
        <h1 className="text-center text-2xl">{currentUser?.username}</h1>
      </div>

      <div className="mt-6">
        <h2 className="text-3xl font-semibold">Your Products</h2>
        {userProducts.length > 0 ? (
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProducts.map((product, index) => (
              <li key={index} className="border p-4 rounded-lg shadow-sm">
                <img
                  src={product.image || imageHolder}
                  alt={product.name}
                  className="w-full h-[200px] object-cover rounded-md"
                />
                <h3 className="text-xl mt-2">{product.productName}</h3>
                <p className="text-lg text-gray-600">Price: {product.price}₸</p>
                <p className="text-md">Quantity: {product.quantity}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products added yet.</p>
        )}
      </div>
    </section>
  );
};

export default UserProfile;

import React from "react";
import backImg from "../assets/homePageBack.jpg";
const HomePage = () => {
  return (
    <section className="h-[50vh]">
      <div className="lg:h-[100vh]  max-sm:w-[40vh]">
        <h1
          className="text-white text-shadow-lg lg:text-[3rem] lg:w-[800px] max-sm:text-[1rem] max-sm:w-[300px]  
          font-extrabold text-dark absolute 
          lg:top-[55vh] z-10 lg:left-[15vw] 
           max-sm:top-[5vh]
            max-sm:left-[5vw]
          drop-shadow-lg"
          style={{
            color: "white",
            textShadow: "0 4px 8px black",
          }}
        >
          Discover top-quality products for home, health, sports, and
          more—delivered with care to your doorstep. Shop smart, live better!
        </h1>
        <img
          className=" object-contain w-full  mx-auto absolute  z-0"
          src={backImg}
          alt=""
        />
      </div>
      <div className="lg:p-[5rem] max-sm:hidden">
        <h1 className="lg:text-[2rem] max-sm:text-[1rem] lg:w-[80vw] max-sm:w-[40vw] lg:h-[40vh] max-sm:h-[40vh] mx-auto font-extralight text-center">
          Welcome to the ultimate shopping destination! Explore a curated
          selection of premium products for your home, lifestyle, health,
          sports, and more. Discover unbeatable deals and enjoy fast, reliable
          delivery right to your door. Shop now and elevate your everyday
          living!
        </h1>
      </div>
      <div className="h-[60vh  justify-around flex  ">
        <div className="border-2 w-[300px] h-[100px] ">
          <h1 className="text-2xl text-center  text-gray-900 p-[0.5rem]">
            Cutomize your online store
          </h1>
        </div>
        <div className="border-2  w-[300px] h-[100px]  ">
          <h1 className="text-2xl text-center text-gray-900  p-[0.5rem]">
            Make present to your favors
          </h1>
        </div>
        <div className="border-2  w-[300px] h-[100px]  ">
          <h1 className="text-2xl text-center text-gray-900 p-[0.5rem]">
            Find your wishes
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HomePage;

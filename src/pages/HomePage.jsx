import React from "react";

const HomePage = () => {
  return (
    <section>
      <h1
        className="text-black text-shadow-lg text-[5rem] font-mono font-bold text-dark absolute top-[10vh] z-10 left-[15vw] drop-shadow-lg"
        style={{ textShadow: "2px 2px 4px rgb(0, 0, 0,);" }}
      >
        Welcome to our store!
      </h1>
      <img
        className=" object-contain w-[70vw] h-[70vh]  mx-auto absolute top-[20vh] left-[10vw] z-0"
        src="https://avatars.mds.yandex.net/i?id=40fd56755c2d980b0bd23622dccd4204_l-5289225-images-thumbs&n=13"
        alt=""
      />
    </section>
  );
};

export default HomePage;

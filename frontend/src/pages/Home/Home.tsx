import React from "react";

const Home: React.FC = () => {
  return (
    <>
      <div className="bg-transparent border-t text-white flex flex-col justify-center items-center">
        <div className="container mx-auto px-6 flex flex-col items-center justify-between text-center">
          <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-[#DDDBFF] text-center mb-8">
              Welcome to Evo E-commerce
            </h1>
            <p className="my-8 text-xl text-[#101010] dark:text-[#F0F0F0] font-medium italic text-center">
              Explore a universe of endless possibilities.
              <br /> Dive into the latest trends in fashion, technology, home
              decor, and more.
            </p>
            <div className="flex space-x-4">
              <button className="bg-black border text-white px-6 py-3 rounded-xl shadow-md hover:bg-opacity-95 font-semibold dark:bg-white dark:text-black dark:font-semibold dark:hover:bg-transparent dark:hover:text-white transition duration-300 ease-in-out mr-4">
                Shop Now
              </button>
              <button className="bg-black border text-white px-6 py-3 rounded-xl shadow-md hover:bg-opacity-95 font-semibold dark:bg-white dark:text-black dark:font-semibold dark:hover:bg-transparent dark:hover:text-white transition duration-300 ease-in-out mr-4">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>About Section</div>
      <div>Contact section</div>
    </>
  );
};

export default Home;

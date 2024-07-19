import React from "react";
import AñadirItems from "./AñadirItems/AñadirItems";

//create your first component
const Home = () => {
  return (
    <>
      <div className="tex-center container w-auto mx-auto p-0 d-flex justify-content-center align-items-center">
        <div
          className="container mx-auto p-0 mt-4 mb-2 d-flex justify-content-center align-items-center"
          id="bgAtras"
        >
          <div
            className="container p-0 mb-2 d-flex justify-content-center align-items-center"
            id="bgEnmedio"
          >
            <div className="container p-2 mb-2 " id="bgAdelante">
              <AñadirItems />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

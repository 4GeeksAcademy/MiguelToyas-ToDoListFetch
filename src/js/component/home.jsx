import React from "react";
import AñadirItems from "./AñadirItems/AñadirItems";

//create your first component
const Home = () => {
  return (
    <div className="playwrite">
      <div className="container w-auto mx-auto m-5">
        <h1 className="text-center">Lista de tareas:</h1>
      </div>
      <div className="tex-center container w-auto mt-2 mx-auto p-0 d-flex justify-content-center align-items-center">
        <div
          className="container mx-auto p-0 mb-2 d-flex justify-content-center align-items-center"
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
    </div>
  );
};

export default Home;

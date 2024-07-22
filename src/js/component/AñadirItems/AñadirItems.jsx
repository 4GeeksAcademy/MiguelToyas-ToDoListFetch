import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function AñadirItems() {
  const [tasks, setTasks] = useState([]);
  const newTaskRef = useRef(null);
  const enlace = "https://playground.4geeks.com/todo/user/alesanchezr";

  // Cargar tareas desde la base de datos cuando el componente se monte
  useEffect(() => {
    fetch(enlace, {
      method: "PUT",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        console.log(resp.ok); // Será true si la respuesta es exitosa
        console.log(resp.status); // El código de estado 200, 300, 400, etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como string
        return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
      })
      .then((data) => {
        // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        setTasks(data);
        console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch((error) => {
        // Manejo de errores
        console.log(error);
      });
  }, []);

  // // Guardar tareas en localStorage cada vez que cambien
  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  // Funcion al postear nuevas tareas
  const postTask = async (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      const newTask = newTaskRef.current.value.trim();
      if (newTask !== "") {
        try {
          const response = await axios.post(
            enlace,
            newTask
          );
          console.log("Cargado con exito");
          console.loc(response)
          
        } catch (error) {
          // Imprimir en terminal
          console.error("Error registrando la tarea:", error);
        }
      }
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <input
        type="text"
        ref={newTaskRef}
        onKeyDown={postTask}
        className="container py-1 fs-3"
        placeholder="Añadir nueva tarea"
        id="inputPost"
      />
      <hr className="w-100" />
      <ul className="container mx-3 px-5">
        {tasks.map((task, index) => (
          <div key={index} className="d-flex flex-column">
            <div className="task-item-wrapper">
              <li className="fs-4 mb-2">{task}</li>
              <button
                type="button"
                className="close-btn"
                aria-label="Close"
                onClick={() => deleteTask(index)}
              >
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            {index < tasks.length - 1 && <hr className="w-100 mx-auto" />}
          </div>
        ))}
      </ul>
      <hr className="w-100" />
      <div className="d-flex justify-content-start align-items-center w-100">
        <p className="ms-5 my-2">{tasks.length} Tareas Pendientes</p>
      </div>
    </div>
  );
}

export default AñadirItems;

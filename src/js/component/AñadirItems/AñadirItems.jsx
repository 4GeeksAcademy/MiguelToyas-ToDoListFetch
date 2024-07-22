import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function AñadirItems() {
  const [tasks, setTasks] = useState([]);
  const newTaskRef = useRef(null);
  const enlace = "https://playground.4geeks.com/todo/user/mitoperni";

  // Cargar tareas desde la base de datos cuando el componente se monte
  useEffect(() => {
    fetch(enlace, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => {
        setTasks(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [enlace]);

  const postTask = async (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      const newTask = newTaskRef.current.value.trim();
      if (newTask !== "") {
        try {
          const response = await axios.post(enlace, {
            label: newTask,
            done: false,
          }, {
            headers: {
              "Content-Type": "application/json",
            }
          });
          console.log("Cargado con exito");
          console.log(response.data);
          setTasks([...tasks, response.data]);
          newTaskRef.current.value = ""; 
        } catch (error) {
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
              <li className="fs-4 mb-2">{task.label}</li>
              <button
                type="button"
                className="close-btn"
                aria-label="Close"
                onClick={() => deleteTask(index)}
              >
                <i className="fa-solid fa-xmark"></i>
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

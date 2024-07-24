import React, { useState, useRef, useEffect } from "react";

function AñadirItems() {
  const [tasks, setTasks] = useState([]);
  const newTaskRef = useRef(null);
  const enlace = "https://playground.4geeks.com/todo/users/mitoperni";

  // Cargar tareas desde la base de datos cuando el componente se monte
  useEffect(() => {
    fetch(enlace)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => {
        setTasks(data); // Asegurarse de que data es un array
      })
      .catch((error) => {
        console.log("Error al cargar tareas:", error);
      });
  }, []);

  // Actualizar tareas en la base de datos
  const updateTasks = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      const newTask = newTaskRef.current.value.trim();
      if (newTask !== "") {
        const updatedTasks = [...tasks, { label: newTask, done: false }];
        setTasks(updatedTasks);
        updateTasks(updatedTasks);
        newTaskRef.current.value = "";
      }
    }



    fetch("https://playground.4geeks.com/todo/todos/mitoperni", {
      method: "POST",
      body: JSON.stringify(updatedTasks),
      headers: {
        label: "tarea",
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
        setTasks(data)
        console.log(data);
      }) 
      .catch((error) => {
        console.error("Error actualizando tareas:", error);
      });
  };

  const postTask = async (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      const newTask = newTaskRef.current.value.trim();
      if (newTask !== "") {
        const updatedTasks = [...tasks, { label: newTask, done: false }];
        setTasks(updatedTasks);
        updateTasks(updatedTasks);
        newTaskRef.current.value = "";
      }
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    updateTasks(updatedTasks);
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
        {Array.isArray(tasks) &&
          tasks.map((task, index) => (
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

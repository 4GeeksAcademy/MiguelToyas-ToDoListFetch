import React, { useState, useRef, useEffect } from "react";

function AñadirItems() {
  const [tasks, setTasks] = useState([]);
  const newTaskRef = useRef(null);

  // Cargar tareas desde la base de datos cuando el componente se monte
  useEffect(() => {
    fetch("https://playground.4geeks.com/todo/users/mitoperni")
      .then((resp) => resp.json())
      .then((data) => {
        setTasks(data.todos);
      })
      .catch((error) => {
        console.log("Error al cargar tareas:", error);
      });
  }, []);

  // Manejar la adición de nuevas tareas
  const addTask = (task) => {
    fetch("https://playground.4geeks.com/todo/todos/mitoperni", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks((prevTasks) => [...prevTasks, data]);
      })
      .catch((error) => console.error("Error:", error));
  };

  // Manejar el evento de la tecla Enter
  const updateTasks = (e) => {
    if (e.key === "Enter") {
      const newTask = newTaskRef.current.value.trim();
      if (newTask !== "") {
        const taskToSend = { label: newTask, is_done: false };
        addTask(taskToSend);
        newTaskRef.current.value = "";
        e.preventDefault();
      }
    }
  };

  const deleteTask = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } else {
          console.error("Error al eliminar la tarea:", response.statusText);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const deleteAllTasks = () => {
    const deletePromises = tasks.map((task) =>
      fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      })
    );

    Promise.all(deletePromises)
      .then((responses) => {
        const allOk = responses.every((response) => response.ok);
        if (allOk) {
          setTasks([]);
        } else {
          console.error("Error al eliminar todas las tareas.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <input
        type="text"
        ref={newTaskRef}
        onKeyDown={updateTasks}
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
                  onClick={() => deleteTask(task.id)}
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
      <hr className="w-100" />
      <div className="d-flex justify-content-center align-items-center w-100 mb-1">
        <button type="button" className="deleteAll-btn my-2" onClick={deleteAllTasks}>¿Todas las tareas hechas? Pulsa aquí</button>
      </div>
    </div>
  );
}

export default AñadirItems;

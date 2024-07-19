import React, { useState, useRef, useEffect } from "react";

function AñadirItems() {
  const [tasks, setTasks] = useState([]);
  const newTaskRef = useRef(null);

  // Cargar tareas desde localStorage cuando el componente se monte
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const postTask = (e) => {
    if (e.key === "Enter") {
      const newTask = newTaskRef.current.value.trim();
      if (newTask !== "") {
        setTasks([...tasks, newTask]);
        newTaskRef.current.value = "";
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
        className="container"
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

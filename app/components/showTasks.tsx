import React from "react";

type Task = {
    id: number; 
    title: string;
    userName: string;
};

type ShowTaskProps = {
    tasks: Task[];
    deleteTask: (id: number) => void;
};

const ShowTask: React.FC<ShowTaskProps> = ({ tasks, deleteTask }) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-md shadow p-4 mt-6">
          <h2 className="text-lg font-bold mb-4">Lista de Tareas</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No hay tareas aún.</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-md mb-3 border"
              >
                <div>
                  <p className="text-gray-800 font-medium">{task.title}</p>
                  <p className="text-sm text-gray-600">Asignado a: {task.userName}</p>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
      );
}

export default ShowTask;
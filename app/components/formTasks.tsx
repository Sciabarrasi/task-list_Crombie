"use client"
import React, { useEffect, useState } from "react"

export default function FormTasks () {
    const [formData, setFormData] = useState({
        description: "",
        date: "",
        userId: "",
      });
    
      const [users, setUsers] = useState<{ id: number; name: string }[]>([]);

      useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch("/api/users");
            const data = await response.json();
            setUsers(data);
            console.log("RTA API: ", data);
            if (Array.isArray(data)) {
              setUsers(data);
            } else { 
              console.error("NO DEVUELVE ARRAY");
              setUsers([]);
            }
          } catch (error) {
            console.error("Error al obtener usuarios:", error);
            setUsers([]);
          }
        };
    
        fetchUsers();
      }, []);
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(JSON.stringify({formData}));
        
        try {
          const response = await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          console.log(response)
    
          if (response.ok) {
            console.log("Tarea creada exitosamente");
          } else {
            console.error("Error al crear la tarea");
          }
        } catch (error) {
          console.error("Error en el envío del formulario:", error);
        }
      };
    
      return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Crear Nueva Tarea
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="description"
                placeholder="Descripcion"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
    
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
    
              <select
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="" disabled>
                  Selecciona un usuario
                </option>
                {Array.isArray(users) && users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
    
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Crear Tarea
              </button>
            </form>
          </div>
        </div>
    );
};
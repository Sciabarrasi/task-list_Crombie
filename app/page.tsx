"use client"

import { useState } from "react";
import FormTasks from "./components/formTasks"
import ShowTask from "./components/showTasks"

type Task = {
  id: number;
  title: string;
  userName: string; 
}

export default function App() { 
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(title: string, userName: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      userName
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function deleteTask(id: number){
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  return(
    <div>
      <FormTasks addTask={addTask} />
      <ShowTask tasks={tasks} deleteTask={deleteTask} />
    </div>
  )
}
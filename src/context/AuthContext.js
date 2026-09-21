"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { demoUsers } from "@/data/users";
import { demoTasks } from "@/data/tasks";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedUsers = localStorage.getItem("users");
    const storedTasks = localStorage.getItem("tasks");

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(demoUsers);
      localStorage.setItem("users", JSON.stringify(demoUsers));
    }

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(demoTasks);
      localStorage.setItem("tasks", JSON.stringify(demoTasks));
    }

    setLoading(false);
  }, []);

  function addUser(user) {
    const newUser = {
      ...user,
      id: Date.now(),
    };

    setUsers((prev) => {
      const updatedUsers = [...prev, newUser];

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return updatedUsers;
    });
  }

  function updateUser(id, updatedData) {
    setUsers((prev) => {
      const updatedUsers = prev.map((user) =>
        user.id === id ? { ...user, ...updatedData } : user,
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return updatedUsers;
    });
  }

  function deleteUser(id) {
    setUsers((prev) => {
      const updatedUsers = prev.filter((user) => user.id !== id);

      localStorage.setItem("users", JSON.stringify(updatedUsers));

      return updatedUsers;
    });
  }

  function addTask(task) {
    const newTask = {
      ...task,
      id: Date.now(),
    };

    setTasks((prev) => {
      const updatedTasks = [...prev, newTask];

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    });
  }

  function updateTask(id, updatedData) {
    setTasks((prev) => {
      const updatedTasks = prev.map((task) =>
        task.id === id ? { ...task, ...updatedData } : task,
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    });
  }

  function deleteTask(id) {
    setTasks((prev) => {
      const updatedTasks = prev.filter((task) => task.id !== id);

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    });
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        addUser,
        updateUser,
        deleteUser,
        tasks,
        addTask,
        updateTask,
        deleteTask,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

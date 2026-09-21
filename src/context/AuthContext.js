"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { demoUsers } from "@/data/users";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedUsers = localStorage.getItem("users");

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(demoUsers);
      localStorage.setItem("users", JSON.stringify(demoUsers));
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

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        addUser,
        updateUser,
        deleteUser,
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

"use client";

import { useState } from "react";

import { useAuth } from "@/context/AuthContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AddUserDialog from "@/components/users/AddUserDialog";
import UsersTable from "@/components/users/UsersTable";
import EditUserDialog from "@/components/users/EditUserDialog";
import DeleteUserDialog from "@/components/users/DeleteUserDialog";

export default function UsersManagement() {
  const { users, addUser, updateUser, deleteUser } = useAuth();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [editOpen, setEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    role: "viewer",
  });

  const [editErrors, setEditErrors] = useState({
    name: "",
    email: "",
  });

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  function handleEdit(user) {
    setEditingUser(user);

    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });

    setEditErrors({
      name: "",
      email: "",
    });

    setEditOpen(true);
  }

  function handleEditChange(e) {
    const { name, value } = e.target;

    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setEditErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function handleEditRoleChange(role) {
    setEditFormData((prev) => ({
      ...prev,
      role,
    }));
  }

  function handleUpdateUser(e) {
    e.preventDefault();

    const errors = {
      name: "",
      email: "",
    };

    if (!editFormData.name) {
      errors.name = "Name is required";
    }

    if (!editFormData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(editFormData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (errors.name || errors.email) {
      setEditErrors(errors);
      return;
    }

    const emailExists = users.some(
      (user) =>
        user.id !== editingUser.id &&
        user.email.toLowerCase() === editFormData.email.toLowerCase(),
    );

    if (emailExists) {
      setEditErrors((prev) => ({
        ...prev,
        email: "A user with this email already exists.",
      }));
      return;
    }

    updateUser(editingUser.id, editFormData);

    setEditingUser(null);

    setEditFormData({
      name: "",
      email: "",
      role: "viewer",
    });

    setEditErrors({
      name: "",
      email: "",
    });

    setEditOpen(false);
  }

  function handleDelete(user) {
    setUserToDelete(user);
    setDeleteOpen(true);
  }

  function confirmDelete() {
    if (!userToDelete) return;

    deleteUser(userToDelete.id);

    setUserToDelete(null);
    setDeleteOpen(false);
  }

  return (
    <>
      <Card className="min-w-0 overflow-hidden border pb-0">
        <CardHeader className="relative p-4 pb-3">
          <CardTitle className="text-center text-lg font-semibold sm:text-xl">
            User Management
          </CardTitle>

          <div className="mt-3">
            <AddUserDialog users={users} addUser={addUser} />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <UsersTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <EditUserDialog
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        editFormData={editFormData}
        editErrors={editErrors}
        handleEditChange={handleEditChange}
        handleEditRoleChange={handleEditRoleChange}
        handleUpdateUser={handleUpdateUser}
      />

      <DeleteUserDialog
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        userToDelete={userToDelete}
        confirmDelete={confirmDelete}
      />
    </>
  );
}

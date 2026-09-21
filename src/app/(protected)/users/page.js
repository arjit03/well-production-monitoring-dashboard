"use client";

import { useState } from "react";

import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UsersPage() {
  const { users, addUser, updateUser, deleteUser } = useAuth();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

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

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function handleRoleChange(role) {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  }

  function handleAddUser(e) {
    e.preventDefault();

    const errors = {
      name: "",
      email: "",
      password: "",
    };

    if (!formData.name) {
      errors.name = "Name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    if (errors.name || errors.email || errors.password) {
      setFormErrors(errors);
      return;
    }

    const emailExists = users.some(
      (user) => user.email.toLowerCase() === formData.email.toLowerCase(),
    );

    if (emailExists) {
      setFormErrors((prev) => ({
        ...prev,
        email: "A user with this email already exists.",
      }));
      return;
    }

    addUser(formData);

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "viewer",
    });

    setFormErrors({
      name: "",
      email: "",
      password: "",
    });

    setOpen(false);
  }

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
      <div className="mb-6">
        <h2 className="text-xl font-bold sm:text-2xl">Users</h2>

        <p className="text-sm text-muted-foreground sm:text-base">
          Manage users and their roles.
        </p>
      </div>

      <Card className="min-w-0 overflow-hidden border pb-0">
        <CardHeader className="relative p-4 pb-3">
          <CardTitle className="text-center text-lg font-semibold sm:text-xl">
            User Management
          </CardTitle>

          <div className="mt-3">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:absolute sm:right-4 sm:top-4 sm:w-auto">
                  Add User
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add User</DialogTitle>

                  <DialogDescription>
                    Add a new user and assign a role.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleAddUser} className="space-y-4">
                  <div className="space-y-2">
                    {formErrors.name && (
                      <p className="text-sm text-destructive">
                        {formErrors.name}
                      </p>
                    )}

                    <Label htmlFor="name">Name</Label>

                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    {formErrors.email && (
                      <p className="text-sm text-destructive">
                        {formErrors.email}
                      </p>
                    )}

                    <Label htmlFor="email">Email</Label>

                    <Input
                      id="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    {formErrors.password && (
                      <p className="text-sm text-destructive">
                        {formErrors.password}
                      </p>
                    )}

                    <Label htmlFor="password">Password</Label>

                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Role</Label>

                    <Select
                      value={formData.role}
                      onValueChange={handleRoleChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="analyst">Analyst</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <DialogFooter>
                    <Button type="submit">Add User</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="w-full overflow-x-auto border">
            <Table className="w-full min-w-[700px] table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4 border-r text-center">
                    Name
                  </TableHead>

                  <TableHead className="w-1/4 border-r text-center">
                    Email
                  </TableHead>

                  <TableHead className="w-1/4 border-r text-center">
                    Role
                  </TableHead>

                  <TableHead className="w-1/4 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="border-r text-center">
                      {user.name}
                    </TableCell>

                    <TableCell className="border-r whitespace-nowrap text-center">
                      {user.email}
                    </TableCell>

                    <TableCell className="border-r text-center capitalize">
                      {user.role}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(user)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>

            <DialogDescription>
              Update the user's information and role.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdateUser} className="space-y-4">
            <div className="space-y-2">
              {editErrors.name && (
                <p className="text-sm text-destructive">{editErrors.name}</p>
              )}

              <Label htmlFor="edit-name">Name</Label>

              <Input
                id="edit-name"
                name="name"
                placeholder="Enter name"
                value={editFormData.name}
                onChange={handleEditChange}
              />
            </div>

            <div className="space-y-2">
              {editErrors.email && (
                <p className="text-sm text-destructive">{editErrors.email}</p>
              )}

              <Label htmlFor="edit-email">Email</Label>

              <Input
                id="edit-email"
                name="email"
                placeholder="Enter email"
                value={editFormData.email}
                onChange={handleEditChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>

              <Select
                value={editFormData.role}
                onValueChange={handleEditRoleChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="analyst">Analyst</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                {userToDelete?.name}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

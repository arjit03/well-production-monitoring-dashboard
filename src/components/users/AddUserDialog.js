"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddUserDialog({ users, addUser }) {
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

  return (
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
              <p className="text-sm text-destructive">{formErrors.name}</p>
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
              <p className="text-sm text-destructive">{formErrors.email}</p>
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
              <p className="text-sm text-destructive">{formErrors.password}</p>
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

            <Select value={formData.role} onValueChange={handleRoleChange}>
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
  );
}

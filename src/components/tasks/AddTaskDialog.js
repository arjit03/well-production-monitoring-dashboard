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

export default function AddTaskDialog({ users, addTask }) {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    assignedTo: "",
    status: "pending",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    assignedTo: "",
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

  function handleAssignedToChange(value) {
    setFormData((prev) => ({
      ...prev,
      assignedTo: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      assignedTo: "",
    }));
  }

  function handleStatusChange(value) {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
  }

  function handleAddTask(e) {
    e.preventDefault();

    const errors = {
      title: "",
      assignedTo: "",
    };

    if (!formData.title) {
      errors.title = "Task is required";
    }

    if (!formData.assignedTo) {
      errors.assignedTo = "Assigned user is required";
    }

    if (errors.title || errors.assignedTo) {
      setFormErrors(errors);
      return;
    }

    addTask({
      ...formData,
      assignedTo: Number(formData.assignedTo),
    });

    setFormData({
      title: "",
      assignedTo: "",
      status: "pending",
    });

    setFormErrors({
      title: "",
      assignedTo: "",
    });

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:absolute sm:right-4 sm:top-4 sm:w-auto">
          Add Task
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>

          <DialogDescription>
            Create a task and assign it to a user.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAddTask} className="space-y-4">
          <div className="space-y-2">
            {formErrors.title && (
              <p className="text-sm text-destructive">{formErrors.title}</p>
            )}

            <Label htmlFor="title">Task</Label>

            <Input
              id="title"
              name="title"
              placeholder="Enter task"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            {formErrors.assignedTo && (
              <p className="text-sm text-destructive">
                {formErrors.assignedTo}
              </p>
            )}

            <Label>Assign To</Label>

            <Select
              value={formData.assignedTo}
              onValueChange={handleAssignedToChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select user" />
              </SelectTrigger>

              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={String(user.id)}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>

            <Select value={formData.status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>

                <SelectItem value="in progress">In Progress</SelectItem>

                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TasksPage() {
  const { currentUser, users, tasks, addTask, updateTask, deleteTask } =
    useAuth();

  const canManageTasks =
    currentUser?.role === "admin" || currentUser?.role === "analyst";

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

  const [editOpen, setEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [editFormData, setEditFormData] = useState({
    title: "",
    assignedTo: "",
    status: "pending",
  });

  const [editErrors, setEditErrors] = useState({
    title: "",
  });

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const visibleTasks = canManageTasks
    ? tasks
    : tasks.filter(
        (task) => Number(task.assignedTo) === Number(currentUser?.id),
      );

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

  function handleEdit(task) {
    setEditingTask(task);

    setEditFormData({
      title: task.title,
      assignedTo: String(task.assignedTo),
      status: task.status,
    });

    setEditErrors({
      title: "",
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

  function handleEditAssignedToChange(value) {
    setEditFormData((prev) => ({
      ...prev,
      assignedTo: value,
    }));
  }

  function handleEditStatusChange(value) {
    setEditFormData((prev) => ({
      ...prev,
      status: value,
    }));
  }

  function handleUpdateTask(e) {
    e.preventDefault();

    if (!canManageTasks) {
      updateTask(editingTask.id, {
        status: editFormData.status,
      });

      setEditingTask(null);

      setEditFormData({
        title: "",
        assignedTo: "",
        status: "pending",
      });

      setEditErrors({
        title: "",
      });

      setEditOpen(false);

      return;
    }

    const errors = {
      title: "",
    };

    if (!editFormData.title) {
      errors.title = "Task is required";
    }

    if (errors.title) {
      setEditErrors(errors);
      return;
    }

    updateTask(editingTask.id, {
      ...editFormData,
      assignedTo: Number(editFormData.assignedTo),
    });

    setEditingTask(null);

    setEditFormData({
      title: "",
      assignedTo: "",
      status: "pending",
    });

    setEditErrors({
      title: "",
    });

    setEditOpen(false);
  }

  function handleDelete(task) {
    setTaskToDelete(task);
    setDeleteOpen(true);
  }

  function confirmDelete() {
    if (!taskToDelete) return;

    deleteTask(taskToDelete.id);

    setTaskToDelete(null);
    setDeleteOpen(false);
  }

  function getUserName(userId) {
    const user = users.find((user) => user.id === Number(userId));

    return user?.name || "Unknown user";
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold sm:text-2xl">Tasks</h2>

        <p className="text-sm text-muted-foreground sm:text-base">
          Manage and track assigned tasks.
        </p>
      </div>

      <Card className="min-w-0 overflow-hidden border pb-0">
        <CardHeader className="relative p-4 pb-3">
          <CardTitle className="text-center text-lg font-semibold sm:text-xl">
            Task Management
          </CardTitle>

          {canManageTasks && (
            <div className="mt-3">
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
                        <p className="text-sm text-destructive">
                          {formErrors.title}
                        </p>
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

                      <Select
                        value={formData.status}
                        onValueChange={handleStatusChange}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>

                          <SelectItem value="in progress">
                            In Progress
                          </SelectItem>

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
            </div>
          )}
        </CardHeader>

        <CardContent className="p-0">
          <div className="w-full overflow-x-auto border">
            <Table className="w-full min-w-[700px] table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4 border-r text-center">
                    Task
                  </TableHead>

                  <TableHead className="w-1/4 border-r text-center">
                    Assigned To
                  </TableHead>

                  <TableHead className="w-1/4 border-r text-center">
                    Status
                  </TableHead>

                  <TableHead className="w-1/4 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {visibleTasks.length > 0 ? (
                  visibleTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="border-r text-center whitespace-normal break-all">
                        {task.title}
                      </TableCell>

                      <TableCell className="border-r text-center whitespace-normal break-words">
                        {getUserName(task.assignedTo)}
                      </TableCell>

                      <TableCell className="border-r text-center capitalize whitespace-normal break-words">
                        {task.status}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          {canManageTasks ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(task)}
                              >
                                Edit
                              </Button>

                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(task)}
                              >
                                Delete
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(task)}
                            >
                              Update Status
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No tasks assigned to you.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {canManageTasks ? "Edit Task" : "Update Task Status"}
            </DialogTitle>

            <DialogDescription>
              {canManageTasks
                ? "Update the task and its assignment."
                : "Update the status of your assigned task."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdateTask} className="space-y-4">
            {canManageTasks ? (
              <>
                <div className="space-y-2">
                  {editErrors.title && (
                    <p className="text-sm text-destructive">
                      {editErrors.title}
                    </p>
                  )}

                  <Label htmlFor="edit-title">Task</Label>

                  <Input
                    id="edit-title"
                    name="title"
                    placeholder="Enter task"
                    value={editFormData.title}
                    onChange={handleEditChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Assign To</Label>

                  <Select
                    value={editFormData.assignedTo}
                    onValueChange={handleEditAssignedToChange}
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
              </>
            ) : (
              <div className="space-y-2">
                <Label>Task</Label>

                <Input value={editFormData.title} disabled />
              </div>
            )}

            <div className="space-y-2">
              <Label>Status</Label>

              <Select
                value={editFormData.status}
                onValueChange={handleEditStatusChange}
              >
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
              <Button type="submit">
                {canManageTasks ? "Save Changes" : "Update Status"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {canManageTasks && (
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Task</AlertDialogTitle>

              <AlertDialogDescription>
                Are you sure you want to delete{" "}
                <span className="font-medium text-foreground break-all">
                  {taskToDelete?.title}
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
      )}
    </>
  );
}

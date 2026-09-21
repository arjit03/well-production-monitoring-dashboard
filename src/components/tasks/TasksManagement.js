"use client";

import { useState } from "react";

import { useAuth } from "@/context/AuthContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AddTaskDialog from "@/components/tasks/AddTaskDialog";
import TasksTable from "@/components/tasks/TasksTable";
import EditTaskDialog from "@/components/tasks/EditTaskDialog";
import DeleteTaskDialog from "@/components/tasks/DeleteTaskDialog";

export default function TasksManagement() {
  const { currentUser, users, tasks, addTask, updateTask, deleteTask } =
    useAuth();

  const canManageTasks =
    currentUser?.role === "admin" || currentUser?.role === "analyst";

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
      <Card className="min-w-0 overflow-hidden border pb-0">
        <CardHeader className="relative p-4 pb-3">
          <CardTitle className="text-center text-lg font-semibold sm:text-xl">
            Task Management
          </CardTitle>

          {canManageTasks && (
            <div className="mt-3">
              <AddTaskDialog users={users} addTask={addTask} />
            </div>
          )}
        </CardHeader>

        <CardContent className="p-0">
          <TasksTable
            visibleTasks={visibleTasks}
            getUserName={getUserName}
            canManageTasks={canManageTasks}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <EditTaskDialog
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        canManageTasks={canManageTasks}
        editFormData={editFormData}
        editErrors={editErrors}
        users={users}
        handleEditChange={handleEditChange}
        handleEditAssignedToChange={handleEditAssignedToChange}
        handleEditStatusChange={handleEditStatusChange}
        handleUpdateTask={handleUpdateTask}
      />

      {canManageTasks && (
        <DeleteTaskDialog
          deleteOpen={deleteOpen}
          setDeleteOpen={setDeleteOpen}
          taskToDelete={taskToDelete}
          confirmDelete={confirmDelete}
        />
      )}
    </>
  );
}

"use client";

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
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditTaskDialog({
  editOpen,
  setEditOpen,
  canManageTasks,
  editFormData,
  editErrors,
  users,
  handleEditChange,
  handleEditAssignedToChange,
  handleEditStatusChange,
  handleUpdateTask,
}) {
  return (
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
                  <p className="text-sm text-destructive">{editErrors.title}</p>
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
  );
}

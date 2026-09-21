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

export default function EditUserDialog({
  editOpen,
  setEditOpen,
  editFormData,
  editErrors,
  handleEditChange,
  handleEditRoleChange,
  handleUpdateUser,
}) {
  return (
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
  );
}

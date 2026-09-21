"use client";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UsersTable({ users, onEdit, onDelete }) {
  return (
    <div className="w-full overflow-x-auto border">
      <Table className="w-full min-w-[700px] table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4 border-r text-center">Name</TableHead>

            <TableHead className="w-1/4 border-r text-center">Email</TableHead>

            <TableHead className="w-1/4 border-r text-center">Role</TableHead>

            <TableHead className="w-1/4 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="border-r text-center whitespace-normal break-all">
                {user.name}
              </TableCell>

              <TableCell className="border-r text-center whitespace-normal break-all">
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
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(user)}
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
  );
}

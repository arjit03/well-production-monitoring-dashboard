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

export default function TasksTable({
  visibleTasks,
  getUserName,
  canManageTasks,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="w-full overflow-x-auto border">
      <Table className="w-full min-w-[700px] table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4 border-r text-center">Task</TableHead>

            <TableHead className="w-1/4 border-r text-center">
              Assigned To
            </TableHead>

            <TableHead className="w-1/4 border-r text-center">Status</TableHead>

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
  );
}

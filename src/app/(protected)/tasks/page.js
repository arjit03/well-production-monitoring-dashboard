import TasksManagement from "@/components/tasks/TasksManagement";

export default function TasksPage() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold sm:text-2xl">Tasks</h2>

        <p className="text-sm text-muted-foreground sm:text-base">
          Manage and track assigned tasks.
        </p>
      </div>

      <TasksManagement />
    </>
  );
}

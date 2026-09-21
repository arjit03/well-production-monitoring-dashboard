import PageHeader from "@/components/PageHeader";
import TasksManagement from "@/components/tasks/TasksManagement";

export default function TasksPage() {
  return (
    <>
      <PageHeader
        title="Tasks"
        description="Manage and track assigned tasks."
      />

      <TasksManagement />
    </>
  );
}

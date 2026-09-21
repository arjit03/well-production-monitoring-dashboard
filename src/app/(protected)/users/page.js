import PageHeader from "@/components/PageHeader";
import UsersManagement from "@/components/users/UsersManagement";

export default function UsersPage() {
  return (
    <>
      <PageHeader title="Users" description="Manage users and their roles." />

      <UsersManagement />
    </>
  );
}

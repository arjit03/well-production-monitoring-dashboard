import UsersManagement from "@/components/users/UsersManagement";

export default function UsersPage() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold sm:text-2xl">Users</h2>

        <p className="text-sm text-muted-foreground sm:text-base">
          Manage users and their roles.
        </p>
      </div>

      <UsersManagement />
    </>
  );
}

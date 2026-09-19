import Link from "next/link";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    roles: ["admin", "analyst", "viewer"],
  },
  {
    label: "Wells",
    href: "/wells",
    roles: ["admin", "analyst", "viewer"],
  },
  {
    label: "Tasks",
    href: "/tasks",
    roles: ["admin", "analyst", "viewer"],
  },
  {
    label: "Users",
    href: "/users",
    roles: ["admin"],
  },
];

export default function Sidebar({ role }) {
  const visibleItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border md:block">
      <nav className="space-y-1 p-4">
        {visibleItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

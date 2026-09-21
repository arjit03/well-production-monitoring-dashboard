export default function PageHeader({ title, description }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>

      <p className="text-sm text-muted-foreground sm:text-base">
        {description}
      </p>
    </div>
  );
}

import { FileQuestion } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function EmptyState({
  title = "Nothing here yet",
  description,
  icon: Icon = FileQuestion,
  action,
}: { title?: string; description?: string; icon?: LucideIcon; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
      <div className="rounded-full bg-muted p-3"><Icon className="h-6 w-6 text-muted-foreground" /></div>
      <h3 className="mt-4 font-medium">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

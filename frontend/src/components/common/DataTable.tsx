import { ReactNode } from "react";

interface Column<T> { key: keyof T | string; header: string; render?: (row: T) => ReactNode; className?: string }

export function DataTable<T extends { id: string }>({
  columns, data, empty,
}: { columns: Column<T>[]; data: T[]; empty?: ReactNode }) {
  if (data.length === 0) return <>{empty}</>;
  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
            <tr>
              {columns.map((c) => (
                <th key={String(c.key)} className={"px-4 py-3 font-medium " + (c.className || "")}>{c.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-muted/30">
                {columns.map((c) => (
                  <td key={String(c.key)} className={"px-4 py-3 " + (c.className || "")}>
                    {c.render ? c.render(row) : String((row as Record<string, unknown>)[c.key as string] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

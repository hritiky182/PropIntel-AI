import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dateShort } from "@/utils/format";

export interface TimelineEvent { id: string; title: string; date: string; description?: string }

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Activity</CardTitle></CardHeader>
      <CardContent>
        <ol className="relative border-l pl-6">
          {events.map((e) => (
            <li key={e.id} className="mb-6 last:mb-0">
              <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border bg-primary" />
              <p className="text-sm font-medium">{e.title}</p>
              <time className="text-xs text-muted-foreground">{dateShort(e.date)}</time>
              {e.description && <p className="mt-1 text-sm text-muted-foreground">{e.description}</p>}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

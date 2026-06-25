import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function FileUploader({ onFiles }: { onFiles?: (f: File[]) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handle = (files: FileList | null) => {
    if (!files) return;
    onFiles?.(Array.from(files));
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files); }}
      className={
        "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 text-center transition " +
        (dragging ? "border-primary bg-primary/5" : "border-border")
      }
    >
      <UploadCloud className="h-8 w-8 text-muted-foreground" />
      <p className="mt-3 text-sm font-medium">Drop files here or click to upload</p>
      <p className="text-xs text-muted-foreground">PDF, DOCX, images up to 25MB</p>
      <input ref={ref} type="file" multiple className="hidden" onChange={(e) => handle(e.target.files)} />
      <Button variant="outline" size="sm" className="mt-4" onClick={() => ref.current?.click()}>
        Choose files
      </Button>
    </div>
  );
}

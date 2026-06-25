import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileUploader } from "@/components/common/FileUploader";
import {
  FileText, FileSpreadsheet, ShieldCheck, UploadCloud,
  Search, FolderOpen, Download, Trash2, HelpCircle
} from "lucide-react";
import { toast } from "sonner";

export default function Documents() {
  const [search, setSearch] = useState("");
  const [docs, setDocs] = useState([
    { id: "d1", name: "12_Oak_Road_Valuation.pdf", category: "Acquisitions", size: "2.4 MB", date: "2026-06-23", author: "Priya Shah" },
    { id: "d2", name: "Underwrite_Model_Manchester.xlsx", category: "Acquisitions", size: "4.8 MB", date: "2026-06-20", author: "Tom Reid" },
    { id: "d3", name: "Structural_Report_Cedar_Lane.pdf", category: "Refurbishments", size: "12.1 MB", date: "2026-06-25", author: "Apex Eng." },
    { id: "d4", name: "Lease_Beckham_Oak_Road.pdf", category: "Tenancies", size: "1.1 MB", date: "2026-06-18", author: "Legal Team" },
    { id: "d5", name: "Title_Deed_Registry_Manchester.pdf", category: "Legal", size: "3.2 MB", date: "2026-06-15", author: "Land Registry" },
  ]);

  const handleUploadFiles = (files: File[]) => {
    const newDocs = files.map((f, i) => ({
      id: `new-${i}-${Date.now()}`,
      name: f.name,
      category: "Acquisitions",
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toISOString().split("T")[0],
      author: "You (Admin)",
    }));
    setDocs([...newDocs, ...docs]);
    toast.success(`${files.length} document(s) uploaded successfully!`);
  };

  const handleDeleteDoc = (id: string, name: string) => {
    setDocs(docs.filter((d) => d.id !== id));
    toast.success(`Removed ${name} from document vault`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-outfit text-foreground flex items-center gap-2">
            Secure Document Vault
          </h1>
          <p className="text-sm text-muted-foreground">
            Centralized hub for titles, tenancy agreements, structural surveys, and cashflow reports.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Folders & Uploads */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border/40 shadow-sm rounded-2xl bg-card">
            <CardHeader>
              <CardTitle className="text-base font-bold font-outfit">Upload Documents</CardTitle>
              <CardDescription className="text-xs">Securely upload PDFs, spread sheets or Word files.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <FileUploader onFiles={handleUploadFiles} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Files List */}
        <Card className="lg:col-span-8 border-border/40 shadow-sm rounded-2xl bg-card">
          <CardHeader className="pb-3 border-b border-border/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base font-bold font-outfit">Document Library</CardTitle>
                <CardDescription className="text-xs">Browse files stored in the portfolio directory.</CardDescription>
              </div>
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search file database..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 rounded-xl border-border/50 bg-background/50 h-9 text-xs"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/45 bg-secondary/20 font-bold text-muted-foreground/80">
                    <th className="p-4">Document Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Metadata</th>
                    <th className="p-4">Owner</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {docs
                    .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
                    .map((doc) => (
                      <tr key={doc.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-4 font-semibold text-foreground flex items-center gap-2.5">
                          {doc.name.endsWith(".xlsx") ? (
                            <FileSpreadsheet className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                          ) : (
                            <FileText className="h-4.5 w-4.5 text-primary shrink-0" />
                          )}
                          <span className="truncate max-w-[200px] font-outfit">{doc.name}</span>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="text-[9px] font-bold border-border/60 bg-secondary px-2 py-0.5">
                            {doc.category}
                          </Badge>
                        </td>
                        <td className="p-4 space-y-0.5 text-[10px] text-muted-foreground font-medium">
                          <div>Size: {doc.size}</div>
                          <div>Added: {new Date(doc.date).toLocaleDateString("en-GB")}</div>
                        </td>
                        <td className="p-4 text-muted-foreground">{doc.author}</td>
                        <td className="p-4 text-right space-x-1.5">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg" onClick={() => toast.success(`Downloaded ${doc.name}`)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-lg" onClick={() => handleDeleteDoc(doc.id, doc.name)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

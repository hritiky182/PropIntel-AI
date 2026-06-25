import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "@/components/common/SearchBar";
import { EmptyState } from "@/components/common/EmptyState";
import { CardsSkeleton } from "@/components/common/Loaders";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bed, Bath, MapPin, Plus, Sparkles, Filter } from "lucide-react";
import { propertyService } from "@/services";
import { useFetch } from "@/hooks/useFetch";
import { gbp } from "@/utils/format";
import { toast } from "sonner";

export default function Properties() {
  const { data, loading } = useFetch(() => propertyService.list(), []);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [type, setType] = useState<string>("all");

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((p) => {
      const matchQ = q === "" || `${p.address} ${p.city} ${p.postcode}`.toLowerCase().includes(q.toLowerCase());
      const matchS = status === "all" || p.status === status;
      const matchT = type === "all" || p.type === type;
      return matchQ && matchS && matchT;
    });
  }, [data, q, status, type]);

  const handleAddProperty = () => {
    toast.info("Add Property wizard is reserved for enterprise admins.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-outfit text-foreground">
            Property Portfolio
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your asset inventory, track refurbishments, and monitor tenant assignments.
          </p>
        </div>
        <Button onClick={handleAddProperty} className="bg-primary hover:opacity-90 text-white rounded-xl h-10 shadow-sm self-start md:self-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Asset
        </Button>
      </div>

      {/* Filtering row */}
      <Card className="border-border/40 shadow-sm rounded-2xl">
        <CardContent className="flex flex-col gap-3 p-4 md:flex-row">
          <div className="flex-1">
            <SearchBar value={q} onChange={setQ} placeholder="Search address, city, postcode or neighborhood..." />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="md:w-48 rounded-xl border-border/50 bg-background/50 h-10">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Statuses</SelectItem>
              {["Available", "Under Review", "Acquired", "Refurbishing", "Tenanted"].map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="md:w-48 rounded-xl border-border/50 bg-background/50 h-10">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Asset Types</SelectItem>
              {["Flat", "Terrace", "Semi-Detached", "Detached", "Bungalow"].map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {loading ? (
        <CardsSkeleton count={8} />
      ) : filtered.length === 0 ? (
        <EmptyState title="No assets match your search" description="Try clearing your filters or broadening your search criteria." />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <Link key={p.id} to={`/properties/${p.id}`} className="group block">
              <Card className="overflow-hidden border-border/40 hover:shadow-xl transition-all duration-300 rounded-2xl bg-card flex flex-col h-full">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img src={p.image} alt={p.address} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <Badge className={`absolute left-3 top-3 border-none text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                    p.status === "Available" ? "bg-emerald-500 text-white" :
                    p.status === "Under Review" ? "bg-amber-500 text-white" :
                    p.status === "Acquired" ? "bg-primary text-white" :
                    p.status === "Refurbishing" ? "bg-purple-600 text-white" :
                    "bg-blue-600 text-white"
                  }`}>
                    {p.status}
                  </Badge>
                  <div className="absolute right-3 top-3 rounded-lg bg-slate-950/85 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white border border-slate-800">
                    EPC {p.epc}
                  </div>
                </div>
                
                <CardContent className="space-y-3 p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="truncate font-bold text-sm text-foreground font-outfit tracking-wide group-hover:text-primary transition-colors">{p.address}</h3>
                      <Badge variant="outline" className="shrink-0 text-[9px] font-bold border-border/60 uppercase">{p.type}</Badge>
                    </div>
                    <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground/80" /> {p.city}, {p.postcode}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-border/40 pt-3">
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-semibold">
                      <span className="flex items-center gap-1 bg-secondary px-1.5 py-0.5 rounded"><Bed className="h-3 w-3" /> {p.bedrooms}</span>
                      <span className="flex items-center gap-1 bg-secondary px-1.5 py-0.5 rounded"><Bath className="h-3 w-3" /> {p.bathrooms}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Sparkles className="h-2.5 w-2.5" />
                        {p.yieldPct.toFixed(1)}% yield
                      </span>
                    </div>
                    <span className="font-extrabold text-sm text-foreground font-outfit">{gbp(p.price)}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

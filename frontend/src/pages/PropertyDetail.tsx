import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import { propertyService } from "@/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timeline } from "@/components/common/Timeline";
import { FileUploader } from "@/components/common/FileUploader";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Bath, Bed, MapPin, Sparkles } from "lucide-react";
import { gbp } from "@/utils/format";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: p, loading } = useFetch(() => propertyService.get(id || ""), [id]);
  const [comments, setComments] = useState([
    { id: "c1", author: "Priya Shah", body: "EPC borderline — flag in valuation.", at: "2h ago" },
    { id: "c2", author: "Tom Reid", body: "Comparable sold £12k under in March.", at: "1d ago" },
  ]);
  const [draft, setDraft] = useState("");

  if (loading) {
    return <div className="h-96 animate-pulse rounded-2xl bg-muted" />;
  }

  if (!p) {
    return (
      <div className="text-center py-12 space-y-4">
        <h2 className="text-xl font-bold">Asset Not Found</h2>
        <p className="text-sm text-muted-foreground">The property you are looking for does not exist or has been removed.</p>
        <Button onClick={() => navigate("/properties")} className="rounded-xl">
          Back to Portfolio
        </Button>
      </div>
    );
  }

  const handleAcquire = () => {
    toast.success(`Acquisition pipeline initialized for ${p.address}! Sourcing file generated.`);
  };

  const handleShortlist = () => {
    toast.info(`${p.address} has been added to your target shortlist.`);
  };

  return (
    <div className="space-y-6">
      <Link to="/properties" className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Portfolio
      </Link>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-outfit text-foreground">{p.address}</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1.5">
            <MapPin className="h-4 w-4 text-muted-foreground/70" /> {p.city}, {p.postcode}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleShortlist} className="rounded-xl h-10 border-border/60 text-xs font-semibold">
            Add to Shortlist
          </Button>
          <Button onClick={handleAcquire} className="bg-primary text-white font-semibold text-xs rounded-xl h-10 shadow-sm">
            Initialize Acquisition
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-border/40 shadow-sm rounded-2xl bg-card">
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
              <img src={p.image} alt={p.address} className="w-full h-full object-cover opacity-90" />
              <div className="absolute right-4 bottom-4 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>{p.yieldPct}% Projected Net Yield</span>
              </div>
            </div>
            <CardContent className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-4 bg-card text-center">
              <Stat label="Guide Price" value={gbp(p.price)} />
              <Stat label="Net Yield" value={`${p.yieldPct.toFixed(1)}%`} />
              <Stat label="EPC Rating" value={p.epc} />
              <Stat label="Asset Type" value={p.type} />
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-muted/65 p-1 rounded-xl w-full justify-start overflow-x-auto md:w-auto">
              <TabsTrigger value="overview" className="rounded-lg text-xs font-semibold px-4">Overview</TabsTrigger>
              <TabsTrigger value="documents" className="rounded-lg text-xs font-semibold px-4">Document Vault</TabsTrigger>
              <TabsTrigger value="comments" className="rounded-lg text-xs font-semibold px-4">Internal Discussion</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="outline-none">
              <Card className="border-border/40 shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-base font-bold font-outfit">About this property</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 text-xs text-muted-foreground leading-relaxed">
                  <p>
                    A premium {p.bedrooms}-bedroom {p.type.toLowerCase()} asset situated in the heart of {p.city}. 
                    The asset is currently classified as <strong className="text-foreground">{p.status.toLowerCase()}</strong> with stable tenants 
                    and robust financial metrics. It is part of the {p.council} regional allocation, providing highly reliable yield outputs.
                  </p>
                  <div className="flex flex-wrap gap-4 text-foreground font-semibold">
                    <span className="flex items-center gap-2 bg-secondary/60 py-1.5 px-3 rounded-xl"><Bed className="h-4 w-4 text-primary" /> {p.bedrooms} Bedrooms</span>
                    <span className="flex items-center gap-2 bg-secondary/60 py-1.5 px-3 rounded-xl"><Bath className="h-4 w-4 text-primary" /> {p.bathrooms} Bathrooms</span>
                    <span className="flex items-center gap-2 bg-secondary/60 py-1.5 px-3 rounded-xl"><MapPin className="h-4 w-4 text-primary" /> {p.council}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="outline-none">
              <Card className="border-border/40 shadow-sm rounded-2xl p-4">
                <FileUploader onFiles={(f) => toast.success(`${f.length} file(s) added to queue!`)} />
              </Card>
            </TabsContent>

            <TabsContent value="comments" className="outline-none">
              <Card className="border-border/40 shadow-sm rounded-2xl">
                <CardContent className="space-y-4 p-5">
                  <div className="space-y-4">
                    {comments.map((c) => (
                      <div key={c.id} className="flex gap-3 text-xs">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarFallback className="bg-primary/15 text-primary text-xs font-bold rounded-lg">
                            {c.author.split(" ").map(p => p[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-foreground font-bold">
                            {c.author} <span className="text-[10px] text-muted-foreground/70 font-normal">· {c.at}</span>
                          </p>
                          <p className="text-muted-foreground leading-snug">{c.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 pt-3 border-t border-border/30">
                    <Textarea 
                      value={draft} 
                      onChange={(e) => setDraft(e.target.value)} 
                      placeholder="Post a comment or share comparable transactions with the acquisitions team..." 
                      className="rounded-xl min-h-[80px] text-xs border-border/60"
                    />
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        className="rounded-xl text-xs h-8 font-semibold bg-primary text-white"
                        disabled={!draft.trim()}
                        onClick={() => {
                          setComments([{ id: String(Date.now()), author: "You (Admin)", body: draft, at: "now" }, ...comments]);
                          setDraft("");
                          toast.success("Comment posted");
                        }}
                      >
                        Post Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Side Panel: Info Card & Timeline */}
        <div className="space-y-4">
          <Card className="border-border/40 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-bold font-outfit">Asset Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-border/30">
                <span className="text-muted-foreground font-medium">Platform Status</span>
                <Badge className="bg-primary/10 text-primary border-none font-bold text-xs">{p.status}</Badge>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border/30">
                <span className="text-muted-foreground font-medium">Assigned Council</span>
                <span className="font-semibold text-foreground">{p.council}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Added to System</span>
                <span className="font-semibold text-foreground">{new Date(p.addedAt).toLocaleDateString("en-GB")}</span>
              </div>
            </CardContent>
          </Card>

          <Timeline events={[
            { id: "t1", title: "Asset Sourced & Listed", date: p.addedAt },
            { id: "t2", title: "Physical Survey Uploaded", date: new Date(Date.now() - 86400000 * 3).toISOString() },
            { id: "t3", title: "Underwrite Valuation Completed", date: new Date().toISOString(), description: "Awaiting legal partner review." },
          ]} />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/80">{label}</p>
      <p className="text-base font-extrabold font-outfit text-foreground">{value}</p>
    </div>
  );
}

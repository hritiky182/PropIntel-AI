import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useFetch } from "@/hooks/useFetch";
import { propertyService } from "@/services";
import type { Property } from "@/types";
import { gbp } from "@/utils/format";
import {
  MapPin, Heart, ArrowLeftRight, Check, Sparkles, Send,
  User, Landmark, Home, PlusCircle, Calendar, MessageSquare,
  Search, SlidersHorizontal, Map, Grid, Star
} from "lucide-react";
import { toast } from "sonner";

// Zod validation for Lead Inquiry Form
const inquirySchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  message: z.string().min(10, "Please provide a detailed inquiry message"),
  offerPrice: z.string().optional(),
});
type InquiryForm = z.infer<typeof inquirySchema>;

export default function Marketplace() {
  const { data: properties, loading } = useFetch(() => propertyService.list(), []);
  
  // States
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [favorites, setFavorites] = useState<string[]>(["p1", "p3"]);
  const [compareList, setCompareList] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  
  // React Hook Form for Inquiries
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InquiryForm>({
    resolver: zodResolver(inquirySchema),
  });

  const handleInquirySubmit = (data: InquiryForm) => {
    toast.success(`Inquiry sent! Agent will contact you at ${data.email}.`);
    reset();
    setSelectedProperty(null);
  };

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((f) => f !== id));
      toast.info("Removed from favorites");
    } else {
      setFavorites([...favorites, id]);
      toast.success("Added to favorites!");
    }
  };

  const toggleCompare = (prop: Property) => {
    if (compareList.some((p) => p.id === prop.id)) {
      setCompareList(compareList.filter((p) => p.id !== prop.id));
    } else {
      if (compareList.length >= 3) {
        toast.warning("You can compare up to 3 properties at a time.");
        return;
      }
      setCompareList([...compareList, prop]);
      toast.info(`Added ${prop.address} to comparison list`);
    }
  };

  // Filters
  const filteredProps = properties?.filter((p) => {
    const matchesSearch = p.address.toLowerCase().includes(search.toLowerCase()) || 
                          p.city.toLowerCase().includes(search.toLowerCase()) ||
                          p.postcode.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === "All" || p.type === selectedType;
    return matchesSearch && matchesType;
  }) || [];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-outfit text-foreground flex items-center gap-2">
            Smart Marketplace
          </h1>
          <p className="text-sm text-muted-foreground">
            Snoop institutional-grade investments and post direct off-market inquiries.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-xl h-9"
          >
            <Grid className="h-4 w-4 mr-1.5" /> Grid View
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("map")}
            className="rounded-xl h-9"
          >
            <Map className="h-4 w-4 mr-1.5" /> Map View
          </Button>
        </div>
      </div>

      <Tabs defaultValue="listings" className="space-y-6">
        <TabsList className="bg-muted/65 p-1 rounded-xl w-full justify-start overflow-x-auto md:w-auto">
          <TabsTrigger value="listings" className="rounded-lg text-xs font-semibold px-4">Market Listings</TabsTrigger>
          <TabsTrigger value="buyer" className="rounded-lg text-xs font-semibold px-4">Buyer Dashboard</TabsTrigger>
          <TabsTrigger value="seller" className="rounded-lg text-xs font-semibold px-4">Seller Console</TabsTrigger>
          <TabsTrigger value="agent" className="rounded-lg text-xs font-semibold px-4">Agent Terminal</TabsTrigger>
        </TabsList>

        {/* TAB 1: Listings */}
        <TabsContent value="listings" className="space-y-6 outline-none">
          {/* Filters Bar */}
          <Card className="border-border/40 shadow-sm rounded-2xl bg-card">
            <CardContent className="p-4 flex flex-col md:flex-row items-center gap-3">
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by address, city or postcode..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 rounded-xl border-border/50 bg-background/50 h-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {["All", "Flat", "Terrace", "Semi-Detached", "Detached"].map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className={`rounded-xl text-xs ${selectedType === type ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-muted-foreground"}`}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[380px] bg-muted rounded-2xl" />
              ))}
            </div>
          ) : viewMode === "grid" ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProps.map((prop) => {
                const isFav = favorites.includes(prop.id);
                const isComparing = compareList.some((p) => p.id === prop.id);
                
                return (
                  <Card key={prop.id} className="overflow-hidden border-border/40 hover:shadow-xl transition-all duration-300 rounded-2xl group flex flex-col">
                    <div className="relative h-48 overflow-hidden bg-slate-900">
                      <img
                        src={prop.image}
                        alt={prop.address}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                      />
                      {/* Top Badges */}
                      <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                        <Badge className="bg-slate-950/80 backdrop-blur text-white text-[10px] font-bold border-none px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {prop.type}
                        </Badge>
                        <Badge className={`border-none text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          prop.status === "Available" ? "bg-emerald-500 text-white" :
                          prop.status === "Under Review" ? "bg-amber-500 text-white" :
                          "bg-indigo-600 text-white"
                        }`}>
                          {prop.status}
                        </Badge>
                      </div>
                      
                      {/* Action buttons overlay */}
                      <div className="absolute right-3 top-3 flex flex-col gap-1.5">
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => toggleFavorite(prop.id)}
                          className="h-8 w-8 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur hover:bg-white dark:hover:bg-slate-950 text-foreground border-none shadow-sm"
                        >
                          <Heart className={`h-4.5 w-4.5 ${isFav ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => toggleCompare(prop)}
                          className={`h-8 w-8 rounded-lg border-none shadow-sm backdrop-blur ${
                            isComparing 
                              ? "bg-primary text-white hover:bg-primary/90" 
                              : "bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-950 text-muted-foreground"
                          }`}
                        >
                          <ArrowLeftRight className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Yield Badge Bottom */}
                      <div className="absolute right-3 bottom-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg text-white font-bold text-xs flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                        <span>{prop.yieldPct}% Yield</span>
                      </div>
                    </div>

                    <CardHeader className="p-4.5 pb-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-bold text-sm text-foreground truncate max-w-[200px] font-outfit tracking-wide">{prop.address}</h3>
                        <p className="font-extrabold text-base text-primary font-outfit">{gbp(prop.price)}</p>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        {prop.city}, {prop.postcode}
                      </p>
                    </CardHeader>

                    <CardContent className="p-4.5 pt-2 pb-3 text-xs flex-1">
                      <div className="grid grid-cols-3 gap-2 bg-secondary/40 p-2.5 rounded-xl text-center text-[10px] text-muted-foreground font-semibold">
                        <div>
                          <p>Bedrooms</p>
                          <p className="font-bold text-foreground text-xs mt-0.5">{prop.bedrooms}</p>
                        </div>
                        <div className="border-x border-border/80">
                          <p>Bathrooms</p>
                          <p className="font-bold text-foreground text-xs mt-0.5">{prop.bathrooms}</p>
                        </div>
                        <div>
                          <p>EPC rating</p>
                          <p className="font-bold text-foreground text-xs mt-0.5">{prop.epc}</p>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4.5 pt-0 border-t border-border/20 flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 text-xs rounded-xl h-9 font-semibold border-border/50"
                        onClick={() => window.location.href = `/properties/${prop.id}`}
                      >
                        View Dossier
                      </Button>
                      <Button
                        className="flex-1 text-xs rounded-xl h-9 bg-primary text-white font-semibold shadow-sm"
                        onClick={() => setSelectedProperty(prop)}
                      >
                        Send Inquiry
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* MAP VIEW (Mock Interactive Map) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[500px] border border-border/40 rounded-2xl overflow-hidden shadow-sm bg-card">
              {/* Left Column: Property items */}
              <div className="lg:col-span-4 overflow-y-auto divide-y divide-border/40 h-full scrollbar-thin">
                {filteredProps.map((p) => (
                  <div key={p.id} className="p-4 hover:bg-muted/35 cursor-pointer transition-colors flex items-center gap-3">
                    <img src={p.image} alt={p.address} className="h-14 w-20 object-cover rounded-lg shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-foreground truncate font-outfit">{p.address}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{p.city}, {p.postcode}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-extrabold text-primary">{gbp(p.price)}</span>
                        <Badge variant="secondary" className="text-[9px] bg-primary/10 text-primary border-none px-1 py-0">{p.yieldPct}% Yld</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Right Column: Visual Mock Map */}
              <div className="lg:col-span-8 bg-slate-100 dark:bg-slate-900 relative h-full flex items-center justify-center overflow-hidden">
                {/* Simulated Grid Gridlines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
                
                {/* Decorative Map Features */}
                <div className="absolute top-1/4 left-1/3 w-32 h-16 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-xl" />
                <div className="absolute bottom-1/3 right-1/4 w-44 h-20 bg-emerald-500/10 dark:bg-emerald-400/5 rounded-full blur-xl" />
                
                {/* Mock Roads */}
                <div className="absolute top-1/2 left-0 right-0 h-4 bg-muted/40 rotate-12 transform origin-center" />
                <div className="absolute top-0 bottom-0 left-2/3 w-4 bg-muted/40 -rotate-45 transform origin-center" />

                {/* Map pins overlay */}
                {filteredProps.slice(0, 7).map((p, index) => {
                  const lefts = ["12%", "42%", "65%", "25%", "80%", "52%", "30%"];
                  const tops = ["18%", "30%", "22%", "60%", "72%", "55%", "85%"];
                  return (
                    <div
                      key={p.id}
                      className="absolute p-1 bg-primary text-white rounded-lg shadow-lg font-bold text-[9px] flex items-center gap-1 cursor-pointer hover:scale-105 hover:bg-accent transition-all z-10 border border-white/25"
                      style={{ left: lefts[index], top: tops[index] }}
                      onClick={() => toast.info(`Address: ${p.address} | Price: ${gbp(p.price)}`)}
                    >
                      <MapPin className="h-3 w-3" />
                      <span>{gbp(p.price)}</span>
                    </div>
                  );
                })}

                {/* Map Control overlay */}
                <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur text-white text-xs px-3.5 py-2 rounded-xl border border-slate-800 z-10 font-semibold flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-primary" />
                  <span>Real-time GPS Tracking Active</span>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        {/* TAB 2: Buyer Dashboard */}
        <TabsContent value="buyer" className="space-y-6 outline-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Card className="border-border/40 shadow-sm rounded-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Star className="h-4.5 w-4.5 text-amber-500 fill-amber-500" />
                  Saved Properties
                </CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold font-outfit text-foreground">{favorites.length} Listings</CardContent>
            </Card>
            <Card className="border-border/40 shadow-sm rounded-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4.5 w-4.5 text-primary" />
                  Showings Scheduled
                </CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold font-outfit text-foreground">2 Viewings</CardContent>
            </Card>
            <Card className="border-border/40 shadow-sm rounded-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Landmark className="h-4.5 w-4.5 text-emerald-500" />
                  Pre-Approval Status
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base font-bold text-emerald-600 dark:text-emerald-400">Verified (£4.5M Limit)</CardContent>
            </Card>
          </div>

          <Card className="border-border/40 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-bold font-outfit">Your Favorites</CardTitle>
              <CardDescription className="text-xs">Properties you bookmarked for tracking or yield comparison.</CardDescription>
            </CardHeader>
            <CardContent>
              {properties && properties.filter(p => favorites.includes(p.id)).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {properties.filter(p => favorites.includes(p.id)).map(p => (
                    <div key={p.id} className="flex items-center gap-4 p-3 rounded-xl border border-border/40 hover:bg-muted/25">
                      <img src={p.image} alt={p.address} className="h-16 w-24 object-cover rounded-lg shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-foreground truncate font-outfit">{p.address}</h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{p.city}, {p.postcode}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-extrabold text-primary">{gbp(p.price)}</span>
                          <Button variant="ghost" size="sm" onClick={() => toggleFavorite(p.id)} className="h-7 text-[10px] text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg px-2">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground text-center py-6">You haven't favorited any properties yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: Seller Console */}
        <TabsContent value="seller" className="space-y-6 outline-none">
          <Card className="border-border/40 shadow-sm rounded-2xl bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold font-outfit">Your Listings</CardTitle>
                <CardDescription className="text-xs">Manage properties you are currently marketing.</CardDescription>
              </div>
              <Button size="sm" className="bg-primary text-white rounded-xl h-9" onClick={() => toast.info("Listing form under development")}>
                <PlusCircle className="h-4 w-4 mr-1.5" /> List Property
              </Button>
            </CardHeader>
            <CardContent className="divide-y divide-border/30">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-16 bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=150" alt="12 Oak Road" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground font-outfit">12 Oak Road</h4>
                    <p className="text-[10px] text-muted-foreground">Manchester, M2 3AB</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground">Listed Price</p>
                    <p className="text-xs font-bold text-foreground">£245,000</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground">Inquiries Received</p>
                    <Badge className="bg-primary/10 text-primary border-none font-bold text-[10px]">12 Active</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl text-[11px] h-8 border-border/50">Edit Listing</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 4: Agent Terminal */}
        <TabsContent value="agent" className="space-y-6 outline-none">
          <Card className="border-border/40 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-bold font-outfit">Lead Inquiries Inbox</CardTitle>
              <CardDescription className="text-xs">Review offers and general questions submitted by verified buyers.</CardDescription>
            </CardHeader>
            <CardContent className="divide-y divide-border/40 p-0">
              {[
                { buyer: "Marcus Webb", prop: "14 Cedar Lane", type: "Offer Submission", details: "Offered £310,000 (100% Cash)", date: "2 hours ago" },
                { buyer: "Sara Jenkins", prop: "23 Elm Street", type: "Viewing Request", details: "Requested viewing for Saturday at 10 AM", date: "5 hours ago" },
              ].map((inq, i) => (
                <div key={i} className="p-4 hover:bg-muted/20 transition-colors flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground font-outfit">{inq.buyer}</span>
                      <Badge variant="outline" className="text-[9px] font-bold py-0.5 border-primary/40 text-primary">{inq.type}</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1">Property: <strong>{inq.prop}</strong></p>
                    <p className="text-xs text-foreground/80 mt-1.5 font-medium">"{inq.details}"</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-muted-foreground/80 font-medium">{inq.date}</p>
                    <div className="flex gap-1.5 mt-2">
                      <Button variant="ghost" size="sm" className="h-7 text-[10px] text-destructive hover:bg-destructive/10 rounded-lg px-2">Decline</Button>
                      <Button size="sm" className="h-7 text-[10px] bg-primary text-white font-semibold rounded-lg px-2.5">Respond</Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* STICKY COMPARISON TRAY */}
      {compareList.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-md border border-slate-800 text-white rounded-2xl px-5 py-4 flex items-center justify-between gap-6 shadow-2xl z-40 w-11/12 max-w-2xl animate-bounce-in">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/20 text-primary border border-primary/30">
              <ArrowLeftRight className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold font-outfit tracking-wide">Property Comparison</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{compareList.length} of 3 properties selected</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4.5">
            <div className="flex gap-2">
              {compareList.map((p) => (
                <div key={p.id} className="relative group">
                  <img src={p.image} alt={p.address} className="h-9 w-12 object-cover rounded-lg border border-slate-700" />
                  <button
                    onClick={() => toggleCompare(p)}
                    className="absolute -right-1.5 -top-1.5 h-4.5 w-4.5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center hover:bg-red-700 shadow border border-slate-900"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <Button
              className="bg-primary hover:bg-primary/90 text-white font-semibold text-xs rounded-xl h-8.5 px-3.5"
              onClick={() => setIsCompareOpen(true)}
            >
              Compare Now
            </Button>
          </div>
        </div>
      )}

      {/* COMPARISON DIALOG */}
      <Dialog open={isCompareOpen} onOpenChange={setIsCompareOpen}>
        <DialogContent className="max-w-4xl border-border/40 shadow-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-outfit text-xl">Property Comparison Matrix</DialogTitle>
            <DialogDescription className="text-xs">Side-by-side evaluation of yield, pricing, and structural metrics.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4 pt-4 text-xs font-medium">
            <div className="space-y-4 pt-28 text-muted-foreground text-[11px]">
              <p className="h-8 flex items-center border-b border-border/40 font-semibold">Listed Price</p>
              <p className="h-8 flex items-center border-b border-border/40 font-semibold">Net Yield %</p>
              <p className="h-8 flex items-center border-b border-border/40 font-semibold">Property Type</p>
              <p className="h-8 flex items-center border-b border-border/40 font-semibold">EPC Grade</p>
              <p className="h-8 flex items-center border-b border-border/40 font-semibold">Bedrooms</p>
              <p className="h-8 flex items-center border-b border-border/40 font-semibold">City</p>
            </div>
            
            {compareList.map((p) => (
              <div key={p.id} className="text-center space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <img src={p.image} alt={p.address} className="h-20 w-28 object-cover rounded-xl border border-border/40" />
                  <h4 className="font-bold text-[11px] truncate max-w-[120px] font-outfit">{p.address}</h4>
                </div>
                <div className="h-8 flex items-center justify-center font-extrabold text-foreground border-b border-border/40">{gbp(p.price)}</div>
                <div className="h-8 flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 border-b border-border/40 bg-emerald-500/5 rounded">{p.yieldPct}%</div>
                <div className="h-8 flex items-center justify-center text-muted-foreground border-b border-border/40">{p.type}</div>
                <div className="h-8 flex items-center justify-center text-foreground font-bold border-b border-border/40">
                  <Badge variant="outline" className="text-[10px] font-bold border-border/60">{p.epc}</Badge>
                </div>
                <div className="h-8 flex items-center justify-center text-muted-foreground border-b border-border/40">{p.bedrooms} Beds</div>
                <div className="h-8 flex items-center justify-center text-muted-foreground border-b border-border/40">{p.city}</div>
              </div>
            ))}
            
            {/* Pad empty columns if less than 3 */}
            {Array.from({ length: 3 - compareList.length }).map((_, i) => (
              <div key={i} className="border border-dashed border-border/50 rounded-2xl flex flex-col items-center justify-center text-muted-foreground text-[11px]">
                <PlusCircle className="h-6 w-6 stroke-1 mb-2" />
                <span>Select property to compare</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* LEAD INQUIRY DIALOG */}
      <Dialog open={selectedProperty !== null} onOpenChange={(open) => !open && setSelectedProperty(null)}>
        <DialogContent className="max-w-md border-border/40 shadow-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-outfit text-xl">Request Property Dossier</DialogTitle>
            <DialogDescription className="text-xs">
              Submit your info to connect with the listing agent for <strong>{selectedProperty?.address}</strong>.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4 pt-2" onSubmit={handleSubmit(handleInquirySubmit)}>
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-xs font-semibold">Full name</Label>
              <Input id="fullName" placeholder="John Doe" className="rounded-xl" {...register("fullName")} />
              {errors.fullName && <p className="text-[10px] text-destructive font-medium">{errors.fullName.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold">Email address</Label>
                <Input id="email" type="email" placeholder="john@company.com" className="rounded-xl" {...register("email")} />
                {errors.email && <p className="text-[10px] text-destructive font-medium">{errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-semibold">Phone number</Label>
                <Input id="phone" placeholder="+44 7123 456789" className="rounded-xl" {...register("phone")} />
                {errors.phone && <p className="text-[10px] text-destructive font-medium">{errors.phone.message}</p>}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="offerPrice" className="text-xs font-semibold">Submit Mock Offer (Optional)</Label>
              <Input id="offerPrice" placeholder={`Guide Price: ${selectedProperty ? gbp(selectedProperty.price) : ""}`} className="rounded-xl" {...register("offerPrice")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-xs font-semibold">Inquiry Message</Label>
              <textarea
                id="message"
                className="w-full min-h-[100px] text-xs p-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="I am interested in this portfolio and would like to request the survey reports, EPC documents, and tenancy breakdown..."
                {...register("message")}
              />
              {errors.message && <p className="text-[10px] text-destructive font-medium">{errors.message.message}</p>}
            </div>
            
            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="ghost" onClick={() => setSelectedProperty(null)} className="rounded-xl text-xs h-9">
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white font-semibold text-xs rounded-xl h-9 px-4 shadow-sm">
                <Send className="h-3.5 w-3.5 mr-1.5" /> Submit Inquiry
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

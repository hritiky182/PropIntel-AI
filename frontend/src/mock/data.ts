import type {
  Acquisition,
  DocItem,
  LegalCase,
  Notification,
  Property,
  RefurbProject,
  User,
} from "@/types";

export const mockUsers: User[] = [
  { id: "u1", name: "Alex Morgan", email: "alex@test.com", role: "super_admin", council: "Greater Manchester" },
  { id: "u2", name: "Priya Shah", email: "priya@test.com", role: "council_officer", council: "Leeds CC" },
  { id: "u3", name: "Tom Reid", email: "tom@test.com", role: "housing_association", council: "Riverside HA" },
  { id: "u4", name: "Nadia Khan", email: "nadia@test.com", role: "legal_partner" },
  { id: "u5", name: "Owen Pierce", email: "owen@test.com", role: "refurb_manager" },
];

const cities = ["Manchester", "Leeds", "Liverpool", "Birmingham", "Sheffield", "Bristol", "Newcastle"];
const types: Property["type"][] = ["Flat", "Terrace", "Semi-Detached", "Detached", "Bungalow"];
const statuses: Property["status"][] = ["Available", "Under Review", "Acquired", "Refurbishing", "Tenanted"];
const epcs: Property["epc"][] = ["A", "B", "C", "D", "E"];

export const mockProperties: Property[] = Array.from({ length: 28 }).map((_, i) => ({
  id: `p${i + 1}`,
  address: `${10 + i} ${["Oak", "Elm", "Maple", "Cedar", "Birch"][i % 5]} ${["Road", "Street", "Lane", "Way"][i % 4]}`,
  city: cities[i % cities.length],
  postcode: `${["M", "LS", "L", "B", "S", "BS", "NE"][i % 7]}${(i % 20) + 1} ${(i % 9) + 1}AB`,
  type: types[i % types.length],
  bedrooms: (i % 4) + 1,
  bathrooms: (i % 3) + 1,
  price: 120000 + ((i * 17500) % 380000),
  status: statuses[i % statuses.length],
  image: `https://images.unsplash.com/photo-${["1568605114967-8130f3a36994", "1570129477492-45c003edd2be", "1572120360610-d971b9d7767c", "1600585154340-be6161a56a0c", "1605276374104-dee2a0ed3cd6"][i % 5]
    }?w=800&q=70&auto=format&fit=crop`,
  council: ["Greater Manchester", "Leeds CC", "Liverpool CC", "Birmingham CC"][i % 4],
  addedAt: new Date(Date.now() - i * 86400000 * 2).toISOString(),
  yieldPct: 4 + ((i * 3) % 60) / 10,
  epc: epcs[i % epcs.length],
}));

const stages: Acquisition["stage"][] = ["Sourced", "Offer", "Due Diligence", "Legal", "Completed"];
export const mockAcquisitions: Acquisition[] = mockProperties.slice(0, 14).map((p, i) => ({
  id: `a${i + 1}`,
  propertyId: p.id,
  address: p.address,
  price: p.price,
  stage: stages[i % stages.length],
  assignee: mockUsers[(i % 3) + 1].name,
  updatedAt: new Date(Date.now() - i * 3600000).toISOString(),
}));

export const mockLegal: LegalCase[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `l${i + 1}`,
  ref: `LC-2026-${1000 + i}`,
  property: mockProperties[i].address,
  partner: ["Nadia Khan", "Marcus Webb", "Ellie Patel"][i % 3],
  status: (["Open", "In Review", "Awaiting Approval", "Completed"] as const)[i % 4],
  opened: new Date(Date.now() - i * 86400000 * 5).toISOString(),
}));

export const mockRefurb: RefurbProject[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `r${i + 1}`,
  property: mockProperties[i].address,
  manager: "Owen Pierce",
  budget: 25000 + i * 4000,
  spent: 8000 + i * 2500,
  progress: 10 + ((i * 13) % 90),
  start: new Date(Date.now() - i * 86400000 * 10).toISOString(),
  end: new Date(Date.now() + i * 86400000 * 14).toISOString(),
  status: (["Planning", "In Progress", "On Hold", "Completed"] as const)[i % 4],
}));

export const mockDocs: DocItem[] = Array.from({ length: 18 }).map((_, i) => ({
  id: `d${i + 1}`,
  name: `${["Title Deed", "Survey", "EPC", "Contract", "Valuation"][i % 5]}-${100 + i}.pdf`,
  type: "PDF",
  size: `${(0.4 + (i % 9) * 0.3).toFixed(1)} MB`,
  owner: mockUsers[i % mockUsers.length].name,
  updatedAt: new Date(Date.now() - i * 3600000 * 6).toISOString(),
  version: 1 + (i % 4),
}));

export const mockNotifications: Notification[] = [
  { id: "n1", title: "New offer accepted", body: "12 Oak Road offer accepted at £245,000", createdAt: new Date().toISOString(), read: false, type: "success" },
  { id: "n2", title: "Legal review required", body: "LC-2026-1003 awaiting your approval", createdAt: new Date(Date.now() - 3600000).toISOString(), read: false, type: "warning" },
  { id: "n3", title: "Refurb milestone hit", body: "23 Elm Street reached 50% completion", createdAt: new Date(Date.now() - 7200000).toISOString(), read: true, type: "info" },
  { id: "n4", title: "Document uploaded", body: "Survey-104.pdf added to 14 Cedar Lane", createdAt: new Date(Date.now() - 86400000).toISOString(), read: true, type: "info" },
];

export const portfolioTrend = Array.from({ length: 12 }).map((_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  acquired: 4 + ((i * 7) % 11),
  pipeline: 6 + ((i * 5) % 9),
  spend: 200 + ((i * 37) % 180),
}));

export const stageBreakdown = stages.map((s) => ({
  stage: s,
  count: mockAcquisitions.filter((a) => a.stage === s).length,
}));

export type UserRole =
  | "super_admin"
  | "council_officer"
  | "housing_association"
  | "legal_partner"
  | "refurb_manager";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  council?: string;
}

export interface Property {
  id: string;
  address: string;
  city: string;
  postcode: string;
  type: "Flat" | "Terrace" | "Semi-Detached" | "Detached" | "Bungalow";
  bedrooms: number;
  bathrooms: number;
  price: number;
  status: "Available" | "Under Review" | "Acquired" | "Refurbishing" | "Tenanted";
  image: string;
  council: string;
  addedAt: string;
  yieldPct: number;
  epc: "A" | "B" | "C" | "D" | "E" | "F" | "G";
}

export type AcquisitionStage =
  | "Sourced"
  | "Offer"
  | "Due Diligence"
  | "Legal"
  | "Completed";

export interface Acquisition {
  id: string;
  propertyId: string;
  address: string;
  price: number;
  stage: AcquisitionStage;
  assignee: string;
  updatedAt: string;
}

export interface LegalCase {
  id: string;
  ref: string;
  property: string;
  partner: string;
  status: "Open" | "In Review" | "Awaiting Approval" | "Completed";
  opened: string;
}

export interface RefurbProject {
  id: string;
  property: string;
  manager: string;
  budget: number;
  spent: number;
  progress: number;
  start: string;
  end: string;
  status: "Planning" | "In Progress" | "On Hold" | "Completed";
}

export interface DocItem {
  id: string;
  name: string;
  type: string;
  size: string;
  owner: string;
  updatedAt: string;
  version: number;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

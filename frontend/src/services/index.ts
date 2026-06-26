// Mock service layer. Swap each function body for an `api.get/post(...)` call
// when the MERN backend is ready. Signatures stay the same.
import { api, delay } from "@/lib/api";
import {
  mockAcquisitions,
  mockDocs,
  mockLegal,
  mockNotifications,
  mockProperties,
  mockRefurb,
  mockUsers,
  portfolioTrend,
  stageBreakdown,
} from "@/mock/data";
import type {
  Acquisition,
  AcquisitionStage,
  DocItem,
  LegalCase,
  Notification,
  Property,
  RefurbProject,
  User,
  UserRole,
} from "@/types";

// Keep `api` referenced so the lint pass doesn't drop it before backend hookup.
void api;

export const authService = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    await delay(500);
    const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) || mockUsers[0];
    if (!password) throw new Error("Password required");
    return { user, token: "mock-jwt-" + user.id };
  },
  async forgotPassword(email: string) {
    await delay(); return { ok: true, email };
  },
  async resetPassword(_token: string, _password: string) { await delay(); return { ok: true }; },
  async verifyEmail(_token: string) { await delay(); return { ok: true }; },
};

export const propertyService = {
  async list(): Promise<Property[]> { await delay(); return mockProperties; },
  async get(id: string): Promise<Property | undefined> { await delay(); return mockProperties.find((p) => p.id === id); },
};

export const acquisitionService = {
  async list(): Promise<Acquisition[]> { await delay(); return mockAcquisitions; },
  async updateStage(id: string, stage: AcquisitionStage): Promise<Acquisition> {
    await delay(150);
    const a = mockAcquisitions.find((x) => x.id === id)!;
    a.stage = stage;
    a.updatedAt = new Date().toISOString();
    return a;
  },
  stageBreakdown: async () => { await delay(); return stageBreakdown; },
};

export const legalService = { async list(): Promise<LegalCase[]> { await delay(); return mockLegal; } };
export const refurbService = { async list(): Promise<RefurbProject[]> { await delay(); return mockRefurb; } };
export const docService = { async list(): Promise<DocItem[]> { await delay(); return mockDocs; } };
export const userService = {
  async list(): Promise<User[]> { await delay(); return mockUsers; },
  async updateRole(id: string, role: UserRole) {
    await delay(); const u = mockUsers.find((x) => x.id === id)!; u.role = role; return u;
  },
};
export const notificationService = { async list(): Promise<Notification[]> { await delay(); return mockNotifications; } };

export const analyticsService = {
  async kpis() {
    await delay();
    return {
      portfolioValue: mockProperties.reduce((s, p) => s + p.price, 0),
      activeAcquisitions: mockAcquisitions.filter((a) => a.stage !== "Completed").length,
      avgYield: (mockProperties.reduce((s, p) => s + p.yieldPct, 0) / mockProperties.length).toFixed(1),
      refurbActive: mockRefurb.filter((r) => r.status === "In Progress").length,
    };
  },
  async portfolioTrend() { await delay(); return portfolioTrend; },
};

import {
  AgentProfile,
  InspectionEvent,
  Opportunity,
  PropertyRecord,
} from "./types";

// Placeholder seed data — stands in for API responses until the backend exists.
// Shapes match the entities in types.ts so swapping in real fetches later is a
// drop-in replacement, not a rewrite.

export const properties: PropertyRecord[] = [
  {
    id: "prop_1",
    title: "3-Bed Terrace, Jabi",
    propertyType: "Residential",
    location: "Jabi, Abuja",
    price: 4500000,
    priceUnit: "rent_year",
    availability: "available",
    managerId: "mgr_1",
    managerName: "Halima Bello",
    verificationStatus: "verified",
    addedAt: "2026-08-14",
    assignedAgentIds: ["agent_1", "agent_2"],
  },
  {
    id: "prop_2",
    title: "Office Suite, Wuse II",
    propertyType: "Commercial",
    location: "Wuse II, Abuja",
    price: 12000000,
    priceUnit: "rent_year",
    availability: "available",
    managerId: "mgr_1",
    managerName: "Halima Bello",
    verificationStatus: "pending",
    addedAt: "2026-09-01",
    assignedAgentIds: [],
  },
  {
    id: "prop_3",
    title: "4-Bed Duplex, Gwarinpa",
    propertyType: "Residential",
    location: "Gwarinpa, Abuja",
    price: 85000000,
    priceUnit: "sale",
    availability: "under_offer",
    managerId: "mgr_2",
    managerName: "Tunde Okafor",
    verificationStatus: "verified",
    addedAt: "2026-07-22",
    assignedAgentIds: ["agent_1"],
  },
  {
    id: "prop_4",
    title: "Family Rental, Lekki Phase 1",
    propertyType: "Residential",
    location: "Lekki, Lagos",
    price: 3200000,
    priceUnit: "rent_year",
    availability: "available",
    managerId: "mgr_2",
    managerName: "Tunde Okafor",
    verificationStatus: "rejected",
    addedAt: "2026-08-28",
    assignedAgentIds: [],
  },
];

export const opportunities: Opportunity[] = [
  { id: "opp_1", propertyId: "prop_1", stage: "inspect", interestedAgentIds: ["agent_1", "agent_2"], updatedAt: "2026-09-03" },
  { id: "opp_2", propertyId: "prop_3", stage: "negotiate", interestedAgentIds: ["agent_1"], updatedAt: "2026-09-05" },
  { id: "opp_3", propertyId: "prop_2", stage: "discover", interestedAgentIds: [], updatedAt: "2026-09-01" },
  { id: "opp_4", propertyId: "prop_4", stage: "discover", interestedAgentIds: [], updatedAt: "2026-08-28" },
];

export const agents: AgentProfile[] = [
  {
    id: "agent_1",
    name: "Chiamaka Nwosu",
    email: "chiamaka@example.com",
    phone: "+234 801 234 5678",
    brokerage: "Independent",
    specialties: ["Residential", "Family rentals"],
    catalogueSlug: "chiamaka-nwosu",
    activeOpportunities: 2,
    closedDeals: 5,
    reputation: "trusted",
  },
  {
    id: "agent_2",
    name: "David Osei",
    email: "david@example.com",
    phone: "+234 802 345 6789",
    brokerage: "Osei Realty",
    specialties: ["Residential", "Corporate"],
    catalogueSlug: "david-osei",
    activeOpportunities: 1,
    closedDeals: 2,
    reputation: "new",
  },
];

export const inspections: InspectionEvent[] = [
  {
    id: "insp_1",
    opportunityId: "opp_1",
    agentId: "agent_1",
    status: "scheduled",
    requestedAt: "2026-09-02",
    scheduledAt: "2026-09-09T10:00:00",
  },
  {
    id: "insp_2",
    opportunityId: "opp_2",
    agentId: "agent_1",
    status: "completed",
    requestedAt: "2026-08-20",
    scheduledAt: "2026-08-24T14:00:00",
    completedAt: "2026-08-24T15:10:00",
    feedback: "Client loved the layout. Requesting a second viewing before offer.",
  },
];

export function getPropertyById(id: string) {
  return properties.find((p) => p.id === id);
}

export function getOpportunitiesForProperty(propertyId: string) {
  return opportunities.filter((o) => o.propertyId === propertyId);
}

export function getAgentBySlug(slug: string) {
  return agents.find((a) => a.catalogueSlug === slug);
}

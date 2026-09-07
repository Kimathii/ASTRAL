// Core domain types, modeled directly on the Astral MVP product document.
// The "Opportunity" is the central object — everything else hangs off it.

export type Role = "manager" | "agent" | "admin";

export type VerificationStatus = "pending" | "verified" | "rejected";

export type PipelineStage =
  | "discover"
  | "inspect"
  | "negotiate"
  | "legal_close"
  | "grow";

export const PIPELINE_STAGES: { key: PipelineStage; label: string; blurb: string }[] = [
  { key: "discover", label: "Discover", blurb: "Agents find verified opportunities." },
  { key: "inspect", label: "Inspect", blurb: "Inspection scheduled and completed." },
  { key: "negotiate", label: "Negotiate", blurb: "Offers submitted, deal in progress." },
  { key: "legal_close", label: "Legal & Close", blurb: "Docs handled, deal closing." },
  { key: "grow", label: "Grow", blurb: "Outcome recorded, reputation earned." },
];

export interface PropertyRecord {
  id: string;
  title: string;
  propertyType: string;
  location: string;
  price: number;
  priceUnit: "sale" | "rent_month" | "rent_year";
  availability: "available" | "under_offer" | "let" | "sold";
  managerId: string;
  managerName: string;
  verificationStatus: VerificationStatus;
  addedAt: string;
  assignedAgentIds: string[];
}

export interface Opportunity {
  id: string;
  propertyId: string;
  stage: PipelineStage;
  interestedAgentIds: string[];
  updatedAt: string;
}

export interface AgentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  brokerage: string;
  specialties: string[];
  catalogueSlug: string;
  activeOpportunities: number;
  closedDeals: number;
  reputation: "new" | "trusted" | "top";
}

export type InspectionStatus = "requested" | "scheduled" | "completed" | "cancelled";

export interface InspectionEvent {
  id: string;
  opportunityId: string;
  agentId: string;
  status: InspectionStatus;
  requestedAt: string;
  scheduledAt?: string;
  completedAt?: string;
  feedback?: string;
}

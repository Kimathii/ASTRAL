// ASTRAL LINK — Domain Entities & Transaction Engine
// Core proposition: Connect. Distribute. Close.

export type Role = "manager" | "agent" | "admin";

// Canonical Property Verification Statuses according to Link Spec V1
export type VerificationStatus =
  | "pending"
  | "verified"
  | "flagged"
  | "suspended"
  | "closed";

// Backward compatibility alias for UI components
export type LegacyPipelineStage = "discover" | "inspect" | "negotiate" | "legal_close" | "grow";
export type PipelineStage = LegacyPipelineStage | DealStage;

export const PIPELINE_STAGES: { key: PipelineStage; label: string; blurb?: string }[] = [
  { key: "discover", label: "Discover", blurb: "Agents find verified opportunities." },
  { key: "inspect", label: "Inspect", blurb: "Inspection scheduled and completed." },
  { key: "negotiate", label: "Negotiate", blurb: "Offers submitted, deal in progress." },
  { key: "legal_close", label: "Legal & Close", blurb: "Docs handled, deal closing." },
  { key: "grow", label: "Grow", blurb: "Outcome recorded, reputation earned." },
];

// Linear Deal Status State Machine for Astral Link Transactions
export type DealStage =
  | "new"
  | "interested"
  | "client_matched"
  | "inspection"
  | "offer"
  | "negotiation"
  | "legal"
  | "closed"
  | "fallen_through";

export const DEAL_STAGES: { key: DealStage; label: string; actionDescription: string }[] = [
  { key: "new", label: "New", actionDescription: "Property verified and available on Link." },
  { key: "interested", label: "Interested", actionDescription: "Agent claims or expresses interest in distributing." },
  { key: "client_matched", label: "Client Matched", actionDescription: "Agent associates a verified buyer/tenant to the deal." },
  { key: "inspection", label: "Inspection", actionDescription: "Physical site inspection requested, scheduled, or feedback logged." },
  { key: "offer", label: "Offer", actionDescription: "Commercial offer submitted for Property Manager review." },
  { key: "negotiation", label: "Negotiation", actionDescription: "Terms, price, or payment schedules being aligned." },
  { key: "legal", label: "Legal & Docs", actionDescription: "Tenancy agreement or deed of assignment being drafted/executed." },
  { key: "closed", label: "Closed", actionDescription: "Deal finalized, funds cleared, commission attribution locked." },
];

export interface CommercialTerms {
  totalCommissionPct: number; // e.g., 10% on rental or 5% on sale
  pmRetainedPct?: number; // e.g., 0% or split with PM
  distributingAgentSharePct: number; // e.g., 100% of agent side or specified split
  collaborationAllowed: boolean;
  maxCollaboratingAgents: number; // Default 1 per "One Additional Agent Rule"
  notes?: string;
}

export interface PropertyPassport {
  id: string; // Canonical Property Passport ID (e.g. "PROP-ABJ-001")
  title: string;
  propertyType: "Residential" | "Commercial" | "Land" | "Mixed-Use";
  location: string;
  addressSummary?: string; // e.g. "Off Aminu Kano Crescent, Wuse II"
  price: number;
  priceUnit: "sale" | "rent_month" | "rent_year";
  availability: "available" | "under_offer" | "let" | "sold" | "withdrawn";
  
  // Sourcing & Verification
  sourceType: "pm" | "agent_supplied";
  managerId: string;
  managerName: string;
  verificationStatus: VerificationStatus;
  verifiedAt?: string;
  verifiedByAdminId?: string;
  lastVerifiedDate?: string;
  verificationNotes?: string;

  // Commercials & Collaboration Rules
  commercialTerms: CommercialTerms;

  // Metadata & Media
  addedAt: string;
  assignedAgentIds: string[];
  images?: string[];
  videoWalkthroughUrl?: string; // Optional Astral Live Video capture
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  sizeSqFt?: number;
  features?: string[];
}

// Backward compatibility alias so existing UI referencing PropertyRecord continues working seamlessly
export type PropertyRecord = PropertyPassport;

// Attribution & Commission Record
export interface CommissionSplit {
  leadAgentPct: number; // Originating agent (Agent A)
  collaboratingAgentPct?: number; // Brought-in agent (Agent B)
  astralPlatformPct?: number; // Astral platform fee
  totalEstimatedCommissionNgn: number;
  isTermsAcceptedByCollaborator: boolean;
}

// Transaction: The central heartbeat of Link connecting PM, Agents, Consumer, and Pipeline
export interface Transaction {
  id: string; // e.g., "TRX-2026-004"
  propertyId: string;
  pmId: string;
  
  // Attribution & Roles (explicitly distinguishing what each agent brings)
  originatingAgentId: string; // Agent A: Introduced property or first claimed opportunity
  leadAgentId: string; // Primary agent driving the deal
  collaboratingAgentId?: string; // Agent B: strictly 1 additional agent unless PM configured otherwise
  collaboratingRole?: "buyer_agent" | "tenant_rep" | "co_marketer";
  
  // Consumer / Client Ref (Deliberately minimal, NOT a full CRM)
  clientRef?: {
    name: string;
    phoneOrEmailMasked?: string;
    introducedByAgentId: string;
    associatedAt: string;
  };

  stage: DealStage;
  commissionSplit: CommissionSplit;
  
  // Current step actionable summary ("What needs to happen next?")
  nextActionRequired: {
    actorRole: "agent" | "collaborator" | "pm" | "admin";
    instruction: string;
    dueBy?: string;
  };

  createdAt: string;
  updatedAt: string;
}

// Collaboration Request between Agent A and Agent B
export interface CollaborationRequest {
  id: string;
  transactionId: string;
  propertyId: string;
  invitingAgentId: string; // Agent A
  invitedAgentId: string; // Agent B
  offeredRole: "buyer_agent" | "tenant_rep" | "co_marketer";
  proposedSplitPct: number; // e.g. 50% of the agency fee
  status: "pending_acceptance" | "accepted" | "declined" | "expired";
  termsAcceptedAt?: string;
  note?: string;
  createdAt: string;
}

// Inspection Workflow
export type InspectionStatus = "requested" | "scheduled" | "completed" | "cancelled";

export interface InspectionRecord {
  id: string;
  transactionId: string;
  opportunityId?: string; // Backwards compatibility for existing UI
  propertyId: string;
  agentId: string;
  status: InspectionStatus;
  requestedAt: string;
  scheduledFor?: string; // ISO datetime
  scheduledAt?: string; // Backwards compatibility
  completedAt?: string;
  
  // Feedback recorded post-inspection
  feedback?: {
    interestLevel: "high" | "moderate" | "low" | "passed";
    propertyAccuracyScore: 1 | 2 | 3 | 4 | 5; // 5 = matches passport exactly
    clientFeedbackNotes?: string;
    readyForOffer: boolean;
    submittedAt: string;
  };
}

// Backwards compatibility alias for existing views
export type InspectionEvent = InspectionRecord;

// Commercial Offer
export interface OfferRecord {
  id: string;
  transactionId: string;
  propertyId: string;
  submittedByAgentId: string;
  offerAmount: number;
  proposedPaymentTerms: string; // e.g., "Full 1-year upfront with 10% cautionary deposit"
  status: "submitted" | "under_pm_review" | "accepted" | "countered" | "declined";
  counterAmount?: number;
  submittedAt: string;
  pmDecisionAt?: string;
}

// Append-only Transaction Audit Log for Commission Protection
export interface TransactionEvent {
  id: string;
  transactionId: string;
  timestamp: string;
  actorId: string;
  actorRole: Role;
  eventType:
    | "opportunity_claimed"
    | "collaboration_invited"
    | "collaboration_accepted"
    | "client_associated"
    | "inspection_requested"
    | "inspection_scheduled"
    | "inspection_completed"
    | "offer_submitted"
    | "offer_accepted"
    | "legal_docs_uploaded"
    | "deal_closed";
  summary: string;
  metadata?: Record<string, unknown>;
}

// Agent Profile on Link
export interface AgentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  brokerage: string;
  operatingAreas: string[];
  propertySpecialties: string[];
  catalogueSlug: string;
  activeTransactionsCount: number;
  closedDealsCount: number;
  reputationBadge: "verified" | "trusted_partner" | "top_producer";
  avatarUrl?: string;
  bio?: string;
  introducedPropertiesCount: number;

  // Backwards compatibility for legacy views
  specialties: string[];
  activeOpportunities: number;
  closedDeals: number;
  reputation: "new" | "trusted" | "top" | "verified" | "trusted_partner" | "top_producer";
}

// Legacy Opportunity wrapper for backward compatibility
export interface Opportunity {
  id: string;
  propertyId: string;
  stage: LegacyPipelineStage | DealStage;
  interestedAgentIds: string[];
  updatedAt: string;
}

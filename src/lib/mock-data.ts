import {
  AgentProfile,
  CollaborationRequest,
  InspectionRecord,
  Opportunity,
  PropertyPassport,
  Transaction,
  TransactionEvent,
} from "./types";

// Seed Property Passports with verified commercial terms, sourcing & one-additional-agent rules
export const properties: PropertyPassport[] = [
  {
    id: "prop_1",
    title: "3-Bed Contemporary Terrace",
    propertyType: "Residential",
    location: "Jabi, Abuja",
    addressSummary: "Jabi Lake District, Off Shehu Yar'Adua Way",
    price: 4500000,
    priceUnit: "rent_year",
    availability: "available",
    sourceType: "pm",
    managerId: "mgr_1",
    managerName: "Amarachi Longws",
    verificationStatus: "verified",
    verifiedAt: "2026-08-15",
    lastVerifiedDate: "2026-09-01",
    verificationNotes: "Title deeds & PM mandate physically verified by Astral Admin.",
    commercialTerms: {
      totalCommissionPct: 10,
      distributingAgentSharePct: 100,
      collaborationAllowed: true,
      maxCollaboratingAgents: 1, // Enforcing 1-additional-agent rule
      notes: "10% Agency fee payable upon cleared rent. 50/50 split if collaborating with tenant rep.",
    },
    addedAt: "2026-08-14",
    assignedAgentIds: ["agent_1", "agent_2"],
    bedrooms: 3,
    bathrooms: 4,
    sizeSqFt: 2400,
    description:
      "A luminous 3-bedroom terrace duplex situated in the serene, highly sought-after district of Jabi. Features a fitted chef's kitchen, high ceilings, ensuite bedrooms, private parking for 2 vehicles, and dedicated 24/7 security with continuous backup power.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "24/7 Gated Security",
      "Dedicated Generator & Solar Inverter",
      "Fitted European Kitchen",
      "All Rooms Ensuite",
      "Water Treatment Plant",
      "Ample 2-Car Parking",
    ],
  },
  {
    id: "prop_2",
    title: "Executive Grade-A Office Suite",
    propertyType: "Commercial",
    location: "Wuse II, Abuja",
    addressSummary: "Aminu Kano Crescent, Commercial Hub",
    price: 12000000,
    priceUnit: "rent_year",
    availability: "available",
    sourceType: "pm",
    managerId: "mgr_1",
    managerName: "Amarachi Longws",
    verificationStatus: "verified",
    verifiedAt: "2026-09-02",
    lastVerifiedDate: "2026-09-02",
    commercialTerms: {
      totalCommissionPct: 10,
      distributingAgentSharePct: 100,
      collaborationAllowed: true,
      maxCollaboratingAgents: 1,
      notes: "Corporate tenants only. Agency fee standard 10%.",
    },
    addedAt: "2026-09-01",
    assignedAgentIds: ["agent_2"],
    bathrooms: 2,
    sizeSqFt: 3500,
    description:
      "Prestigious commercial office suite located along the bustling Aminu Kano Crescent in Wuse II. Modern open-plan layout with partitioned executive suites, high-speed fiber optic internet, elevator access, and multi-tier access control.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "High-speed Fiber Ready",
      "Dual Standby Diesel Generators",
      "Central HVAC System",
      "Elevator & Wheelchair Access",
      "Covered Basements Parking",
      "Fire Detection & Sprinklers",
    ],
  },
  {
    id: "prop_3",
    title: "Luxury 5-Bed Detached Villa with Pool",
    propertyType: "Residential",
    location: "Maitama, Abuja",
    addressSummary: "Gana Street Enclave, Maitama",
    price: 320000000,
    priceUnit: "sale",
    availability: "available",
    sourceType: "pm",
    managerId: "mgr_2",
    managerName: "Tunde Okafor",
    verificationStatus: "verified",
    verifiedAt: "2026-07-24",
    lastVerifiedDate: "2026-08-15",
    commercialTerms: {
      totalCommissionPct: 5,
      distributingAgentSharePct: 100,
      collaborationAllowed: true,
      maxCollaboratingAgents: 1,
      notes: "5% Sale Commission (₦16,000,000). Co-broker split at 50/50.",
    },
    addedAt: "2026-07-22",
    assignedAgentIds: ["agent_1", "agent_2"],
    bedrooms: 5,
    bathrooms: 6,
    sizeSqFt: 6200,
    description:
      "An architectural masterpiece nestled in the diplomatic enclave of Maitama. Boasting an Olympic-style swimming pool, lush landscaped private gardens, smart home automation, cinema room, 2-room staff quarters, and triple garage.",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "Private Swimming Pool",
      "Smart Home Automation",
      "Private Cinema",
      "2-Room Staff Quarters",
      "3-Car Motorized Garage",
      "Biometric Perimeter Access",
    ],
  },
  {
    id: "prop_4",
    title: "Contemporary 4-Bed Semi-Detached Duplex",
    propertyType: "Residential",
    location: "Lekki Phase 1, Lagos",
    addressSummary: "Admiralty Way Axis, Lekki Phase 1",
    price: 185000000,
    priceUnit: "sale",
    availability: "available",
    sourceType: "agent_supplied",
    managerId: "mgr_3",
    managerName: "Folake Balogun",
    verificationStatus: "verified",
    verifiedAt: "2026-08-30",
    lastVerifiedDate: "2026-08-30",
    commercialTerms: {
      totalCommissionPct: 5,
      distributingAgentSharePct: 100,
      collaborationAllowed: true,
      maxCollaboratingAgents: 1,
      notes: "Governor's Consent in view. 5% commission split on completion.",
    },
    addedAt: "2026-08-28",
    assignedAgentIds: ["agent_1"],
    bedrooms: 4,
    bathrooms: 5,
    sizeSqFt: 3800,
    description:
      "Newly finished high-spec 4-bedroom duplex in a secure gated estate in Lekki Phase 1. Complete with stamped concrete flooring, fitted Italian kitchen, rooftop lounge, and self-contained BQ.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "Rooftop Terrace Lounge",
      "Ensuite Maid's Room (BQ)",
      "Stamped Concrete Driveway",
      "Integrated Audio System",
      "Industrial Water Purification",
    ],
  },
  {
    id: "prop_5",
    title: "Waterfront Commercial Showroom & Plaza",
    propertyType: "Commercial",
    location: "Victoria Island, Lagos",
    addressSummary: "Ozumba Mbadiwe Avenue",
    price: 35000000,
    priceUnit: "rent_year",
    availability: "under_offer",
    sourceType: "pm",
    managerId: "mgr_2",
    managerName: "Tunde Okafor",
    verificationStatus: "verified",
    verifiedAt: "2026-08-10",
    lastVerifiedDate: "2026-09-05",
    commercialTerms: {
      totalCommissionPct: 10,
      distributingAgentSharePct: 100,
      collaborationAllowed: false,
      maxCollaboratingAgents: 0,
      notes: "Exclusive single-agent mandate. No external collaborator permitted without PM sign-off.",
    },
    addedAt: "2026-08-10",
    assignedAgentIds: ["agent_1"],
    bathrooms: 6,
    sizeSqFt: 8500,
    description:
      "Unrivaled visibility on Ozumba Mbadiwe Avenue. Glass-fronted commercial building ideal for luxury automotive showrooms, flagship banking branches, or high-end retail headquarters.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "Prime VI Location",
      "Dedicated Transformer & 24/7 Power",
      "Ample Surface & Underground Parking",
      "CCTV Surveillance",
    ],
  },
  {
    id: "prop_6",
    title: "Furnished 2-Bed Luxury Apartment",
    propertyType: "Residential",
    location: "Wuse II, Abuja",
    addressSummary: "Adetokunbo Ademola Crescent, Wuse II",
    price: 6000000,
    priceUnit: "rent_year",
    availability: "available",
    sourceType: "agent_supplied",
    managerId: "agent_2",
    managerName: "David Osei (Agent Supplied)",
    verificationStatus: "pending",
    commercialTerms: {
      totalCommissionPct: 10,
      distributingAgentSharePct: 100,
      collaborationAllowed: true,
      maxCollaboratingAgents: 1,
      notes: "Agent-sourced direct mandate from diaspora landlord. Title deed and authorization uploaded.",
    },
    addedAt: "2026-09-14",
    assignedAgentIds: ["agent_2"],
    bedrooms: 2,
    bathrooms: 2,
    sizeSqFt: 1400,
    description: "Fully furnished 2-bedroom executive apartment with serviced power and gym in the heart of Wuse II.",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    ],
    features: ["Fully Furnished", "Gym & Pool", "24/7 Power", "High-speed WiFi"],
  },
  {
    id: "prop_7",
    title: "3-Bedroom Terrace in Jabi (Duplicate Submission)",
    propertyType: "Residential",
    location: "Jabi, Abuja",
    addressSummary: "Jabi Lake Axis, Off Shehu Yar'Adua Way",
    price: 4500000,
    priceUnit: "rent_year",
    availability: "available",
    sourceType: "agent_supplied",
    managerId: "agent_unknown",
    managerName: "Premier Realty Partners",
    verificationStatus: "flagged",
    verificationNotes: "Automated detection: 92% address and price similarity with canonical passport PROP-1.",
    commercialTerms: {
      totalCommissionPct: 10,
      distributingAgentSharePct: 100,
      collaborationAllowed: true,
      maxCollaboratingAgents: 1,
      notes: "Submitted by external broker without proof of direct PM mandate.",
    },
    addedAt: "2026-09-15",
    assignedAgentIds: [],
    bedrooms: 3,
    bathrooms: 4,
    sizeSqFt: 2400,
    description: "Spacious 3-bedroom terrace duplex in Jabi with modern finishes.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    ],
    features: ["Gated Estate", "Generator Backup"],
  },
];

// Seed Astral Link Transactions: Proving the repeatable transaction loop
export const transactions: Transaction[] = [
  {
    id: "TRX-2026-001",
    propertyId: "prop_1",
    pmId: "mgr_1",
    originatingAgentId: "agent_1", // Chiamaka claimed opportunity
    leadAgentId: "agent_1",
    collaboratingAgentId: "agent_2", // David Osei brought the client
    collaboratingRole: "tenant_rep",
    clientRef: {
      name: "Engr. Kabir Bello",
      phoneOrEmailMasked: "+234 803 *** 8812",
      introducedByAgentId: "agent_2",
      associatedAt: "2026-09-02",
    },
    stage: "inspection",
    commissionSplit: {
      leadAgentPct: 50,
      collaboratingAgentPct: 50,
      astralPlatformPct: 0,
      totalEstimatedCommissionNgn: 450000, // 10% of 4.5m rent
      isTermsAcceptedByCollaborator: true,
    },
    nextActionRequired: {
      actorRole: "collaborator",
      instruction: "Log inspection feedback following client viewing scheduled for 10:00 AM.",
      dueBy: "2026-09-09",
    },
    createdAt: "2026-09-01",
    updatedAt: "2026-09-03",
  },
  {
    id: "TRX-2026-002",
    propertyId: "prop_3",
    pmId: "mgr_2",
    originatingAgentId: "agent_1",
    leadAgentId: "agent_1",
    clientRef: {
      name: "Dr. & Mrs. Adeleke",
      phoneOrEmailMasked: "+234 812 *** 9001",
      introducedByAgentId: "agent_1",
      associatedAt: "2026-08-25",
    },
    stage: "negotiation",
    commissionSplit: {
      leadAgentPct: 100,
      totalEstimatedCommissionNgn: 16000000, // 5% of 320m sale
      isTermsAcceptedByCollaborator: true,
    },
    nextActionRequired: {
      actorRole: "pm",
      instruction: "Review revised counter-offer of ₦305,000,000 submitted by Lead Agent.",
      dueBy: "2026-09-07",
    },
    createdAt: "2026-08-20",
    updatedAt: "2026-09-05",
  },
  {
    id: "TRX-2026-003",
    propertyId: "prop_5",
    pmId: "mgr_2",
    originatingAgentId: "agent_1",
    leadAgentId: "agent_1",
    clientRef: {
      name: "Vanguard Capital Partners",
      phoneOrEmailMasked: "operations@vanguard***.ng",
      introducedByAgentId: "agent_1",
      associatedAt: "2026-08-15",
    },
    stage: "legal",
    commissionSplit: {
      leadAgentPct: 100,
      totalEstimatedCommissionNgn: 3500000, // 10% of 35m rent
      isTermsAcceptedByCollaborator: true,
    },
    nextActionRequired: {
      actorRole: "admin",
      instruction: "Verify executed commercial tenancy agreement and bank clearance of advance deposit.",
      dueBy: "2026-09-12",
    },
    createdAt: "2026-08-10",
    updatedAt: "2026-09-10",
  },
];

// Active Collaboration Requests between agents
export const collaborationRequests: CollaborationRequest[] = [
  {
    id: "collab_req_1",
    transactionId: "TRX-2026-001",
    propertyId: "prop_1",
    invitingAgentId: "agent_1",
    invitedAgentId: "agent_2",
    offeredRole: "tenant_rep",
    proposedSplitPct: 50,
    status: "accepted",
    termsAcceptedAt: "2026-09-02T11:30:00",
    note: "Client is looking for immediate move-in Jabi residence. 50% split agreed.",
    createdAt: "2026-09-02",
  },
];

export const inspections: InspectionRecord[] = [
  {
    id: "insp_1",
    transactionId: "TRX-2026-001",
    propertyId: "prop_1",
    agentId: "agent_2",
    status: "scheduled",
    requestedAt: "2026-09-02",
    scheduledFor: "2026-09-09T10:00:00",
  },
  {
    id: "insp_2",
    transactionId: "TRX-2026-002",
    propertyId: "prop_3",
    agentId: "agent_1",
    status: "completed",
    requestedAt: "2026-08-20",
    scheduledFor: "2026-08-24T14:00:00",
    completedAt: "2026-08-24T15:10:00",
    feedback: {
      interestLevel: "high",
      propertyAccuracyScore: 5,
      clientFeedbackNotes: "Client was impressed with the structural integrity and pool maintenance. Proceeded with formal offer.",
      readyForOffer: true,
      submittedAt: "2026-08-24T16:00:00",
    },
  },
];

export const transactionAuditLogs: TransactionEvent[] = [
  {
    id: "evt_1",
    transactionId: "TRX-2026-001",
    timestamp: "2026-09-01T09:15:00Z",
    actorId: "agent_1",
    actorRole: "agent",
    eventType: "opportunity_claimed",
    summary: "Chiamaka Nwosu claimed opportunity to distribute 3-Bed Contemporary Terrace.",
  },
  {
    id: "evt_2",
    transactionId: "TRX-2026-001",
    timestamp: "2026-09-02T10:00:00Z",
    actorId: "agent_1",
    actorRole: "agent",
    eventType: "collaboration_invited",
    summary: "Collaboration invite sent to David Osei (Role: Tenant Rep, 50% split).",
  },
  {
    id: "evt_3",
    transactionId: "TRX-2026-001",
    timestamp: "2026-09-02T11:30:00Z",
    actorId: "agent_2",
    actorRole: "agent",
    eventType: "collaboration_accepted",
    summary: "David Osei accepted collaboration terms. Protected transaction record established.",
  },
  {
    id: "evt_4",
    transactionId: "TRX-2026-001",
    timestamp: "2026-09-02T14:00:00Z",
    actorId: "agent_2",
    actorRole: "agent",
    eventType: "inspection_scheduled",
    summary: "Site inspection scheduled with Engr. Kabir Bello for Sept 9, 10:00 AM.",
  },
];

export const agents: AgentProfile[] = [
  {
    id: "agent_1",
    name: "Chiamaka Nwosu",
    email: "chiamaka@example.com",
    phone: "+234 801 234 5678",
    brokerage: "Independent Luxury Advisor",
    operatingAreas: ["Maitama", "Jabi", "Wuse II", "Lekki Phase 1"],
    propertySpecialties: ["Residential", "Luxury Villas", "Family Rentals"],
    catalogueSlug: "chiamaka-nwosu",
    activeTransactionsCount: 4,
    closedDealsCount: 18,
    reputationBadge: "top_producer",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "Over 7 years connecting distinguished clients with verified prime properties across Abuja and Lagos.",
    introducedPropertiesCount: 3,

    // Legacy fields
    specialties: ["Residential", "Luxury Villas", "Family Rentals"],
    activeOpportunities: 4,
    closedDeals: 18,
    reputation: "top",
  },
  {
    id: "agent_2",
    name: "David Osei",
    email: "david@example.com",
    phone: "+234 802 345 6789",
    brokerage: "Osei Commercial Realty",
    operatingAreas: ["Central Business District", "Wuse II", "Victoria Island"],
    propertySpecialties: ["Commercial Hubs", "Corporate Leases", "Office Suites"],
    catalogueSlug: "david-osei",
    activeTransactionsCount: 3,
    closedDealsCount: 12,
    reputationBadge: "trusted_partner",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "Specializing in Grade-A commercial real estate and prime corporate spaces in Abuja & Victoria Island.",
    introducedPropertiesCount: 1,

    // Legacy fields
    specialties: ["Commercial Hubs", "Corporate Leases", "Office Suites"],
    activeOpportunities: 3,
    closedDeals: 12,
    reputation: "trusted",
  },
];

// Backward-compatible Opportunity array mapping to transactions for existing views
export const opportunities: Opportunity[] = [
  { id: "opp_1", propertyId: "prop_1", stage: "inspect", interestedAgentIds: ["agent_1", "agent_2"], updatedAt: "2026-09-03" },
  { id: "opp_2", propertyId: "prop_3", stage: "negotiate", interestedAgentIds: ["agent_1"], updatedAt: "2026-09-05" },
  { id: "opp_3", propertyId: "prop_2", stage: "discover", interestedAgentIds: ["agent_2"], updatedAt: "2026-09-01" },
  { id: "opp_4", propertyId: "prop_4", stage: "discover", interestedAgentIds: ["agent_1"], updatedAt: "2026-08-28" },
  { id: "opp_5", propertyId: "prop_5", stage: "legal_close", interestedAgentIds: ["agent_1"], updatedAt: "2026-09-10" },
];

export function getPropertyById(id: string) {
  return properties.find((p) => p.id === id);
}

export function getTransactionById(id: string) {
  return transactions.find((t) => t.id === id);
}

export function getTransactionsForProperty(propertyId: string) {
  return transactions.filter((t) => t.propertyId === propertyId);
}

export function getTransactionsForAgent(agentId: string) {
  return transactions.filter(
    (t) => t.leadAgentId === agentId || t.collaboratingAgentId === agentId || t.originatingAgentId === agentId
  );
}

export function getOpportunitiesForProperty(propertyId: string) {
  return opportunities.filter((o) => o.propertyId === propertyId);
}

export function getAgentBySlug(slug: string) {
  return agents.find((a) => a.catalogueSlug === slug);
}

export function getAgentById(id: string) {
  return agents.find((a) => a.id === id);
}

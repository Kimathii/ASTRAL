import {
  AgentProfile,
  InspectionEvent,
  Opportunity,
  PropertyRecord,
} from "./types";

// Seed data with curated high-resolution architecture & interior photography
export const properties: PropertyRecord[] = [
  {
    id: "prop_1",
    title: "3-Bed Contemporary Terrace",
    propertyType: "Residential",
    location: "Jabi, Abuja",
    price: 4500000,
    priceUnit: "rent_year",
    availability: "available",
    managerId: "mgr_1",
    managerName: "Amarachi Longws",
    verificationStatus: "verified",
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
    price: 12000000,
    priceUnit: "rent_year",
    availability: "available",
    managerId: "mgr_1",
    managerName: "Amarachi Longws",
    verificationStatus: "verified",
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
    price: 320000000,
    priceUnit: "sale",
    availability: "available",
    managerId: "mgr_2",
    managerName: "Tunde Okafor",
    verificationStatus: "verified",
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
      "2-Room Boys Quarters",
      "Private Cinema & Gym",
      "CCTV & Electric Perimeter",
      "Fully Furnished Option Available",
    ],
  },
  {
    id: "prop_4",
    title: "4-Bed Waterfront Townhouse",
    propertyType: "Residential",
    location: "Lekki Phase 1, Lagos",
    price: 18000000,
    priceUnit: "rent_year",
    availability: "available",
    managerId: "mgr_2",
    managerName: "Tunde Okafor",
    verificationStatus: "verified",
    addedAt: "2026-08-28",
    assignedAgentIds: ["agent_1"],
    bedrooms: 4,
    bathrooms: 5,
    sizeSqFt: 3800,
    description:
      "Stunning contemporary townhouse with direct lagoon views in prestigious Lekki Phase 1. Features marble flooring throughout, floor-to-ceiling soundproof glazing, private rooftop lounge terrace, and a serene community jetty.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "Lagoon Views & Rooftop Terrace",
      "24/7 Serviced Estate",
      "Fitted Italian Kitchen",
      "Modern Walk-in Closets",
      "Dedicated Facility Management",
      "Private 3-Vehicle Garage",
    ],
  },
  {
    id: "prop_5",
    title: "4-Bed Modern Duplex",
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
    bedrooms: 4,
    bathrooms: 5,
    sizeSqFt: 3400,
    description:
      "Well-proportioned family duplex situated inside an exclusive gated community in Gwarinpa. Newly renovated with polished porcelain tiles, modern recessed LED lighting, and large garden space.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80",
    ],
    features: [
      "Gated Estate",
      "Spacious Front & Back Lawn",
      "Fully Ensuite Rooms",
      "Borehole with Filtration",
    ],
  },
  {
    id: "prop_6",
    title: "Prime Commercial Plaza Unit",
    propertyType: "Commercial",
    location: "Victoria Island, Lagos",
    price: 45000000,
    priceUnit: "rent_year",
    availability: "available",
    managerId: "mgr_1",
    managerName: "Amarachi Longws",
    verificationStatus: "verified",
    addedAt: "2026-09-08",
    assignedAgentIds: ["agent_2"],
    bathrooms: 4,
    sizeSqFt: 4800,
    description:
      "Strategic high-visibility commercial floor in Victoria Island, ideal for banking, corporate headquarters, or tech accelerators. Unmatched footfall and accessibility.",
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
];

export const opportunities: Opportunity[] = [
  { id: "opp_1", propertyId: "prop_1", stage: "inspect", interestedAgentIds: ["agent_1", "agent_2"], updatedAt: "2026-09-03" },
  { id: "opp_2", propertyId: "prop_3", stage: "negotiate", interestedAgentIds: ["agent_1"], updatedAt: "2026-09-05" },
  { id: "opp_3", propertyId: "prop_2", stage: "discover", interestedAgentIds: ["agent_2"], updatedAt: "2026-09-01" },
  { id: "opp_4", propertyId: "prop_4", stage: "discover", interestedAgentIds: ["agent_1"], updatedAt: "2026-08-28" },
  { id: "opp_5", propertyId: "prop_5", stage: "legal_close", interestedAgentIds: ["agent_1"], updatedAt: "2026-09-10" },
];

export const agents: AgentProfile[] = [
  {
    id: "agent_1",
    name: "Chiamaka Nwosu",
    email: "chiamaka@example.com",
    phone: "+234 801 234 5678",
    brokerage: "Independent Luxury Advisor",
    specialties: ["Residential", "Luxury Villas", "Family Rentals"],
    catalogueSlug: "chiamaka-nwosu",
    activeOpportunities: 4,
    closedDeals: 18,
    reputation: "top",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "Over 7 years connecting distinguished clients with verified prime properties across Abuja and Lagos.",
  },
  {
    id: "agent_2",
    name: "David Osei",
    email: "david@example.com",
    phone: "+234 802 345 6789",
    brokerage: "Osei Commercial Realty",
    specialties: ["Commercial Hubs", "Corporate Leases", "Office Suites"],
    catalogueSlug: "david-osei",
    activeOpportunities: 3,
    closedDeals: 12,
    reputation: "trusted",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "Specializing in Grade-A commercial real estate and prime corporate spaces in Abuja & Victoria Island.",
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

export function getAgentById(id: string) {
  return agents.find((a) => a.id === id);
}


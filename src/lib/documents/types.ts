// Types for the Documents module. These match the applied migration
// 20261113120000_documents_foundation.sql exactly.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type ProfileRole = "manager" | "agent" | "admin" | "client";
export type TemplateReviewStatus = "draft" | "pending_lawyer_review" | "approved";
export type DocumentStatus = "draft" | "submitted" | "finalized";
export type PartyType = "landlord" | "tenant" | "guarantor" | "client";

export interface Profile {
  id: string;
  role: ProfileRole;
  created_at: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string | null;
  created_by: string;
  created_at: string;
}

export interface TemplateVersion {
  id: string;
  template_id: string;
  version: number;
  schema: Json;
  published: boolean;
  review_status: TemplateReviewStatus;
  retired_at: string | null;
  created_at: string;
}

export interface TemplateQuestion {
  id: string;
  version_id: string;
  field_key: string;
  question_text: string;
  field_type: string;
  validation: Json | null;
  sort_order: number;
  created_at: string;
}

// Named DocumentRecord to avoid colliding with the browser's global Document type.
export interface DocumentRecord {
  id: string;
  template_version_id: string;
  owner_id: string;
  status: DocumentStatus;
  created_at: string;
  updated_at: string;
}

export interface DocumentAnswer {
  id: string;
  document_id: string;
  field_key: string;
  answer: Json;
  created_at: string;
}

export interface PartyDetail {
  id: string;
  owner_id: string;
  type: PartyType;
  data: Json;
  created_at: string;
  updated_at: string;
}
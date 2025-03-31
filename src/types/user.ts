
import { UserRole } from "@/contexts/AuthContext";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  avatar: string;
  lastLogin: string;
}

// Use 'export type' instead of 'export' for re-exporting type definitions
export type { UserRole };

export type UserRole = "admin" | "manager" | "staff"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  businessId: string
  createdAt: Date
}

export interface Business {
  id: string
  name: string
  type: string // clinic, barbershop, etc.
  aiPersonality: string
  settings: Record<string, any>
  createdAt: Date
}

export interface Expense {
  id: string
  description: string
  amount: number
  type: "fixed" | "variable"
  category: string
  date: Date
  createdAt: Date
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number // in minutes
  isActive: boolean
  businessId: string
  createdAt: Date
}

export interface Client {
  id: string
  name: string
  phone: string
  email?: string
  birthDate?: Date
  notes?: string
  aiSummary?: string // AI-generated summary of client profile
  businessId: string
  createdAt: Date
}

export interface Professional {
  id: string
  name: string
  role: string
  email?: string
  isActive: boolean
  businessId: string
  createdAt: Date
}

export interface Appointment {
  id: string
  clientId: string
  clientName?: string // Helper for UI
  serviceId: string
  serviceName?: string // Helper for UI
  professionalId?: string
  date?: Date
  startTime?: string
  endTime?: string
  status: string // lead, scheduled, completed, cancelled, follow-up
  notes?: string
  aiSummary?: string // AI summary of the interaction
  businessId: string
  createdAt: Date
}

export interface Commission {
  professionalId: string
  professionalName: string
  totalServices: number
  totalRevenue: number
  commissionAmount: number
}

export interface FinancialStats {
  totalFixedExpenses: number
  totalVariableExpenses: number
  totalExpenses: number
  totalRevenue: number
  netProfit: number
  commissions: Commission[]
  totalCommissions: number
}

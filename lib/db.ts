import { supabase } from "./supabase"
import { Client, Service, Appointment, Business } from "./types"

// Centralized DB Service using Supabase
export const db = {
  // --- BUSINESS ---
  getBusiness: async (id: string = '74888888-4444-4444-4444-888888888888'): Promise<Business | null> => {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) return null
    return {
      id: data.id,
      name: data.name,
      type: data.type,
      aiPersonality: data.ai_personality,
      settings: data.settings,
      createdAt: new Date(data.created_at)
    }
  },

  // --- CLIENTS ---
  getClients: async (): Promise<Client[]> => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) return []
    return data.map(item => ({
      id: item.id,
      name: item.name,
      phone: item.phone,
      email: item.email,
      businessId: item.business_id,
      aiSummary: item.ai_summary,
      createdAt: new Date(item.created_at)
    }))
  },

  addClient: async (client: Omit<Client, "id" | "createdAt">): Promise<boolean> => {
    const { error } = await supabase
      .from('clients')
      .insert([{
        name: client.name,
        phone: client.phone,
        email: client.email,
        business_id: client.businessId,
        ai_summary: client.aiSummary
      }])
    
    return !error
  },

  // --- SERVICES ---
  getServices: async (): Promise<Service[]> => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('name')
    
    if (error) return []
    return data.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: Number(item.price),
      duration: item.duration,
      isActive: item.is_active,
      businessId: item.business_id,
      createdAt: new Date(item.created_at)
    }))
  },

  addService: async (service: Omit<Service, "id" | "createdAt">): Promise<boolean> => {
    const { error } = await supabase
      .from('services')
      .insert([{
        name: service.name,
        description: service.description,
        price: service.price,
        duration: service.duration,
        is_active: service.isActive,
        business_id: service.businessId
      }])
    
    return !error
  },

  // --- APPOINTMENTS (CRM CARDS) ---
  getAppointments: async (): Promise<Appointment[]> => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*, clients(name), services(name)')
      .order('created_at', { ascending: false })
    
    if (error) return []
    return data.map(item => ({
      id: item.id,
      businessId: item.business_id,
      clientId: item.client_id,
      serviceId: item.service_id,
      professionalId: item.professional_id,
      status: item.status,
      date: item.date ? new Date(item.date) : undefined,
      notes: item.notes,
      aiSummary: item.ai_summary,
      createdAt: new Date(item.created_at),
      // Computed fields for UI convenience
      clientName: item.clients?.name,
      serviceName: item.services?.name
    }))
  },

  updateAppointmentStatus: async (id: string, status: string): Promise<boolean> => {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id)
    
    return !error
  }
}

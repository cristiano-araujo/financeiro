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

  updateBusiness: async (id: string, updates: Partial<Business>): Promise<boolean> => {
    const supabaseUpdates: any = {}
    if (updates.name) supabaseUpdates.name = updates.name
    if (updates.aiPersonality) supabaseUpdates.ai_personality = updates.aiPersonality
    if (updates.settings) supabaseUpdates.settings = updates.settings

    const { error } = await supabase
      .from('businesses')
      .update(supabaseUpdates)
      .eq('id', id)
    
    return !error
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
      startTime: item.start_time,
      endTime: item.end_time,
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
  },

  // --- DASHBOARD ---
  getDashboardStats: async () => {
    // 1. Get total leads (all appointments or clients)
    const { count: totalLeads } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })

    // 2. Get total revenue from completed appointments
    const { data: revenueData } = await supabase
      .from('appointments')
      .select('services(price)')
      .eq('status', 'completed')
    
    const totalRevenue = revenueData?.reduce((acc, curr: any) => acc + (curr.services?.price || 0), 0) || 0

    // 3. Get conversion rate (scheduled/completed vs total)
    const { count: convertedCount } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .in('status', ['scheduled', 'completed'])
    
    const { count: totalAppointments } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
    
    const conversionRate = totalAppointments ? Math.round((convertedCount! / totalAppointments) * 100) : 0

    return {
      totalLeads: totalLeads || 0,
      totalRevenue,
      conversionRate
    }
  },

  getWeeklyAppointments: async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select('created_at')
      .order('created_at', { ascending: true })

    if (error) return []

    // Map to days of the week (Seg, Ter, Qua, etc)
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    const counts: { [key: string]: number } = { 'Seg': 0, 'Ter': 0, 'Qua': 0, 'Qui': 0, 'Sex': 0, 'Sáb': 0, 'Dom': 0 }

    data.forEach(item => {
      const day = days[new Date(item.created_at).getDay()]
      counts[day]++
    })

    return Object.entries(counts).map(([name, agendamentos]) => ({ name, agendamentos }))
  }
}

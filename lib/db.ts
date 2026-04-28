import { Client, Service, Appointment, Professional, Business, Expense } from "./types"

// Mock Initial Data
const INITIAL_BUSINESS: Business = {
  id: "1",
  name: "Clínica & Bem Estar",
  type: "clinic",
  aiPersonality: "Beatriz, secretária educada e eficiente.",
  settings: {},
  createdAt: new Date(),
}

const INITIAL_SERVICES: Service[] = [
  { id: "s1", name: "Consulta Geral", description: "Avaliação inicial", price: 250, duration: 30, isActive: true, businessId: "1", createdAt: new Date() },
  { id: "s2", name: "Limpeza de Pele", description: "Tratamento facial", price: 180, duration: 60, isActive: true, businessId: "1", createdAt: new Date() },
]

const INITIAL_PROFESSIONALS: Professional[] = [
  { id: "p1", name: "Dra. Ana Paula", role: "Dermatologista", email: "ana@clinica.com", isActive: true, businessId: "1", createdAt: new Date() },
  { id: "p2", name: "Dra. Julia Costa", role: "Esteticista", email: "julia@clinica.com", isActive: true, businessId: "1", createdAt: new Date() },
]

const INITIAL_CLIENTS: Client[] = [
  { id: "c1", name: "João Silva", phone: "(11) 98888-1111", email: "joao@email.com", businessId: "1", createdAt: new Date(), aiSummary: "Cliente recorrente, prefere horários pela manhã." },
  { id: "c2", name: "Maria Oliveira", phone: "(11) 97777-2222", businessId: "1", createdAt: new Date(), aiSummary: "Interessada em tratamentos faciais." },
]

// Mock DB Service
export const db = {
  getBusiness: () => INITIAL_BUSINESS,
  
  getClients: (): Client[] => {
    if (typeof window === "undefined") return INITIAL_CLIENTS
    const saved = localStorage.getItem("aicrm_clients")
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS
  },
  
  saveClients: (clients: Client[]) => {
    localStorage.setItem("aicrm_clients", JSON.stringify(clients))
  },

  getServices: (): Service[] => {
    if (typeof window === "undefined") return INITIAL_SERVICES
    const saved = localStorage.getItem("aicrm_services")
    return saved ? JSON.parse(saved) : INITIAL_SERVICES
  },
  
  saveServices: (services: Service[]) => {
    localStorage.setItem("aicrm_services", JSON.stringify(services))
  },

  getAppointments: (): Appointment[] => {
    if (typeof window === "undefined") return []
    const saved = localStorage.getItem("aicrm_appointments")
    return saved ? JSON.parse(saved) : []
  },
  
  saveAppointments: (appointments: Appointment[]) => {
    localStorage.setItem("aicrm_appointments", JSON.stringify(appointments))
  },
}

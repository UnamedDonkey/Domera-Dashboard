"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Property = {
  id: string
  address: string
  type: string
  bedrooms: number
  bathrooms: number
  rent: number
  status: "occupied" | "vacant" | "maintenance"
  tenantName?: string
  leaseEnd?: string
  image?: string
}

export type MaintenanceRequest = {
  id: string
  propertyId: string
  propertyAddress: string
  issue: string
  issueType?: string
  status: "pending" | "in progress" | "completed"
  priority: "low" | "medium" | "high"
  dateSubmitted: string
  description: string
  assignedVendorId?: string
}

export type Tenant = {
  id: string
  name: string
  email: string
  phone: string
  propertyId: string
  propertyAddress: string
  leaseStart: string
  leaseEnd: string
  rentAmount: number
  paymentStatus: "paid" | "pending" | "overdue"
}

export type Message = {
  id: string
  sender: string
  content: string
  timestamp: string
  read: boolean
  avatar?: string
}

export type FavoriteVendor = {
  id: string
  name: string
  specialty: string
  phone: string
  email: string
  address: string
  rating: number
  notes?: string
  avatar?: string
}

type PropertyContextType = {
  properties: Property[]
  addProperty: (property: Omit<Property, "id">) => void
  totalProperties: number
  vacantProperties: number

  maintenanceRequests: MaintenanceRequest[]
  addMaintenanceRequest: (request: Omit<MaintenanceRequest, "id">) => void
  updateMaintenanceRequest: (id: string, updates: Partial<MaintenanceRequest>) => void
  totalMaintenanceRequests: number

  tenants: Tenant[]
  addTenant: (tenant: Omit<Tenant, "id">) => void
  totalTenants: number

  messages: Message[]
  addMessage: (message: Omit<Message, "id">) => void
  unreadMessages: number

  favoriteVendors: FavoriteVendor[]
  addFavoriteVendor: (vendor: Omit<FavoriteVendor, "id">) => void
  removeFavoriteVendor: (id: string) => void

  rentCollected: number
  rentPending: number
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined)

// Sample initial data
const initialProperties: Property[] = [
  {
    id: "p1",
    address: "123 Main St, Apt 4B",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    rent: 1200,
    status: "occupied",
    tenantName: "Sarah Johnson",
    leaseEnd: "2025-04-15",
  },
  {
    id: "p2",
    address: "456 Oak Ave, Unit 2",
    type: "Townhouse",
    bedrooms: 3,
    bathrooms: 2.5,
    rent: 1800,
    status: "occupied",
    tenantName: "Michael Brown",
    leaseEnd: "2025-04-30",
  },
  {
    id: "p3",
    address: "789 Pine St, Apt 7C",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 1,
    rent: 1100,
    status: "vacant",
  },
  {
    id: "p4",
    address: "321 Elm St, Unit 5",
    type: "Studio",
    bedrooms: 1,
    bathrooms: 1,
    rent: 950,
    status: "vacant",
  },
]

const initialMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: "m1",
    propertyId: "p1",
    propertyAddress: "123 Main St, Apt 4B",
    issue: "Leaking faucet",
    issueType: "Plumbing",
    status: "pending",
    priority: "medium",
    dateSubmitted: "2025-03-25",
    description: "Kitchen sink faucet is leaking at the base",
  },
  {
    id: "m2",
    propertyId: "p2",
    propertyAddress: "456 Oak Ave, Unit 2",
    issue: "HVAC not working",
    issueType: "HVAC",
    status: "in progress",
    priority: "high",
    dateSubmitted: "2025-03-23",
    description: "AC is not cooling properly, temperature stays high",
  },
  {
    id: "m3",
    propertyId: "p3",
    propertyAddress: "789 Pine St, Apt 7C",
    issue: "Broken window",
    issueType: "Structural",
    status: "pending",
    priority: "high",
    dateSubmitted: "2025-03-24",
    description: "Living room window has a crack and needs replacement",
  },
]

const initialTenants: Tenant[] = [
  {
    id: "t1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "555-123-4567",
    propertyId: "p1",
    propertyAddress: "123 Main St, Apt 4B",
    leaseStart: "2024-04-15",
    leaseEnd: "2025-04-15",
    rentAmount: 1200,
    paymentStatus: "paid",
  },
  {
    id: "t2",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "555-987-6543",
    propertyId: "p2",
    propertyAddress: "456 Oak Ave, Unit 2",
    leaseStart: "2024-04-30",
    leaseEnd: "2025-04-30",
    rentAmount: 1800,
    paymentStatus: "pending",
  },
]

const initialMessages: Message[] = [
  {
    id: "msg1",
    sender: "Jane Doe",
    content: "Question about parking space availability in the building.",
    timestamp: "2025-03-29T10:30:00",
    read: false,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "msg2",
    sender: "Robert Wilson",
    content: "When will the plumber arrive to fix the issue?",
    timestamp: "2025-03-28T16:15:00",
    read: false,
    avatar: "/placeholder-user.jpg",
  },
]

const initialFavoriteVendors: FavoriteVendor[] = [
  {
    id: "v1",
    name: "Mike's Plumbing",
    specialty: "Plumbing",
    phone: "555-123-7890",
    email: "mike@mikesplumbing.com",
    address: "234 Water St, Anytown, USA",
    rating: 4.8,
    notes: "Great service, always on time",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "v2",
    name: "Elite HVAC Services",
    specialty: "HVAC",
    phone: "555-456-7890",
    email: "info@elitehvac.com",
    address: "567 Cool Ave, Anytown, USA",
    rating: 4.7,
    notes: "Best AC repair in town",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "v3",
    name: "Bright Electric",
    specialty: "Electrical",
    phone: "555-789-1234",
    email: "service@brightelectric.com",
    address: "890 Power Blvd, Anytown, USA",
    rating: 4.9,
    notes: "Licensed and insured, 24/7 emergency service",
    avatar: "/placeholder-user.jpg",
  },
]

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(initialProperties)
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>(initialMaintenanceRequests)
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [favoriteVendors, setFavoriteVendors] = useState<FavoriteVendor[]>(initialFavoriteVendors)

  // Property functions
  const addProperty = (property: Omit<Property, "id">) => {
    const newProperty = {
      ...property,
      id: `p${properties.length + 1}`,
    }
    setProperties([...properties, newProperty])
  }

  // Maintenance functions
  const addMaintenanceRequest = (request: Omit<MaintenanceRequest, "id">) => {
    const newRequest = {
      ...request,
      id: `m${maintenanceRequests.length + 1}`,
    }
    setMaintenanceRequests([...maintenanceRequests, newRequest])
  }

  const updateMaintenanceRequest = (id: string, updates: Partial<MaintenanceRequest>) => {
    setMaintenanceRequests(
      maintenanceRequests.map((request) => (request.id === id ? { ...request, ...updates } : request)),
    )
  }

  // Tenant functions
  const addTenant = (tenant: Omit<Tenant, "id">) => {
    const newTenant = {
      ...tenant,
      id: `t${tenants.length + 1}`,
    }
    setTenants([...tenants, newTenant])

    // Update property status to occupied
    setProperties(
      properties.map((property) =>
        property.id === tenant.propertyId
          ? {
              ...property,
              status: "occupied" as const,
              tenantName: tenant.name,
              leaseEnd: tenant.leaseEnd,
            }
          : property,
      ),
    )
  }

  // Message functions
  const addMessage = (message: Omit<Message, "id">) => {
    const newMessage = {
      ...message,
      id: `msg${messages.length + 1}`,
    }
    setMessages([...messages, newMessage])
  }

  // Vendor functions
  const addFavoriteVendor = (vendor: Omit<FavoriteVendor, "id">) => {
    const newVendor = {
      ...vendor,
      id: `v${favoriteVendors.length + 1}`,
    }
    setFavoriteVendors([...favoriteVendors, newVendor])
  }

  const removeFavoriteVendor = (id: string) => {
    setFavoriteVendors(favoriteVendors.filter((vendor) => vendor.id !== id))
  }

  // Calculated values
  const totalProperties = properties.length
  const vacantProperties = properties.filter((p) => p.status === "vacant").length
  const totalMaintenanceRequests = maintenanceRequests.length
  const totalTenants = tenants.length
  const unreadMessages = messages.filter((m) => !m.read).length

  // Calculate rent collected and pending
  const totalRent = tenants.reduce((sum, tenant) => sum + tenant.rentAmount, 0)
  const rentCollected = tenants
    .filter((t) => t.paymentStatus === "paid")
    .reduce((sum, tenant) => sum + tenant.rentAmount, 0)
  const rentPending = totalRent - rentCollected

  const value = {
    properties,
    addProperty,
    totalProperties,
    vacantProperties,

    maintenanceRequests,
    addMaintenanceRequest,
    updateMaintenanceRequest,
    totalMaintenanceRequests,

    tenants,
    addTenant,
    totalTenants,

    messages,
    addMessage,
    unreadMessages,

    favoriteVendors,
    addFavoriteVendor,
    removeFavoriteVendor,

    rentCollected,
    rentPending,
  }

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>
}

export function usePropertyContext() {
  const context = useContext(PropertyContext)
  if (context === undefined) {
    throw new Error("usePropertyContext must be used within a PropertyProvider")
  }
  return context
}


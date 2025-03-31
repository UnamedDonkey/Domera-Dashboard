"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Building, Calendar, CreditCard, MessageSquare, PenToolIcon as Tool, PieChart, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { usePropertyContext } from "@/context/property-context"

// Mini chart component for revenue
const MiniRevenueChart = ({ data }: { data: number[] }) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  return (
    <div className="flex h-10 items-end gap-1">
      {data.map((value, index) => {
        const height = ((value - min) / range) * 100
        return (
          <div
            key={index}
            className="w-1.5 bg-gradient-to-t from-green-500 to-green-300 rounded-t-sm"
            style={{ height: `${Math.max(10, height)}%` }}
          />
        )
      })}
    </div>
  )
}

export default function Dashboard() {
  const [user, setUser] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder-user.jpg",
  })

  // Sample revenue data for the mini chart
  const revenueHistory = [18500, 19200, 20100, 19800, 21500, 22800, 24580]

  const {
    properties,
    totalProperties,
    vacantProperties,
    maintenanceRequests,
    totalMaintenanceRequests,
    tenants,
    totalTenants,
    messages,
    unreadMessages,
    rentCollected,
    rentPending,
  } = usePropertyContext()

  // Calculate rent collection percentage
  const totalRent = rentCollected + rentPending
  const collectedPercentage = totalRent > 0 ? Math.round((rentCollected / totalRent) * 100) : 0
  const pendingPercentage = totalRent > 0 ? Math.round((rentPending / totalRent) * 100) : 0

  // Get pending maintenance requests
  const pendingRequests = maintenanceRequests.filter((req) => req.status === "pending").length
  const inProgressRequests = maintenanceRequests.filter((req) => req.status === "in progress").length

  // Get upcoming lease renewals
  const upcomingLeases = properties
    .filter((p) => p.status === "occupied" && p.leaseEnd)
    .sort((a, b) => new Date(a.leaseEnd!).getTime() - new Date(b.leaseEnd!).getTime())
    .slice(0, 2)

  // Get vacant properties
  const vacantPropertyList = properties.filter((p) => p.status === "vacant").slice(0, 2)

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Hello, {user.name}</h1>
        <Button className="ml-auto" size="sm" asChild>
          <Link href="/properties/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card className="shadow-md border border-border/40 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalProperties}</div>
            <p className="text-xs text-muted-foreground">{vacantProperties} vacant properties</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border border-border/40 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tenants</CardTitle>
            <Users className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalTenants}</div>
            <p className="text-xs text-muted-foreground">{totalProperties - vacantProperties} occupied units</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border border-border/40 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Requests</CardTitle>
            <Tool className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalMaintenanceRequests}</div>
            <p className="text-xs text-muted-foreground">
              {pendingRequests} pending, {inProgressRequests} in progress
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-md border border-border/40 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className={`text-3xl font-bold ${totalRent >= 0 ? "text-green-600" : "text-red-600"}`}>
                ${totalRent.toLocaleString()}
              </div>
              <MiniRevenueChart data={revenueHistory} />
            </div>
            <p className="text-xs text-muted-foreground">{collectedPercentage}% collected</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
        <Card className="lg:col-span-4 shadow-md border border-border/40 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader>
            <CardTitle>Rent Collection Status</CardTitle>
            <CardDescription>March 2025 - {collectedPercentage}% collected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span>Collected</span>
                  </div>
                  <div>{collectedPercentage}%</div>
                </div>
                <Progress
                  value={collectedPercentage}
                  className="h-3 rounded-full bg-muted/40 overflow-hidden"
                  indicatorClassName="bg-gradient-to-r from-amber-400 to-amber-600"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span>Pending</span>
                  </div>
                  <div>{pendingPercentage}%</div>
                </div>
                <Progress
                  value={pendingPercentage}
                  className="h-3 rounded-full bg-muted/40 overflow-hidden"
                  indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/finances">
                <PieChart className="mr-2 h-4 w-4" />
                View Detailed Report
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="lg:col-span-3 shadow-md border border-border/40 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader>
            <CardTitle>Recent Maintenance Requests</CardTitle>
            <CardDescription>You have {totalMaintenanceRequests} open maintenance requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceRequests.slice(0, 3).map((request) => (
                <div key={request.id} className="flex items-center gap-4">
                  <div className="rounded-full bg-amber-500/10 p-2">
                    <Tool className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{request.issue}</p>
                    <p className="text-sm text-muted-foreground">{request.propertyAddress}</p>
                  </div>
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      request.status === "pending"
                        ? "bg-amber-500/10 text-amber-500"
                        : request.status === "in progress"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-green-500/10 text-green-500"
                    }`}
                  >
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/maintenance">
                <Tool className="mr-2 h-4 w-4" />
                View All Requests
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Card className="shadow-md border border-border/40 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader>
            <CardTitle>Upcoming Lease Renewals</CardTitle>
            <CardDescription>You have {upcomingLeases.length} leases expiring soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingLeases.map((property) => (
                <div key={property.id} className="flex items-center gap-4">
                  <div className="rounded-full bg-amber-500/10 p-2">
                    <Calendar className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{property.tenantName}</p>
                    <p className="text-sm text-muted-foreground">{property.address}</p>
                    <p className="text-xs text-muted-foreground">
                      Expires:{" "}
                      {new Date(property.leaseEnd!).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Renew
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/calendar">
                <Calendar className="mr-2 h-4 w-4" />
                View All Leases
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="shadow-md border border-border/40 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>You have {unreadMessages} unread messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.slice(0, 2).map((message) => (
                <div key={message.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 flex-shrink-0 mt-1">
                    <AvatarImage src={message.avatar || "/placeholder-user.jpg"} alt="Avatar" />
                    <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none truncate">{message.sender}</p>
                      <p className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                        {new Date(message.timestamp).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {message.content.length > 60 ? `${message.content.substring(0, 60)}...` : message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              View All Messages
            </Button>
          </CardFooter>
        </Card>
        <Card className="shadow-md border border-border/40 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader>
            <CardTitle>Vacant Properties</CardTitle>
            <CardDescription>You have {vacantProperties} vacant properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vacantPropertyList.map((property) => (
                <div key={property.id} className="flex items-center gap-4">
                  <div className="rounded-full bg-amber-500/10 p-2">
                    <Building className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{property.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {property.bedrooms} bed, {property.bathrooms} bath
                    </p>
                    <p className="text-xs text-muted-foreground">Rent: ${property.rent}/month</p>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/tenants/add?propertyId=${property.id}`}>List</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/properties">
                <Building className="mr-2 h-4 w-4" />
                View All Properties
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}


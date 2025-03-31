"use client"

import { FileText, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePropertyContext } from "@/context/property-context"

export default function LeasesPage() {
  const { tenants, properties } = usePropertyContext()

  // Get active leases from tenants
  const activeLeases = tenants.map((tenant) => {
    const property = properties.find((p) => p.id === tenant.propertyId)
    return {
      id: tenant.id,
      tenantName: tenant.name,
      propertyAddress: tenant.propertyAddress,
      leaseStart: tenant.leaseStart,
      leaseEnd: tenant.leaseEnd,
      rentAmount: tenant.rentAmount,
      propertyType: property?.type || "Unknown",
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lease Generation</h1>
          <p className="text-muted-foreground">Create and manage lease agreements</p>
        </div>
        <Button asChild>
          <Link href="/leases/create">
            <Plus className="mr-2 h-4 w-4" />
            Create New Lease
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {activeLeases.length > 0 ? (
          activeLeases.map((lease) => (
            <Card
              key={lease.id}
              className="shadow-md border border-border/40 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{lease.tenantName}</CardTitle>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <CardDescription>
                  {lease.propertyAddress} • {lease.propertyType}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lease Start:</span>
                    <span className="font-medium">
                      {new Date(lease.leaseStart).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lease End:</span>
                    <span className="font-medium">
                      {new Date(lease.leaseEnd).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Rent:</span>
                    <span className="font-medium">${lease.rentAmount}/month</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  View Lease
                </Button>
                <Button size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="rounded-full bg-muted p-3 mb-4">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No leases found</h3>
              <p className="text-center text-muted-foreground mb-4">You haven't created any lease agreements yet.</p>
              <Button asChild>
                <Link href="/leases/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Lease
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}


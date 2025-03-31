"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePropertyContext } from "@/context/property-context"

export default function AddTenantPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const propertyIdParam = searchParams.get("propertyId")

  const { properties, addTenant } = usePropertyContext()
  const vacantProperties = properties.filter((p) => p.status === "vacant")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyId: propertyIdParam || "",
    leaseStart: new Date().toISOString().split("T")[0],
    leaseEnd: "",
    rentAmount: "",
    paymentStatus: "pending",
  })

  useEffect(() => {
    if (propertyIdParam) {
      const property = properties.find((p) => p.id === propertyIdParam)
      if (property) {
        setFormData((prev) => ({
          ...prev,
          propertyId: propertyIdParam,
          rentAmount: property.rent.toString(),
        }))
      }
    }
  }, [propertyIdParam, properties])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Update rent amount when property changes
    if (name === "propertyId") {
      const property = properties.find((p) => p.id === value)
      if (property) {
        setFormData((prev) => ({ ...prev, rentAmount: property.rent.toString() }))
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addTenant({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      propertyId: formData.propertyId,
      propertyAddress: properties.find((p) => p.id === formData.propertyId)?.address || "",
      leaseStart: formData.leaseStart,
      leaseEnd: formData.leaseEnd,
      rentAmount: Number.parseFloat(formData.rentAmount),
      paymentStatus: formData.paymentStatus as "paid" | "pending" | "overdue",
    })

    router.push("/tenants")
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Tenant</h1>
        <p className="text-muted-foreground">Enter tenant and lease information</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Tenant Information</CardTitle>
            <CardDescription>Enter the tenant's personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="555-123-4567"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyId">Property</Label>
              <Select
                value={formData.propertyId}
                onValueChange={(value) => handleSelectChange("propertyId", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  {vacantProperties.map((property) => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.address} - ${property.rent}/month
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="leaseStart">Lease Start Date</Label>
                <Input
                  id="leaseStart"
                  name="leaseStart"
                  type="date"
                  value={formData.leaseStart}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leaseEnd">Lease End Date</Label>
                <Input
                  id="leaseEnd"
                  name="leaseEnd"
                  type="date"
                  value={formData.leaseEnd}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rentAmount">Monthly Rent ($)</Label>
              <Input
                id="rentAmount"
                name="rentAmount"
                type="number"
                min="0"
                value={formData.rentAmount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select
                value={formData.paymentStatus}
                onValueChange={(value) => handleSelectChange("paymentStatus", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">
              <Users className="mr-2 h-4 w-4" />
              Add Tenant
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}


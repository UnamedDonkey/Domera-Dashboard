"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Star, Plus, Trash2, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { usePropertyContext } from "@/context/property-context"
import { useToast } from "@/hooks/use-toast"

// Mock search results for vendors
const searchResults = [
  {
    id: "sr1",
    name: "Johnson Plumbing & Heating",
    specialty: "Plumbing",
    rating: 4.8,
    reviews: 156,
    phone: "555-123-4567",
    email: "info@johnsonplumbing.com",
    address: "123 Pipe St, Anytown, USA",
    distance: "1.2 miles",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "sr2",
    name: "Ace Electric",
    specialty: "Electrical",
    rating: 4.9,
    reviews: 203,
    phone: "555-987-6543",
    email: "service@aceelectric.com",
    address: "456 Volt Ave, Anytown, USA",
    distance: "2.3 miles",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "sr3",
    name: "Cool Breeze HVAC",
    specialty: "HVAC",
    rating: 4.7,
    reviews: 178,
    phone: "555-456-7890",
    email: "info@coolbreeze.com",
    address: "789 Air Blvd, Anytown, USA",
    distance: "3.1 miles",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "sr4",
    name: "Handy Home Repairs",
    specialty: "General",
    rating: 4.6,
    reviews: 142,
    phone: "555-234-5678",
    email: "repairs@handyhome.com",
    address: "321 Fix St, Anytown, USA",
    distance: "1.8 miles",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "sr5",
    name: "Pest Be Gone",
    specialty: "Pest Control",
    rating: 4.5,
    reviews: 98,
    phone: "555-876-5432",
    email: "info@pestbegone.com",
    address: "654 Bug Lane, Anytown, USA",
    distance: "4.2 miles",
    avatar: "/placeholder-user.jpg",
  },
]

export default function FavoriteVendorsPage() {
  const router = useRouter()
  const { favoriteVendors, addFavoriteVendor, removeFavoriteVendor } = usePropertyContext()
  const { toast } = useToast()

  const [searchQuery, setSearchQuery] = useState("")
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [filteredResults, setFilteredResults] = useState(searchResults)
  const [addVendorDialogOpen, setAddVendorDialogOpen] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState<(typeof searchResults)[0] | null>(null)

  const [newVendorForm, setNewVendorForm] = useState({
    name: "",
    specialty: "General",
    phone: "",
    email: "",
    address: "",
    notes: "",
  })

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredResults(searchResults)
    } else {
      const query = searchQuery.toLowerCase()
      const results = searchResults.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(query) ||
          vendor.specialty.toLowerCase().includes(query) ||
          vendor.address.toLowerCase().includes(query),
      )
      setFilteredResults(results)
    }
    setSearchPerformed(true)
  }

  const handleAddToFavorites = (vendor: (typeof searchResults)[0]) => {
    // Check if vendor is already in favorites
    const isAlreadyFavorite = favoriteVendors.some((v) => v.name === vendor.name && v.phone === vendor.phone)

    if (isAlreadyFavorite) {
      toast({
        title: "Already in favorites",
        description: `${vendor.name} is already in your favorite vendors.`,
      })
      return
    }

    addFavoriteVendor({
      name: vendor.name,
      specialty: vendor.specialty,
      phone: vendor.phone,
      email: vendor.email,
      address: vendor.address,
      rating: vendor.rating,
      avatar: vendor.avatar,
    })

    toast({
      title: "Added to favorites",
      description: `${vendor.name} has been added to your favorite vendors.`,
    })
  }

  const handleRemoveFromFavorites = (id: string) => {
    const vendor = favoriteVendors.find((v) => v.id === id)
    if (!vendor) return

    removeFavoriteVendor(id)

    toast({
      title: "Removed from favorites",
      description: `${vendor.name} has been removed from your favorite vendors.`,
    })
  }

  const handleManualAdd = () => {
    setSelectedVendor(null)
    setNewVendorForm({
      name: "",
      specialty: "General",
      phone: "",
      email: "",
      address: "",
      notes: "",
    })
    setAddVendorDialogOpen(true)
  }

  const handleVendorFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewVendorForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewVendorForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddVendorSubmit = () => {
    if (selectedVendor) {
      handleAddToFavorites(selectedVendor)
    } else {
      // Add manually entered vendor
      addFavoriteVendor({
        name: newVendorForm.name,
        specialty: newVendorForm.specialty,
        phone: newVendorForm.phone,
        email: newVendorForm.email,
        address: newVendorForm.address,
        notes: newVendorForm.notes,
        rating: 5.0, // Default rating for manually added vendors
      })

      toast({
        title: "Vendor added",
        description: `${newVendorForm.name} has been added to your favorite vendors.`,
      })
    }

    setAddVendorDialogOpen(false)
  }

  const prepopulateVendorForm = (vendor: (typeof searchResults)[0]) => {
    setSelectedVendor(vendor)
    setNewVendorForm({
      name: vendor.name,
      specialty: vendor.specialty,
      phone: vendor.phone,
      email: vendor.email,
      address: vendor.address,
      notes: "",
    })
    setAddVendorDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Favorite Vendors</h1>
          <p className="text-muted-foreground">Manage your preferred maintenance vendors</p>
        </div>
        <Button onClick={handleManualAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Vendor
        </Button>
      </div>

      <Tabs defaultValue="favorites" className="space-y-4">
        <TabsList>
          <TabsTrigger value="favorites">My Favorites</TabsTrigger>
          <TabsTrigger value="search">Find Vendors</TabsTrigger>
        </TabsList>

        <TabsContent value="favorites" className="space-y-4">
          {favoriteVendors.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Star className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No favorite vendors yet</h3>
                <p className="text-center text-muted-foreground mb-4">
                  You haven't added any favorite vendors yet. Search for vendors or add them manually.
                </p>
                <Button variant="outline" onClick={() => document.querySelector('[data-value="search"]')?.click()}>
                  <Search className="mr-2 h-4 w-4" />
                  Find Vendors
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {favoriteVendors.map((vendor) => (
                <Card key={vendor.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={vendor.avatar || "/placeholder-user.jpg"} alt={vendor.name} />
                          <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{vendor.name}</CardTitle>
                          <CardDescription>{vendor.specialty} Specialist</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {vendor.rating}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{vendor.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{vendor.email}</span>
                      </div>
                      {vendor.notes && <div className="mt-2 text-muted-foreground italic">"{vendor.notes}"</div>}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button size="sm" variant="outline">
                      <Phone className="mr-2 h-3.5 w-3.5" />
                      Contact
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleRemoveFromFavorites(vendor.id)}
                    >
                      <Trash2 className="mr-2 h-3.5 w-3.5" />
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="search" className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search for vendors by name, specialty, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>

          {searchPerformed && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{filteredResults.length} vendors found</h3>

              <div className="grid gap-4 md:grid-cols-2">
                {filteredResults.map((vendor) => (
                  <Card key={vendor.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={vendor.avatar} alt={vendor.name} />
                            <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-base">{vendor.name}</CardTitle>
                            <CardDescription>
                              {vendor.specialty} • {vendor.distance}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {vendor.rating} ({vendor.reviews})
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{vendor.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{vendor.email}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button size="sm" variant="outline">
                        <Phone className="mr-2 h-3.5 w-3.5" />
                        Contact
                      </Button>
                      <Button size="sm" onClick={() => prepopulateVendorForm(vendor)}>
                        <Plus className="mr-2 h-3.5 w-3.5" />
                        Add to Favorites
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={addVendorDialogOpen} onOpenChange={setAddVendorDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedVendor ? `Add ${selectedVendor.name} to Favorites` : "Add New Vendor"}</DialogTitle>
            <DialogDescription>
              {selectedVendor
                ? "Review and add this vendor to your favorites"
                : "Enter the details of the vendor you want to add"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Vendor Name</Label>
              <Input id="name" name="name" value={newVendorForm.name} onChange={handleVendorFormChange} required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Select value={newVendorForm.specialty} onValueChange={(value) => handleSelectChange("specialty", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                  <SelectItem value="Electrical">Electrical</SelectItem>
                  <SelectItem value="HVAC">HVAC</SelectItem>
                  <SelectItem value="General">General Repairs</SelectItem>
                  <SelectItem value="Pest Control">Pest Control</SelectItem>
                  <SelectItem value="Landscaping">Landscaping</SelectItem>
                  <SelectItem value="Cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" value={newVendorForm.phone} onChange={handleVendorFormChange} required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={newVendorForm.email}
                  onChange={handleVendorFormChange}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={newVendorForm.address} onChange={handleVendorFormChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="Add any notes about this vendor..."
                value={newVendorForm.notes}
                onChange={handleVendorFormChange}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddVendorSubmit}>
              <Plus className="mr-2 h-4 w-4" />
              Add to Favorites
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


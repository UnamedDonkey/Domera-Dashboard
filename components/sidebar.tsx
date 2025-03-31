"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Bell,
  Building,
  Calendar,
  CreditCard,
  FileText,
  Home,
  Menu,
  PenToolIcon as Tool,
  Settings,
  User,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Sidebar() {
  const pathname = usePathname()
  const [user, setUser] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    avatar: "/placeholder-user.jpg",
  })

  const routes = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Properties", path: "/properties", icon: Building },
    { name: "Tenants", path: "/tenants", icon: Users },
    { name: "Maintenance Requests", path: "/maintenance", icon: Tool },
    { name: "Lease Generation", path: "/leases", icon: FileText },
    { name: "Finances", path: "/finances", icon: CreditCard },
    { name: "Documents", path: "/documents", icon: FileText },
    { name: "Calendar", path: "/calendar", icon: Calendar },
    { name: "Settings", path: "/settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden absolute top-4 left-4">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <nav className="grid gap-2 text-lg font-medium">
            <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
              <Building className="h-5 w-5" />
              <span>PropertyPro</span>
            </Link>
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                  pathname === route.path
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                <route.icon className="h-5 w-5" />
                {route.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <div className="flex items-center gap-4 pt-4 mt-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden border-r bg-muted/40 md:block">
        <nav className="grid gap-2 p-4 text-sm">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                pathname === route.path
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <route.icon className="h-4 w-4" />
              {route.name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-4 border-t">
          <div className="flex items-center gap-2">
            <Avatar className="flex-shrink-0">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <Button variant="ghost" size="icon" className="flex-shrink-0 h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}


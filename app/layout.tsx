import type React from "react"
import { Building } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { PropertyProvider } from "@/context/property-context"
import "@/app/globals.css"

export const metadata = {
  title: "PropertyPro - Landlord Dashboard",
  description: "Manage your properties, tenants, and more",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PropertyProvider>
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold md:text-xl">
                  <Building className="h-5 w-5" />
                  <span>PropertyPro</span>
                </Link>
              </header>
              <div className="grid flex-1 md:grid-cols-[240px_1fr]">
                <Sidebar />
                <main className="flex flex-1 flex-col p-4 md:p-8">{children}</main>
              </div>
            </div>
          </PropertyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
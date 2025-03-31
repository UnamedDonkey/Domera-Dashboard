import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <Settings className="h-16 w-16 mb-4 text-primary" />
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground mt-2">Manage your account settings here</p>
    </div>
  )
}


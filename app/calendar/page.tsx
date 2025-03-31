import { CalendarIcon } from "lucide-react"

export default function CalendarPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <CalendarIcon className="h-16 w-16 mb-4 text-primary" />
      <h1 className="text-3xl font-bold">Calendar</h1>
      <p className="text-muted-foreground mt-2">View your schedule here</p>
    </div>
  )
}


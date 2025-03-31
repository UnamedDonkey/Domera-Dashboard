import { FileText } from "lucide-react"

export default function DocumentsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <FileText className="h-16 w-16 mb-4 text-primary" />
      <h1 className="text-3xl font-bold">Documents</h1>
      <p className="text-muted-foreground mt-2">Manage your documents here</p>
    </div>
  )
}


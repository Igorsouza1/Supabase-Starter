import { AlertCircle, CheckCircle } from "lucide-react"

export type Message = {
  type: "error" | "success"
  text: string
} | null

export function FormMessage({ message }: { message: Message }) {
  if (!message) return null

  if (message.type === "error") {
    return (
      <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-800">
        <AlertCircle className="h-4 w-4 flex-shrink-0" />
        <span>{message.text}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-800">
      <CheckCircle className="h-4 w-4 flex-shrink-0" />
      <span>{message.text}</span>
    </div>
  )
}


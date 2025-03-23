import { redirect } from "next/navigation"

export type Message = {
  type: "error" | "success"
  text: string
} | null

export function encodedRedirect(type: "error" | "success", path: string, message: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("type", type)
  searchParams.set("message", message)
  return redirect(`${path}?${searchParams.toString()}`)
}

export function decodeMessage(searchParams: {
  [key: string]: string | string[] | undefined
}): Message {
  const typeValue = searchParams.type
  const messageValue = searchParams.message

  const typeString = Array.isArray(typeValue) ? typeValue[0] : (typeValue as string | undefined)

  const messageString = Array.isArray(messageValue) ? messageValue[0] : (messageValue as string | undefined)

  if (!typeString || !messageString) {
    return null
  }

  if (typeString !== "error" && typeString !== "success") {
    return null
  }

  return {
    type: typeString,
    text: messageString,
  }
}


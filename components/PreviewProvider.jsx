"use client"

import LiveQueryProvider from "next-sanity/preview"
import { suspend } from "suspend-react"

// suspend-react cache is global, so we use a unique key to avoid collisions
const UniqueKey = Symbol("@/lib/sanity.client")

export default function PreviewProvider({ children, token }) {
  const { client } = suspend(() => import("@/lib/sanity.client"), [UniqueKey])
  if (!token) throw new TypeError("Missing token")
  return (
    <LiveQueryProvider client={client} token={token} logger={console}>
      {children}
    </LiveQueryProvider>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GraduationCap, Loader2 } from "lucide-react"
import { loginAdmin } from "@/lib/actions"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const result = await loginAdmin(formData)

    if (result.success) {
      router.push("/dashboard")
      router.refresh()
    } else {
      setError(result.error || "Login failed")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-50/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-navy-950 flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-heading">DocVerse Admin</CardTitle>
          <CardDescription>Sign in to access the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="admin@docverse.in" defaultValue="admin@docverse.in" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" defaultValue="admin123" required />
            </div>
            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>
            )}
            <Button type="submit" className="w-full bg-navy-950 hover:bg-navy-900" disabled={isLoading}>
              {isLoading ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Signing in...</> : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p>Default: admin@docverse.in / admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

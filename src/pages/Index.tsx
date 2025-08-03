import React from 'react'
import { useAuth } from "@/components/auth/AuthProvider"
import AdminLogin from "@/components/auth/AdminLogin"
import AdminDashboard from "@/components/admin/AdminDashboard"
import MedicalHero from "@/components/MedicalHero"

const Index = () => {
  const { user, loading, isAdmin } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Show admin dashboard if user is logged in and is admin
  if (user && isAdmin) {
    return <AdminDashboard />
  }

  // Show login if user is logged in but not admin
  if (user && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You don't have admin privileges.</p>
        </div>
      </div>
    )
  }

  // Check if accessing admin route
  if (window.location.pathname === '/admin' || window.location.search.includes('admin')) {
    return <AdminLogin />
  }

  // Show main medical website
  return (
    <div className="min-h-screen">
      <MedicalHero />
      
      {/* Footer */}
      <footer className="bg-foreground text-background py-8 px-4">
        <div className="max-w-6xl mx-auto text-center" dir="rtl">
          <p className="text-sm opacity-80">© 2025 כל הזכויות שמורות לקשב פלוס</p>
        </div>
      </footer>
    </div>
  )
}

export default Index

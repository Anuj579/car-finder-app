"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CarFront, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import ThemeToggle from "./ThemeToggle"

export default function Navbar() {
  const [wishlistCount, setWishlistCount] = useState(2)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Get initial wishlist count
    const storedWishlist = localStorage.getItem("carWishlist")
    if (storedWishlist) {
      setWishlistCount(JSON.parse(storedWishlist).length)
    }

    // Listen for storage events to update wishlist count
    const handleStorageChange = () => {
      const storedWishlist = localStorage.getItem("carWishlist")
      if (storedWishlist) {
        setWishlistCount(JSON.parse(storedWishlist).length)
      } else {
        setWishlistCount(0)
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Custom event for same-tab updates
    window.addEventListener("wishlistUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("wishlistUpdated", handleStorageChange)
    }
  }, [])

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold flex items-center gap-1">
            <CarFront size={26} />
            CarFinder
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/wishlist" className="relative">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            {isMounted && wishlistCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-500 text-white">
                {wishlistCount}
              </Badge>
            )}
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

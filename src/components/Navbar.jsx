"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CarFront, Heart, Menu } from "lucide-react"
import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import ThemeToggle from "./ThemeToggle"
import { SheetTitle } from "./ui/sheet"

export default function Navbar() {
  const [wishlistCount, setWishlistCount] = useState(5)
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

  const links = [
    { href: "/", label: "Home" },
    { href: "/wishlist", label: "Wishlist" },
  ]

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold flex items-center gap-1">
            <CarFront size={26}/>
            CarFinder
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/wishlist" className="relative">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            {isMounted && wishlistCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                {wishlistCount}
              </Badge>
            )}
          </Link>

          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetTitle className='sr-only'>Menu</SheetTitle>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

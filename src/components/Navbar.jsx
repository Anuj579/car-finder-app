"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CarFront, Heart } from "lucide-react"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import ThemeToggle from "./ThemeToggle"
import { getWishlist } from "@/utils/wishlist"

export default function Navbar() {
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    setWishlistCount(getWishlist().length);

    const update = () => setWishlistCount(getWishlist().length);

    window.addEventListener("wishlist-updated", update);
    return () => window.removeEventListener("wishlist-updated", update);
  }, []);

  return (
    <header className="border-b sticky top-0 bg-background/80 backdrop-blur-md z-10 shadow-sm">
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
            {wishlistCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center rounded-full ">
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

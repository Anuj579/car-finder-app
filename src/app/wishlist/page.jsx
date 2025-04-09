"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Load wishlist from localStorage
        const storedWishlist = localStorage.getItem("carWishlist")
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist))
        }
        setIsLoading(false)
    }, [])

    const removeFromWishlist = (carId) => {
        const updatedWishlist = wishlist.filter((car) => car.id !== carId)
        setWishlist(updatedWishlist)
        localStorage.setItem("carWishlist", JSON.stringify(updatedWishlist))

    }

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className=" mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Your Wishlist</h1>
                    <p className="text-muted-foreground mt-1">
                        {wishlist.length} {wishlist.length === 1 ? "car" : "cars"} saved
                    </p>
                </div>
            </div>

            <hr className="my-6" />

            {wishlist.length === 0 ? (
                <div className="text-center py-12">
                    <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
                    <p className="text-muted-foreground mb-6">Start adding cars to your wishlist to save them for later.</p>
                    <Link href="/">
                        <Button>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Browse Cars
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((car) => (
                        <Card key={car.id} className="overflow-hidden">
                            <div className="relative aspect-video">
                                <Image
                                    src={car.image || "/placeholder.svg?height=300&width=500"}
                                    alt={car.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-lg">{car.name}</h3>
                                        <p className="text-sm text-muted-foreground">{car.brand}</p>
                                    </div>
                                    <Badge>${car.price?.toLocaleString()}</Badge>
                                </div>
                                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{car.fuelType}</span>
                                    <span>•</span>
                                    <span>{car.seatingCapacity} Seats</span>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 flex justify-between">
                                <Link href={`/cars/${car.id}`}>
                                    <Button variant="outline" size="sm">
                                        View Details
                                    </Button>
                                </Link>
                                <Button variant="ghost" size="icon" onClick={() => removeFromWishlist(car.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

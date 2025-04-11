"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import CarCard from "@/components/CarCard"
import { getWishlist, saveWishlist } from "@/utils/wishlist"
import toast, { Toaster } from "react-hot-toast"

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState([]);

    const removeFromWishlist = (carId) => {
        const updated = wishlist.filter(c => c.id !== carId);
        saveWishlist(updated);
        toast.success("Removed from wishlist ");
    };

    useEffect(() => {
        setWishlist(getWishlist());
        const update = () => setWishlist(getWishlist());

        window.addEventListener("wishlist-updated", update);
        return () => window.removeEventListener("wishlist-updated", update);
    }, [])

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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlist.map((car) => (
                        <div key={car.id}>
                            <CarCard car={car} showWishlistIcon={false} removeFromWishlist={removeFromWishlist} removeFromWishlistBtn={true} />
                        </div>
                    ))}
                </div>
            )}
            <Toaster />
        </div>
    )
}

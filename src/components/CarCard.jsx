import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Fuel, Heart, Trash2, Users } from "lucide-react";

function CarCard({ car, wishlist, toggleWishlist, showWishlistIcon = true, removeFromWishlist, removeFromWishlistBtn }) {

    return (
        <Card key={car.id} className="overflow-hidden h-full flex flex-col">
            <div className="relative aspect-video">
                <img src={car.image} alt={car.name} className="object-cover" />
                {showWishlistIcon && <div className="absolute top-2 right-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-full bg-background/80 backdrop-blur-sm ${"text-muted-foreground hover:text-foreground"
                            }`}
                        onClick={() => toggleWishlist(car)}
                    >
                        <Heart className={`h-5 w-5 ${wishlist.some(c => c.id === car.id) ? 'fill-primary stroke-primary' : 'fill-none'}`} />
                    </Button>
                </div>}
            </div>
            <CardContent className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-semibold text-lg">{car.name}</h3>
                        <p className="text-sm text-muted-foreground">{car.brand}</p>
                    </div>
                    <Badge className="bg-green-200 text-green-800 hover:bg-green-200 focus:bg-green-100 dark:bg-green-100 dark:hover:bg-green-100">
                        ₹{car.price.toLocaleString("en-IN")}
                    </Badge>
                </div>
                <div className="mt-auto flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center">
                        <Fuel className="h-3 w-3 mr-1" />
                        {car.fuel}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {car.seating} Seats
                    </span>
                </div>
            </CardContent>
            {removeFromWishlistBtn && <CardFooter className="p-4 pt-0 flex justify-between mt-auto">
                <Button variant="outline" className='w-full' onClick={() => removeFromWishlist(car.id)}>
                    <Trash2 className="h-4 w-4 text-destructive mr-2" /> Remove from Wishlist
                </Button>
            </CardFooter>}
        </Card>
    )
}

export default CarCard
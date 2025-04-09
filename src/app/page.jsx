"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Fuel, Heart, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('/data/cars.json');
        const data = await res.json();
        setCars(data);
      } catch (err) {
        console.error('Error fetching cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )

  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Card key={car.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <img src={car.image} alt={car.name} className="object-cover" />
              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full bg-background/80 backdrop-blur-sm ${"text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{car.name}</h3>
                  <p className="text-sm text-muted-foreground">{car.brand}</p>
                </div>
                <Badge>₹{car.price.toLocaleString()}</Badge>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
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
            <CardFooter className="p-4 pt-0">
              <Link href={`/cars/${car.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

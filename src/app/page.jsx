"use client"

import CarCard from "@/components/CarCard";
import FilterSidebar from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
    <div className="container mx-auto my-10 px-4 flex flex-col gap-y-4 md:gap-y-0 md:flex-row md:gap-x-6">
      <div className="w-full md:w-1/4 lg:w-1/5">
        <FilterSidebar />
      </div>
      <div className="w-full md:w-3/4 lg:w-4/5">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Find Your Perfect Car</h1>
          <p className="text-muted-foreground mt-1">Browse through our extensive collection of vehicles</p>
        </div>
        <form className="flex w-full items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by car name, model, or features..."
              // value={query}
              // onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
        <hr className="my-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car.id}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

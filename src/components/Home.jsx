"use client"

import CarCard from "./CarCard";
import FilterSidebar from "./FilterSidebar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getWishlist, saveWishlist } from "@/utils/wishlist";

import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function Home() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const searchParams = useSearchParams();
    const [sortOption, setSortOption] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const [wishlist, setWishlist] = useState([]);

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

    const sortCars = (cars) => {
        if (sortOption === "priceLowToHigh") {
            return [...cars].sort((a, b) => a.price - b.price);
        } else if (sortOption === "priceHighToLow") {
            return [...cars].sort((a, b) => b.price - a.price);
        } else {
            return cars;
        }
    };

    const brands = searchParams.get('brands')?.split(',') || [];
    const minPrice = parseInt(searchParams.get('minPrice') || '0');
    const maxPrice = parseInt(searchParams.get('maxPrice') || '4000000');
    const fuelTypes = searchParams.get('fuelTypes')?.split(',') || [];
    const seatings = searchParams.get('seatingCapacity')?.split(',') || [];
    const query = searchParams.get("q")?.toLowerCase() || "";

    const filteredCars = cars.filter((car) => {
        const matchesQuery =
            car.name.toLowerCase().includes(query) ||
            car.brand.toLowerCase().includes(query) ||
            car.model?.toLowerCase().includes(query) ||
            car.fuel.toLowerCase().includes(query) ||
            String(car.seating).includes(query);

        return (
            matchesQuery &&
            (brands.length === 0 || brands.includes(car.brand)) &&
            car.price >= minPrice &&
            car.price <= maxPrice &&
            (fuelTypes.length === 0 || fuelTypes.includes(car.fuel)) &&
            (seatings.length === 0 || seatings.includes(String(car.seating)))
        );
    });

    const sortedCars = sortCars(filteredCars);

    const handleSearch = (e) => {
        e.preventDefault();

        const params = new URLSearchParams(searchParams.toString());

        if (searchQuery.trim()) {
            params.set('q', searchQuery.trim());
        } else {
            params.delete('q');
        }

        router.push(`?${params.toString()}`);
    };

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;

    const paginatedData = sortedCars.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        const pages = Math.ceil(sortedCars.length / itemsPerPage);
        setTotalPages(pages);
    }, [searchParams, sortedCars]);

    const toggleWishlist = (car) => {
        const current = getWishlist();
        const isExist = current.some(c => c.id === car.id);

        let updated = [];
        if (isExist) {
            updated = current.filter(c => c.id !== car.id);
            toast.success('Removed from wishlist');
        } else {
            updated = [...current, car];
            toast.success('Added to wishlist');
        }
        saveWishlist(updated);
    };

    useEffect(() => {
        setWishlist(getWishlist());

        const update = () => setWishlist(getWishlist());

        window.addEventListener("wishlist-updated", update);
        return () => window.removeEventListener("wishlist-updated", update);
    }, []);


    if (loading) return (
        <div className="flex items-center justify-center h-[90vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    )

    return (
        <div className="container mx-auto my-10 px-4 flex flex-col gap-y-4 md:gap-y-0 md:flex-row md:gap-x-6">
            <div className="w-full hidden md:block md:w-1/4 lg:w-1/5">
                <FilterSidebar />
            </div>
            <div className="w-full md:w-3/4 lg:w-4/5">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight">Find Your Perfect Car</h1>
                    <p className="text-muted-foreground mt-1">Browse through our extensive collection of vehicles</p>
                </div>

                {/* Search bar */}
                <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search by car name, brand, fuel type, or seating..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                            required
                        />
                    </div>
                    <Button type="submit">Search</Button>
                </form>

                <hr className="my-6" />

                {/* Sort by & filter  */}
                <div className="flex gap-4 mb-6">
                    {filteredCars.length !== 0 && <Select onValueChange={(value) => { setSortOption(value); setCurrentPage(1); }}>
                        <SelectTrigger className="w-max">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="priceLowToHigh">Price: Low to High</SelectItem>
                            <SelectItem value="priceHighToLow">Price: High to Low</SelectItem>
                        </SelectContent>
                    </Select>}
                    <div className="md:hidden">
                        <FilterSidebar />
                    </div>
                </div>

                {/* Car cards */}
                <div>
                    {filteredCars.length !== 0 && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {paginatedData.map((car) => (
                            <div key={car.id}>
                                <CarCard car={car} wishlist={wishlist} toggleWishlist={toggleWishlist} />
                            </div>
                        ))}
                    </div>}

                    {/* No cars found msg */}
                    {filteredCars.length === 0 && (
                        <div className="text-center py-10">
                            <p className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                No cars found
                            </p>
                            <p className="text-gray-400 dark:text-gray-500">
                                Try modifying your filters or search to see more results.
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && <Pagination className='mt-8'>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    isActive={currentPage === index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>}
            </div>
            <Toaster />
        </div>
    );
};

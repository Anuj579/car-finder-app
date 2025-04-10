"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FilterSidebar() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Get initial values from URL params
    const initialBrands = searchParams.get("brands")?.split(",") || []
    const initialPriceRange = [
        Number.parseInt(searchParams.get("minPrice") || "0"),
        Number.parseInt(searchParams.get("maxPrice") || "4000000"),
    ]
    const initialFuelTypes = searchParams.get("fuelTypes")?.split(",") || []
    const initialSeatingCapacity = searchParams.get("seatingCapacity") || ""

    // State for filters
    const [brands, setBrands] = useState(initialBrands)
    const [priceRange, setPriceRange] = useState(initialPriceRange)
    const [fuelTypes, setFuelTypes] = useState(initialFuelTypes)
    const [seatingCapacity, setSeatingCapacity] = useState(initialSeatingCapacity)

    // Available filter options
    const availableBrands = [
        "Maruti",
        "Hyundai",
        "Tata",
        "Kia",
        "Honda",
        "Toyota",
        "Mahindra",
        "MG",
        "Renault",
        "Skoda",
        "Volkswagen",
        "Nissan",
        "Jeep",
        "Ford"
    ];

    const availableFuelTypes = ["Petrol", "Diesel", "Electric"]

    const availableSeatingCapacities = ["4", "5", "7"]

    const handleBrandChange = (brand) => {
        setBrands((prev) => {
            if (prev.includes(brand)) {
                return prev.filter((b) => b !== brand)
            } else {
                return [...prev, brand]
            }
        })
    }

    const handleFuelTypeChange = (fuelType) => {
        setFuelTypes((prev) => {
            if (prev.includes(fuelType)) {
                return prev.filter((f) => f !== fuelType)
            } else {
                return [...prev, fuelType]
            }
        })
    }

    const handleSeatingCapacityChange = (capacity) => {
        setSeatingCapacity((prev) => (prev === capacity ? "" : capacity))
    }

    const applyFilters = () => {
        const params = new URLSearchParams()

        if (brands.length > 0) {
            params.set("brands", brands.join(","))
        }

        if (priceRange[0] > 0) {
            params.set("minPrice", priceRange[0].toString())
        }

        if (priceRange[1] < 4000000) {
            params.set("maxPrice", priceRange[1].toString())
        }

        if (fuelTypes.length > 0) {
            params.set("fuelTypes", fuelTypes.join(","))
        }

        if (seatingCapacity) {
            params.set("seatingCapacity", seatingCapacity)
        }

        // Preserve search query if exists
        const query = searchParams.get("q")
        if (query) {
            params.set("q", query)
        }

        router.push(`/?${params.toString()}`)
    }

    const resetFilters = () => {
        setBrands([])
        setPriceRange([0, 4000000])
        setFuelTypes([])
        setSeatingCapacity("")
        router.push("/")
    }

    return (
        <div className="bg-card rounded-lg border p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset
                </Button>
            </div>

            <Accordion type="multiple" defaultValue={["brands", "price", "fuelType", "seating"]}>
                <AccordionItem value="brands">
                    <AccordionTrigger>Brand</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3">
                            {availableBrands.map((brand) => (
                                <div key={brand} className="flex items-center gap-x-2">
                                    <Checkbox
                                        id={`brand-${brand}`}
                                        checked={brands.includes(brand)}
                                        onCheckedChange={() => handleBrandChange(brand)}
                                        className='border-zinc-800 dark:border-zinc-300'
                                    />
                                    <Label className='text-zinc-800 dark:text-zinc-300 font-normal' htmlFor={`brand-${brand}`}>{brand}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4">
                            <Slider value={priceRange} min={0} max={4000000} step={10000} onValueChange={setPriceRange} className='my-2' />
                            <div className="flex items-center justify-between text-zinc-800 dark:text-zinc-300">
                                <span className="text-sm">₹{priceRange[0].toLocaleString("en-IN")}</span>
                                <span className="text-sm">₹{priceRange[1].toLocaleString("en-IN")}</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="fuelType">
                    <AccordionTrigger>Fuel Type</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3">
                            {availableFuelTypes.map((fuelType) => (
                                <div key={fuelType} className="flex items-center gap-x-2">
                                    <Checkbox
                                        id={`fuel-${fuelType}`}
                                        checked={fuelTypes.includes(fuelType)}
                                        onCheckedChange={() => handleFuelTypeChange(fuelType)}
                                        className='border-zinc-800 dark:border-zinc-300'
                                    />
                                    <Label className='text-zinc-800 dark:text-zinc-300 font-normal' htmlFor={`fuel-${fuelType}`}>{fuelType}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="seating">
                    <AccordionTrigger>Seating Capacity</AccordionTrigger>
                    <AccordionContent>
                        <div className="grid grid-cols-3 gap-2">
                            {availableSeatingCapacities.map((capacity) => (
                                <Button
                                    key={capacity}
                                    variant={seatingCapacity === capacity ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleSeatingCapacityChange(capacity)}
                                    className="w-full"
                                >
                                    {capacity}
                                </Button>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <hr className="my-4" />

            <Button onClick={applyFilters} className="w-full">
                Apply Filters
            </Button>
        </div>
    )
}

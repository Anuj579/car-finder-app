"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet"
import { SlidersHorizontal } from "lucide-react"

export default function FilterSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    // Get initial values from URL params
    const initialBrands = searchParams.get("brands")?.split(",") || []
    const initialPriceRange = [
        Number.parseInt(searchParams.get("minPrice") || "0"),
        Number.parseInt(searchParams.get("maxPrice") || "4000000"),
    ]
    const initialFuelTypes = searchParams.get("fuelTypes")?.split(",") || []
    const initialSeatingCapacity = searchParams.get("seatingCapacity") || ""

    const [brands, setBrands] = useState(initialBrands)
    const [priceRange, setPriceRange] = useState(initialPriceRange)
    const [fuelTypes, setFuelTypes] = useState(initialFuelTypes)
    const [seatingCapacity, setSeatingCapacity] = useState(initialSeatingCapacity)

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
        <>
            {/* For larger screens */}
            <div className="bg-card rounded-lg border p-4 hidden md:block">
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

            {/* For smaller screens */}
            <Sheet className='md:hidden' open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger className="flex items-center gap-1 md:hidden" asChild>
                    <Button variant='outline' size='sm'>
                        <SlidersHorizontal size={14} /> Filters
                    </Button>
                </SheetTrigger>
                <SheetContent className="p-0 flex flex-col h-full md:hidden">
                    <SheetDescription className='sr-only'>Filter</SheetDescription>
                    {/* Header */}
                    <div className="px-4 pt-8 pb-2 border-b">
                        <div className="flex items-center justify-between">
                            <SheetTitle>Filters</SheetTitle>
                            <Button variant="ghost" size="sm" onClick={() => {
                                resetFilters();
                                setTimeout(() => {
                                    setIsSheetOpen(false);
                                }, 200);
                            }}>
                                Reset
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 px-4 pb-4">
                        <Accordion
                            type="multiple"
                            defaultValue={["brands", "price", "fuelType", "seating"]}
                        >
                            <AccordionItem value="brands" className="max-h-[220px] overflow-y-auto overflow-x-hidden">
                                <AccordionTrigger>Brand</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-3">
                                        {availableBrands.map((brand) => (
                                            <div key={brand} className="flex items-center gap-x-2">
                                                <Checkbox
                                                    id={`brand-${brand}`}
                                                    checked={brands.includes(brand)}
                                                    onCheckedChange={() => handleBrandChange(brand)}
                                                />
                                                <Label
                                                    htmlFor={`brand-${brand}`}
                                                    className="text-zinc-800 dark:text-zinc-300 font-normal"
                                                >
                                                    {brand}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="price">
                                <AccordionTrigger>Price Range</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-4">
                                        <Slider
                                            value={priceRange}
                                            min={0}
                                            max={4000000}
                                            step={10000}
                                            onValueChange={setPriceRange}
                                            className="my-2"
                                        />
                                        <div className="flex items-center justify-between text-zinc-800 dark:text-zinc-300">
                                            <span className="text-sm">
                                                ₹{priceRange[0].toLocaleString("en-IN")}
                                            </span>
                                            <span className="text-sm">
                                                ₹{priceRange[1].toLocaleString("en-IN")}
                                            </span>
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
                                                />
                                                <Label
                                                    htmlFor={`fuel-${fuelType}`}
                                                    className="text-zinc-800 dark:text-zinc-300 font-normal"
                                                >
                                                    {fuelType}
                                                </Label>
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
                                                variant={
                                                    seatingCapacity === capacity ? "default" : "outline"
                                                }
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
                    </div>

                    <div className="border-t px-4 py-3 sticky bottom-0 bg-white dark:bg-black">
                        <Button onClick={() => {
                            applyFilters();
                            setTimeout(() => {
                                setIsSheetOpen(false);
                            }, 100);
                        }} className="w-full">
                            Apply Filters
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

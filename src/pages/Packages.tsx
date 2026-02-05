 import { useState, useMemo } from "react";
 import { motion } from "framer-motion";
 import { Search, SlidersHorizontal, X } from "lucide-react";
 import { Input } from "@/components/ui/input";
 import { Button } from "@/components/ui/button";
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 import WhatsAppButton from "@/components/WhatsAppButton";
 import TourCard from "@/components/TourCard";
 import { toursData } from "@/lib/tourData";
 
 const Packages = () => {
   const [search, setSearch] = useState("");
   const [destination, setDestination] = useState("all");
   const [duration, setDuration] = useState("all");
   const [priceRange, setPriceRange] = useState("all");
   const [sortBy, setSortBy] = useState("popular");
   const [showFilters, setShowFilters] = useState(false);
 
   const destinations = [...new Set(toursData.map((t) => t.destination))];
 
   const filteredTours = useMemo(() => {
     let tours = [...toursData];
 
     // Search filter
     if (search) {
       tours = tours.filter(
         (t) =>
           t.title.toLowerCase().includes(search.toLowerCase()) ||
           t.destination.toLowerCase().includes(search.toLowerCase())
       );
     }
 
     // Destination filter
     if (destination !== "all") {
       tours = tours.filter((t) => t.destination === destination);
     }
 
     // Duration filter
     if (duration !== "all") {
       if (duration === "3-5") {
         tours = tours.filter((t) => t.duration_days >= 3 && t.duration_days <= 5);
       } else if (duration === "6-8") {
         tours = tours.filter((t) => t.duration_days >= 6 && t.duration_days <= 8);
       } else if (duration === "9+") {
         tours = tours.filter((t) => t.duration_days >= 9);
       }
     }
 
     // Price filter
     if (priceRange !== "all") {
       if (priceRange === "under10k") {
         tours = tours.filter((t) => t.discounted_price_inr < 10000);
       } else if (priceRange === "10k-20k") {
         tours = tours.filter((t) => t.discounted_price_inr >= 10000 && t.discounted_price_inr <= 20000);
       } else if (priceRange === "above20k") {
         tours = tours.filter((t) => t.discounted_price_inr > 20000);
       }
     }
 
     // Sorting
     if (sortBy === "price-low") {
       tours.sort((a, b) => a.discounted_price_inr - b.discounted_price_inr);
     } else if (sortBy === "price-high") {
       tours.sort((a, b) => b.discounted_price_inr - a.discounted_price_inr);
     } else if (sortBy === "duration") {
       tours.sort((a, b) => a.duration_days - b.duration_days);
     } else {
       // Popular - featured first
       tours.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
     }
 
     return tours;
   }, [search, destination, duration, priceRange, sortBy]);
 
   const clearFilters = () => {
     setSearch("");
     setDestination("all");
     setDuration("all");
     setPriceRange("all");
     setSortBy("popular");
   };
 
   const hasActiveFilters = search || destination !== "all" || duration !== "all" || priceRange !== "all";
 
   return (
     <div className="min-h-screen bg-background">
       <Header />
       <WhatsAppButton />
 
       {/* Hero */}
       <section className="bg-gradient-hero py-16 md:py-24">
         <div className="container mx-auto px-4 text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
           >
             <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
               Tour Packages
             </h1>
             <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
               Discover our curated collection of budget-friendly domestic tours from Kolkata
             </p>
           </motion.div>
         </div>
       </section>
 
       {/* Filters */}
       <section className="sticky top-16 md:top-20 z-40 bg-background border-b border-border py-4">
         <div className="container mx-auto px-4">
           <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
             {/* Search */}
             <div className="relative flex-1 max-w-md w-full">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <Input
                 placeholder="Search destinations..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="pl-10"
               />
             </div>
 
             {/* Mobile Filter Toggle */}
             <Button
               variant="outline"
               className="lg:hidden"
               onClick={() => setShowFilters(!showFilters)}
             >
               <SlidersHorizontal className="w-4 h-4 mr-2" />
               Filters
             </Button>
 
             {/* Desktop Filters */}
             <div className={`flex-wrap gap-3 ${showFilters ? "flex" : "hidden lg:flex"} w-full lg:w-auto`}>
               <Select value={destination} onValueChange={setDestination}>
                 <SelectTrigger className="w-full lg:w-[150px]">
                   <SelectValue placeholder="Destination" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="all">All Destinations</SelectItem>
                   {destinations.map((d) => (
                     <SelectItem key={d} value={d}>{d}</SelectItem>
                   ))}
                 </SelectContent>
               </Select>
 
               <Select value={duration} onValueChange={setDuration}>
                 <SelectTrigger className="w-full lg:w-[140px]">
                   <SelectValue placeholder="Duration" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="all">Any Duration</SelectItem>
                   <SelectItem value="3-5">3-5 Days</SelectItem>
                   <SelectItem value="6-8">6-8 Days</SelectItem>
                   <SelectItem value="9+">9+ Days</SelectItem>
                 </SelectContent>
               </Select>
 
               <Select value={priceRange} onValueChange={setPriceRange}>
                 <SelectTrigger className="w-full lg:w-[150px]">
                   <SelectValue placeholder="Price" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="all">Any Price</SelectItem>
                   <SelectItem value="under10k">Under ₹10,000</SelectItem>
                   <SelectItem value="10k-20k">₹10,000 - ₹20,000</SelectItem>
                   <SelectItem value="above20k">Above ₹20,000</SelectItem>
                 </SelectContent>
               </Select>
 
               <Select value={sortBy} onValueChange={setSortBy}>
                 <SelectTrigger className="w-full lg:w-[140px]">
                   <SelectValue placeholder="Sort" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="popular">Popular</SelectItem>
                   <SelectItem value="price-low">Price: Low to High</SelectItem>
                   <SelectItem value="price-high">Price: High to Low</SelectItem>
                   <SelectItem value="duration">Duration</SelectItem>
                 </SelectContent>
               </Select>
 
               {hasActiveFilters && (
                 <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                   <X className="w-4 h-4" />
                   Clear
                 </Button>
               )}
             </div>
           </div>
         </div>
       </section>
 
       {/* Tours Grid */}
       <section className="section-padding">
         <div className="container mx-auto px-4">
           <p className="text-muted-foreground mb-6">
             Showing {filteredTours.length} package{filteredTours.length !== 1 ? "s" : ""}
           </p>
 
           {filteredTours.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
               {filteredTours.map((tour, index) => (
                 <motion.div
                   key={tour.slug}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.05 }}
                 >
                   <TourCard
                     id={tour.slug}
                     slug={tour.slug}
                     title={tour.title}
                     destination={tour.destination}
                     duration_days={tour.duration_days}
                     original_price_inr={tour.original_price_inr}
                     discounted_price_inr={tour.discounted_price_inr}
                     hero_image_url={tour.hero_image_url}
                   />
                 </motion.div>
               ))}
             </div>
           ) : (
             <div className="text-center py-16">
               <p className="text-xl text-muted-foreground mb-4">No packages found</p>
               <Button onClick={clearFilters}>Clear Filters</Button>
             </div>
           )}
         </div>
       </section>
 
       <Footer />
     </div>
   );
 };
 
 export default Packages;
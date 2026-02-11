import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TourCard from "@/components/TourCard";
import SEOHead from "@/components/SEOHead";
import { useTours } from "@/hooks/useTours";

const Packages = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const { data: tours, isLoading } = useTours();

  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("all");
  const [duration, setDuration] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const destinations = useMemo(() => {
    if (!tours) return [];
    return [...new Set(tours.map((t) => t.destination))];
  }, [tours]);

  const filteredTours = useMemo(() => {
    if (!tours) return [];
    
    let filtered = [...tours];

    // Category filter from URL
    if (categoryFilter) {
      filtered = filtered.filter((t) => t.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.destination.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Destination filter
    if (destination !== "all") {
      filtered = filtered.filter((t) => t.destination === destination);
    }

    // Duration filter
    if (duration !== "all") {
      if (duration === "3-5") {
        filtered = filtered.filter((t) => t.duration_days >= 3 && t.duration_days <= 5);
      } else if (duration === "6-8") {
        filtered = filtered.filter((t) => t.duration_days >= 6 && t.duration_days <= 8);
      } else if (duration === "9+") {
        filtered = filtered.filter((t) => t.duration_days >= 9);
      }
    }

    // Price filter
    if (priceRange !== "all") {
      if (priceRange === "under10k") {
        filtered = filtered.filter((t) => t.discounted_price_inr < 10000);
      } else if (priceRange === "10k-20k") {
        filtered = filtered.filter((t) => t.discounted_price_inr >= 10000 && t.discounted_price_inr <= 20000);
      } else if (priceRange === "above20k") {
        filtered = filtered.filter((t) => t.discounted_price_inr > 20000);
      }
    }

    // Sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.discounted_price_inr - b.discounted_price_inr);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.discounted_price_inr - a.discounted_price_inr);
    } else if (sortBy === "duration") {
      filtered.sort((a, b) => a.duration_days - b.duration_days);
    } else {
      // Popular - featured first
      filtered.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }

    return filtered;
  }, [tours, search, destination, duration, priceRange, sortBy, categoryFilter]);

  const clearFilters = () => {
    setSearch("");
    setDestination("all");
    setDuration("all");
    setPriceRange("all");
    setSortBy("popular");
  };

  const hasActiveFilters = search || destination !== "all" || duration !== "all" || priceRange !== "all";

  const pageTitle = categoryFilter
    ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Tours`
    : "Tour Packages";

  const pageDescription = categoryFilter
    ? `Explore our ${categoryFilter.toLowerCase()} tour packages`
    : "Discover our curated collection of budget-friendly tours from Rampurhat & Kolkata";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${pageTitle} - Sova Tour & Travels`}
        description={`${pageDescription}. Book affordable tour packages from Rampurhat & Kolkata.`}
        ogUrl={`https://sovatourandtravels.lovable.app/packages${categoryFilter ? `?category=${categoryFilter}` : ""}`}
        canonical={`https://sovatourandtravels.lovable.app/packages${categoryFilter ? `?category=${categoryFilter}` : ""}`}
      />
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
              {pageTitle}
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              {pageDescription}
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
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-6">
                Showing {filteredTours.length} package{filteredTours.length !== 1 ? "s" : ""}
              </p>

              {filteredTours.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {filteredTours.map((tour, index) => (
                    <motion.div
                      key={tour.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TourCard
                        id={tour.id}
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
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Packages;

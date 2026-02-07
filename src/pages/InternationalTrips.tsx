import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TourCard from "@/components/TourCard";
import { toursData } from "@/lib/tourData";

const internationalDestinations = [
  { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400" },
  { name: "Nepal", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400" },
  { name: "Bhutan", image: "https://images.unsplash.com/photo-1553856622-d1b352e24a82?w=400" },
  { name: "Bangkok", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400" },
  { name: "Malaysia", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400" },
  { name: "Vietnam", image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=400" },
  { name: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400" },
  { name: "Sri Lanka", image: "https://images.unsplash.com/photo-1586523969133-a7468b63ce49?w=400" },
];

const InternationalTrips = () => {
  const [searchParams] = useSearchParams();
  const selectedDestination = searchParams.get("destination");

  const internationalTours = useMemo(() => {
    let tours = toursData.filter((t) => t.category === "International");
    
    if (selectedDestination) {
      tours = tours.filter((t) => 
        t.destination.toLowerCase().includes(selectedDestination.toLowerCase())
      );
    }
    
    return tours;
  }, [selectedDestination]);

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
              International Trips
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Explore the world with our carefully curated international tour packages
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Grid */}
      {!selectedDestination && (
        <section className="section-padding bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl font-bold mb-8 text-center">
              Popular Destinations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {internationalDestinations.map((dest, index) => (
                <motion.div
                  key={dest.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/international?destination=${dest.name.toLowerCase()}`}>
                    <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] card-shadow">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-display font-bold text-lg flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {dest.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Selected Destination Header */}
      {selectedDestination && (
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <Link to="/international" className="text-primary text-sm hover:underline mb-2 inline-block">
                  ← All Destinations
                </Link>
                <h2 className="font-display text-2xl font-bold capitalize">
                  {selectedDestination} Tours
                </h2>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tours Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          {!selectedDestination && (
            <h2 className="font-display text-2xl font-bold mb-8 text-center">
              All International Packages
            </h2>
          )}

          {internationalTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {internationalTours.map((tour, index) => (
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
              <p className="text-xl text-muted-foreground mb-4">
                {selectedDestination 
                  ? `No tours available for ${selectedDestination} yet`
                  : "No international tours available"}
              </p>
              <p className="text-muted-foreground mb-6">
                Contact us for custom international tour packages
              </p>
              <a href="https://wa.me/919474025173" target="_blank" rel="noopener noreferrer">
                <Button>
                  Enquire Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold mb-4">
            Can't find your dream destination?
          </h2>
          <p className="text-muted-foreground mb-6">
            We customize international packages based on your preferences and budget
          </p>
          <a href="https://wa.me/919474025173" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-gradient-sunset hover:opacity-90">
              Get Custom Quote
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InternationalTrips;

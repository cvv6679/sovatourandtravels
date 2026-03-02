import { motion } from "framer-motion";
import DestinationCard from "./DestinationCard";
import { useDestinations } from "@/hooks/useDestinations";
import { Loader2 } from "lucide-react";

const DestinationsSection = () => {
  const { data: destinations, isLoading } = useDestinations();

  if (isLoading) {
    return (
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4 flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (!destinations?.length) return null;

  return (
    <section className="section-padding bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Inspiration
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Top Destinations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated destination guides — everything you need to know before you travel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <DestinationCard
                slug={dest.slug}
                name={dest.name}
                tagline={dest.tagline}
                image={dest.card_image || "/placeholder.svg"}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;

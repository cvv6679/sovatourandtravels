import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DestinationCardProps {
  slug: string;
  name: string;
  tagline: string;
  image: string;
}

const DestinationCard = ({ slug, name, tagline, image }: DestinationCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group rounded-2xl overflow-hidden bg-card card-shadow hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/destinations/${slug}`}>
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={`${name} destination`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="p-5 text-center">
          <h3 className="font-display text-xl font-bold text-card-foreground mb-1">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{tagline}</p>
          <Button variant="outline" size="sm" className="gap-1.5 font-semibold">
            Explore Guide
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;

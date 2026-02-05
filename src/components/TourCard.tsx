 import { Link } from "react-router-dom";
 import { Clock, MapPin, Star } from "lucide-react";
 import { motion } from "framer-motion";
 
 interface TourCardProps {
   id: string;
   slug: string;
   title: string;
   destination: string;
   duration_days: number;
   original_price_inr: number;
   discounted_price_inr: number;
   hero_image_url: string;
   best_season?: string;
 }
 
 const TourCard = ({
   slug,
   title,
   destination,
   duration_days,
   original_price_inr,
   discounted_price_inr,
   hero_image_url,
 }: TourCardProps) => {
   const discount = Math.round(
     ((original_price_inr - discounted_price_inr) / original_price_inr) * 100
   );
 
   return (
     <motion.div
       whileHover={{ y: -8 }}
       transition={{ duration: 0.3 }}
       className="group"
     >
       <Link to={`/tour/${slug}`}>
         <div className="bg-card rounded-2xl overflow-hidden card-shadow">
           {/* Image Container */}
           <div className="relative aspect-[4/3] overflow-hidden">
             <img
               src={hero_image_url}
               alt={title}
               className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
             />
             {/* Discount Badge */}
             {discount > 0 && (
               <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded-full">
                 {discount}% OFF
               </div>
             )}
             {/* Duration Badge */}
             <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
               <Clock className="w-3 h-3" />
               {duration_days} Days
             </div>
           </div>
 
           {/* Content */}
           <div className="p-4">
             <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
               <MapPin className="w-3.5 h-3.5" />
               <span>{destination}</span>
             </div>
             <h3 className="font-display font-semibold text-lg text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
               {title}
             </h3>
 
             {/* Price */}
             <div className="flex items-baseline gap-2">
               <span className="text-xl font-bold text-primary">
                 ₹{discounted_price_inr.toLocaleString("en-IN")}
               </span>
               <span className="text-sm text-muted-foreground line-through">
                 ₹{original_price_inr.toLocaleString("en-IN")}
               </span>
             </div>
             <p className="text-xs text-muted-foreground mt-1">per person</p>
           </div>
         </div>
       </Link>
     </motion.div>
   );
 };
 
 export default TourCard;
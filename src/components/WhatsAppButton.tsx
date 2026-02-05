 import { MessageCircle } from "lucide-react";
 import { motion } from "framer-motion";
 
 const WhatsAppButton = () => {
   return (
     <motion.a
       href="https://wa.me/919830599553?text=Hi,%20I'm%20interested%20in%20your%20tour%20packages"
       target="_blank"
       rel="noopener noreferrer"
       className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow animate-pulse-glow"
       whileHover={{ scale: 1.05 }}
       whileTap={{ scale: 0.95 }}
       aria-label="Contact us on WhatsApp"
     >
       <MessageCircle className="w-6 h-6" />
       <span className="hidden sm:inline font-medium">WhatsApp</span>
     </motion.a>
   );
 };
 
 export default WhatsAppButton;
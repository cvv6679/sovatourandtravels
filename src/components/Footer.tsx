 import { Link } from "react-router-dom";
 import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
 import Logo from "./Logo";
 
 const Footer = () => {
   const currentYear = new Date().getFullYear();
 
   return (
     <footer className="bg-foreground text-background">
       <div className="container mx-auto px-4 py-12 md:py-16">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
           {/* Brand */}
           <div className="lg:col-span-1">
             <div className="flex items-center gap-2 mb-4">
               <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center">
                 <span className="text-primary-foreground font-bold text-lg">S</span>
               </div>
               <div>
                 <span className="font-display font-bold text-lg text-background">
                   Sova Tours
                 </span>
                 <span className="block text-xs text-background/70 -mt-1">
                   & Travels
                 </span>
               </div>
             </div>
             <p className="text-background/70 text-sm leading-relaxed mb-4">
               Your trusted partner for budget-friendly domestic tours from Kolkata. 
               Explore India with us!
             </p>
             <div className="flex gap-4">
               <a href="#" className="text-background/60 hover:text-secondary transition-colors">
                 <Facebook className="w-5 h-5" />
               </a>
               <a href="#" className="text-background/60 hover:text-secondary transition-colors">
                 <Instagram className="w-5 h-5" />
               </a>
               <a href="#" className="text-background/60 hover:text-secondary transition-colors">
                 <Twitter className="w-5 h-5" />
               </a>
             </div>
           </div>
 
           {/* Quick Links */}
           <div>
             <h4 className="font-display font-semibold text-background mb-4">Quick Links</h4>
             <ul className="space-y-2">
               <li>
                 <Link to="/" className="text-background/70 hover:text-secondary text-sm transition-colors">
                   Home
                 </Link>
               </li>
               <li>
                 <Link to="/packages" className="text-background/70 hover:text-secondary text-sm transition-colors">
                   Tour Packages
                 </Link>
               </li>
               <li>
                 <Link to="/about" className="text-background/70 hover:text-secondary text-sm transition-colors">
                   About Us
                 </Link>
               </li>
               <li>
                 <Link to="/contact" className="text-background/70 hover:text-secondary text-sm transition-colors">
                   Contact Us
                 </Link>
               </li>
             </ul>
           </div>
 
           {/* Popular Destinations */}
           <div>
             <h4 className="font-display font-semibold text-background mb-4">Popular Destinations</h4>
             <ul className="space-y-2">
               <li>
                 <Link to="/packages?destination=kashmir" className="text-background/70 hover:text-secondary text-sm transition-colors">
                   Kashmir Tours
                 </Link>
               </li>
               <li>
                 <Link to="/packages?destination=darjeeling" className="text-background/70 hover:text-secondary text-sm transition-colors">
                   Darjeeling Tours
                 </Link>
               </li>
               <li>
                 <Link to="/packages?destination=ladakh" className="text-background/70 hover:text-secondary text-sm transition-colors">
                   Ladakh Adventures
                 </Link>
               </li>
               <li>
                 <Link to="/packages?destination=shimla" className="text-background/70 hover:text-secondary text-sm transition-colors">
                   Shimla Manali
                 </Link>
               </li>
             </ul>
           </div>
 
           {/* Contact Info */}
           <div>
             <h4 className="font-display font-semibold text-background mb-4">Contact Us</h4>
             <ul className="space-y-3">
               <li className="flex items-start gap-3">
                 <MapPin className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                 <span className="text-background/70 text-sm">
                   Kolkata, West Bengal, India
                 </span>
               </li>
               <li className="flex items-center gap-3">
                 <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                 <a href="tel:+919830599553" className="text-background/70 hover:text-secondary text-sm transition-colors">
                   +91 9830599553
                 </a>
               </li>
               <li className="flex items-center gap-3">
                 <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                 <a href="mailto:sovainternetcafe@gmail.com" className="text-background/70 hover:text-secondary text-sm transition-colors">
                   sovainternetcafe@gmail.com
                 </a>
               </li>
             </ul>
           </div>
         </div>
 
         {/* Bottom Bar */}
         <div className="border-t border-background/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
           <p className="text-background/50 text-sm">
             © {currentYear} Sova Tours and Travels. All rights reserved.
           </p>
           <div className="flex gap-6">
             <Link to="/admin" className="text-background/50 hover:text-background/70 text-sm transition-colors">
               Admin
             </Link>
           </div>
         </div>
       </div>
     </footer>
   );
 };
 
 export default Footer;
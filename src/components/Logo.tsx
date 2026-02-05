 import { Plane } from "lucide-react";
 
 interface LogoProps {
   className?: string;
   showText?: boolean;
 }
 
 const Logo = ({ className = "", showText = true }: LogoProps) => {
   return (
     <div className={`flex items-center gap-2 ${className}`}>
       <div className="relative">
         <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center shadow-lg">
           <Plane className="w-5 h-5 text-primary-foreground transform -rotate-45" />
         </div>
         <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-secondary rounded-full" />
       </div>
       {showText && (
         <div className="flex flex-col">
           <span className="font-display font-bold text-lg leading-tight text-foreground">
             Sova Tours
           </span>
           <span className="text-xs text-muted-foreground font-medium -mt-0.5">
             & Travels
           </span>
         </div>
       )}
     </div>
   );
 };
 
 export default Logo;
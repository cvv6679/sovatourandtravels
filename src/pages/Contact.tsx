 import { motion } from "framer-motion";
 import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 import WhatsAppButton from "@/components/WhatsAppButton";
 import InquiryForm from "@/components/InquiryForm";
 
 const Contact = () => {
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
               Contact Us
             </h1>
             <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
               We're here to help plan your perfect trip
             </p>
           </motion.div>
         </div>
       </section>
 
       {/* Contact Content */}
       <section className="section-padding">
         <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             {/* Contact Info */}
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
             >
               <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                 Get in Touch
               </h2>
               <p className="text-muted-foreground mb-8 leading-relaxed">
                 Have questions about our tours? Want a custom quote? We'd love to hear from you. 
                 Reach out through any of the channels below, and we'll respond within 24 hours.
               </p>
 
               <div className="space-y-6">
                 <a
                   href="https://wa.me/919830599553"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-start gap-4 p-4 bg-card rounded-xl card-shadow hover:bg-muted transition-colors"
                 >
                   <div className="w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                     <MessageCircle className="w-6 h-6 text-[#25D366]" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-foreground">WhatsApp</h3>
                     <p className="text-muted-foreground">+91 9830599553</p>
                     <p className="text-sm text-primary mt-1">Click to chat now →</p>
                   </div>
                 </a>
 
                 <a
                   href="tel:+919830599553"
                   className="flex items-start gap-4 p-4 bg-card rounded-xl card-shadow hover:bg-muted transition-colors"
                 >
                   <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                     <Phone className="w-6 h-6 text-primary" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-foreground">Phone</h3>
                     <p className="text-muted-foreground">+91 9830599553</p>
                     <p className="text-sm text-primary mt-1">Call us anytime →</p>
                   </div>
                 </a>
 
                 <a
                   href="mailto:sovainternetcafe@gmail.com"
                   className="flex items-start gap-4 p-4 bg-card rounded-xl card-shadow hover:bg-muted transition-colors"
                 >
                   <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                     <Mail className="w-6 h-6 text-secondary" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-foreground">Email</h3>
                     <p className="text-muted-foreground">sovainternetcafe@gmail.com</p>
                     <p className="text-sm text-primary mt-1">Send us an email →</p>
                   </div>
                 </a>
 
                 <div className="flex items-start gap-4 p-4 bg-card rounded-xl card-shadow">
                   <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                     <MapPin className="w-6 h-6 text-accent" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-foreground">Office Location</h3>
                     <p className="text-muted-foreground">Kolkata, West Bengal, India</p>
                     <p className="text-sm text-muted-foreground mt-1">All tours depart from Kolkata</p>
                   </div>
                 </div>
               </div>
 
               {/* Map Placeholder */}
               <div className="mt-8 bg-muted rounded-xl h-64 flex items-center justify-center">
                 <div className="text-center">
                   <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                   <p className="text-muted-foreground">Kolkata, West Bengal</p>
                 </div>
               </div>
             </motion.div>
 
             {/* Contact Form */}
             <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
             >
               <div className="bg-card p-6 md:p-8 rounded-2xl card-shadow">
                 <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                   Send Us a Message
                 </h2>
                 <p className="text-muted-foreground mb-6">
                   Fill out the form below and we'll get back to you shortly.
                 </p>
                 <InquiryForm />
               </div>
             </motion.div>
           </div>
         </div>
       </section>
 
       <Footer />
     </div>
   );
 };
 
 export default Contact;
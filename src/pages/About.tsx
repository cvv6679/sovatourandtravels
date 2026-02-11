 import { motion } from "framer-motion";
 import { MapPin, Users, Award, Heart } from "lucide-react";
 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 import WhatsAppButton from "@/components/WhatsAppButton";
 import SEOHead from "@/components/SEOHead";
 
 const About = () => {
   return (
     <div className="min-h-screen bg-background">
       <SEOHead
         title="About Us - Sova Tour & Travels"
         description="Learn about Sova Tour & Travels, your trusted travel partner from Rampurhat for budget-friendly domestic and international tours."
         ogUrl="https://sovatourandtravels.lovable.app/about"
         canonical="https://sovatourandtravels.lovable.app/about"
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
               About Sova Tours
             </h1>
             <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
               Your trusted travel partner from the heart of Kolkata
             </p>
           </motion.div>
         </div>
       </section>
 
       {/* Story */}
       <section className="section-padding">
         <div className="container mx-auto px-4">
           <div className="max-w-3xl mx-auto">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center mb-12"
             >
               <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Story</span>
               <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                 Making Travel Dreams Affordable
               </h2>
             </motion.div>
 
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="prose prose-lg max-w-none text-muted-foreground"
             >
               <p className="mb-6">
                 <strong className="text-foreground">Sova Tours and Travels</strong> was born from a simple belief: 
                 everyone deserves to explore the incredible diversity of India, regardless of their budget. 
                 Based in the cultural capital of Kolkata, we've been helping travelers discover the magic of 
                 our beautiful country since our inception.
               </p>
               <p className="mb-6">
                 From the snow-capped peaks of Kashmir and Ladakh to the serene backwaters of Sundarban, 
                 from the spiritual banks of Rishikesh to the golden beaches of Puri – we curate experiences 
                 that create lasting memories without breaking the bank.
               </p>
               <p>
                 What sets us apart is our deep understanding of the local landscape, trusted partnerships 
                 with hotels and transport providers across India, and our commitment to transparent pricing. 
                 No hidden costs, no surprises – just honest, affordable travel.
               </p>
             </motion.div>
           </div>
         </div>
       </section>
 
       {/* Values */}
       <section className="section-padding bg-muted">
         <div className="container mx-auto px-4">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-12"
           >
             <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Values</span>
             <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
               What We Stand For
             </h2>
           </motion.div>
 
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { icon: MapPin, title: "Local Expertise", description: "Deep knowledge of every destination with trusted local partners." },
               { icon: Users, title: "Customer First", description: "Your satisfaction is our top priority. 24/7 support during your trip." },
               { icon: Award, title: "Quality Assured", description: "Carefully vetted hotels, transport, and experiences for every budget." },
               { icon: Heart, title: "Passion for Travel", description: "We love what we do, and it shows in every trip we plan." },
             ].map((value, index) => (
               <motion.div
                 key={value.title}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.1 }}
                 className="bg-card p-6 rounded-2xl card-shadow text-center"
               >
                 <div className="w-14 h-14 bg-travel-teal-light rounded-xl flex items-center justify-center mx-auto mb-4">
                   <value.icon className="w-7 h-7 text-primary" />
                 </div>
                 <h3 className="font-display font-semibold text-lg text-card-foreground mb-2">
                   {value.title}
                 </h3>
                 <p className="text-muted-foreground text-sm">
                   {value.description}
                 </p>
               </motion.div>
             ))}
           </div>
         </div>
       </section>
 
       {/* Mission */}
       <section className="section-padding">
         <div className="container mx-auto px-4">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-gradient-hero rounded-3xl p-8 md:p-12 text-center"
           >
             <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
               Our Mission
             </h2>
             <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto leading-relaxed">
               To make domestic travel accessible, affordable, and hassle-free for every Indian family. 
               We believe that exploring our incredible country should be a joy, not a financial burden.
             </p>
           </motion.div>
         </div>
       </section>
 
       {/* Stats */}
       <section className="section-padding bg-muted">
         <div className="container mx-auto px-4">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
               { number: "5000+", label: "Happy Travelers" },
               { number: "11+", label: "Destinations" },
               { number: "100+", label: "Tours Completed" },
               { number: "4.8", label: "Average Rating" },
             ].map((stat, index) => (
               <motion.div
                 key={stat.label}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.1 }}
                 className="text-center"
               >
                 <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                   {stat.number}
                 </p>
                 <p className="text-muted-foreground text-sm">{stat.label}</p>
               </motion.div>
             ))}
           </div>
         </div>
       </section>
 
       <Footer />
     </div>
   );
 };
 
 export default About;
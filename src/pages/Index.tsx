import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Wallet, MapPin, HeartHandshake, Star, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import TourCard from "@/components/TourCard";
import { toursData, testimonialData } from "@/lib/tourData";
import heroImage from "@/assets/hero-kashmir.jpg";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const featuredTours = toursData.filter((tour) => tour.is_featured).slice(0, 6);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email });
      
      if (error) {
        if (error.code === "23505") {
          toast({ title: "Already subscribed!", description: "This email is already on our list." });
        } else {
          throw error;
        }
      } else {
        toast({ title: "Subscribed!", description: "You'll receive our best deals." });
        setEmail("");
      }
    } catch {
      toast({ title: "Error", description: "Failed to subscribe. Please try again.", variant: "destructive" });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Beautiful Kashmir landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              ✈️ Budget-Friendly Tours from Kolkata
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Explore India with{" "}
              <span className="text-secondary">Sova Tours</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
              Discover breathtaking destinations across India at unbeatable prices. 
              From the valleys of Kashmir to the beaches of Puri, your dream vacation starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/packages">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-lg px-8 gap-2">
                  Explore Packages
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="https://wa.me/919830599553" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-foreground font-semibold text-lg px-8">
                  <Phone className="w-5 h-5 mr-2" />
                  WhatsApp Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Popular Packages</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Featured Tour Packages
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked destinations with the best value for money. All tours start from Kolkata.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredTours.map((tour, index) => (
              <motion.div
                key={tour.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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

          <div className="text-center mt-10">
            <Link to="/packages">
              <Button variant="outline" size="lg" className="font-semibold gap-2">
                View All Packages
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              The Sova Tours Advantage
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Wallet, title: "Budget Friendly", description: "Best prices guaranteed with no hidden costs. Quality tours at affordable rates." },
              { icon: Shield, title: "Trusted Service", description: "Years of experience serving happy travelers from Kolkata and beyond." },
              { icon: MapPin, title: "Local Expertise", description: "Deep knowledge of destinations with trusted local partners across India." },
              { icon: HeartHandshake, title: "Customizable", description: "Flexible itineraries tailored to your preferences and budget." },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-2xl card-shadow text-center"
              >
                <div className="w-14 h-14 bg-travel-teal-light rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-card-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
              What Our Travelers Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialData.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-6 rounded-2xl card-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-travel-gold text-travel-gold" />
                  ))}
                </div>
                <p className="text-card-foreground mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.destination} Tour</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
              Get Exclusive Deals
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              Subscribe to our newsletter and receive the best tour offers directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 flex-1"
                required
              />
              <Button 
                type="submit" 
                disabled={isSubscribing}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
              >
                {isSubscribing ? "..." : "Subscribe"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-3xl p-8 md:p-12 card-shadow text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-card-foreground mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contact us for a custom quote tailored to your travel preferences and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/919830599553" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-gradient-sunset hover:opacity-90 text-secondary-foreground font-semibold gap-2">
                  <Phone className="w-5 h-5" />
                  Get Custom Quote
                </Button>
              </a>
              <a href="mailto:sovainternetcafe@gmail.com">
                <Button size="lg" variant="outline" className="font-semibold gap-2">
                  <Mail className="w-5 h-5" />
                  Email Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

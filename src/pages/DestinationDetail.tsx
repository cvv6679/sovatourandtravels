import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MapPin, Lightbulb, Phone, Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import { useDestination } from "@/hooks/useDestinations";

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: destination, isLoading, error } = useDestination(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!destination || error) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Destination Not Found</h1>
            <Link to="/"><Button>Back to Home</Button></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const topSpots = (destination.top_spots || []) as { name: string; description: string; image: string }[];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={destination.seo_title || destination.name}
        description={destination.seo_description || destination.tagline}
        ogUrl={`https://sovatourandtravels.lovable.app/destinations/${destination.slug}`}
        canonical={`https://sovatourandtravels.lovable.app/destinations/${destination.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: destination.name,
          description: destination.seo_description,
          image: destination.hero_image,
        }}
      />
      <Header />
      <WhatsAppButton />

      {/* Hero */}
      {destination.hero_image ? (
        <section className="relative h-[60vh] min-h-[400px]">
          <img src={destination.hero_image} alt={destination.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <Link to="/#destinations" className="inline-flex items-center gap-1 text-white/80 hover:text-white mb-4 text-sm">
                <ArrowLeft className="w-4 h-4" /> All Destinations
              </Link>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">{destination.name}</h1>
              <p className="text-xl text-white/80">{destination.tagline}</p>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4">
            <Link to="/#destinations" className="inline-flex items-center gap-1 text-primary-foreground/80 hover:text-primary-foreground mb-4 text-sm">
              <ArrowLeft className="w-4 h-4" /> All Destinations
            </Link>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{destination.name}</h1>
            <p className="text-xl text-primary-foreground/80">{destination.tagline}</p>
          </div>
        </section>
      )}

      {/* Quick Info */}
      <section className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-6 justify-center">
            {destination.best_time && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <span className="text-xs uppercase tracking-wider block">Best Time</span>
                  <span className="font-semibold text-card-foreground">{destination.best_time}</span>
                </div>
              </div>
            )}
            {destination.ideal_duration && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <span className="text-xs uppercase tracking-wider block">Ideal Duration</span>
                  <span className="font-semibold text-card-foreground">{destination.ideal_duration}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Overview */}
      {destination.overview && (
        <section className="section-padding">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">About {destination.name}</h2>
              {destination.overview.split("\n\n").map((para, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">{para}</p>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Top Spots */}
      {topSpots.length > 0 && (
        <section className="section-padding bg-muted">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-primary font-medium text-sm uppercase tracking-wider">Must-Visit</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Top Places in {destination.name}</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {topSpots.map((spot, i) => (
                <motion.div key={spot.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden card-shadow">
                  {spot.image && <img src={spot.image} alt={spot.name} className="w-full h-48 object-cover" loading="lazy" />}
                  <div className="p-5">
                    <h3 className="font-display font-bold text-lg text-card-foreground mb-1">{spot.name}</h3>
                    <p className="text-sm text-muted-foreground">{spot.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Things To Do */}
      {destination.things_to_do?.length > 0 && (
        <section className="section-padding">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Things To Do</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {destination.things_to_do.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card p-4 rounded-xl card-shadow">
                    <span className="flex-shrink-0 w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">{i + 1}</span>
                    <p className="text-card-foreground text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Travel Tips */}
      {destination.travel_tips?.length > 0 && (
        <section className="section-padding bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="w-6 h-6 text-primary" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Travel Tips</h2>
              </div>
              <div className="space-y-3">
                {destination.travel_tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card p-4 rounded-xl card-shadow">
                    <span className="text-primary font-bold">💡</span>
                    <p className="text-card-foreground text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Photo Gallery */}
      {destination.gallery?.length > 0 && (
        <section className="section-padding">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Camera className="w-5 h-5 text-primary" />
                <span className="text-primary font-medium text-sm uppercase tracking-wider">Gallery</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{destination.name} in Photos</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto">
              {destination.gallery.map((img, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="aspect-square rounded-2xl overflow-hidden">
                  <img src={img} alt={`${destination.name} photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Plan My Trip to {destination.name}</h2>
            <p className="text-primary-foreground/80 mb-8">Let us craft the perfect {destination.name} itinerary for you. No hidden costs, fully customizable.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`https://wa.me/919474025173?text=Hi, I want to plan a trip to ${destination.name}. Please share details.`} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold gap-2">
                  <Phone className="w-5 h-5" />WhatsApp Us
                </Button>
              </a>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-foreground font-semibold">Send Inquiry</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DestinationDetail;

import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Clock, MapPin, Calendar, Train, Hotel, CheckCircle, XCircle, 
  Phone, ArrowLeft, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import InquiryForm from "@/components/InquiryForm";
import SEOHead from "@/components/SEOHead";
import { useTourBySlug } from "@/hooks/useTours";

const TourDetail = () => {
  const { slug } = useParams();
  const { data: tour, isLoading, error } = useTourBySlug(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!tour || error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Tour Not Found</h1>
          <Link to="/packages">
            <Button>View All Packages</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = Math.round(
    ((tour.original_price_inr - tour.discounted_price_inr) / tour.original_price_inr) * 100
  );

  const faqs = [
    { q: "What is the starting point for this tour?", a: `This tour starts from ${tour.start_city}. All pickups and drops are from ${tour.start_city}.` },
    { q: "Is food included in this package?", a: "Daily breakfast is included. Lunch and dinner may vary by package - please check inclusions above." },
    { q: "Can I customize this itinerary?", a: "Yes! We offer flexible customization. Contact us via WhatsApp for personalized modifications." },
    { q: "What about travel insurance?", a: "Basic travel insurance is included in most packages. For comprehensive coverage, please inquire." },
  ];

  const tourUrl = `https://sovatourandtravels.lovable.app/tour/${tour.slug}`;
  const tourSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.overview || `${tour.title} - ${tour.duration_days} days tour from ${tour.start_city}`,
    image: tour.hero_image_url || "",
    touristType: tour.category,
    offers: {
      "@type": "Offer",
      price: tour.discounted_price_inr,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "TravelAgency",
      name: "Sova Tour & Travels",
      telephone: "+919474025173",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${tour.title} - ₹${tour.discounted_price_inr.toLocaleString("en-IN")} | Sova Tours`}
        description={tour.overview || `Book ${tour.title} - ${tour.duration_days} days tour starting from ₹${tour.discounted_price_inr.toLocaleString("en-IN")} per person from ${tour.start_city}.`}
        ogImage={tour.hero_image_url || undefined}
        ogUrl={tourUrl}
        canonical={tourUrl}
        jsonLd={tourSchema}
      />
      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh]">
        {tour.hero_image_url ? (
          <img
            src={tour.hero_image_url}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-hero" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <Link to="/packages" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Packages
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="bg-secondary text-secondary-foreground text-sm font-bold px-3 py-1 rounded-full">
                  {discount}% OFF
                </span>
                <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {tour.duration_days} Days
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {tour.title}
              </h1>
              <p className="text-white/80 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Starting from {tour.start_city}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Facts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <div className="bg-card p-4 rounded-xl card-shadow text-center">
                  <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{tour.duration_days} Days</p>
                </div>
                <div className="bg-card p-4 rounded-xl card-shadow text-center">
                  <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Starting Point</p>
                  <p className="font-semibold">{tour.start_city}</p>
                </div>
                <div className="bg-card p-4 rounded-xl card-shadow text-center">
                  <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Best Season</p>
                  <p className="font-semibold text-sm">{tour.best_season || "Year Round"}</p>
                </div>
                <div className="bg-card p-4 rounded-xl card-shadow text-center">
                  <Hotel className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Hotel Type</p>
                  <p className="font-semibold">{tour.hotel_type || "Budget"}</p>
                </div>
              </motion.div>

              {/* Overview */}
              {tour.overview && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card p-6 rounded-2xl card-shadow"
                >
                  <h2 className="font-display text-xl font-semibold mb-4">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">{tour.overview}</p>
                  {tour.transport && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <Train className="w-4 h-4" />
                      <span>Transport: {tour.transport}</span>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Itinerary */}
              {tour.itinerary && tour.itinerary.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card p-6 rounded-2xl card-shadow"
                >
                  <h2 className="font-display text-xl font-semibold mb-4">Day-by-Day Itinerary</h2>
                  <Accordion type="multiple" className="space-y-3">
                    {tour.itinerary.map((day) => (
                      <AccordionItem key={day.day_number} value={`day-${day.day_number}`} className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-4 text-left">
                            <span className="bg-primary text-primary-foreground text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                              {day.day_number}
                            </span>
                            <span className="font-medium">{day.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-12 pb-4 text-muted-foreground">
                          {day.description}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              )}

              {/* Inclusions & Exclusions */}
              {(tour.inclusions?.length || tour.exclusions?.length) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {tour.inclusions && tour.inclusions.length > 0 && (
                    <div className="bg-travel-green-light p-6 rounded-2xl">
                      <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        Inclusions
                      </h3>
                      <ul className="space-y-2">
                        {tour.inclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tour.exclusions && tour.exclusions.length > 0 && (
                    <div className="bg-travel-coral-light p-6 rounded-2xl">
                      <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-destructive" />
                        Exclusions
                      </h3>
                      <ul className="space-y-2">
                        {tour.exclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <XCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}

              {/* FAQs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card p-6 rounded-2xl card-shadow"
              >
                <h2 className="font-display text-xl font-semibold mb-4">FAQs</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card p-6 rounded-2xl card-shadow"
                >
                  <div className="mb-4">
                    <p className="text-muted-foreground text-sm line-through">
                      ₹{tour.original_price_inr.toLocaleString("en-IN")}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">
                        ₹{tour.discounted_price_inr.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-muted-foreground">per person</span>
                    </div>
                    <span className="inline-block mt-2 text-sm font-medium text-accent">
                      Save ₹{(tour.original_price_inr - tour.discounted_price_inr).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/919474025173?text=Hi,%20I'm%20interested%20in%20the%20${encodeURIComponent(tour.title)}%20package`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full bg-gradient-sunset hover:opacity-90 text-secondary-foreground font-semibold gap-2 mb-3">
                      <Phone className="w-4 h-4" />
                      Book via WhatsApp
                    </Button>
                  </a>
                  <p className="text-xs text-center text-muted-foreground">
                    No booking fees • Instant confirmation
                  </p>
                </motion.div>

                {/* Inquiry Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card p-6 rounded-2xl card-shadow"
                >
                  <h3 className="font-display font-semibold text-lg mb-4">Send Inquiry</h3>
                  <InquiryForm tourId={tour.id} tourTitle={tour.title} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TourDetail;

import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Phone,
  HelpCircle,
  Train,
  Plane,
  Car,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import { getDestinationBySlug, getOriginBySlug, ORIGIN_CITIES } from "@/lib/rampurhatDestinationsData";
import { toursData } from "@/lib/tourData";
import TourCard from "@/components/TourCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const RampurhatToDestination = () => {
  const { originSlug, destinationSlug } = useParams<{ originSlug?: string; destinationSlug: string }>();
  const data = getDestinationBySlug(destinationSlug || "");
  const origin = getOriginBySlug(originSlug);

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-foreground mb-4">Destination Package Not Found</h1>
            <p className="text-muted-foreground mb-6">
              We couldn&apos;t find travel details for that route from {origin.name}. Explore our complete collection of tours.
            </p>
            <Link to={`/tours-from-${origin.slug}`}>
              <Button className="bg-primary text-primary-foreground">View All Tours From {origin.name}</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const pageUrl = `https://sovatourandtravels.com/tours/${origin.slug}-to-${data.slug}`;
  const pageTitle = `${origin.name} to ${data.destinationName} Tour Package | Sova Tour & Travels`;
  const pageDescription = `Book budget-friendly ${origin.name} to ${data.destinationName} tour packages starting at ₹${data.startingPriceInr.toLocaleString("en-IN")}. Includes train/flight transport from ${origin.stationName} & Kolkata Airport, hotel stays, cab & customized itineraries.`;

  // Related tours
  const relatedTours = toursData.filter((t) =>
    data.relatedToursSlugs.includes(t.slug)
  );

  // JSON-LD Schema (TouristTrip + BreadcrumbList + FAQPage)
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        name: `${origin.name} to ${data.destinationName} Tour Package`,
        description: data.overview,
        image: typeof data.heroImage === "string" ? data.heroImage : "https://sovatourandtravels.com/logo.PNG",
        touristType: ["Family", "Couples", "Pilgrims", "Group Travelers"],
        itinerary: {
          "@type": "ItemList",
          numberOfItems: data.itineraryHighlights.length,
          itemListElement: data.itineraryHighlights.map((item, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            item: {
              "@type": "TouristAttraction",
              name: item.title,
              description: item.desc,
            },
          })),
        },
        offers: {
          "@type": "Offer",
          price: data.startingPriceInr,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: pageUrl,
        },
        provider: {
          "@type": "TravelAgency",
          name: "Sova Tour & Travels",
          url: "https://sovatourandtravels.com",
          telephone: "+919474025173",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://sovatourandtravels.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `Tours from ${origin.name}`,
            item: `https://sovatourandtravels.com/tours-from-${origin.slug}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: data.region,
            item: `https://sovatourandtravels.com/tours-from-${origin.slug}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `${origin.name} to ${data.destinationName}`,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        ogUrl={pageUrl}
        canonical={pageUrl}
        ogImage={typeof data.heroImage === "string" ? data.heroImage : undefined}
        jsonLd={jsonLdSchema}
      />
      <Header />
      <WhatsAppButton />

      {/* Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="bg-muted/50 border-b py-3 px-4">
        <div className="container mx-auto flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <Link to={`/tours-from-${origin.slug}`} className="hover:text-primary transition-colors">Tours from {origin.name}</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-foreground font-medium">{data.region}</span>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-primary font-semibold">{origin.name} to {data.destinationName}</span>
        </div>
      </nav>

      {/* Interactive Departure City Switcher */}
      <div className="bg-card border-b py-2.5 px-4 shadow-sm sticky top-16 md:top-20 z-40">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
          <span className="font-bold text-foreground flex items-center gap-1 mr-2">
            <MapPin className="w-4 h-4 text-primary" /> Departure City:
          </span>
          {Object.values(ORIGIN_CITIES).map((c) => (
            <Link
              key={c.slug}
              to={`/tours/${c.slug}-to-${data.slug}`}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                c.slug === origin.slug
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[420px] max-h-[600px] flex items-end">
        <img
          src={data.heroImage}
          alt={`${origin.name} to ${data.destinationName} tour package`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        
        <div className="container mx-auto px-4 pb-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/90 text-secondary-foreground text-xs font-bold mb-4 shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Departures from {origin.name} & Kolkata
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
              {origin.name} to {data.destinationName} Tour Package
            </h1>
            <p className="text-base sm:text-lg text-white/90 mb-6 leading-relaxed">
              {data.tagline}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/20">
                <Clock className="w-4 h-4 text-secondary" />
                <span>Duration: <strong>{data.idealDuration}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/20">
                <Calendar className="w-4 h-4 text-secondary" />
                <span>Best Time: <strong>{data.bestTimeToVisit}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/20">
                <span className="text-secondary font-bold">Starts @ ₹{data.startingPriceInr.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left 2 Columns: Overview, Transport, Itinerary, Inclusions */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Overview */}
              <div className="bg-card rounded-2xl p-6 sm:p-8 card-shadow border border-border/60">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Why Book {data.destinationName} from {origin.name} with Sova Tours?
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {data.overview}
                </p>
              </div>

              {/* Local Pickup & Transport Guide */}
              <div className="bg-card rounded-2xl p-6 sm:p-8 card-shadow border border-border/60">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  Departure & Transport Guide from {origin.name}
                </h2>
                
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                    Available Pickup Points
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.pickupPoints.map((point, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium text-sm border border-primary/20"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        {point}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.travelRoutesFromRampurhat.byTrain && (
                    <div className="p-4 rounded-xl bg-muted/60 border border-border">
                      <div className="flex items-center gap-2 text-primary font-bold mb-2">
                        <Train className="w-5 h-5" />
                        <span>By Train Route</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {data.travelRoutesFromRampurhat.byTrain}
                      </p>
                    </div>
                  )}
                  {data.travelRoutesFromRampurhat.byFlight && (
                    <div className="p-4 rounded-xl bg-muted/60 border border-border">
                      <div className="flex items-center gap-2 text-secondary font-bold mb-2">
                        <Plane className="w-5 h-5" />
                        <span>By Flight Connection</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {data.travelRoutesFromRampurhat.byFlight}
                      </p>
                    </div>
                  )}
                  {data.travelRoutesFromRampurhat.byRoad && (
                    <div className="p-4 rounded-xl bg-muted/60 border border-border md:col-span-2">
                      <div className="flex items-center gap-2 text-accent font-bold mb-2">
                        <Car className="w-5 h-5" />
                        <span>By Road / Cab Transfer</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {data.travelRoutesFromRampurhat.byRoad}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Itinerary Summary */}
              <div className="bg-card rounded-2xl p-6 sm:p-8 card-shadow border border-border/60">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Itinerary Highlights
                </h2>
                <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-border/80">
                  {data.itineraryHighlights.map((item, idx) => (
                    <div key={idx} className="relative pl-10">
                      <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background shadow" />
                      <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-primary/10 text-primary mb-1">
                        {item.day}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions */}
              <div className="bg-card rounded-2xl p-6 sm:p-8 card-shadow border border-border/60">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Package Key Inclusions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.keyInclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-card rounded-2xl p-6 sm:p-8 card-shadow border border-border/60">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  Frequently Asked Questions
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Everything you need to know about booking {data.destinationName} tours from Rampurhat.
                </p>
                <Accordion type="single" collapsible className="w-full">
                  {data.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border/60">
                      <AccordionTrigger className="text-left font-semibold text-foreground py-4 hover:text-primary transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-4 text-sm">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

            </div>

            {/* Right Column: Sticky Booking Card & Help */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                
                {/* Price & Call to Action Card */}
                <div className="bg-gradient-hero rounded-2xl p-6 text-primary-foreground shadow-xl border border-primary/20">
                  <span className="inline-block text-xs font-bold uppercase tracking-wider bg-secondary/20 text-secondary px-3 py-1 rounded-full mb-3">
                    Limited Seats Available
                  </span>
                  <h3 className="text-xl font-bold mb-1">{data.destinationName} Tour Package</h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">Departing from {origin.name} & Kolkata</p>
                  
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <span className="text-xs text-primary-foreground/70 block">Starting From</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-secondary">
                        ₹{data.startingPriceInr.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-primary-foreground/80">/ person</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/919474025173?text=Hi%20Sova%20Tours!%20I%20am%20interested%20in%20the%20${encodeURIComponent(origin.name)}%20to%20${encodeURIComponent(data.destinationName)}%20tour%20package.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold h-12 text-base shadow-md gap-2">
                        WhatsApp for Custom Quote
                      </Button>
                    </a>

                    <a href="tel:+919474025173" className="block w-full">
                      <Button variant="outline" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold h-11 gap-2">
                        <Phone className="w-4 h-4" />
                        Call +91 9474025173
                      </Button>
                    </a>
                  </div>

                  <p className="text-center text-xs text-primary-foreground/70 mt-4">
                    ⚡ Instant WhatsApp response within 15 minutes
                  </p>
                </div>

                {/* Office Location Help Card */}
                <div className="bg-card rounded-2xl p-6 card-shadow border border-border/60">
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Visit Our Rampurhat Office
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Prefer discussing your travel itinerary face to face? Visit our office at:
                  </p>
                  <p className="text-xs font-semibold text-foreground bg-muted p-3 rounded-lg mb-4">
                    MNK Road, Bharsala More, Rampurhat, Birbhum, West Bengal 731224
                  </p>
                  <Link to="/contact">
                    <Button variant="ghost" size="sm" className="w-full text-primary hover:text-primary hover:bg-primary/5 text-xs font-bold">
                      View Google Maps & Office Hours →
                    </Button>
                  </Link>
                </div>

              </div>
            </div>

          </div>

          {/* Related Specific Tour Packages Grid */}
          {relatedTours.length > 0 && (
            <div className="mt-16 pt-12 border-t border-border">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Available {data.destinationName} Itineraries
              </h2>
              <p className="text-muted-foreground mb-8">
                Explore our exact scheduled tour departures available for booking.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTours.map((tour) => (
                  <TourCard key={tour.slug} tour={tour} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RampurhatToDestination;

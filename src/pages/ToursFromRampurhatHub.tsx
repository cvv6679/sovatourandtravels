import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Compass,
  ArrowRight,
  Clock,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import {
  rampurhatDestinations,
  DestinationRegion,
  ORIGIN_CITIES,
  getOriginBySlug,
} from "@/lib/rampurhatDestinationsData";

const ToursFromRampurhatHub = () => {
  const { originSlug } = useParams<{ originSlug?: string }>();
  const origin = getOriginBySlug(originSlug);

  const regions: DestinationRegion[] = [
    "North India",
    "East & Northeast India",
    "International",
    "Pilgrimage",
  ];

  const hubUrl = `https://sovatourandtravels.com/tours-from-${origin.slug}`;
  const hubTitle = `Tours from ${origin.name} (2026) | Budget Tour Packages | Sova Tours`;
  const hubDescription = `Explore 15+ curated domestic, international, and pilgrimage tour packages departing from ${origin.stationName} & Kolkata Airport. Kashmir, Darjeeling, Ladakh, Umrah & more with Sova Tour & Travels.`;

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: hubTitle,
        description: hubDescription,
        url: hubUrl,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: rampurhatDestinations.length,
          itemListElement: rampurhatDestinations.map((dest, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `https://sovatourandtravels.com/tours/${origin.slug}-to-${dest.slug}`,
            name: `${origin.name} to ${dest.destinationName} Tour Package`,
          })),
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
            item: hubUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={hubTitle}
        description={hubDescription}
        ogUrl={hubUrl}
        canonical={hubUrl}
        jsonLd={jsonLdSchema}
      />
      <Header />
      <WhatsAppButton />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-muted/50 border-b py-3 px-4">
        <div className="container mx-auto flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-primary font-semibold">Tours from {origin.name}</span>
        </div>
      </nav>

      {/* City Switcher Bar */}
      <div className="bg-card border-b py-3 px-4 shadow-sm sticky top-16 md:top-20 z-40">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
          <span className="font-bold text-foreground flex items-center gap-1 mr-2">
            <MapPin className="w-4 h-4 text-primary" /> Departure City:
          </span>
          {Object.values(ORIGIN_CITIES).map((c) => (
            <Link
              key={c.slug}
              to={`/tours-from-${c.slug}`}
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

      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24 text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              {origin.taglineSuffix}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Tour Packages Departing From <span className="text-secondary">{origin.name}</span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed mb-8">
              Seamlessly coordinated train, flight, and road journeys departing from {origin.stationName} & Kolkata. Browse all destinations grouped by region below.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" /> Guaranteed Low Prices
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" /> Complete Train & Flight Support
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" /> 24/7 Local Assistance
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Regional Grouping Sections */}
      <section className="section-padding">
        <div className="container mx-auto px-4 space-y-16">
          {regions.map((region) => {
            const dests = rampurhatDestinations.filter((d) => d.region === region);
            if (dests.length === 0) return null;

            return (
              <div key={region} className="space-y-6">
                <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                      Region Directory
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                      {region} Packages from {origin.name}
                    </h2>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Showing {dests.length} {dests.length === 1 ? "destination" : "destinations"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dests.map((dest) => (
                    <Link
                      key={dest.slug}
                      to={`/tours/${origin.slug}-to-${dest.slug}`}
                      className="group bg-card rounded-2xl overflow-hidden card-shadow hover:shadow-2xl transition-all duration-300 border border-border/60 flex flex-col"
                    >
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={dest.heroImage}
                          alt={`${origin.name} to ${dest.destinationName}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-3 left-3 bg-secondary/90 text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full shadow">
                          {dest.region}
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                          <span className="text-xs font-medium flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-secondary" /> {dest.idealDuration}
                          </span>
                          <span className="text-sm font-extrabold text-secondary">
                            ₹{dest.startingPriceInr.toLocaleString("en-IN")}+
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2 flex items-center justify-between">
                            <span>{origin.name} to {dest.destinationName}</span>
                            <ArrowRight className="w-5 h-5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                            {dest.tagline}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-primary" /> Departs: {origin.stationCode} / CCU
                          </span>
                          <span className="font-bold text-primary">View Itinerary →</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SEO Content Footer */}
      <section className="bg-muted/40 py-12 border-t border-border">
        <div className="container mx-auto px-4 max-w-4xl prose prose-sm text-muted-foreground">
          <h3 className="text-foreground font-display text-lg font-bold">
            About Tour Packages from {origin.name}
          </h3>
          <p>
            Sova Tour & Travels serves travelers departing from {origin.name}, {origin.stationName}, and surrounding regions. Whether you are traveling by train from {origin.stationCode} or catching flights via Kolkata Airport (CCU), our team handles every detail from home departure to return.
          </p>
          <p>
            With our physical office presence in Birbhum and dedicated support networks across West Bengal, we ensure transparent, affordable pricing with zero hidden costs.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ToursFromRampurhatHub;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { format } from "date-fns";

const Blog = () => {
  const { data: posts, isLoading } = useBlogPosts();

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Sova Tour & Travels Blog",
    url: "https://sovatourandtravels.lovable.app/blog",
    publisher: {
      "@type": "TravelAgency",
      name: "Sova Tour & Travels",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Travel Blog - Sova Tour & Travels"
        description="Read travel guides, tips, and stories from Sova Tour & Travels. Discover the best destinations across India and beyond."
        ogUrl="https://sovatourandtravels.lovable.app/blog"
        canonical="https://sovatourandtravels.lovable.app/blog"
        jsonLd={orgSchema}
      />
      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Travel Blog
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Travel guides, tips, and stories to inspire your next adventure
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card rounded-2xl overflow-hidden card-shadow group"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="aspect-video overflow-hidden">
                      {post.featured_image_url ? (
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-hero flex items-center justify-center">
                          <span className="text-primary-foreground/60 text-sm">No image</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(post.publish_date), "MMM dd, yyyy")}
                      </span>
                      {post.category && (
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <h2 className="font-display text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    <Link to={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm" className="gap-1 p-0 h-auto text-primary hover:text-primary/80">
                        Read More <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;

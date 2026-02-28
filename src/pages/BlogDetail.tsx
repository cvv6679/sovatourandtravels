import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag, Loader2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import { useBlogPost } from "@/hooks/useBlogPosts";
import { format } from "date-fns";

const BlogDetail = () => {
  const { slug } = useParams();
  const { data: post, isLoading } = useBlogPost(slug || "");

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

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const postUrl = `https://sovatourandtravels.com/blog/${post.slug}`;
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || "",
    image: post.og_image || post.featured_image_url || "",
    author: { "@type": "Person", name: post.author || "Sova Tours" },
    publisher: {
      "@type": "Organization",
      name: "Sova Tour & Travels",
      logo: { "@type": "ImageObject", url: "https://sovatourandtravels.com/logo.PNG" },
    },
    datePublished: post.publish_date,
    dateModified: post.updated_at,
    mainEntityOfPage: postUrl,
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: post.title, url: postUrl });
    } else {
      await navigator.clipboard.writeText(postUrl);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={post.meta_title || `${post.title} - Sova Tour & Travels`}
        description={post.meta_description || post.excerpt || post.title}
        ogTitle={post.og_title || post.title}
        ogDescription={post.og_description || post.excerpt || ""}
        ogImage={post.og_image || post.featured_image_url || undefined}
        ogUrl={postUrl}
        ogType="article"
        canonical={postUrl}
        jsonLd={blogPostSchema}
      />
      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <section className="relative">
        {post.featured_image_url ? (
          <div className="h-[40vh] md:h-[50vh]">
            <img
              src={post.featured_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
          </div>
        ) : (
          <div className="h-[30vh] bg-gradient-hero" />
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(post.publish_date), "MMMM dd, yyyy")}
                </span>
                {post.author && (
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                )}
                {post.category && (
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4" />
                    {post.category}
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="prose prose-lg max-w-none mx-auto text-foreground
                prose-headings:font-display prose-headings:text-foreground prose-headings:leading-tight
                prose-h1:text-3xl prose-h1:md:text-4xl prose-h1:mt-10 prose-h1:mb-5
                prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
                prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-5
                prose-a:text-primary prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-primary/80
                prose-strong:text-foreground
                prose-ul:text-muted-foreground prose-ul:my-4 prose-ul:pl-6
                prose-ol:text-muted-foreground prose-ol:my-4 prose-ol:pl-6
                prose-li:mb-2
                prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-md prose-blockquote:not-italic
                prose-table:border-collapse prose-table:w-full prose-table:my-6
                prose-th:border prose-th:border-border prose-th:bg-muted prose-th:px-4 prose-th:py-2.5 prose-th:text-left prose-th:font-semibold prose-th:text-foreground
                prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-2.5 prose-td:text-muted-foreground
                prose-hr:border-border prose-hr:my-8"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />

            {/* Share */}
            <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Share this article</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm">WhatsApp</Button>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm">Facebook</Button>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm">Twitter</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;

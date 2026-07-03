import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  canonical?: string;
  jsonLd?: object | object[];
}

const cleanUrl = (url?: string) => {
  if (!url) return undefined;
  return url.replace(/https?:\/\/sovatourandtravels\.lovable\.app/g, "https://sovatourandtravels.com");
};

const SEOHead = ({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = "https://sovatourandtravels.com/logo.PNG",
  ogUrl,
  ogType = "website",
  canonical,
  jsonLd,
}: SEOHeadProps) => {
  const sanitizedOgUrl = cleanUrl(ogUrl);
  const sanitizedCanonical = cleanUrl(canonical);
  const sanitizedOgImage = cleanUrl(ogImage) || "https://sovatourandtravels.com/logo.PNG";

  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", ogTitle || title, true);
    setMeta("og:description", ogDescription || description, true);
    setMeta("og:image", sanitizedOgImage, true);
    if (sanitizedOgUrl) setMeta("og:url", sanitizedOgUrl, true);
    setMeta("og:type", ogType, true);
    setMeta("og:site_name", "Sova Tour & Travels", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", ogTitle || title);
    setMeta("twitter:description", ogDescription || description);
    setMeta("twitter:image", sanitizedOgImage);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (sanitizedCanonical) {
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = sanitizedCanonical;
    }

    // JSON-LD
    const existingLd = document.querySelector('script[data-seo-jsonld]');
    if (existingLd) existingLd.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const ld = document.querySelector('script[data-seo-jsonld]');
      if (ld) ld.remove();
    };
  }, [title, description, ogTitle, ogDescription, ogImage, ogUrl, canonical, jsonLd]);

  return null;
};

export default SEOHead;

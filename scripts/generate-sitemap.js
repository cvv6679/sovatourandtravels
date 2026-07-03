import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const domain = "https://sovatourandtravels.com";
const currentDate = new Date().toISOString().split('T')[0];

const originCities = ['rampurhat', 'kolkata', 'bolpur', 'suri', 'asansol', 'durgapur', 'maldah'];

// Extract tour slugs from src/lib/tourData.ts
let tourSlugs = [];
try {
  const tourDataContent = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'tourData.ts'), 'utf-8');
  const slugMatches = [...tourDataContent.matchAll(/slug:\s*["']([^"']+)["']/g)];
  tourSlugs = [...new Set(slugMatches.map(m => m[1]))];
} catch (e) {
  console.warn("Could not parse tourData.ts for slugs:", e.message);
}

// Extract programmatic destination slugs
let destinationSlugs = [];
try {
  const rampurhatDataContent = fs.readFileSync(path.join(rootDir, 'src', 'lib', 'rampurhatDestinationsData.ts'), 'utf-8');
  const slugMatches = [...rampurhatDataContent.matchAll(/slug:\s*["']([^"']+)["']/g)];
  destinationSlugs = [...new Set(slugMatches.map(m => m[1]))].filter(s => !originCities.includes(s));
} catch (e) {
  console.warn("Could not parse rampurhatDestinationsData.ts for slugs:", e.message);
}

const staticRoutes = [
  { url: "/", priority: "1.0", changefreq: "daily" },
  { url: "/packages", priority: "0.9", changefreq: "daily" },
  { url: "/about", priority: "0.8", changefreq: "monthly" },
  { url: "/contact", priority: "0.8", changefreq: "monthly" },
  { url: "/blog", priority: "0.8", changefreq: "weekly" },
  { url: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { url: "/refund-policy", priority: "0.3", changefreq: "yearly" },
  { url: "/terms-conditions", priority: "0.3", changefreq: "yearly" },
];

let totalUrls = 0;
let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xmlContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

// Static routes
staticRoutes.forEach(route => {
  xmlContent += `  <url>\n`;
  xmlContent += `    <loc>${domain}${route.url}</loc>\n`;
  xmlContent += `    <lastmod>${currentDate}</lastmod>\n`;
  xmlContent += `    <changefreq>${route.changefreq}</changefreq>\n`;
  xmlContent += `    <priority>${route.priority}</priority>\n`;
  xmlContent += `  </url>\n`;
  totalUrls++;
});

// Origin Hub Routes (/tours-from-rampurhat, /tours-from-kolkata, etc.)
originCities.forEach(origin => {
  xmlContent += `  <url>\n`;
  xmlContent += `    <loc>${domain}/tours-from-${origin}</loc>\n`;
  xmlContent += `    <lastmod>${currentDate}</lastmod>\n`;
  xmlContent += `    <changefreq>daily</changefreq>\n`;
  xmlContent += `    <priority>0.9</priority>\n`;
  xmlContent += `  </url>\n`;
  totalUrls++;
});

// Programmatic Routes Across All Origin Cities (/tours/kolkata-to-kashmir, etc.)
originCities.forEach(origin => {
  destinationSlugs.forEach(dest => {
    xmlContent += `  <url>\n`;
    xmlContent += `    <loc>${domain}/tours/${origin}-to-${dest}</loc>\n`;
    xmlContent += `    <lastmod>${currentDate}</lastmod>\n`;
    xmlContent += `    <changefreq>weekly</changefreq>\n`;
    xmlContent += `    <priority>0.9</priority>\n`;
    xmlContent += `  </url>\n`;
    totalUrls++;
  });
});

// Tour detail routes
tourSlugs.forEach(slug => {
  if (slug === 'kashmir' || slug === 'ladakh') {
    xmlContent += `  <url>\n`;
    xmlContent += `    <loc>${domain}/destinations/${slug}</loc>\n`;
    xmlContent += `    <lastmod>${currentDate}</lastmod>\n`;
    xmlContent += `    <changefreq>weekly</changefreq>\n`;
    xmlContent += `    <priority>0.8</priority>\n`;
    xmlContent += `  </url>\n`;
    totalUrls++;
  }
  xmlContent += `  <url>\n`;
  xmlContent += `    <loc>${domain}/tour/${slug}</loc>\n`;
  xmlContent += `    <lastmod>${currentDate}</lastmod>\n`;
  xmlContent += `    <changefreq>weekly</changefreq>\n`;
  xmlContent += `    <priority>0.9</priority>\n`;
  xmlContent += `  </url>\n`;
  totalUrls++;
});

xmlContent += `</urlset>\n`;

const publicSitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
fs.writeFileSync(publicSitemapPath, xmlContent, 'utf-8');
console.log(`Successfully generated sitemap at ${publicSitemapPath} with ${totalUrls} URLs.`);

const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  const distSitemapPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(distSitemapPath, xmlContent, 'utf-8');
  console.log(`Successfully copied sitemap to ${distSitemapPath}`);
}

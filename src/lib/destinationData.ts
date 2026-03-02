import destGoa from "@/assets/dest-goa.jpg";
import destKashmir from "@/assets/dest-kashmir.jpg";
import destBangkok from "@/assets/dest-bangkok.jpg";
import destDubai from "@/assets/dest-dubai.jpg";
import destEurope from "@/assets/dest-europe.jpg";
import destKerala from "@/assets/dest-kerala.jpg";
import destMalaysia from "@/assets/dest-malaysia.jpg";
import destPhuket from "@/assets/dest-phuket.jpg";

export interface DestinationSpot {
  name: string;
  description: string;
  image: string;
}

export interface Destination {
  slug: string;
  name: string;
  tagline: string;
  cardImage: string;
  heroImage: string;
  bestTime: string;
  idealDuration: string;
  overview: string;
  topSpots: DestinationSpot[];
  thingsToDo: string[];
  travelTips: string[];
  gallery: string[];
  seoTitle: string;
  seoDescription: string;
  content: string;
}

export const destinations: Destination[] = [
  {
    slug: "goa",
    name: "Goa",
    tagline: "Sun, Sand & Vibrant Culture",
    cardImage: destGoa,
    heroImage: destGoa,
    bestTime: "October to March",
    idealDuration: "4–6 Days",
    overview: `Goa, India's smallest state on the western coast, is a paradise that seamlessly blends Portuguese colonial heritage with tropical Indian charm. Known for its pristine beaches stretching along the Arabian Sea, vibrant nightlife, centuries-old churches, and lush spice plantations, Goa offers an experience unlike any other destination in India. Whether you're a backpacker seeking adventure, a couple looking for romance, or a family wanting relaxation, Goa has something magical for everyone.

The state is divided into North Goa and South Goa, each offering a distinct character. North Goa buzzes with energy — think beach shacks, flea markets, and trance parties. South Goa, on the other hand, is serene and luxurious, with quieter beaches and upscale resorts. Beyond the beaches, Goa's Latin Quarter in Fontainhas, its wildlife sanctuaries, and its world-famous seafood cuisine make it a multifaceted destination.

Goa's unique identity stems from over 450 years of Portuguese rule, visible in its baroque churches, colorful villas, and the local Konkani-Portuguese fusion culture. The Basilica of Bom Jesus, a UNESCO World Heritage Site, houses the mortal remains of St. Francis Xavier and draws pilgrims from around the globe. Meanwhile, the vibrant Carnival in February transforms the state into a riot of color, music, and dance.

For food enthusiasts, Goa is a culinary haven. From fish curry rice — the staple Goan meal — to pork vindaloo, bebinca dessert, and feni (cashew liquor), the flavors here are bold and unforgettable. The beach shacks serving fresh seafood with your toes in the sand are an experience in themselves.`,
    topSpots: [
      { name: "Basilica of Bom Jesus", description: "UNESCO World Heritage church housing St. Francis Xavier's remains, a masterpiece of Baroque architecture.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&h=300&fit=crop&q=80" },
      { name: "Dudhsagar Falls", description: "A breathtaking four-tiered waterfall on the Mandovi River, one of India's tallest at 310 meters.", image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&h=300&fit=crop&q=80" },
      { name: "Anjuna Beach", description: "Famous for its Wednesday flea market, trance parties, and stunning rocky coastline.", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=300&fit=crop&q=80" },
      { name: "Fort Aguada", description: "A well-preserved 17th-century Portuguese fort offering panoramic views of the Arabian Sea.", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop&q=80" },
    ],
    thingsToDo: [
      "Relax on Palolem and Calangute beaches",
      "Explore Old Goa's heritage churches",
      "Take a spice plantation tour in Ponda",
      "Go dolphin spotting on a boat cruise",
      "Visit the Saturday Night Market at Arpora",
      "Try water sports — parasailing, jet skiing, scuba diving",
      "Explore Fontainhas, the Latin Quarter",
      "Enjoy a sunset cruise on the Mandovi River",
    ],
    travelTips: [
      "Rent a scooter for the best way to explore — roads are scenic and manageable.",
      "Carry sunscreen and stay hydrated — the tropical sun is intense.",
      "Bargain at flea markets; prices are usually inflated for tourists.",
      "Avoid the monsoon (June–September) unless you love dramatic rains and empty beaches.",
      "Try local restaurants over touristy ones for authentic Goan flavors.",
      "Book accommodations in advance during peak season (December–January).",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=600&fit=crop&q=80",
    ],
    seoTitle: "Goa Travel Guide - Best Beaches, Things to Do & Travel Tips",
    seoDescription: "Complete Goa travel guide with best beaches, top attractions, things to do, travel tips, and ideal itinerary. Plan your perfect Goa trip with Sova Tours.",
    content: "",
  },
  {
    slug: "kashmir",
    name: "Kashmir",
    tagline: "Paradise on Earth",
    cardImage: destKashmir,
    heroImage: destKashmir,
    bestTime: "March to October",
    idealDuration: "5–7 Days",
    overview: `Kashmir, often called "Paradise on Earth," is a land of breathtaking beauty nestled in the northernmost part of India. From the serene Dal Lake with its iconic houseboats and shikaras to the snow-capped peaks of the Himalayas, Kashmir offers a visual spectacle that has inspired poets, artists, and travelers for centuries. The valley's lush meadows, pristine rivers, and ancient Mughal gardens create a landscape so stunning it feels almost surreal.

Srinagar, the summer capital of Jammu & Kashmir, is the gateway to this paradise. The city's floating vegetable markets, wooden mosques, and papier-mâché craftwork reflect a rich cultural heritage. A stay on a houseboat on Dal Lake — complete with intricately carved cedarwood interiors — is an experience found nowhere else on Earth.

Beyond Srinagar, the valley unfolds into destinations of extraordinary beauty. Gulmarg transforms into Asia's premier skiing destination in winter and a wildflower meadow in summer. Pahalgam, the "Valley of Shepherds," offers pristine river valleys and serves as the base for the holy Amarnath Yatra. Sonamarg, the "Meadow of Gold," lives up to its name with alpine lakes and glaciers.

Kashmiri cuisine is another highlight — the traditional Wazwan feast features 36 courses of aromatic, richly spiced dishes. The famous Rogan Josh, Yakhni, and Kahwa tea are culinary treasures. The warmth and hospitality of Kashmiri people make every visitor feel at home in this mountain paradise.`,
    topSpots: [
      { name: "Dal Lake", description: "Iconic lake with ornate houseboats, floating gardens, and mesmerizing shikara rides at sunrise.", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=500&h=300&fit=crop&q=80" },
      { name: "Gulmarg", description: "World-famous ski resort with the highest gondola ride in Asia and stunning meadows.", image: "https://images.unsplash.com/photo-1580289648711-3501e91e1e00?w=500&h=300&fit=crop&q=80" },
      { name: "Pahalgam", description: "Valley of Shepherds offering river rafting, horse riding, and the base for Amarnath Yatra.", image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=500&h=300&fit=crop&q=80" },
      { name: "Sonamarg", description: "Golden Meadow at 2800m altitude with Thajiwas Glacier and crystal-clear streams.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop&q=80" },
    ],
    thingsToDo: [
      "Take a shikara ride on Dal Lake at sunrise",
      "Stay in a traditional Kashmiri houseboat",
      "Ski or snowboard in Gulmarg (December–March)",
      "Visit the Mughal Gardens — Shalimar, Nishat, and Chashme Shahi",
      "Trek to the Thajiwas Glacier from Sonamarg",
      "Shop for Pashmina shawls and walnut wood crafts",
      "Try an authentic Wazwan feast",
      "Visit the ancient Shankaracharya Temple",
    ],
    travelTips: [
      "Layer your clothing — temperatures can change dramatically through the day.",
      "Book houseboats directly for better rates and authentic experiences.",
      "Always carry cash; card acceptance is limited in smaller towns.",
      "Hire a local guide for treks — they know the terrain and weather patterns.",
      "Spring (March–May) offers tulip gardens; autumn (September–November) has golden chinar leaves.",
      "Respect local customs and dress modestly when visiting religious sites.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580289648711-3501e91e1e00?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=600&fit=crop&q=80",
    ],
    seoTitle: "Kashmir Travel Guide - Paradise on Earth | Best Places & Tips",
    seoDescription: "Explore Kashmir with our complete travel guide. Dal Lake houseboats, Gulmarg skiing, Pahalgam valleys, best time to visit, and expert travel tips.",
    content: "",
  },
  {
    slug: "bangkok",
    name: "Bangkok",
    tagline: "The City of Angels",
    cardImage: destBangkok,
    heroImage: destBangkok,
    bestTime: "November to February",
    idealDuration: "3–5 Days",
    overview: `Bangkok, the pulsating capital of Thailand, is a city of contrasts where ancient temples stand alongside gleaming skyscrapers, and street food stalls serve dishes that rival five-star restaurants. Known as "Krung Thep" (City of Angels) to locals, Bangkok is a sensory overload in the best possible way — the aromas of pad thai sizzling in woks, the glitter of golden spires, and the buzz of tuk-tuks navigating labyrinthine streets.

The city is home to over 400 Buddhist temples (wats), each more ornate than the last. The Grand Palace, a dazzling complex that served as the royal residence for 150 years, houses the revered Emerald Buddha. Nearby, Wat Pho shelters a massive 46-meter reclining Buddha covered in gold leaf and is also the birthplace of traditional Thai massage.

Bangkok's shopping scene ranges from luxury malls like Siam Paragon to the legendary Chatuchak Weekend Market, one of the world's largest outdoor markets with over 15,000 stalls. The city's nightlife is equally diverse, from rooftop bars offering panoramic skyline views to the vibrant chaos of Khao San Road.

But perhaps Bangkok's greatest treasure is its food. The city has been consistently ranked among the world's best food destinations. From Michelin-starred street food vendors like Jay Fai to humble pad thai stalls on every corner, Bangkok rewards the adventurous eater at every turn.`,
    topSpots: [
      { name: "Grand Palace", description: "A dazzling complex of buildings that served as the official residence of Thai kings since 1782.", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=500&h=300&fit=crop&q=80" },
      { name: "Wat Arun", description: "The Temple of Dawn, adorned with colorful porcelain and offering stunning riverside views.", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=500&h=300&fit=crop&q=80" },
      { name: "Chatuchak Market", description: "One of the world's largest weekend markets with over 15,000 stalls selling everything.", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500&h=300&fit=crop&q=80" },
      { name: "Khao San Road", description: "The legendary backpacker hub famous for its vibrant nightlife and eclectic energy.", image: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=300&fit=crop&q=80" },
    ],
    thingsToDo: [
      "Visit the Grand Palace and Wat Phra Kaew",
      "Take a long-tail boat through the Chao Phraya River canals",
      "Explore Chatuchak Weekend Market",
      "Get a traditional Thai massage at Wat Pho",
      "Experience rooftop dining at Sky Bar",
      "Try street food at Yaowarat (Chinatown)",
      "Visit the Jim Thompson House Museum",
      "Shop at MBK Center and Siam Paragon",
    ],
    travelTips: [
      "Use the BTS Skytrain and MRT for quick, affordable transportation.",
      "Always negotiate tuk-tuk fares before getting in.",
      "Dress modestly when visiting temples — cover shoulders and knees.",
      "Street food is safe and delicious — follow the crowds for the best stalls.",
      "Download Grab (Southeast Asia's Uber) for reliable rides.",
      "Carry a small umbrella — sudden rain showers are common even in dry season.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=600&fit=crop&q=80",
    ],
    seoTitle: "Bangkok Travel Guide - Temples, Street Food & Nightlife Tips",
    seoDescription: "Plan your Bangkok trip with our complete guide. Grand Palace, street food tours, Chatuchak Market, nightlife, travel tips, and best time to visit.",
    content: "",
  },
  {
    slug: "dubai",
    name: "Dubai",
    tagline: "City of the Future",
    cardImage: destDubai,
    heroImage: destDubai,
    bestTime: "November to March",
    idealDuration: "4–6 Days",
    overview: `Dubai, the crown jewel of the United Arab Emirates, is a city that defies imagination. Rising from the Arabian Desert, this ultramodern metropolis is home to the world's tallest building (Burj Khalifa), the largest shopping mall (Dubai Mall), and man-made islands visible from space (Palm Jumeirah). Yet beneath its futuristic exterior lies a city deeply rooted in Bedouin traditions and Arabic hospitality.

The city's transformation from a small fishing village to a global powerhouse in just five decades is one of the most remarkable urban stories in history. Today, Dubai attracts over 16 million visitors annually with its blend of luxury shopping, cutting-edge architecture, golden beaches, and desert adventures.

Dubai's dining scene is a microcosm of the world, with over 200 nationalities calling the city home. From Michelin-starred restaurants in the Burj Al Arab to aromatic shawarma stands in Deira, the culinary diversity is staggering. The Gold Souk and Spice Souk in old Dubai offer a sensory journey through Arabian commerce, while the Dubai Fountain puts on a nightly spectacular of water, light, and music.

For adventure seekers, Dubai delivers in spectacular fashion. Desert safaris with dune bashing, sandboarding, and Bedouin-style camping under the stars are quintessential experiences. The city also offers indoor skiing at Ski Dubai, skydiving over the Palm, and shark diving at the Dubai Aquarium.`,
    topSpots: [
      { name: "Burj Khalifa", description: "The world's tallest building at 828 meters, offering breathtaking observation deck views.", image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=500&h=300&fit=crop&q=80" },
      { name: "Palm Jumeirah", description: "Iconic man-made island shaped like a palm tree, home to luxury resorts and Aquaventure.", image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=500&h=300&fit=crop&q=80" },
      { name: "Dubai Marina", description: "Stunning waterfront district with skyscrapers, dining, and yacht cruises.", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=300&fit=crop&q=80" },
      { name: "Old Dubai", description: "Historic Al Fahidi district with traditional wind-tower architecture and the Dubai Museum.", image: "https://images.unsplash.com/photo-1548180823-2a2c59c54ae4?w=500&h=300&fit=crop&q=80" },
    ],
    thingsToDo: [
      "Visit the observation deck of Burj Khalifa",
      "Take a desert safari with dune bashing and BBQ dinner",
      "Shop at the Dubai Mall and watch the fountain show",
      "Explore the Gold and Spice Souks in Deira",
      "Cruise Dubai Marina on a traditional dhow",
      "Visit Atlantis Aquaventure on Palm Jumeirah",
      "Experience indoor skiing at Ski Dubai",
      "Explore the Museum of the Future",
    ],
    travelTips: [
      "Dubai is very walkable inside malls but use the Metro for longer distances.",
      "Dress modestly outside beach/pool areas — cover shoulders and knees in public.",
      "Alcohol is only served in licensed establishments (hotels, restaurants).",
      "Friday is the holy day — some attractions may have modified hours.",
      "Carry cash for souks; cards work everywhere else.",
      "Book popular attractions online in advance to skip long queues.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548180823-2a2c59c54ae4?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=600&fit=crop&q=80",
    ],
    seoTitle: "Dubai Travel Guide - Burj Khalifa, Desert Safari & Shopping Tips",
    seoDescription: "Complete Dubai travel guide covering Burj Khalifa, desert safaris, Palm Jumeirah, shopping, food, and expert travel tips for your UAE trip.",
    content: "",
  },
  {
    slug: "europe",
    name: "Europe",
    tagline: "History, Art & Endless Charm",
    cardImage: destEurope,
    heroImage: destEurope,
    bestTime: "April to October",
    idealDuration: "10–15 Days",
    overview: `Europe, a continent steeped in millennia of history, art, and culture, is the ultimate dream destination for travelers from around the world. From the romantic boulevards of Paris to the ancient ruins of Rome, the fairy-tale castles of Switzerland to the vibrant nightlife of Barcelona, Europe offers an unparalleled diversity of experiences packed into a relatively compact geography.

A European tour is a journey through time itself. Walk the cobblestone streets of Prague, marvel at Michelangelo's Sistine Chapel ceiling in Vatican City, cruise the canals of Amsterdam, or stand atop the Eiffel Tower watching Paris glitter at night. Each country, each city has its own distinct personality, cuisine, and charm.

The Schengen visa system makes multi-country travel remarkably convenient. In a single trip, you can experience the precision of Swiss engineering, the passion of Spanish flamenco, the grandeur of Austrian opera, and the laid-back cafe culture of Italy. High-speed rail networks like the Eurostar and TGV connect major cities, making country-hopping an adventure in itself.

European cuisine is a journey unto itself — from French patisseries and Italian trattorias to German beer halls and Greek tavernas. Each region takes fierce pride in its culinary traditions, and food markets from La Boqueria in Barcelona to Borough Market in London are destinations in their own right.`,
    topSpots: [
      { name: "Paris, France", description: "The City of Light, home to the Eiffel Tower, Louvre Museum, and world-class cuisine.", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=300&fit=crop&q=80" },
      { name: "Rome, Italy", description: "The Eternal City with the Colosseum, Vatican City, and 2,500 years of history.", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&h=300&fit=crop&q=80" },
      { name: "Swiss Alps", description: "Breathtaking mountain scenery with pristine lakes, chocolate, and precision railways.", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=500&h=300&fit=crop&q=80" },
      { name: "Barcelona, Spain", description: "Gaudí's architectural masterpieces, vibrant nightlife, and Mediterranean beaches.", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=500&h=300&fit=crop&q=80" },
    ],
    thingsToDo: [
      "Visit the Eiffel Tower and Louvre Museum in Paris",
      "Explore the Colosseum and Vatican in Rome",
      "Take a scenic train through the Swiss Alps",
      "Cruise the canals of Amsterdam or Venice",
      "Experience Gaudí's Sagrada Familia in Barcelona",
      "Visit the Acropolis in Athens",
      "Explore Prague's Old Town and castle district",
      "Enjoy a traditional Oktoberfest experience in Munich",
    ],
    travelTips: [
      "Apply for a Schengen visa well in advance — processing takes 2-4 weeks.",
      "Get a Eurail pass for flexible, cost-effective train travel between countries.",
      "Travel during shoulder season (April–May, September–October) for fewer crowds and lower prices.",
      "Learn a few basic phrases in each country's language — locals appreciate the effort.",
      "Carry a universal power adapter — plug types vary across European countries.",
      "Book popular museums and attractions online to avoid long queues.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1473951574080-01fe45ec8571?w=600&h=600&fit=crop&q=80",
    ],
    seoTitle: "Europe Travel Guide - Paris, Rome, Switzerland & More",
    seoDescription: "Plan your Europe trip with our comprehensive guide. Paris, Rome, Swiss Alps, Barcelona, best time to visit, Schengen visa tips, and travel advice.",
    content: "",
  },
  {
    slug: "kerala",
    name: "Kerala",
    tagline: "God's Own Country",
    cardImage: destKerala,
    heroImage: destKerala,
    bestTime: "September to March",
    idealDuration: "5–7 Days",
    overview: `Kerala, nestled along India's southwestern Malabar Coast, is a tropical paradise that has earned the moniker "God's Own Country" — and for good reason. This slender state stretches between the Arabian Sea and the Western Ghats, creating a landscape of extraordinary beauty: palm-fringed backwaters, mist-covered hill stations, pristine beaches, and lush tea and spice plantations.

The Kerala backwaters are the state's crown jewel — a 900-kilometer network of interconnected canals, rivers, lakes, and inlets that form a unique ecosystem. A houseboat cruise through the backwaters of Alleppey (Alappuzha) is one of India's most iconic travel experiences. Gliding past coconut groves, rice paddies, and tiny villages where life moves at its own gentle pace is profoundly relaxing.

Munnar, a former British hill station perched at 1,500 meters, is blanketed with emerald tea plantations that stretch to the horizon. The cool mountain air, misty mornings, and the sight of tea pickers moving through orderly green rows create an almost dreamlike atmosphere. Nearby, Eravikulam National Park is home to the endangered Nilgiri tahr.

Kerala is also the birthplace of Ayurveda, the ancient Indian system of medicine. Ayurvedic resorts across the state offer authentic treatments — from rejuvenation therapies (Panchakarma) to stress-relief massages — using centuries-old techniques and locally sourced herbs.`,
    topSpots: [
      { name: "Alleppey Backwaters", description: "Cruise on a traditional houseboat through 900km of interconnected canals and lagoons.", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=300&fit=crop&q=80" },
      { name: "Munnar", description: "Misty hill station covered in emerald tea plantations with cool mountain air.", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=300&fit=crop&q=80" },
      { name: "Kovalam Beach", description: "Crescent-shaped beach known for its lighthouse, Ayurvedic treatments, and gentle waves.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop&q=80" },
      { name: "Periyar Wildlife Sanctuary", description: "Boat safari through a lake surrounded by forests teeming with elephants and tigers.", image: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=500&h=300&fit=crop&q=80" },
    ],
    thingsToDo: [
      "Take an overnight houseboat cruise in Alleppey",
      "Visit tea plantations and factories in Munnar",
      "Experience an authentic Ayurvedic spa treatment",
      "Watch a Kathakali dance performance",
      "Explore Fort Kochi's colonial heritage",
      "Go on a wildlife safari in Periyar",
      "Relax on Varkala's cliffside beach",
      "Try a traditional Sadya feast served on banana leaves",
    ],
    travelTips: [
      "Book houseboats for weekdays — weekends are crowded and pricier.",
      "Carry mosquito repellent, especially near the backwaters.",
      "Monsoon season (June–August) is great for Ayurveda but not ideal for sightseeing.",
      "Kerala cuisine is heavily coconut-based — try appam, fish molee, and payasam.",
      "Wear modest clothing when visiting temples.",
      "KSRTC buses are efficient and cover the entire state affordably.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=600&fit=crop&q=80",
    ],
    seoTitle: "Kerala Travel Guide - Backwaters, Munnar & Ayurveda Tips",
    seoDescription: "Discover Kerala with our travel guide. Alleppey backwaters, Munnar tea gardens, Ayurvedic retreats, beaches, and expert tips for God's Own Country.",
    content: "",
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    tagline: "Truly Asia",
    cardImage: destMalaysia,
    heroImage: destMalaysia,
    bestTime: "March to October",
    idealDuration: "5–7 Days",
    overview: `Malaysia, the Southeast Asian gem that proudly declares itself "Truly Asia," is a melting pot of Malay, Chinese, Indian, and indigenous cultures that creates one of the most diverse and fascinating travel destinations in the world. From the soaring Petronas Twin Towers to ancient rainforests older than the Amazon, Malaysia packs an extraordinary range of experiences into a country roughly the size of Japan.

Kuala Lumpur (KL), the vibrant capital, is a city of striking contrasts. The iconic Petronas Twin Towers — once the world's tallest buildings — pierce the sky alongside colonial-era buildings and bustling street markets. The city's food scene is legendary, with hawker centers serving everything from nasi lemak (coconut rice) to char kway teow and roti canai at astonishingly low prices.

Beyond KL, Malaysia reveals its natural wonders. The islands of Langkawi and Penang offer turquoise waters, mangrove forests, and some of Asia's best beaches. Borneo's Malaysian states of Sabah and Sarawak are home to ancient rainforests, orangutans, pygmy elephants, and the mighty Mount Kinabalu — Southeast Asia's highest peak.

Penang, the food capital of Malaysia, is a UNESCO World Heritage city where colonial architecture meets vibrant street art. Georgetown's streets are a living gallery, with murals and wrought-iron caricatures telling stories of the city's multicultural past.`,
    topSpots: [
      { name: "Petronas Twin Towers", description: "Iconic 452-meter twin skyscrapers with a sky bridge and observation deck.", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=500&h=300&fit=crop&q=80" },
      { name: "Langkawi", description: "Archipelago of 99 islands with duty-free shopping, beaches, and sky bridge.", image: "https://images.unsplash.com/photo-1609766857326-18a1dd4c8a81?w=500&h=300&fit=crop&q=80" },
      { name: "Penang Georgetown", description: "UNESCO Heritage city with colonial charm, street art, and legendary food.", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=500&h=300&fit=crop&q=80" },
      { name: "Batu Caves", description: "Limestone caves housing Hindu temples, reached by climbing 272 rainbow-colored steps.", image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=500&h=300&fit=crop&q=80" },
    ],
    thingsToDo: [
      "Visit the Petronas Twin Towers observation deck",
      "Explore Batu Caves and climb the 272 rainbow steps",
      "Island hop in Langkawi's turquoise waters",
      "Go food hunting in Penang's Georgetown",
      "Trek through Taman Negara, one of the world's oldest rainforests",
      "Dive at Sipadan Island, a world-class dive site",
      "Visit the Cameron Highlands tea plantations",
      "Shop at KL's Bukit Bintang district",
    ],
    travelTips: [
      "Malaysia is very affordable — budget RM 100–200/day for comfortable travel.",
      "Grab is the go-to ride-hailing app throughout the country.",
      "English is widely spoken, making navigation easy for tourists.",
      "Try the local street food fearlessly — hygiene standards are generally good.",
      "Carry a light rain jacket — tropical showers can appear suddenly.",
      "Remove shoes when entering homes and some shops.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1609766857326-18a1dd4c8a81?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1473951574080-01fe45ec8571?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=600&fit=crop&q=80",
    ],
    seoTitle: "Malaysia Travel Guide - KL, Langkawi, Penang & Borneo Tips",
    seoDescription: "Plan your Malaysia trip with our guide. Petronas Towers, Langkawi beaches, Penang food, Borneo rainforests, travel tips, and best time to visit.",
    content: "",
  },
  {
    slug: "phuket",
    name: "Phuket",
    tagline: "The Pearl of the Andaman",
    cardImage: destPhuket,
    heroImage: destPhuket,
    bestTime: "November to April",
    idealDuration: "4–6 Days",
    overview: `Phuket, Thailand's largest island, is a tropical paradise in the Andaman Sea that has earned its reputation as one of Asia's premier beach destinations. Known as the "Pearl of the Andaman," Phuket offers a stunning combination of powder-white beaches, crystal-clear waters, world-class diving, vibrant nightlife, and authentic Thai culture — all wrapped in warm tropical sunshine.

The island's west coast is dotted with spectacular beaches, each with its own character. Patong is the vibrant party hub with its famous Bangla Road nightlife strip. Kata and Karon offer a more family-friendly atmosphere with excellent swimming beaches. For tranquility, the northern beaches of Mai Khao and Nai Yang remain blissfully uncrowded.

Phuket's Old Town is a delightful surprise for many visitors. The Sino-Portuguese architecture — colorful shophouses, ornate Chinese shrines, and art galleries — reflects the island's history as a major tin mining center that attracted Chinese immigrants centuries ago. Walking through these streets feels like stepping into a different era.

The waters around Phuket are a gateway to some of the world's most spectacular marine experiences. Day trips to Phi Phi Islands (made famous by "The Beach"), James Bond Island in Phang Nga Bay, and the Similan Islands offer snorkeling and diving among vibrant coral reefs, limestone karsts rising from emerald waters, and diverse marine life including manta rays and whale sharks.`,
    topSpots: [
      { name: "Phi Phi Islands", description: "Stunning archipelago with Maya Bay, crystal waters, and dramatic limestone cliffs.", image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=500&h=300&fit=crop&q=80" },
      { name: "Phang Nga Bay", description: "Emerald waters dotted with towering limestone karsts, including the famous James Bond Island.", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500&h=300&fit=crop&q=80" },
      { name: "Patong Beach", description: "Phuket's most popular beach with vibrant nightlife, water sports, and Bangla Road.", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=500&h=300&fit=crop&q=80" },
      { name: "Big Buddha", description: "45-meter marble statue sitting atop Nakkerd Hill, offering 360-degree island views.", image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=500&h=300&fit=crop&q=80" },
    ],
    thingsToDo: [
      "Take a day trip to Phi Phi Islands",
      "Explore Phang Nga Bay by longtail boat or kayak",
      "Visit the Big Buddha for panoramic island views",
      "Snorkel or dive at the Similan Islands",
      "Experience Bangla Road nightlife in Patong",
      "Explore Phuket Old Town's Sino-Portuguese architecture",
      "Watch a Muay Thai boxing match",
      "Take a Thai cooking class",
    ],
    travelTips: [
      "Visit during dry season (November–April) for the best beach weather.",
      "Rent a scooter carefully — roads can be hilly and traffic chaotic.",
      "Negotiate prices for longtail boats and tuk-tuks before boarding.",
      "Apply reef-safe sunscreen to protect the marine ecosystem.",
      "Carry cash for smaller shops and beach vendors.",
      "Book Phi Phi and Similan trips in advance during peak season.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=600&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=600&h=600&fit=crop&q=80",
    ],
    seoTitle: "Phuket Travel Guide - Beaches, Phi Phi Islands & Nightlife Tips",
    seoDescription: "Your complete Phuket travel guide. Best beaches, Phi Phi Islands, Phang Nga Bay, nightlife, Thai food, diving tips, and when to visit.",
    content: "",
  },
];

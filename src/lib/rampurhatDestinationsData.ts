import tourKashmir from "@/assets/tour-kashmir.jpg";
import tourLadakh from "@/assets/tour-ladakh.jpg";
import tourDarjeeling from "@/assets/tour-darjeeling.jpg";
import tourSundarban from "@/assets/tour-sundarban.jpg";
import tourShimla from "@/assets/tour-shimla.jpg";
import tourPuri from "@/assets/tour-puri.jpg";
import tourRishikesh from "@/assets/tour-rishikesh.jpg";
import tourGangtok from "@/assets/tour-gangtok.jpg";
import tourKedarnath from "@/assets/tour-kedarnath.jpg";
import tourDelhi from "@/assets/tour-delhi.jpg";
import tourAgra from "@/assets/tour-agra.jpg";
import tourUmrah from "@/assets/tour-umrah.jpg";
import tourHajj from "@/assets/tour-hajj.jpg";

export type DestinationRegion = "North India" | "East & Northeast India" | "International" | "Pilgrimage";

export interface RampurhatDestinationData {
  slug: string;
  destinationName: string;
  region: DestinationRegion;
  tagline: string;
  heroImage: string;
  overview: string;
  pickupPoints: string[];
  bestTimeToVisit: string;
  idealDuration: string;
  startingPriceInr: number;
  travelRoutesFromRampurhat: {
    byTrain?: string;
    byFlight?: string;
    byRoad?: string;
  };
  keyInclusions: string[];
  itineraryHighlights: { day: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  relatedToursSlugs: string[];
}

export const rampurhatDestinations: RampurhatDestinationData[] = [
  {
    slug: "kashmir",
    destinationName: "Kashmir",
    region: "North India",
    tagline: "Heaven on Earth — Curated Packages with Houseboat Stay & Shikara Ride",
    heroImage: tourKashmir,
    overview: "Embark on an unforgettable journey from Rampurhat to Kashmir with Sova Tour & Travels. Experience the mesmerizing snow-capped peaks of Gulmarg, pristine valleys of Pahalgam, and the serene Dal Lake in Srinagar. We handle seamless departures connecting via Rampurhat Junction (RPH) to Howrah/Kolkata Airport (CCU) for direct flights or train connections to Jammu/Srinagar.",
    pickupPoints: [
      "Rampurhat Railway Station (RPH)",
      "Howrah / Sealdah Railway Station (Kolkata)",
      "Netaji Subhash Chandra Bose International Airport (CCU)"
    ],
    bestTimeToVisit: "March to October (Tulip season & pleasant summers) or December to February (Snow in Gulmarg)",
    idealDuration: "6 Days / 5 Nights",
    startingPriceInr: 18999,
    travelRoutesFromRampurhat: {
      byTrain: "Board overnight trains like Saraighat Express or Sealdah Intercity from Rampurhat (RPH) to Howrah/Sealdah, then connect via Himgiri Express or Jammu Tawi Express to Jammu.",
      byFlight: "Easy train transfer from Rampurhat to Kolkata Airport (CCU), followed by a 3-hour direct or one-stop flight to Sheikh ul-Alam Airport, Srinagar (SXR)."
    },
    keyInclusions: [
      "Flight / Train connecting tickets from Kolkata",
      "Traditional Houseboat & Hotel accommodation",
      "Daily breakfast & delicious dinner",
      "Complimentary Shikara ride on Dal Lake",
      "All sightseeing by private cab (Srinagar, Gulmarg, Pahalgam, Sonmarg)",
      "24/7 dedicated assistance from Sova Tours Rampurhat team"
    ],
    itineraryHighlights: [
      { day: "Day 1", title: "Departure & Arrival in Srinagar", desc: "Board flight/train from Kolkata. Receive traditional Kashmiri welcome in Srinagar and check into a houseboat on Dal Lake." },
      { day: "Day 2", title: "Gulmarg Snow Meadows", desc: "Full day excursion to Gulmarg. Enjoy the famous Gondola cable car ride overlooking Nanga Parbat." },
      { day: "Day 3", title: "Pahalgam Valley of Shepherds", desc: "Scenic drive alongside Lidder River through saffron fields and apple orchards to Pahalgam." },
      { day: "Day 4", title: "Srinagar Mughal Gardens", desc: "Visit Nishat Bagh, Shalimar Bagh, and Chashme Shahi. Evening shopping for authentic Kashmiri Pashmina and saffron." },
      { day: "Day 5", title: "Sonmarg Glacier Excursion", desc: "Explore the Meadow of Gold at Sonmarg with breathtaking views of Thajiwas Glacier." },
      { day: "Day 6", title: "Return Journey", desc: "Morning transfer to Srinagar airport for return flight connecting back to Rampurhat." }
    ],
    faqs: [
      { question: "How do we start the tour from Rampurhat?", answer: "Our team coordinates your complete departure from Rampurhat Junction (RPH). We arrange train connectivity to Howrah/Sealdah or direct cab pickup to Kolkata Airport (CCU)." },
      { question: "Are houseboat stays included in the Kashmir package?", answer: "Yes! A complimentary 1-night traditional houseboat stay on Dal Lake with an evening Shikara ride is included in all our premium & budget Kashmir packages." },
      { question: "Is Kashmir safe for families traveling from West Bengal?", answer: "Absolutely. Kashmir is one of the most welcoming tourism destinations in India. Our local coordinators and drivers ensure complete safety and comfort for families." }
    ],
    relatedToursSlugs: ["kashmir-paradise-tour"]
  },
  {
    slug: "ladakh",
    destinationName: "Ladakh",
    region: "North India",
    tagline: "The Land of High Passes — Thrilling Himalayan Adventure & Pangong Lake",
    heroImage: tourLadakh,
    overview: "Conquer the legendary high passes of Ladakh starting your journey from Rampurhat. Witness the magical color-changing waters of Pangong Lake, explore ancient monasteries in Nubra Valley via Khardung La, and experience the raw majesty of the Himalayas with expert oxygen-equipped transport.",
    pickupPoints: [
      "Rampurhat Railway Station (RPH)",
      "Netaji Subhash Chandra Bose International Airport (CCU)"
    ],
    bestTimeToVisit: "May to September (All passes open, clear blue skies)",
    idealDuration: "7 Days / 6 Nights",
    startingPriceInr: 26999,
    travelRoutesFromRampurhat: {
      byFlight: "Take a train from Rampurhat (RPH) to Howrah/Sealdah, transfer to Kolkata Airport (CCU), and take a morning flight to Kushok Bakula Rimpochee Airport, Leh (IXL)."
    },
    keyInclusions: [
      "Return flight tickets from Kolkata to Leh",
      "6 nights comfortable hotel & luxury camp accommodation",
      "Daily breakfast & dinner",
      "Inner Line Permits (ILP) for Pangong & Nubra Valley",
      "Oxygen cylinder equipped private SUV/Tempo Traveler",
      "Expert local driver with high-altitude experience"
    ],
    itineraryHighlights: [
      { day: "Day 1", title: "Arrival in Leh & Acclimatization", desc: "Land at Leh Kushok Bakula airport (11,500 ft). Complete rest for altitude acclimatization. Evening walk in Leh Market." },
      { day: "Day 2", title: "Leh Local Monasteries", desc: "Visit Shanti Stupa, Leh Palace, Hall of Fame, and Magnetic Hill." },
      { day: "Day 3", title: "Khardung La Pass to Nubra Valley", desc: "Drive over the world's highest motorable pass (18,380 ft) to Nubra Valley. Enjoy double-hump Bactrian camel safari at Hunder dunes." },
      { day: "Day 4", title: "Shyok River Route to Pangong Lake", desc: "Traverse the scenic Shyok route directly to the crystal-clear waters of Pangong Tso at 14,270 ft." },
      { day: "Day 5", title: "Chang La Pass to Leh", desc: "Wake up to a stunning sunrise over Pangong Lake. Drive back to Leh via Chang La Pass visiting Thiksey Monastery." },
      { day: "Day 6", title: "Sham Valley Tour", desc: "Excursion to Sangam (confluence of Indus and Zanskar rivers) and Gurudwara Pathar Sahib." },
      { day: "Day 7", title: "Departure", desc: "Bid farewell to the Himalayas and board return flight to Kolkata connecting to Rampurhat." }
    ],
    faqs: [
      { question: "How does Sova Tours handle altitude sickness (AMS) in Ladakh?", answer: "We enforce mandatory 24-hour acclimatization on Day 1 in Leh and provide medical-grade oxygen cylinders in all private sightseeing vehicles." },
      { question: "Are Inner Line Permits arranged by your Rampurhat office?", answer: "Yes, our team arranges all required official government Inner Line Permits for protected areas like Pangong Tso and Nubra Valley before your arrival." }
    ],
    relatedToursSlugs: ["ladakh-adventure-expedition"]
  },
  {
    slug: "darjeeling",
    destinationName: "Darjeeling",
    region: "East & Northeast India",
    tagline: "Queen of the Hills — Tea Gardens, Toy Train & Kanchenjunga Sunrise",
    heroImage: tourDarjeeling,
    overview: "Just a convenient overnight journey from Rampurhat Junction! Experience the colonial charm of Darjeeling with Sova Tour & Travels. Marvel at the golden sunrise over Mount Kanchenjunga from Tiger Hill, ride the UNESCO heritage Toy Train, and sip world-famous Darjeeling tea in lush estates.",
    pickupPoints: [
      "Rampurhat Railway Station (RPH)",
      "New Jalpaiguri Railway Station (NJP)",
      "Bagdogra Airport (IXB)"
    ],
    bestTimeToVisit: "October to March (Clear mountain views) & April to June (Summer holiday escape)",
    idealDuration: "4 Days / 3 Nights",
    startingPriceInr: 9999,
    travelRoutesFromRampurhat: {
      byTrain: "Direct express trains available daily from Rampurhat Junction (RPH) to New Jalpaiguri (NJP) taking just 5 to 6 hours (e.g., Saraighat Express, Darjeeling Mail, Padatik Express).",
      byRoad: "Smooth 8-hour drive by private AC sedan or SUV directly from Rampurhat to Darjeeling town."
    },
    keyInclusions: [
      "Train reservations from Rampurhat (RPH) to NJP",
      "Private vehicle pickup from NJP station to Darjeeling hotel",
      "3 nights premium hotel stay near Chowrasta Mall Road",
      "Daily breakfast",
      "Full sightseeing package including Tiger Hill 4 AM excursion",
      "Heritage Toy Train booking assistance"
    ],
    itineraryHighlights: [
      { day: "Day 1", title: "Boarding from Rampurhat & Arrival", desc: "Board morning/overnight express train from Rampurhat to NJP. Scenic drive up the mountain winds to Darjeeling. Evening stroll at Mall Road." },
      { day: "Day 2", title: "Tiger Hill Sunrise & 7-Point Sightseeing", desc: "Early 4 AM drive to Tiger Hill to watch the sunrise over Kanchenjunga. Visit Batasia Loop, Ghoom Monastery, Himalayan Mountaineering Institute, and Padmaja Naidu Zoo." },
      { day: "Day 3", title: "Tea Gardens & Heritage Toy Train", desc: "Visit Happy Valley Tea Estate to witness tea plucking and processing. Enjoy a memorable ride on the DHR Toy Train." },
      { day: "Day 4", title: "Return to Rampurhat", desc: "Morning breakfast with hill views. Drive down to NJP station and board express train back to Rampurhat Junction." }
    ],
    faqs: [
      { question: "What is the fastest way to reach Darjeeling from Rampurhat?", answer: "Train is the most convenient and popular option! Direct express trains take only ~5.5 hours from Rampurhat Junction (RPH) to NJP station, from where our private cab whisks you up to Darjeeling in 3 hours." },
      { question: "Is the hotel close to Mall Road?", answer: "Yes, all hotels selected by Sova Tours are located within walking distance of Chowrasta Mall Road so you can enjoy evening strolls easily." }
    ],
    relatedToursSlugs: ["darjeeling-queen-of-hills"]
  },
  {
    slug: "sundarban",
    destinationName: "Sundarban",
    region: "East & Northeast India",
    tagline: "Thrilling Tiger Safari in the World's Largest Mangrove Forest",
    heroImage: tourSundarban,
    overview: "Explore the UNESCO World Heritage mangrove forests of Sundarban starting with easy connectivity from Rampurhat. Cruise through mysterious river creeks on luxury safari boats, spot the majestic Royal Bengal Tiger, estuarine crocodiles, and spotted deer while enjoying fresh Bengali village hospitality.",
    pickupPoints: [
      "Rampurhat Railway Station (RPH)",
      "Science City / Canning / Godkhali Jetty (Kolkata)"
    ],
    bestTimeToVisit: "September to March (Pleasant weather & active wildlife)",
    idealDuration: "3 Days / 2 Nights",
    startingPriceInr: 5999,
    travelRoutesFromRampurhat: {
      byTrain: "Take an express train from Rampurhat (RPH) to Sealdah/Howrah station (approx. 3.5 hours). Our AC transport picks you up from Kolkata and drives to Godkhali boat jetty."
    },
    keyInclusions: [
      "Complete AC bus transfer from Kolkata to Godkhali Jetty",
      "Deluxe eco-resort accommodation inside Sundarban islands",
      "All 3 daily meals (Sumptuous Bengali cuisine with fresh fish & crab specialties)",
      "Full day boat safari with licensed government forest naturalist",
      "All jungle entry permits & watchtower fees (Sajnekhali, Sudhanyakhali, Dobanki)"
    ],
    itineraryHighlights: [
      { day: "Day 1", title: "Rampurhat to Godkhali & Cruise", desc: "Morning arrival in Kolkata. Transfer to Godkhali jetty. Board motorboat cruise to eco-resort. Evening folk dance & tribal performance." },
      { day: "Day 2", title: "Deep Mangrove Safari & Watchtowers", desc: "Full day boat safari through narrow creeks. Climb watchtowers at Sajnekhali and Sudhanyakhali to track wildlife and birds." },
      { day: "Day 3", title: "Village Walk & Return", desc: "Morning village walk exploring local honey collectors' lifestyle. Cruise back to Godkhali and drive to Kolkata for evening train to Rampurhat." }
    ],
    faqs: [
      { question: "Are meals provided on the Sundarban boat safari?", answer: "Yes! Sundarban trips are famous for their food. Breakfast, lunch, evening snacks, and dinner featuring fresh Bengali delicacies are served hot on the boat and resort." },
      { question: "Do we need special permits?", answer: "No hassle for you—Sova Tours arranges all mandatory forest department permits and boat clearances." }
    ],
    relatedToursSlugs: ["sundarban-wildlife-safari"]
  },
  {
    slug: "shimla-manali",
    destinationName: "Shimla-Manali",
    region: "North India",
    tagline: "The Ultimate Himachal Escape — Snow Peaks, Solang Valley & Rohtang Pass",
    heroImage: tourShimla,
    overview: "Discover the crown jewels of Himachal Pradesh with our comprehensive Shimla-Manali tour package from Rampurhat. Walk down colonial Ridge roads in Shimla, witness apple orchards in Kullu, and indulge in snow adventure sports like paragliding and skiing at Solang Valley and Rohtang Pass.",
    pickupPoints: [
      "Rampurhat Railway Station (RPH)",
      "Kolkata Airport (CCU) / Delhi New Delhi Station (NDLS)"
    ],
    bestTimeToVisit: "October to June (Snow in winter & pleasant summer weather)",
    idealDuration: "6 Days / 5 Nights",
    startingPriceInr: 16999,
    travelRoutesFromRampurhat: {
      byTrain: "Board express trains from Rampurhat (RPH) to Howrah/Sealdah, connect via Rajdhani/Duronto to New Delhi, and board luxury Volvo AC sleeper bus directly to Shimla/Manali."
    },
    keyInclusions: [
      "Return transport from Kolkata / Delhi",
      "5 nights accommodation in scenic hill resorts",
      "Daily breakfast & dinner",
      "All sightseeing by private cab (Shimla, Kufri, Kullu, Manali, Solang Valley)",
      "Rohtang Pass excursion permit assistance"
    ],
    itineraryHighlights: [
      { day: "Day 1", title: "Arrival in Shimla", desc: "Check into hill resort in Shimla. Evening stroll along the famous Mall Road and Christ Church." },
      { day: "Day 2", title: "Kufri Snow Excursion", desc: "Visit Kufri fun campus and Himalayan Nature Park. Enjoy horse riding and panoramic Himalayan views." },
      { day: "Day 3", title: "Scenic Drive to Manali via Kullu", desc: "Drive alongside Beas River passing Sundernagar Lake and Kullu Shawl factories to reach Manali." },
      { day: "Day 4", title: "Old Manali & Hadimba Temple", desc: "Explore ancient Hadimba Devi Temple, Vashisht hot water springs, and Tibetan Monasteries." },
      { day: "Day 5", title: "Solang Valley Adventure", desc: "Full day thrill at Solang Valley enjoying snow tubing, skiing, and zorbing. Optional Rohtang Pass visit." },
      { day: "Day 6", title: "Return Journey", desc: "Drive back to Delhi / Chandigarh for return train/flight connecting back to Rampurhat." }
    ],
    faqs: [
      { question: "Is Rohtang Pass included in the tour?", answer: "Rohtang Pass entry requires daily NGT quota permits. Our team actively assists in procuring your vehicle permits well in advance." }
    ],
    relatedToursSlugs: ["shimla-manali-adventure"]
  },
  {
    slug: "puri",
    destinationName: "Puri",
    region: "East & Northeast India",
    tagline: "Divine Jagannath Darshan & Golden Beach Relaxation",
    heroImage: tourPuri,
    overview: "A favorite getaway for families from Birbhum! Experience divine blessings at Lord Jagannath Temple, marvel at the architectural wonder of Konark Sun Temple, and relax on the serene golden sands of Puri Beach with our end-to-end coordinated package from Rampurhat.",
    pickupPoints: [
      "Rampurhat Railway Station (RPH)",
      "Howrah Railway Station"
    ],
    bestTimeToVisit: "October to March (Ideal beach weather & temple darshan)",
    idealDuration: "4 Days / 3 Nights",
    startingPriceInr: 7499,
    travelRoutesFromRampurhat: {
      byTrain: "Direct train connectivity from Rampurhat (RPH) to Howrah, followed by comfortable overnight express trains (e.g., Puri Express, Dhauli Express, Sri Jagannath Express) to Puri station."
    },
    keyInclusions: [
      "Train tickets from Rampurhat / Kolkata to Puri",
      "3 nights stay in sea-facing or beach-walk hotel",
      "Daily breakfast",
      "Private cab for Jagannath Temple darshan assistance",
      "Excursion to UNESCO World Heritage Konark Sun Temple & Chandrabhaga Beach"
    ],
    itineraryHighlights: [
      { day: "Day 1", title: "Arrival in Puri & Beach Evening", desc: "Check into beachside hotel. Relax on the beach and taste authentic Odia delicacies." },
      { day: "Day 2", title: "Holy Jagannath Temple Darshan", desc: "Morning darshan at the revered Jagannath Temple. Afternoon visit to Swargadwar Beach and local handicrafts market." },
      { day: "Day 3", title: "Konark Sun Temple & Chilika Lake", desc: "Excursion to Konark Sun Temple, Chandrabhaga Beach, and optional dolphin boating at Chilika Lake (Satapada)." },
      { day: "Day 4", title: "Return Journey", desc: "Morning souvenir shopping. Transfer to Puri railway station for return train to Rampurhat." }
    ],
    faqs: [
      { question: "Does Sova Tours provide pandas (priests) for Jagannath Temple darshan?", answer: "Yes, we can arrange reliable local temple guides to facilitate smooth and peaceful darshan inside the temple complex." }
    ],
    relatedToursSlugs: ["puri-beach-getaway"]
  },
  {
    slug: "rishikesh-haridwar",
    destinationName: "Rishikesh-Haridwar",
    region: "North India",
    tagline: "Sacred Ganga Aarti & White Water Rafting Adventure",
    heroImage: tourRishikesh,
    overview: "Immerse yourself in spiritual serenity and adventure along the holy banks of the Ganges. Witness the mesmerizing evening Ganga Aarti at Har Ki Pauri in Haridwar, walk across Ram Jhula and Lakshman Jhula in Rishikesh, and experience thrilling white water river rafting.",
    pickupPoints: [
      "Rampurhat Railway Station (RPH)",
      "Howrah Railway Station"
    ],
    bestTimeToVisit: "September to April (Pleasant weather for rafting & temple visits)",
    idealDuration: "4 Days / 3 Nights",
    startingPriceInr: 8999,
    travelRoutesFromRampurhat: {
      byTrain: "Direct train connectivity from Howrah (Doons Express / Kumbha Express) directly to Haridwar Junction after a short train transfer from Rampurhat."
    },
    keyInclusions: [
      "Return train fare from Kolkata/Howrah",
      "3 nights hotel accommodation in Haridwar & Rishikesh",
      "Daily breakfast",
      "Reserved seating assistance for evening Ganga Aarti",
      "Private cab for all local temple & ashram sightseeing"
    ],
    itineraryHighlights: [
      { day: "Day 1", title: "Arrival in Haridwar & Har Ki Pauri Aarti", desc: "Check into Haridwar hotel. Evening attendance at the divine Ganga Aarti at Har Ki Pauri ghat." },
      { day: "Day 2", title: "Mansa Devi & Chandi Devi Temples", desc: "Ropeway visit to hilltop shrines. Afternoon transfer to Rishikesh along the Ganges." },
      { day: "Day 3", title: "Rishikesh Ashrams & Rafting", desc: "Visit Beatles Ashram, Parmarth Niketan, and Lakshman Jhula. Optional white-water river rafting session." },
      { day: "Day 4", title: "Return Journey", desc: "Morning yoga session by the river. Transfer to Haridwar station for return train." }
    ],
    faqs: [
      { question: "Is river rafting safe for beginners?", answer: "Yes, certified instructors with international safety gear conduct rafting sessions suitable for both beginners and swimmers." }
    ],
    relatedToursSlugs: ["rishikesh-haridwar-spiritual"]
  },
  {
    slug: "gangtok",
    destinationName: "Gangtok",
    region: "East & Northeast India",
    tagline: "Sikkim Himalayan Paradise — Tsomgo Lake & Baba Mandir Excursion",
    heroImage: tourGangtok,
    overview: "Explore the clean, serene, and culturally rich capital of Sikkim from Rampurhat. Enjoy panoramic views of Mount Kanchenjunga, visit vibrant Buddhist monasteries like Rumtek, and take a thrilling excursion to the glacial Tsomgo Lake and Nathula Pass (Indo-China border) at 14,140 ft.",
    pickupPoints: [
      "Rampurhat Railway Station (RPH)",
      "New Jalpaiguri Railway Station (NJP)"
    ],
    bestTimeToVisit: "March to June (Rhododendrons in bloom) & October to December (Clear mountain views)",
    idealDuration: "5 Days / 4 Nights",
    startingPriceInr: 13999,
    travelRoutesFromRampurhat: {
      byTrain: "Direct 5.5-hour express train from Rampurhat Junction (RPH) to NJP station, where our Sikkim-permitted luxury cab picks you up for a scenic Teesta river valley drive to Gangtok."
    },
    keyInclusions: [
      "Train reservations from Rampurhat to NJP",
      "Exclusive Sikkim-permitted cab for all transfers & sightseeing",
      "4 nights stay in prime Gangtok hotel near MG Marg",
      "Daily breakfast & dinner",
      "Mandatory government protected area permits for Tsomgo Lake & Baba Mandir"
    ],
    itineraryHighlights: [
      { day: "Day 1", title: "Rampurhat to Gangtok via NJP", desc: "Morning train from Rampurhat to NJP. Drive along Teesta River to Gangtok. Evening leisure at MG Marg promenade." },
      { day: "Day 2", title: "Gangtok 7-Point Sightseeing", desc: "Visit Rumtek Monastery, Banjhakri Falls, Do Drul Chorten, Namgyal Institute of Tibetology, and Tashi Viewpoint." },
      { day: "Day 3", title: "Tsomgo Lake & Baba Mandir Excursion", desc: "Drive through alpine roads to holy Tsomgo Lake (12,400 ft) and pay homage at Baba Harbhajan Singh Shrine." },
      { day: "Day 4", title: "Nathula Pass Excursion", desc: "Optional border excursion to Nathula Pass (14,140 ft) witnessing Indian Army frontier posts." },
      { day: "Day 5", title: "Return Journey", desc: "Morning breakfast. Drive down to NJP station and board train returning to Rampurhat." }
    ],
    faqs: [
      { question: "How do we get permits for Tsomgo Lake?", answer: "Simply submit 2 passport size photos and Voter ID/Passport copies to our Rampurhat office; we arrange all Sikkim police and military permits prior to arrival." }
    ],
    relatedToursSlugs: ["gangtok-sikkim-delight"]
  },
  {
    slug: "kedarnath",
    destinationName: "Kedarnath",
    region: "Pilgrimage",
    tagline: "Sacred Jyotirlinga Char Dham Pilgrimage in the Garhwal Himalayas",
    heroImage: tourKedarnath,
    overview: "Embark on the spiritual journey of a lifetime to Kedarnath Temple (11,755 ft), one of the twelve sacred Jyotirlingas of Lord Shiva. Sova Tours provides meticulously organized pilgrimage packages from Rampurhat including medical support, registration passes, helicopter booking assistance, and warm mountain stays.",
    pickupPoints: [
      "Rampurhat Railway Station (RPH)",
      "Haridwar / Rishikesh Railway Station"
    ],
    bestTimeToVisit: "May to June & September to October (Temple doors open during these months)",
    idealDuration: "5 Days / 4 Nights",
    startingPriceInr: 14999,
    travelRoutesFromRampurhat: {
      byTrain: "Connect via express trains from Rampurhat to Howrah/Sealdah, then board Doons Express or Kumbha Express to Haridwar, where our dedicated hill transport begins."
    },
    keyInclusions: [
      "Return train connectivity from Howrah/Kolkata",
      "4 nights hotel/guesthouse stay (Guptkashi, Sitapur/Gaurikund, Kedarnath)",
      "Daily nutritious vegetarian breakfast & dinner",
      "Mandatory Char Dham Yatra biometric registration passes",
      "Assistance for Helicopter tickets or Pony/Palki hire"
    ],
    itineraryHighlights: [
      { day: "Day 1", title: "Arrival in Haridwar & Drive to Guptkashi", desc: "Meet cab in Haridwar. Scenic drive alongside Mandakini river to Guptkashi. Overnight stay." },
      { day: "Day 2", title: "Trek to Kedarnath Dham", desc: "Drive to Sonprayag/Gaurikund. Begin 16 km holy trek to Kedarnath Temple. Attend divine evening Maha Aarti." },
      { day: "Day 3", title: "Morning Darshan & Descent", desc: "Early morning Rudrabhishek darshan inside Kedarnath shrine. Trek down to Gaurikund and drive to Guptkashi." },
      { day: "Day 4", title: "Rishikesh Spiritual Stop", desc: "Drive back visiting Devprayag (Confluence of Alaknanda & Bhagirathi). Overnight in Rishikesh." },
      { day: "Day 5", title: "Return Journey", desc: "Transfer to Haridwar station for express train journey back towards Bengal." }
    ],
    faqs: [
      { question: "Can Sova Tours book Kedarnath helicopter shuttle service?", answer: "Yes! We assist our pilgrims with official IRCTC helicopter shuttle ticket bookings from Guptkashi / Phata / Sirsi helipads." }
    ],
    relatedToursSlugs: ["kedarnath-pilgrimage-tour"]
  },
  {
    slug: "delhi",
    destinationName: "Delhi",
    region: "North India",
    tagline: "Capital Heritage Tour — Mughal Monuments, Modern Wonders & Akshardham",
    heroImage: tourDelhi,
    overview: "Experience centuries of imperial history in India's capital city starting from Rampurhat. Explore majestic Mughal architecture at Red Fort and Jama Masjid, stroll through Lutyens' India Gate, and marvel at the spiritual grandeur of Akshardham Temple.",
    pickupPoints: [
      "Rampurhat Railway Station (RPH)",
      "New Delhi Railway Station (NDLS)"
    ],
    bestTimeToVisit: "October to March (Pleasant winter weather)",
    idealDuration: "3 Days / 2 Nights",
    startingPriceInr: 6499,
    travelRoutesFromRampurhat: {
      byTrain: "Excellent overnight express train options connecting Howrah/Sealdah (via Rampurhat feeder) directly to New Delhi Railway Station."
    },
    keyInclusions: [
      "Return sleeper/AC train fare",
      "2 nights stay in central Delhi hotel",
      "Daily breakfast",
      "Private AC sedan/SUV for complete Delhi sightseeing",
      "Experienced local guide for historical monuments"
    ],
    itineraryHighlights: [
      { day: "Day 1", title: "Old Delhi Heritage Walk", desc: "Visit Red Fort, Jama Masjid, Raj Ghat, and take a lively rickshaw ride through Chandni Chowk lanes." },
      { day: "Day 2", title: "New Delhi Imperial Tour", desc: "Explore Qutub Minar, Humayun's Tomb, Lotus Temple, India Gate, Parliament House, and Akshardham Temple." },
      { day: "Day 3", title: "Shopping & Return", desc: "Morning visit to Gurudwara Bangla Sahib and Connaught Place shopping before boarding return train." }
    ],
    faqs: [
      { question: "Is AC cab transport included across Delhi?", answer: "Yes, to beat traffic and ensure comfort, dedicated private AC sedan/SUV cab is provided for your entire Delhi sightseeing." }
    ],
    relatedToursSlugs: ["delhi-heritage-tour"]
  },
  {
    slug: "agra",
    destinationName: "Agra",
    region: "North India",
    tagline: "Witness the Taj Mahal — Eternal Symbol of Love & Mughal Architecture",
    heroImage: tourAgra,
    overview: "Behold the breathtaking marble wonder of the Taj Mahal at sunrise with our Agra express package from Rampurhat. Discover the sprawling sandstone courtyards of Agra Fort and the ghost city of Fatehpur Sikri with seamless train and cab coordination.",
    pickupPoints: [
      "Rampurhat Railway Station (RPH)",
      "Agra Cantt / Tundla Railway Station"
    ],
    bestTimeToVisit: "October to March (Cool weather ideal for walking monuments)",
    idealDuration: "2 Days / 1 Night",
    startingPriceInr: 5499,
    travelRoutesFromRampurhat: {
      byTrain: "Board overnight trains connecting Kolkata to Tundla/Agra Fort station for quick 1-night weekend getaways."
    },
    keyInclusions: [
      "Train tickets from Howrah/Kolkata",
      "1 night hotel stay near Taj Mahal East Gate",
      "Breakfast included",
      "Private AC cab for Taj Mahal, Agra Fort & Mehtab Bagh sightseeing"
    ],
    itineraryHighlights: [
      { day: "Day 1", title: "Arrival in Agra & Sunset View", desc: "Arrive in Agra. Visit Agra Fort and enjoy a sunset view of the Taj Mahal across the Yamuna River from Mehtab Bagh." },
      { day: "Day 2", title: "Sunrise Taj Mahal & Fatehpur Sikri", desc: "Early morning sunrise visit to Taj Mahal when crowds are lowest. Excursion to Fatehpur Sikri before evening return train." }
    ],
    faqs: [
      { question: "When is Taj Mahal closed?", answer: "Taj Mahal remains closed on Fridays for general visitors. Our itineraries are carefully planned around open days." }
    ],
    relatedToursSlugs: ["agra-taj-mahal-express"]
  },
  {
    slug: "umrah",
    destinationName: "Mecca-Medina",
    region: "Pilgrimage",
    tagline: "Blessed Sacred Pilgrimage — 5-Star Stay Near Haram with Complete Guidance",
    heroImage: tourUmrah,
    overview: "Perform your blessed Umrah pilgrimage with complete peace of mind with Sova Tour & Travels Rampurhat. We offer premium group departures featuring 5-star hotel stays close to Masjid al-Haram in Mecca and Masjid an-Nabawi in Medina, experienced religious scholars (Muallim), visa processing, and direct flights from Kolkata.",
    pickupPoints: [
      "Rampurhat Office (Pre-departure orientation & document handover)",
      "Kolkata Airport (CCU)"
    ],
    bestTimeToVisit: "Year Round (Special packages during Ramadan & winter months)",
    idealDuration: "10 Days / 9 Nights",
    startingPriceInr: 99999,
    travelRoutesFromRampurhat: {
      byFlight: "Personalized group transport from Rampurhat to Kolkata Airport (CCU), boarding direct or one-stop flights to King Abdulaziz International Airport, Jeddah (JED)."
    },
    keyInclusions: [
      "Return international flight tickets from Kolkata (CCU)",
      "Official Saudi Arabia Umrah electronic visa with insurance",
      "5-Star / 4-Star luxury hotels within walking distance of Haram",
      "Daily delicious Indian / Bengali buffet breakfast & dinner",
      "Complete AC coach transfers (Jeddah - Mecca - Medina - Jeddah)",
      "Historical Ziyarat tours in Mecca & Medina accompanied by scholars",
      "Complimentary 5 Liter Zamzam holy water can"
    ],
    itineraryHighlights: [
      { day: "Day 1", title: "Departure from Kolkata & Umrah Performance", desc: "Depart Kolkata. Arrive in Jeddah, don Ihram, transfer to Mecca hotel. Perform first Umrah with scholar guidance." },
      { day: "Day 2-4", title: "Mecca Haram Prayers & Ziyarat", desc: "Daily prayers at Masjid al-Haram. Guided Ziyarat visiting Jabal al-Nour (Cave Hira), Jabal al-Rahmah (Arafat), and Mina." },
      { day: "Day 5-8", title: "Medina Munawwarah & Rawdah Riyad ul-Jannah", desc: "Travel to Medina by AC coach. Prayers at Masjid an-Nabawi. Special appointment slots for Rawdah ash-Sharifah visit." },
      { day: "Day 9-10", title: "Medina Ziyarat & Return", desc: "Visit Masjid Quba (first mosque of Islam) and Uhud Mountain. Transfer to Jeddah airport for return flight to Kolkata." }
    ],
    faqs: [
      { question: "Are Umrah classes provided before departure in Rampurhat?", answer: "Yes, our religious guidance team holds comprehensive pre-departure Umrah training seminars in Rampurhat explaining Ihram rituals and duas." },
      { question: "Is Bengali food served in Mecca and Medina hotels?", answer: "Yes, our contracted hotels feature Indian and Bengali chefs serving familiar, comforting halal meals daily." }
    ],
    relatedToursSlugs: ["umrah-pilgrimage-package"]
  },
  {
    slug: "hajj",
    destinationName: "Mecca-Medina-Mina-Arafat",
    region: "Pilgrimage",
    tagline: "The Fifth Pillar of Islam — Complete All-Inclusive Hajj Mabroor Package",
    heroImage: tourHajj,
    overview: "Fulfill the sacred duty of Hajj with trusted, government-registered assistance from Sova Tour & Travels. Our comprehensive 21-day Hajj package covers every step of your spiritual journey across Mecca, Mina tent stays, Arafat Wuquf, Muzdalifah, and Medina with round-the-clock medical and religious support.",
    pickupPoints: [
      "Rampurhat Office",
      "Kolkata Airport (CCU)"
    ],
    bestTimeToVisit: "Islamic Month of Dhul Hijjah",
    idealDuration: "21 Days / 20 Nights",
    startingPriceInr: 399999,
    travelRoutesFromRampurhat: {
      byFlight: "Coordinated group departure from Rampurhat to Kolkata Airport (CCU) flying on dedicated Hajj terminal flights to Jeddah."
    },
    keyInclusions: [
      "Return Hajj group flights from Kolkata",
      "Official Hajj Visa processing & Ministry of Hajj registration",
      "20 nights accommodation in Mecca, Medina & upgraded air-conditioned Mina tents",
      "All meals including special service during 5 days of Hajj in Mina/Arafat",
      "Complete transportation for all Hajj rites & Qurbani (Sacrifice) arrangement",
      "24/7 dedicated Muallim and medical team support"
    ],
    itineraryHighlights: [
      { day: "Day 1-3", title: "Arrival in Mecca & Preparation", desc: "Land in Jeddah, perform arrival Umrah, settle into Mecca hotel and attend Hajj orientation." },
      { day: "Day 7-12", title: "The 5 Sacred Days of Hajj", desc: "Stay in AC Mina tents, perform Wuquf at Arafat, stay overnight under stars at Muzdalifah, perform stoning at Jamarat, and complete Tawaf al-Ifadah." },
      { day: "Day 13-21", title: "Medina Stay & Return", desc: "Peaceful stay in Medina offering prayers at Prophet's Mosque before returning blessed to Kolkata & Rampurhat." }
    ],
    faqs: [
      { question: "Is Qurbani included in the Hajj package price?", answer: "Yes, official Islamic development bank Qurbani coupons are included in our comprehensive Hajj package." }
    ],
    relatedToursSlugs: ["hajj-pilgrimage-package"]
  },
  {
    slug: "dubai",
    destinationName: "Dubai",
    region: "International",
    tagline: "Futuristic Wonder — Burj Khalifa, Desert Safari & Dhow Cruise Dinner",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    overview: "Experience the glittering skyline and Arabian hospitality of Dubai departing from Rampurhat & Kolkata. Marvel at world records from the 124th floor of Burj Khalifa, embark on thrilling dune bashing safari in red sands, and shop till you drop in global mega malls.",
    pickupPoints: [
      "Rampurhat Railway Station (RPH)",
      "Kolkata Airport (CCU)"
    ],
    bestTimeToVisit: "October to April (Pleasant outdoor weather & shopping festivals)",
    idealDuration: "5 Days / 4 Nights",
    startingPriceInr: 45999,
    travelRoutesFromRampurhat: {
      byFlight: "Board direct 4.5-hour flights from Kolkata Airport (CCU) (Emirates, flydubai, Indigo) directly to Dubai International Airport (DXB)."
    },
    keyInclusions: [
      "Return international flights from Kolkata",
      "UAE tourist visa with insurance",
      "4 nights stay in 4-Star hotel near Dubai Metro",
      "Daily breakfast & BBQ safari dinner",
      "Burj Khalifa 124th/125th floor non-prime tickets & Dubai Mall fountain show",
      "Exciting Desert Safari with 4x4 dune bashing & belly dance show",
      "Marina Dhow Cruise dinner with live entertainment"
    ],
    itineraryHighlights: [
      { day: "Day 1", title: "Arrival in Dubai & Marina Dhow Cruise", desc: "Land in Dubai. Check into 4-star hotel. Evening luxury Dhow Cruise along Dubai Marina illuminated skyscrapers with dinner." },
      { day: "Day 2", title: "Half Day City Tour & Burj Khalifa", desc: "Visit Dubai Frame photo stop, Jumeirah Mosque, Palm Atlantis. Evening visit to top of Burj Khalifa." },
      { day: "Day 3", title: "Thrilling Desert Safari", desc: "Morning leisure. Afternoon 4x4 Land Cruiser desert safari with camel riding, henna painting, and BBQ buffet under the stars." },
      { day: "Day 4", title: "Miracle Garden & Global Village", desc: "Explore millions of floral sculptures at Miracle Garden and world culture pavilions at Global Village." },
      { day: "Day 5", title: "Departure", desc: "Duty-free airport shopping and return flight to Kolkata connecting to Rampurhat." }
    ],
    faqs: [
      { question: "How long does Dubai visa processing take?", answer: "Our Rampurhat office processes UAE e-visas within just 3 to 4 working days with minimal documentation." }
    ],
    relatedToursSlugs: ["dubai-dazzle-package"]
  },
  {
    slug: "nepal",
    destinationName: "Nepal",
    region: "International",
    tagline: "Himalayan Kingdom — Pashupatinath Temple & Pokhara Lake Retreat",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    overview: "Neighboring international getaway accessible easily from West Bengal! Explore ancient Hindu shrines like Pashupatinath Temple in Kathmandu and enjoy breathtaking views of the Annapurna mountain range reflected in serene Phewa Lake at Pokhara.",
    pickupPoints: [
      "Rampurhat Railway Station (RPH)",
      "Raxaul / Kakarbhitta Border",
      "Kolkata Airport (CCU)"
    ],
    bestTimeToVisit: "September to May (Crisp mountain air & scenic views)",
    idealDuration: "6 Days / 5 Nights",
    startingPriceInr: 22999,
    travelRoutesFromRampurhat: {
      byTrain: "Train from Rampurhat to NJP/Siliguri, crossing over by road via Kakarbhitta border into Nepal.",
      byFlight: "Direct 1.5-hour flight from Kolkata Airport (CCU) to Tribhuvan International Airport, Kathmandu (KTM)."
    },
    keyInclusions: [
      "Return flight / Road border transfer",
      "5 nights comfortable hotel stay in Kathmandu & Pokhara",
      "Daily breakfast",
      "Private vehicle for Kathmandu ancient heritage tour",
      "Sunrise excursion to Sarangkot hilltop in Pokhara"
    ],
    itineraryHighlights: [
      { day: "Day 1", title: "Arrival in Kathmandu & Thamel Walk", desc: "Arrive in Kathmandu. Check into hotel. Explore vibrant tourist markets of Thamel." },
      { day: "Day 2", title: "Pashupatinath & Boudhanath Stupa", desc: "Sacred darshan at Pashupatinath Temple on Bagmati river banks. Visit giant Boudhanath Stupa." },
      { day: "Day 3", title: "Scenic Valley Drive to Pokhara", desc: "Drive along river valleys to lakeside city Pokhara. Evening boat ride on Phewa Lake visiting Tal Barahi temple." },
      { day: "Day 4", title: "Sarangkot Annapurna Sunrise", desc: "Early morning drive to Sarangkot viewpoint witnessing golden sunrays hitting Mount Machhapuchhre (Fishtail)." },
      { day: "Day 5-6", title: "Return & Departure", desc: "Drive back to Kathmandu for return flight/journey to West Bengal." }
    ],
    faqs: [
      { question: "Do Indian citizens require passport for Nepal?", answer: "Indian citizens do not need a visa; valid Indian Passport or Voter ID card is sufficient for official entry." }
    ],
    relatedToursSlugs: ["nepal-himalayan-escape"]
  },
  {
    slug: "bhutan",
    destinationName: "Bhutan",
    region: "International",
    tagline: "Land of the Thunder Dragon — Tiger's Nest Hike & Pristine Dzongs",
    heroImage: "https://images.unsplash.com/photo-1553856622-d1b352e24a82?w=800",
    overview: "Discover the world's happiest kingdom right next to our regional borders! Explore massive fortresses (Dzongs) in Thimphu and Punakha, and experience the legendary cliffside hike to Taktsang Monastery (Tiger's Nest) in Paro with official Bhutan sustainable tourism permits handled by Sova Tours.",
    pickupPoints: [
      "Rampurhat Railway Station (RPH)",
      "Hasimara / Jaigaon Border",
      "Kolkata Airport (CCU)"
    ],
    bestTimeToVisit: "March to May & September to November (Clear skies & colorful festivals)",
    idealDuration: "5 Days / 4 Nights",
    startingPriceInr: 38999,
    travelRoutesFromRampurhat: {
      byTrain: "Take overnight train from Rampurhat to Hasimara railway station, entering Bhutan directly through Jaigaon/Phuentsholing border gate.",
      byFlight: "Direct Drukair flight from Kolkata Airport (CCU) to Paro International Airport (PBH) navigating stunning Himalayan peaks."
    },
    keyInclusions: [
      "Mandatory Bhutan Sustainable Development Fee (SDF) & Entry Permits",
      "Licensed Bhutanese English-speaking tourist guide throughout tour",
      "4 nights 3-Star government certified hotel accommodation",
      "All 3 daily meals included (Breakfast, Lunch, Dinner)",
      "Exclusive SUV vehicle for all inter-city mountain transport"
    ],
    itineraryHighlights: [
      { day: "Day 1", title: "Entry into Bhutan & Drive to Thimphu", desc: "Cross border or land in Paro. Drive to capital Thimphu. Visit giant Buddha Dordenma statue." },
      { day: "Day 2", title: "Thimphu Fortress & Dochula Pass", desc: "Visit Tashichho Dzong and National Memorial Chorten. Drive across cloud-shrouded Dochula Pass (108 stupas) to Punakha." },
      { day: "Day 3", title: "Punakha Dzong & Paro Valley", desc: "Explore Punakha Dzong located at the confluence of Pho Chhu and Mo Chhu rivers. Drive to Paro valley." },
      { day: "Day 4", title: "Tiger's Nest Monastery Hike", desc: "Memorable 4-hour hike to cliff-hanging Taktsang Monastery perched at 10,240 ft." },
      { day: "Day 5", title: "Departure", desc: "Bid farewell to the Thunder Dragon kingdom returning to Rampurhat." }
    ],
    faqs: [
      { question: "Is the Bhutan SDF fee included in your price?", answer: "Yes! All government Sustainable Development Fees (SDF) and tourist permits are fully covered in our package." }
    ],
    relatedToursSlugs: ["bhutan-thunder-dragon"]
  },
  {
    slug: "bangkok-pattaya",
    destinationName: "Bangkok-Pattaya",
    region: "International",
    tagline: "Vibrant Thailand Escape — Coral Island Speedboat & Golden Temples",
    heroImage: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800",
    overview: "Enjoy the ultimate international tropical vacation from Kolkata & Rampurhat! Relax on the white sand beaches of Coral Island in Pattaya, enjoy thrilling water sports, and marvel at intricate golden Buddha temples and lively night markets in Bangkok.",
    pickupPoints: [
      "Rampurhat Railway Station (RPH)",
      "Kolkata Airport (CCU)"
    ],
    bestTimeToVisit: "November to February (Coolest tropical weather)",
    idealDuration: "6 Days / 5 Nights",
    startingPriceInr: 29999,
    travelRoutesFromRampurhat: {
      byFlight: "Take train/cab from Rampurhat to Kolkata Airport (CCU) and board direct 2.5-hour flight to Suvarnabhumi Airport, Bangkok (BKK)."
    },
    keyInclusions: [
      "Return international flight fare from Kolkata",
      "5 nights 3-Star hotel stay (Pattaya & Bangkok)",
      "Daily breakfast & Coral Island Indian buffet lunch",
      "Speedboat transfer to Coral Island with beach chair",
      "Famous Alcazar Cabaret Show entry ticket",
      "Bangkok City Temple tour (Wat Pho & Wat Golden Buddha)"
    ],
    itineraryHighlights: [
      { day: "Day 1", title: "Arrival in Bangkok & Drive to Pattaya", desc: "Land in Bangkok. Direct private coach transfer to beach resort city Pattaya. Evening leisure at Walking Street." },
      { day: "Day 2", title: "Coral Island Excursion by Speedboat", desc: "Excursion to pristine Koh Larn (Coral Island). Enjoy parasailing and jet skiing followed by Indian beach lunch." },
      { day: "Day 3", title: "Nong Nooch Gardens & Alcazar Show", desc: "Visit botanical gardens featuring Thai cultural shows and elephant demonstrations. Evening spectacular Alcazar show." },
      { day: "Day 4", title: "Transfer to Bangkok & Temple Tour", desc: "Drive back to Bangkok. Visit Wat Pho (Reclining Buddha) and Gems Gallery." },
      { day: "Day 5", title: "Bangkok Shopping Extravaganza", desc: "Free day for shopping at Indra Square, Pratunam market, or MBK Center." },
      { day: "Day 6", title: "Departure", desc: "Transfer to Bangkok airport for short return flight to Kolkata." }
    ],
    faqs: [
      { question: "Is Indian vegetarian food available in Thailand?", answer: "Yes, all our scheduled lunches and hotel breakfasts feature dedicated Indian vegetarian and Jain meal options." }
    ],
    relatedToursSlugs: ["bangkok-pattaya-fun"]
  }
];

export const getDestinationBySlug = (slug: string): RampurhatDestinationData | undefined => {
  return rampurhatDestinations.find((d) => d.slug.toLowerCase() === slug.toLowerCase());
};

export interface OriginCityData {
  slug: string;
  name: string;
  stationCode: string;
  stationName: string;
  airportDescription: string;
  taglineSuffix: string;
}

export const ORIGIN_CITIES: Record<string, OriginCityData> = {
  rampurhat: {
    slug: "rampurhat",
    name: "Rampurhat",
    stationCode: "RPH",
    stationName: "Rampurhat Junction (RPH)",
    airportDescription: "short train ride to Kolkata Airport (CCU) or Kazi Nazrul Islam Airport (RDP)",
    taglineSuffix: "Birbhum's Premier Travel Partner",
  },
  kolkata: {
    slug: "kolkata",
    name: "Kolkata",
    stationCode: "HWH/SDAH",
    stationName: "Howrah / Sealdah / Kolkata Railway Stations",
    airportDescription: "direct departures from Netaji Subhash Chandra Bose International Airport (CCU)",
    taglineSuffix: "Direct Flights & Premium Train Tours from Kolkata",
  },
  bolpur: {
    slug: "bolpur",
    name: "Bolpur (Shantiniketan)",
    stationCode: "BHP",
    stationName: "Bolpur Shantiniketan Railway Station (BHP)",
    airportDescription: "convenient access via Kolkata Airport (CCU) or Durgapur Airport",
    taglineSuffix: "Shantiniketan & Bolpur's Trusted Tour Operator",
  },
  suri: {
    slug: "suri",
    name: "Suri",
    stationCode: "SURI",
    stationName: "Suri Railway Station",
    airportDescription: "easy cab and rail connectivity to Kolkata and Durgapur airports",
    taglineSuffix: "Birbhum Headquarters' Best Travel Agency",
  },
  asansol: {
    slug: "asansol",
    name: "Asansol",
    stationCode: "ASN",
    stationName: "Asansol Junction (ASN)",
    airportDescription: "direct access to Kazi Nazrul Islam Airport (Durgapur) and major express train junctions",
    taglineSuffix: "Paschim Bardhaman's Leading Tour Packages",
  },
  durgapur: {
    slug: "durgapur",
    name: "Durgapur",
    stationCode: "DGR",
    stationName: "Durgapur Railway Station (DGR)",
    airportDescription: "departures from Kazi Nazrul Islam Airport (RDP) or Kolkata Airport",
    taglineSuffix: "Steel City's Favorite Holiday Planner",
  },
  maldah: {
    slug: "maldah",
    name: "Malda Town",
    stationCode: "MLDT",
    stationName: "Malda Town Junction (MLDT)",
    airportDescription: "major railway junction connecting North Bengal, Assam, and Kolkata",
    taglineSuffix: "Malda & North Bengal Tour Specialists",
  },
};

export const getOriginBySlug = (slug?: string): OriginCityData => {
  if (!slug) return ORIGIN_CITIES.rampurhat;
  return ORIGIN_CITIES[slug.toLowerCase()] || ORIGIN_CITIES.rampurhat;
};

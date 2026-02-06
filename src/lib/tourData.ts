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
 
 export interface TourData {
   title: string;
   slug: string;
   destination: string;
   duration_days: number;
   start_city: string;
   category: string;
   best_season: string;
   original_price_inr: number;
   discounted_price_inr: number;
   overview: string;
   inclusions: string[];
   exclusions: string[];
   transport: string;
   hotel_type: string;
   hero_image_url: string;
   gallery_images: string[];
   is_featured: boolean;
   itinerary: { day_number: number; title: string; description: string }[];
 }
 
 export const toursData: TourData[] = [
   {
     title: "Kashmir Paradise Tour",
     slug: "kashmir-paradise-tour",
     destination: "Kashmir",
     duration_days: 6,
     start_city: "Kolkata",
     category: "Budget",
     best_season: "March to October",
     original_price_inr: 24999,
     discounted_price_inr: 18999,
     overview: "Experience the heaven on earth with our Kashmir tour. Visit the stunning Dal Lake, beautiful Mughal gardens, and the picturesque hill stations of Gulmarg and Pahalgam.",
     inclusions: ["Flight tickets from Kolkata", "5 nights hotel accommodation", "Daily breakfast & dinner", "All sightseeing by private cab", "Shikara ride on Dal Lake", "Travel insurance"],
     exclusions: ["Lunch", "Personal expenses", "Adventure activities", "Tips and gratuities"],
     transport: "Flight + Private Cab",
     hotel_type: "Budget",
     hero_image_url: tourKashmir,
     gallery_images: [tourKashmir],
     is_featured: true,
     itinerary: [
       { day_number: 1, title: "Arrival in Srinagar", description: "Arrive at Srinagar airport. Transfer to houseboat on Dal Lake. Evening Shikara ride to witness the sunset over the lake." },
       { day_number: 2, title: "Gulmarg Excursion", description: "Full day excursion to Gulmarg - the meadow of flowers. Enjoy Gondola ride (optional). Visit the highest golf course in the world." },
       { day_number: 3, title: "Pahalgam Day Trip", description: "Drive to Pahalgam through saffron fields and apple orchards. Visit Betaab Valley and Aru Valley. Enjoy pony ride (optional)." },
       { day_number: 4, title: "Srinagar Local Sightseeing", description: "Visit the famous Mughal Gardens - Nishat Bagh, Shalimar Bagh, and Chashme Shahi. Evening shopping at local markets." },
       { day_number: 5, title: "Sonmarg Excursion", description: "Day trip to Sonmarg - the meadow of gold. Visit Thajiwas Glacier. Enjoy the stunning mountain views." },
       { day_number: 6, title: "Departure", description: "After breakfast, transfer to Srinagar airport for your return flight to Kolkata." }
     ]
   },
   {
     title: "Ladakh Adventure Expedition",
     slug: "ladakh-adventure-expedition",
     destination: "Ladakh",
     duration_days: 7,
     start_city: "Kolkata",
     category: "Budget",
     best_season: "May to September",
     original_price_inr: 32999,
     discounted_price_inr: 26999,
     overview: "Embark on an unforgettable journey to Ladakh, the land of high passes. Experience the raw beauty of the Himalayas, ancient monasteries, and the stunning Pangong Lake.",
     inclusions: ["Flight tickets from Kolkata", "6 nights hotel accommodation", "Daily breakfast & dinner", "All sightseeing by private vehicle", "Inner Line Permits", "Oxygen cylinder in vehicle"],
     exclusions: ["Lunch", "Personal expenses", "Monastery entrance fees", "AMS medication"],
     transport: "Flight + Private Vehicle",
     hotel_type: "Budget",
     hero_image_url: tourLadakh,
     gallery_images: [tourLadakh],
     is_featured: true,
     itinerary: [
       { day_number: 1, title: "Arrival in Leh", description: "Arrive at Leh airport. Rest and acclimatization. Light walk around Leh market in evening." },
       { day_number: 2, title: "Leh Local Sightseeing", description: "Visit Shanti Stupa, Leh Palace, and local monasteries. Explore the local bazaar and try Ladakhi cuisine." },
       { day_number: 3, title: "Nubra Valley", description: "Drive to Nubra Valley via Khardung La Pass. Visit Diskit Monastery and enjoy double-hump camel ride at Hunder sand dunes." },
       { day_number: 4, title: "Nubra to Pangong", description: "Drive from Nubra Valley to Pangong Lake via Shyok route. Witness the magical color-changing lake at sunset." },
       { day_number: 5, title: "Pangong to Leh", description: "Morning sunrise at Pangong Lake. Drive back to Leh via Changla Pass. Visit Thiksey Monastery en route." },
       { day_number: 6, title: "Sham Valley Tour", description: "Day trip to Sham Valley. Visit Magnetic Hill, Gurudwara Pathar Sahib, and the confluence of Indus and Zanskar rivers." },
       { day_number: 7, title: "Departure", description: "Transfer to Leh airport for your return flight to Kolkata. Tour ends with beautiful memories." }
     ]
   },
   {
     title: "Darjeeling Queen of Hills",
     slug: "darjeeling-queen-of-hills",
     destination: "Darjeeling",
     duration_days: 4,
     start_city: "Kolkata",
     category: "Budget",
     best_season: "October to March",
     original_price_inr: 12999,
     discounted_price_inr: 9999,
     overview: "Discover the charm of Darjeeling - the Queen of Hills. Visit the iconic tea gardens, ride the heritage toy train, and witness breathtaking sunrise over Kanchenjunga.",
     inclusions: ["Train/Bus from Kolkata", "3 nights hotel stay", "Daily breakfast", "All local sightseeing", "Toy train ride", "Tea garden visit"],
     exclusions: ["Lunch & Dinner", "Personal expenses", "Cable car ride", "Tips"],
     transport: "Train/Bus + Local Taxi",
     hotel_type: "Budget",
     hero_image_url: tourDarjeeling,
     gallery_images: [tourDarjeeling],
     is_featured: true,
     itinerary: [
       { day_number: 1, title: "Kolkata to Darjeeling", description: "Depart from Kolkata by train/bus. Arrive at NJP station and transfer to Darjeeling. Evening free for Mall Road walk." },
       { day_number: 2, title: "Tiger Hill & Sightseeing", description: "Early morning visit to Tiger Hill for sunrise. Visit Batasia Loop, Ghoom Monastery, and Himalayan Mountaineering Institute." },
       { day_number: 3, title: "Tea Garden & Toy Train", description: "Visit Happy Valley Tea Estate. Experience the heritage Toy Train ride. Evening shopping at Chowrasta Mall." },
       { day_number: 4, title: "Departure", description: "After breakfast, transfer to NJP station for your return journey to Kolkata." }
     ]
   },
   {
     title: "Sundarban Wildlife Safari",
     slug: "sundarban-wildlife-safari",
     destination: "Sundarban",
     duration_days: 3,
     start_city: "Kolkata",
     category: "Budget",
     best_season: "September to March",
     original_price_inr: 7999,
     discounted_price_inr: 5999,
     overview: "Explore the world's largest mangrove forest and home to the Royal Bengal Tiger. Experience boat safaris through the mystical waterways of the Sundarbans.",
     inclusions: ["AC transport from Kolkata", "2 nights accommodation", "All meals included", "Boat safaris", "Forest permits", "Trained naturalist guide"],
     exclusions: ["Personal expenses", "Camera fees", "Extra boat rides", "Tips"],
     transport: "AC Bus + Boat",
     hotel_type: "Budget",
     hero_image_url: tourSundarban,
     gallery_images: [tourSundarban],
     is_featured: true,
     itinerary: [
       { day_number: 1, title: "Kolkata to Sundarban", description: "Early morning departure from Kolkata. Reach Godkhali jetty and board boat to the resort. Afternoon boat safari in the creeks." },
       { day_number: 2, title: "Full Day Safari", description: "Full day exploration of Sundarban. Visit watchtowers at Sajnekhali and Sudhanyakhali. Spot wildlife including deer, crocodiles, and birds." },
       { day_number: 3, title: "Return to Kolkata", description: "Morning bird watching. After breakfast, board return boat and drive back to Kolkata by evening." }
     ]
   },
   {
     title: "Shimla Manali Adventure",
     slug: "shimla-manali-adventure",
     destination: "Shimla-Manali",
     duration_days: 6,
     start_city: "Kolkata",
     category: "Budget",
     best_season: "October to June",
     original_price_inr: 21999,
     discounted_price_inr: 16999,
     overview: "Experience the best of Himachal Pradesh with this combined Shimla-Manali tour. From colonial charm to adventure sports, this tour has it all.",
     inclusions: ["Train + Volvo bus from Kolkata", "5 nights hotel stay", "Daily breakfast", "All sightseeing by private cab", "Mall Road walks", "Rohtang Pass excursion (subject to weather)"],
     exclusions: ["Lunch & Dinner", "Adventure activities", "Personal expenses", "Tips"],
     transport: "Train + Volvo Bus + Cab",
     hotel_type: "Budget",
     hero_image_url: tourShimla,
     gallery_images: [tourShimla],
     is_featured: false,
     itinerary: [
       { day_number: 1, title: "Arrival in Shimla", description: "Arrive at Shimla. Check-in to hotel. Evening walk on the famous Mall Road and Ridge." },
       { day_number: 2, title: "Shimla Sightseeing", description: "Visit Kufri, Jakhu Temple, and Christ Church. Evening free for shopping at Lakkar Bazaar." },
       { day_number: 3, title: "Shimla to Manali", description: "Scenic drive from Shimla to Manali through apple orchards and pine forests. Overnight in Manali." },
       { day_number: 4, title: "Manali Local Tour", description: "Visit Hadimba Temple, Vashisht Hot Springs, and Old Manali. Evening river side walk." },
       { day_number: 5, title: "Solang Valley / Rohtang", description: "Day trip to Solang Valley for adventure activities or Rohtang Pass (seasonal). Enjoy snow activities." },
       { day_number: 6, title: "Departure", description: "After breakfast, transfer to bus station for your return journey to Kolkata." }
     ]
   },
   {
     title: "Puri Beach Getaway",
     slug: "puri-beach-getaway",
     destination: "Puri",
     duration_days: 4,
     start_city: "Kolkata",
     category: "Budget",
     best_season: "October to March",
     original_price_inr: 9999,
     discounted_price_inr: 7499,
     overview: "Relax on the beautiful beaches of Puri and seek blessings at the famous Jagannath Temple. A perfect blend of spirituality and relaxation.",
     inclusions: ["Train from Kolkata", "3 nights hotel near beach", "Daily breakfast", "Temple visits", "Local sightseeing", "Konark Sun Temple visit"],
     exclusions: ["Lunch & Dinner", "Temple donations", "Personal expenses", "Tips"],
     transport: "Train + Local Cab",
     hotel_type: "Budget",
     hero_image_url: tourPuri,
     gallery_images: [tourPuri],
     is_featured: false,
     itinerary: [
       { day_number: 1, title: "Arrival in Puri", description: "Arrive at Puri by train. Check-in to hotel near beach. Evening at leisure - enjoy sunset at the beach." },
       { day_number: 2, title: "Jagannath Temple & Local", description: "Visit the famous Jagannath Temple (one of Char Dham). Explore the local markets and enjoy beach activities." },
       { day_number: 3, title: "Konark Excursion", description: "Day trip to Konark Sun Temple (UNESCO World Heritage Site). Visit Chandrabhaga Beach. Return to Puri by evening." },
       { day_number: 4, title: "Departure", description: "Morning at leisure. After breakfast, transfer to railway station for return journey to Kolkata." }
     ]
   },
   {
     title: "Rishikesh Haridwar Spiritual Journey",
     slug: "rishikesh-haridwar-spiritual",
     destination: "Rishikesh-Haridwar",
     duration_days: 4,
     start_city: "Kolkata",
     category: "Budget",
     best_season: "September to April",
     original_price_inr: 11999,
     discounted_price_inr: 8999,
     overview: "Embark on a spiritual journey to the banks of the holy Ganges. Experience the famous Ganga Aarti, visit ancient temples, and enjoy yoga and rafting.",
     inclusions: ["Train from Kolkata", "3 nights hotel stay", "Daily breakfast", "Ganga Aarti darshan", "Temple visits", "Beatles Ashram visit"],
     exclusions: ["Lunch & Dinner", "Rafting (optional)", "Personal expenses", "Tips"],
     transport: "Train + Private Cab",
     hotel_type: "Budget",
     hero_image_url: tourRishikesh,
     gallery_images: [tourRishikesh],
     is_featured: false,
     itinerary: [
       { day_number: 1, title: "Arrival in Haridwar", description: "Arrive at Haridwar. Check-in to hotel. Evening Ganga Aarti at Har Ki Pauri - a mesmerizing experience." },
       { day_number: 2, title: "Haridwar to Rishikesh", description: "Morning dip in Ganges. Drive to Rishikesh. Visit Lakshman Jhula, Ram Jhula, and riverside temples." },
       { day_number: 3, title: "Rishikesh Exploration", description: "Visit Beatles Ashram, Triveni Ghat. Optional: White water rafting or yoga session. Evening aarti at Parmarth Niketan." },
       { day_number: 4, title: "Departure", description: "Early morning yoga (optional). After breakfast, transfer to station for return journey to Kolkata." }
     ]
   },
   {
     title: "Gangtok Sikkim Delight",
     slug: "gangtok-sikkim-delight",
     destination: "Gangtok",
     duration_days: 5,
     start_city: "Kolkata",
     category: "Budget",
     best_season: "March to June, October to December",
     original_price_inr: 16999,
     discounted_price_inr: 13999,
     overview: "Discover the serene beauty of Sikkim with views of Kanchenjunga. Visit monasteries, enjoy local cuisine, and experience the warm hospitality of the Northeast.",
     inclusions: ["Train/Flight from Kolkata", "4 nights hotel stay", "Daily breakfast", "All sightseeing", "Permits", "Tsomgo Lake visit"],
     exclusions: ["Lunch & Dinner", "Yak ride", "Personal expenses", "Tips"],
     transport: "Train/Flight + Cab",
     hotel_type: "Budget",
     hero_image_url: tourGangtok,
     gallery_images: [tourGangtok],
     is_featured: true,
     itinerary: [
       { day_number: 1, title: "Arrival in Gangtok", description: "Arrive at Bagdogra/NJP and transfer to Gangtok. Check-in and rest. Evening walk at MG Marg." },
       { day_number: 2, title: "Gangtok Local Sightseeing", description: "Visit Rumtek Monastery, Do Drul Chorten, Namgyal Institute of Tibetology, and Enchey Monastery." },
       { day_number: 3, title: "Tsomgo Lake & Baba Mandir", description: "Excursion to Tsomgo Lake and Baba Harbhajan Singh Mandir. Enjoy yak ride (optional) at the lake." },
       { day_number: 4, title: "Nathula Pass Excursion", description: "Day trip to Nathula Pass - Indo-China border (subject to permit availability). Experience snow at 14,140 ft." },
       { day_number: 5, title: "Departure", description: "After breakfast, transfer to Bagdogra airport/NJP station for your return journey to Kolkata." }
     ]
   },
   {
     title: "Kedarnath Pilgrimage Tour",
     slug: "kedarnath-pilgrimage-tour",
     destination: "Kedarnath",
     duration_days: 5,
     start_city: "Kolkata",
     category: "Budget",
     best_season: "May to June, September to October",
     original_price_inr: 18999,
     discounted_price_inr: 14999,
     overview: "Undertake the sacred pilgrimage to Kedarnath, one of the Char Dham temples. Experience the divine atmosphere and stunning Himalayan landscapes.",
     inclusions: ["Train from Kolkata", "4 nights accommodation", "Daily breakfast & dinner", "All transfers", "Helicopter (optional booking)", "Local guide"],
     exclusions: ["Lunch", "Palki/Pony ride", "Helicopter tickets", "Personal expenses"],
     transport: "Train + Cab",
     hotel_type: "Budget",
     hero_image_url: tourKedarnath,
     gallery_images: [tourKedarnath],
     is_featured: false,
     itinerary: [
       { day_number: 1, title: "Arrival in Haridwar", description: "Arrive at Haridwar. Transfer to hotel. Evening Ganga Aarti at Har Ki Pauri. Prepare for the pilgrimage ahead." },
       { day_number: 2, title: "Haridwar to Guptkashi", description: "Early morning drive to Guptkashi via Devprayag and Rudraprayag. Visit Ardh Narishwar Temple. Overnight stay." },
       { day_number: 3, title: "Kedarnath Trek", description: "Drive to Gaurikund. Begin 16 km trek to Kedarnath (pony/palki optional). Reach Kedarnath. Evening aarti at temple." },
       { day_number: 4, title: "Kedarnath to Guptkashi", description: "Early morning darshan at Kedarnath Temple. Trek back to Gaurikund. Drive to Guptkashi for overnight stay." },
       { day_number: 5, title: "Return to Haridwar", description: "Morning drive back to Haridwar. Transfer to station for return journey to Kolkata." }
     ]
   },
   {
     title: "Delhi Heritage Tour",
     slug: "delhi-heritage-tour",
     destination: "Delhi",
     duration_days: 3,
     start_city: "Kolkata",
     category: "Budget",
     best_season: "October to March",
     original_price_inr: 8999,
     discounted_price_inr: 6499,
     overview: "Explore the rich heritage of Delhi - India's capital. From Mughal monuments to modern landmarks, experience centuries of history in this vibrant city.",
     inclusions: ["Train from Kolkata", "2 nights hotel stay", "Daily breakfast", "All sightseeing by AC cab", "Monument entrance fees", "Local guide"],
     exclusions: ["Lunch & Dinner", "Shopping", "Personal expenses", "Tips"],
     transport: "Train + AC Cab",
     hotel_type: "Budget",
     hero_image_url: tourDelhi,
     gallery_images: [tourDelhi],
     is_featured: false,
     itinerary: [
       { day_number: 1, title: "Old Delhi Exploration", description: "Arrive in Delhi. Visit Red Fort, Jama Masjid, and Chandni Chowk. Rickshaw ride through old Delhi lanes. India Gate evening visit." },
       { day_number: 2, title: "New Delhi Tour", description: "Visit Qutub Minar, Humayun's Tomb, Lotus Temple, and Akshardham Temple. Drive past Parliament, Rashtrapati Bhavan." },
       { day_number: 3, title: "Departure", description: "Morning visit to Gurudwara Bangla Sahib. After breakfast, transfer to railway station for return to Kolkata." }
     ]
   },
   {
     title: "Agra Taj Mahal Express",
     slug: "agra-taj-mahal-express",
     destination: "Agra",
     duration_days: 2,
     start_city: "Kolkata",
     category: "Budget",
     best_season: "October to March",
     original_price_inr: 7499,
     discounted_price_inr: 5499,
     overview: "Witness the iconic Taj Mahal - one of the Seven Wonders of the World. A quick getaway to experience the magnificent Mughal architecture of Agra.",
     inclusions: ["Train from Kolkata", "1 night hotel stay", "Breakfast", "All sightseeing", "Taj Mahal & Agra Fort entry", "AC cab"],
     exclusions: ["Lunch & Dinner", "Camera fees", "Personal expenses", "Tips"],
     transport: "Train + AC Cab",
     hotel_type: "Budget",
     hero_image_url: tourAgra,
     gallery_images: [tourAgra],
     is_featured: true,
     itinerary: [
       { day_number: 1, title: "Kolkata to Agra", description: "Arrive in Agra. Visit Taj Mahal at sunrise (or afternoon). Explore Agra Fort and Mehtab Bagh for sunset Taj view." },
       { day_number: 2, title: "Departure", description: "Optional: Early morning Taj Mahal revisit. After breakfast, visit Fatehpur Sikri. Transfer to station for return to Kolkata." }
      ]
    },
    {
    title: "Umrah Pilgrimage Package",
    slug: "umrah-pilgrimage-package",
    destination: "Mecca-Medina",
    duration_days: 10,
    start_city: "Kolkata",
    category: "Pilgrimage",
    best_season: "Year Round (avoid Hajj season)",
    original_price_inr: 125000,
    discounted_price_inr: 99999,
    overview: "Embark on a blessed journey to the holy cities of Mecca and Medina for Umrah. Experience the spiritual serenity of Masjid al-Haram, perform Tawaf around the Kaaba, and visit the Prophet's Mosque in Medina.",
    inclusions: ["Return flights from Kolkata", "Umrah visa processing", "9 nights hotel accommodation (5 star near Haram)", "Daily breakfast & dinner", "Airport transfers", "Ziyarat tours in Mecca & Medina", "Zamzam water (5L per person)", "Experienced religious guide"],
    exclusions: ["Lunch", "Personal expenses", "Ihram clothing", "Tips", "Extra Ziyarat", "Travel insurance"],
    transport: "Flight + AC Bus",
    hotel_type: "5 Star Near Haram",
    hero_image_url: tourUmrah,
    gallery_images: [tourUmrah],
    is_featured: true,
    itinerary: [
      { day_number: 1, title: "Departure from Kolkata", description: "Depart from Kolkata airport. Arrive in Jeddah. Immigration and transfer to Mecca by AC bus. Check-in to hotel near Masjid al-Haram." },
      { day_number: 2, title: "Umrah Performance", description: "After Fajr, perform Umrah rituals - Tawaf (7 rounds around Kaaba), Sa'i (walking between Safa and Marwa), and Halq/Taqsir. Rest and prayers at Haram." },
      { day_number: 3, title: "Prayers at Masjid al-Haram", description: "Full day for prayers at Masjid al-Haram. Spend time in ibadah near the Holy Kaaba. Optional: Visit Jabal al-Nour (Mount of Light)." },
      { day_number: 4, title: "Mecca Ziyarat", description: "Visit historical sites in Mecca - Jabal al-Rahma, Muzdalifah, Mina, and the site of Jamarat. Learn about Hajj rituals for future reference." },
      { day_number: 5, title: "Mecca to Medina", description: "After Fajr prayers, check out and travel to Medina by AC bus. Check-in to hotel near Masjid an-Nabawi. Evening prayers at the Prophet's Mosque." },
      { day_number: 6, title: "Masjid an-Nabawi", description: "Offer prayers at Masjid an-Nabawi. Visit Riyad ul-Jannah (Garden of Paradise). Pay respects at the Prophet's grave and his companions." },
      { day_number: 7, title: "Medina Ziyarat", description: "Visit Masjid Quba (first mosque in Islam), Masjid Qiblatain, Uhud Mountain and martyrs' cemetery, and the Seven Mosques." },
      { day_number: 8, title: "Prayers & Shopping", description: "Morning prayers at Masjid an-Nabawi. Free time for shopping - dates, prayer beads, Islamic books, perfumes. Evening prayers at Haram." },
      { day_number: 9, title: "Return to Mecca", description: "Travel back to Mecca. Perform additional Umrah if desired. Final Tawaf and prayers at Masjid al-Haram. Collect Zamzam water." },
      { day_number: 10, title: "Departure", description: "After Fajr prayers, transfer to Jeddah airport for return flight to Kolkata. Umrah journey complete with blessed memories." }
    ]
  },
  {
    title: "Hajj Pilgrimage Package",
    slug: "hajj-pilgrimage-package",
    destination: "Mecca-Medina-Mina-Arafat",
    duration_days: 21,
    start_city: "Kolkata",
    category: "Pilgrimage",
    best_season: "Dhul Hijjah (Islamic Calendar)",
    original_price_inr: 450000,
    discounted_price_inr: 399999,
    overview: "Complete your fifth pillar of Islam with our comprehensive Hajj package. Experience the once-in-a-lifetime journey to Mecca, perform all Hajj rituals at Mina, Arafat, and Muzdalifah, and attain spiritual purification.",
    inclusions: ["Return flights from Kolkata", "Hajj visa processing", "20 nights accommodation", "All meals during Hajj days", "Mina tent accommodation (AC)", "Transportation for all Hajj rituals", "Qurbani (sacrifice)", "Zamzam water", "Experienced Hajj guide & Muallim", "Medical support"],
    exclusions: ["Personal expenses", "Ihram clothing", "Extra Qurbani", "Tips", "Travel insurance", "Phone/SIM card"],
    transport: "Flight + AC Bus",
    hotel_type: "5 Star + Mina Tents",
    hero_image_url: tourHajj,
    gallery_images: [tourHajj],
    is_featured: true,
    itinerary: [
      { day_number: 1, title: "Departure from Kolkata", description: "Depart from Kolkata airport with Hajj group. Recite Talbiyah upon departure. Flight to Jeddah, Saudi Arabia." },
      { day_number: 2, title: "Arrival in Jeddah", description: "Arrive at Jeddah Hajj Terminal. Immigration and documentation. Transfer to Mecca by AC bus. Check-in to hotel near Haram." },
      { day_number: 3, title: "Umrah Performance", description: "Perform Umrah - Tawaf around Kaaba and Sa'i between Safa and Marwa. Change from Ihram to regular clothes. Rest and prayers." },
      { day_number: 4, title: "Mecca Stay - Day 1", description: "Prayers at Masjid al-Haram. Attend Hajj orientation session. Learn about upcoming rituals and their significance." },
      { day_number: 5, title: "Mecca Stay - Day 2", description: "Continue prayers and ibadah at Haram. Optional visit to historical sites in Mecca. Prepare for Hajj rituals." },
      { day_number: 6, title: "Mecca Stay - Day 3", description: "Final day in Mecca hotel. Collect essentials for Hajj days. Evening preparation and early rest." },
      { day_number: 7, title: "8th Dhul Hijjah - Mina", description: "Wear Ihram and make intention for Hajj. Travel to Mina. Spend day and night in Mina tents. Perform Dhuhr, Asr, Maghrib, Isha, and Fajr prayers." },
      { day_number: 8, title: "9th Dhul Hijjah - Arafat", description: "Day of Arafat - the most important day of Hajj. Travel to Arafat after Fajr. Stand at Arafat (Wuquf) until sunset. Make dua and seek forgiveness. After sunset, travel to Muzdalifah." },
      { day_number: 9, title: "10th Dhul Hijjah - Eid", description: "Collect pebbles at Muzdalifah. Travel to Mina. Perform Rami (stoning of Jamarat al-Aqaba). Qurbani (sacrifice). Halq/Taqsir. Return to Mecca for Tawaf al-Ifadah and Sa'i. Return to Mina." },
      { day_number: 10, title: "11th Dhul Hijjah - Mina", description: "Days of Tashreeq begin. Perform Rami of all three Jamarat after Dhuhr. Rest in Mina tents. Prayers and remembrance of Allah." },
      { day_number: 11, title: "12th Dhul Hijjah - Mina", description: "Perform Rami of all three Jamarat. Option to leave Mina before sunset or stay for 13th. Most pilgrims return to Mecca hotel." },
      { day_number: 12, title: "Mecca - Post Hajj", description: "Rest day in Mecca. Recovery from Hajj rituals. Prayers at Masjid al-Haram. Congratulations - Hajj is complete!" },
      { day_number: 13, title: "Mecca Stay", description: "Continue prayers at Haram. Shopping for gifts and souvenirs. Visit Makkah Mall if desired." },
      { day_number: 14, title: "Travel to Medina", description: "Check out from Mecca hotel. Travel to Medina by AC bus (approx 5 hours). Check-in to hotel near Masjid an-Nabawi." },
      { day_number: 15, title: "Masjid an-Nabawi - Day 1", description: "Prayers at the Prophet's Mosque. Visit Riyad ul-Jannah. Pay respects at the Prophet's grave (Rawdah)." },
      { day_number: 16, title: "Medina Ziyarat", description: "Visit Masjid Quba, Masjid Qiblatain, Uhud Mountain and Shuhada (martyrs), and the Seven Mosques." },
      { day_number: 17, title: "Masjid an-Nabawi - Day 2", description: "Continue prayers at Prophet's Mosque. Free time for personal ibadah and reflection on the Hajj journey." },
      { day_number: 18, title: "Medina Stay", description: "Final full day in Medina. Shopping at local markets - dates, prayer items, Islamic goods. Farewell prayers at Haram." },
      { day_number: 19, title: "Travel to Jeddah", description: "After Fajr, travel to Jeddah. Free time for rest or shopping. Prepare for departure." },
      { day_number: 20, title: "Departure", description: "Transfer to Jeddah airport. Final Talbiyah and duas. Board flight to Kolkata." },
      { day_number: 21, title: "Arrival in Kolkata", description: "Arrive in Kolkata as Hajji/Hajjah. Return home with the blessed completion of the fifth pillar of Islam. Hajj Mabroor!" }
    ]
  }
];
 
export const testimonialData = [
  { name: "Rajesh Kumar", rating: 5, text: "Amazing Kashmir trip! Everything was perfectly organized. The houseboat experience was unforgettable.", destination: "Kashmir" },
  { name: "Priya Sharma", rating: 5, text: "Best Ladakh trip ever! The team took care of everything including acclimatization. Highly recommended.", destination: "Ladakh" },
  { name: "Amit Banerjee", rating: 5, text: "Sundarban safari was thrilling! We spotted a tiger on the second day. Great guides and comfortable stay.", destination: "Sundarban" },
  { name: "Sneha Das", rating: 4, text: "Beautiful Darjeeling trip with family. The toy train ride was the highlight for kids. Good budget package.", destination: "Darjeeling" },
  { name: "Vikram Singh", rating: 5, text: "Kedarnath pilgrimage was well organized. The team handled everything from permits to accommodation.", destination: "Kedarnath" },
  { name: "Mohammed Iqbal", rating: 5, text: "Alhamdulillah! The Umrah package was excellent. Hotels near Haram, experienced guide, and smooth visa processing.", destination: "Umrah" },
  { name: "Fatima Begum", rating: 5, text: "Our Hajj journey was blessed. Sova Tours handled everything professionally. The guides were knowledgeable and caring.", destination: "Hajj" }
];
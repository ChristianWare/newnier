import Linda from "../../public/images/linda.jpg";
import Sheryl from "../../public/images/sheryl.jpg";
import Jeff from "../../public/images/jeff.jpg";
import Airport from "../../public/images/airport.jpg";
import Airport2 from "../../public/images/airport2.jpg";
import Events from "../../public/images/events.jpg";
import Events2 from "../../public/images/events2.jpg";
import Party from "../../public/images/partyBusiii.jpg";
import Party2 from "../../public/images/partybus.jpg";
import Reocurring from "../../public/images/reocurring.jpg";
import Reocurring2 from "../../public/images/reocurring2.jpg";
import Distance from "../../public/images/distance.jpg";
import Distance2 from "../../public/images/road.jpg";
import Golf from "../../public/images/golf.jpg";
import Golf2 from "../../public/images/golf2.jpg";
import CherylC from "../../public/images/CherylC.jpg";
import JimConnie from "../../public/images/Jim&Connie.jpg";
import Adam from "../../public/images/Adam.jpg";
import Lynn from "../../public/images/lynn.jpg";
import Lady from "../../public/images/lady.jpg";
import Corporate from "../../public/images/corporateii.jpg";
import Corporate3 from "../../public/images/corporate.jpg";
import Hourly from "../../public/images/sand.jpg";
import Hourly2 from "../../public/images/hourly2.jpg";
import Point from "../../public/images/point.jpg";
import Point2 from "../../public/images/point2.jpg";
// import Vip from "../public/images/vip.jpg";
// import Vip2 from "../public/images/vip2.jpg";
import Wedding from "../../public/images/wedding.jpg";
import Wedding2 from "../../public/images/wedding2.jpg";
import ImgScottsdale from "../../public/images/scottsdaleii.jpg";
import ImgPhoenix from "../../public/images/phoenixii.jpg";
import ImgMesa from "../../public/images/mesaii.jpg";
import ImgTempe from "../../public/images/tempe.jpg";
import ImgWestValley from "../../public/images/westValleyiii.jpg";
import ImgCasaGrande from "../../public/images/casaGrandeii.jpg";
import ImgMaricopa from "../../public/images/maricopaii.jpg";

export const reviews = [
  {
    id: 7,
    review:
      "Nier Transportation provided the best, outstanding quality of service for at least 20-25 family members for memorial services for my dear father. We required multiple stops, and wait times, and they were first of all affordable, on time, professional, and extremely kind. I would 1000% recommend using them for any transportation needs for personal and business purposes.",
    reviewer: "Linda R.",
    company: "Gilbert, AZ",
    person: Lady,
  },
  {
    id: 8,
    review:
      "Barry provides great reliable service in comfortable luxury. I travel out 1-2 times/month and I can schedule ahead. Barry will always verify the day before in the event anything changes (which it can with my job). I feel safer having someone I know pick me up sometimes at 4a. Thank you Barry!",
    reviewer: "Sheryl G.",
    company: "Scottsdale, AZ",
    person: Sheryl,
  },
  {
    id: 9,
    review:
      "I use Nier Transportation weekly for business travel and occasionally for personal trips.  They are always timely, super friendly, and helpful, all at reasonable rates.  I highly recommend them!",
    reviewer: "Jeff G.",
    company: "Sausalito, CA",
    person: Jeff,
  },
  {
    id: 11,
    review:
      "We have used this car service 4 times in the last few months. Booking a pick-up/drop-off time is very easy and seamless. Barry, the owner is very professional, friendly, and prompt as was one of his other drivers. We have flown in and out of Phoenix all 4 times with our dog and his kennel and Barry was very attentive to ensuring our dog (while in his kennel) was comfortable and safe before we left.Pricing is competitive but the service is better and good value for what you get. Cars are very roomy and spotless. Highly recommend this car service.",
    reviewer: "Cheryl C.",
    company: "Northwest Calgary, Canada",
    person: CherylC,
  },
  {
    id: 12,
    review:
      "We first rode with Barry over one year ago.We were so impressed with his level of pride, professional bearing, situational awareness, and meticulous attention to detail in all mannersrelating to our safety and satisfaction that we made the decision to use him exclusively for all our transportation needs.Nier Transportation has afforded us the luxury of worry-free rides with absolute dependability. They monitor our arrival and departure schedules in real time and adjust accordingly, with no excuses, cancellations, or surprises.Their level of service and the peace of mind it gives is priceless.",
    reviewer: "Jim & Connie A.",
    company: "Phoenix, AZ,",
    person: JimConnie,
  },
  {
    id: 13,
    review:
      "We used Nier Transportation to start and end our European vacation. It was the BEST decision! Our driver was professional, friendly, and timely. We also felt as though we were riding in luxury, the vehicle was new, fresh, and comfortable! An extra thanks for being at the airport waiting for us when we arrived back home at 1:30 a.m.!",
    reviewer: "Lynn B",
    company: "Tempe, AZ",
    person: Lynn,
  },
  {
    id: 145,
    review:
      "Have used this service multiple times. The drivers are great. Always very professional and prompt. You can tell they care about safety and a great customer experience, would definitely recommend it.",
    reviewer: "Illeana L.",
    company: "Mesa, AZ",
    person: Linda,
  },
  // {
  //   id: 146,
  //   review:
  //     "I just started utilizing Nier Transportation a couple of months ago and have never used a driving service before. I was surprised to see how easy it was to schedule and use as I wasn't sure how it would work in relation to price timeliness, and reliability. I travel almost weekly and Barry, the owner made it very simple by asking for my flight itinerary, and pick-up times. I have used his service a few times so far and have had numerous changes to my plans and he has come through every time. He even made a special trip to pick up a backpack for my daughter when I was in Hawaii so when we returned, we wouldn't have to make a special trip. Vehicles are nice and clean, and Barry is a good man. His pricing is competitive and you get great value with all the things I stated above. Highly Recommended",
  //   reviewer: "Adam B.",
  //   company: "Phoenix, AZ",
  //   person: Adam,
  // },
] as const;

export const services = [
  {
    id: 1,
    title: "Airport Transfers",
    slug: "airport-transfers",
    copy: "Reliable black car service to Scottsdale, Sky Harbor, and Gateway airports. Professional chauffeurs ensure punctual, stress-free travel.",
    src: Airport,
    src2: Airport2,
    description:
      "Our Airport Transfers guarantee a seamless start or end to your journey, with professional chauffeurs who track your flight status in real time and adjust pickup as needed. Enjoy a spacious, climate-controlled vehicle and door-to-door service that removes the hassle of parking or shuttle lines. From curbside greeting to luggage handling, we manage every detail so you can focus on what matters most.",
    features: [
      {
        id: 1.1,
        title: "Real-Time Flight Monitoring",
        details:
          "We automatically adjust your pickup time based on live flight data to accommodate delays or early arrivals.",
      },
      {
        id: 1.2,
        title: "Meet & Greet Service",
        details:
          "Your chauffeur will be waiting inside the terminal with a personalized name sign for a smooth handoff.",
      },
      {
        id: 1.3,
        title: "Luggage Assistance",
        details:
          "Professional loading and unloading of all bags directly to and from the vehicle.",
      },
      {
        id: 1.4,
        title: "Complimentary Wait Time",
        details:
          "Enjoy up to 60 minutes of free wait time after landing without any additional fees.",
      },
    ],
  },
  {
    id: 2,
    title: "Hourly “As-Directed” Chauffeur",
    slug: "hourly-chauffeur",
    copy: "Keep a dedicated car and driver on standby for meetings, golf, or a night out; pay only for the hours you use.",
    src: Hourly,
    src2: Hourly2,
    description:
      "Engage our Hourly “As-Directed” Chauffeur for complete flexibility—your private driver awaits your schedule, whether it’s back-to-back meetings, a round of golf, or a social evening. You’re billed only for the exact time you travel, with unlimited stops and seamless route changes on the fly. All vehicles come stocked with bottled water, phone chargers, and a professional, courteous chauffeur to ensure comfort throughout.",
    features: [
      {
        id: 2.1,
        title: "Unlimited Stops",
        details:
          "Add as many pickups or drop-offs as you need during your booked time slot.",
      },
      {
        id: 2.2,
        title: "On-Demand Route Changes",
        details:
          "Modify your itinerary on the go via text or call—no extra charge.",
      },
      {
        id: 2.3,
        title: "Hourly Rate Transparency",
        details:
          "Know exactly what you’ll pay, down to the minute, with no hidden fees.",
      },
      {
        id: 2.4,
        title: "Vehicle Amenities",
        details:
          "Every car includes bottled water, phone chargers, and optional Wi-Fi access.",
      },
    ],
  },
  {
    id: 3,
    title: "Point-to-Point City Transfers",
    slug: "point-to-point",
    copy: "Direct, door-to-door rides across the Valley with fixed pricing and 15-minute courtesy wait time.",
    src: Point,
    src2: Point2,
    description:
      "Our Point-to-Point City Transfers deliver efficient, no-surprises travel anywhere in the Valley. Benefit from fixed flat rates, a complimentary 15-minute wait window, and an experienced chauffeur who navigates local traffic so you arrive relaxed and on schedule. Perfect for quick trips to meetings, restaurants, or social engagements without the uncertainty of ride-share apps.",
    features: [
      {
        id: 3.1,
        title: "Fixed Flat Rates",
        details:
          "Lock in your fare up front—no surge pricing or unexpected tolls.",
      },
      {
        id: 3.2,
        title: "15-Minute Courtesy Wait",
        details:
          "We’ll wait for you at no extra cost if you’re running a few minutes behind.",
      },
      {
        id: 3.3,
        title: "Local Traffic Expertise",
        details:
          "Our drivers know every shortcut and peak-hour pattern to minimize delays.",
      },
      {
        id: 3.4,
        title: "Clean & Sanitized Vehicles",
        details:
          "Every car is disinfected before each trip for your peace of mind.",
      },
    ],
  },
  {
    id: 4,
    title: "Golf Outing Transportation",
    slug: "golf-outing-transportation",
    copy: "Stress-free rides to TPC, We-Ko Pa, Troon and other courses. Vehicles for any group size with knowledgeable local drivers.",
    src: Golf,
    src2: Golf2,
    description:
      "Hit the links without the logistics headache: our Golf Outing Tours transport your group to top courses like TPC Scottsdale or Troon North in spacious SUVs or vans. Our drivers know each course’s layout and club rules, ensuring you arrive ready to play. Clubs and equipment can be pre-loaded to maximize your time on the green.",
    features: [
      {
        id: 4.1,
        title: "Comfortable Vehicles",
        details:
          "Use well-maintained, spacious vehicles that provide a comfortable ride for passengers, ensuring a pleasant experience before and after the game.",
      },
      {
        id: 4.2,
        title: "Timely Scheduling",
        details:
          "Establish a reliable schedule that allows for timely pickups and drop-offs, minimizing wait times and ensuring players arrive at the course without stress.",
      },
      {
        id: 4.3,
        title: "Knowledgeable Drivers",
        details:
          "Employ experienced drivers who are familiar with the area and can navigate efficiently, providing local insights and tips about the golf course and surroundings.",
      },
      {
        id: 4.4,
        title: "Group Coordination",
        details:
          "Facilitate group transportation options, such as shuttles or vans, to accommodate larger parties, fostering a social atmosphere and making it easier for players to travel together.",
      },
    ],
  },
  {
    id: 5,
    title: "Corporate & Event Logistics",
    slug: "corporate-events",
    copy: "VIP roadshows and conferences with onsite greeters, manifest tracking, and consolidated billing.",
    src: Corporate,
    src2: Corporate3,
    description:
      "Elevate your corporate roadshows and events with our end-to-end logistics support: professional greeters meet your guests, digital manifests keep attendance organized, and one consolidated invoice simplifies expense reporting. We handle every detail so you can focus on your agenda. Tailored service options include branded signage, on-site coordinators, and multi-vehicle synchronization for smooth transitions.",
    features: [
      {
        id: 5.1,
        title: "Onsite Greeters",
        details: "Uniformed staff meet and escort your attendees on arrival.",
      },
      {
        id: 5.2,
        title: "Digital Manifest",
        details: "Real-time tracking of guest check-ins and ride assignments.",
      },
      {
        id: 5.3,
        title: "Consolidated Invoicing",
        details:
          "One single bill for all vehicles and services during your event.",
      },
      {
        id: 5.4,
        title: "Branded Signage Options",
        details:
          "Custom logo signs or banner stands for a polished, professional look.",
      },
    ],
  },
  {
    id: 6,
    title: "Special Events",
    slug: "special-events",
    copy: "Arrive in style for any occasion. We provide luxury vehicles and shuttle buses to suit all group sizes and event types.",
    src: Events,
    src2: Events2,
    description:
      "Make an entrance at weddings, galas, and social celebrations with our Special Events service, featuring luxury sedans, stretch limousines, or shuttle buses tailored to your guest count. Our team coordinates timing, signage, and on-site support so every arrival is flawless. Custom branding, champagne service, and red-carpet setups are available to elevate the experience.",
    features: [
      {
        id: 6.1,
        title: "Red-Carpet Welcome",
        details: "Roll out the red carpet for an unforgettable arrival.",
      },
      {
        id: 6.2,
        title: "Champagne Service",
        details: "Toast to the moment with chilled champagne on board.",
      },
      {
        id: 6.3,
        title: "Guest Counting",
        details: "We manage headcounts to ensure every guest is accounted for.",
      },
      {
        id: 6.4,
        title: "On-Site Coordination",
        details: "Dedicated staff coordinate vehicle staging and timing.",
      },
    ],
  },
  {
    id: 7,
    title: "Party Bus",
    slug: "party-bus",
    copy: "Elevate your celebration with our premium party buses. Featuring spacious interiors, entertainment systems, and professional chauffeurs.",
    src: Party,
    src2: Party2,
    description:
      "Turn any night into a moving celebration aboard our Party Buses, equipped with premium sound systems, LED lighting, and plush seating for up to 30 guests. Your personal chauffeur handles the road while you and your group enjoy onboard entertainment and VIP amenities. Perfect for bachelorette parties, birthday celebrations, or concert pre-shuttles.",
    features: [
      {
        id: 7.1,
        title: "LED Light Show",
        details: "Customizable lighting to set the mood.",
      },
      {
        id: 7.2,
        title: "Premium Sound System",
        details: "Bluetooth connectivity for your playlist.",
      },
      {
        id: 7.3,
        title: "Refreshment Station",
        details: "Mini-bar and cooler space for drinks and snacks.",
      },
      {
        id: 7.4,
        title: "Leather Lounge Seating",
        details: "Spacious, comfortable seating for socializing.",
      },
    ],
  },
  {
    id: 8,
    title: "Reoccurring Rides",
    slug: "reoccurring-rides",
    copy: "Dependable transportation for regular business needs. Scheduled rides ensure timely arrivals without ride-share uncertainties.",
    src: Reocurring,
    src2: Reocurring2,
    description:
      "Streamline your routine commutes or team shuttles with our Reoccurring Rides plan—set up daily, weekly, or custom schedules and we’ll dispatch the same experienced driver and vehicle each time. Enjoy consistency, reliability, and priority service without having to book each trip individually. Automated billing options simplify expense management for corporate accounts.",
    features: [
      {
        id: 8.1,
        title: "Consistent Driver Assignment",
        details: "Ride with the same chauffeur for familiarity and trust.",
      },
      {
        id: 8.2,
        title: "Custom Scheduling",
        details: "Choose specific days and times for your repeating rides.",
      },
      {
        id: 8.3,
        title: "Priority Dispatch",
        details:
          "Reoccurring customers receive top priority during peak hours.",
      },
      {
        id: 8.4,
        title: "Automated Billing",
        details:
          "Weekly or monthly invoicing directly to your corporate account.",
      },
    ],
  },
  {
    id: 9,
    title: "Long Distance Drives",
    slug: "long-distance",
    copy: "Comfortable intercity travel with professional drivers. Relax in our well-maintained vehicles while we handle the journey.",
    src: Distance,
    src2: Distance2,
    description:
      "Experience stress-free Long Distance Drives in climate-controlled comfort, whether you’re headed to Sedona’s red rocks or Tucson’s desert resorts. Our courteous chauffeurs navigate highways and scenic byways so you can work, rest, or take in the views without interruption. Every trip includes bottled water, phone chargers, and optional in-vehicle Wi-Fi to keep you connected.",
    features: [
      {
        id: 9.1,
        title: "Scenic Route Planning",
        details: "Choose the most picturesque roads for a memorable journey.",
      },
      {
        id: 9.2,
        title: "In-Vehicle Wi-Fi",
        details: "Stay connected with high-speed internet onboard.",
      },
      {
        id: 9.3,
        title: "Snack & Beverage Kit",
        details: "Optional pre-stocked refreshments for longer trips.",
      },
      {
        id: 9.4,
        title: "Flexible Stopovers",
        details: "Add breaks or sightseeing stops without changing your rate.",
      },
    ],
  },
  {
    id: 10,
    title: "Golf Outing Transportation",
    slug: "golf-outing-transportation",
    copy: "Stress-free rides to TPC, We-Ko Pa, Troon and other courses. Vehicles for any group size with knowledgeable local drivers.",
    src: Golf,
    src2: Golf2,
    description:
      "Hit the links without the logistics headache: our Golf Outing Tours transport your group to top courses like TPC Scottsdale or Troon North in spacious SUVs or vans. Our drivers know each course’s layout and club rules, ensuring you arrive ready to play. Clubs and equipment can be pre-loaded to maximize your time on the green.",
    features: [
      {
        id: 10.1,
        title: "Comfortable Vehicles",
        details:
          "Use well-maintained, spacious vehicles that provide a comfortable ride for passengers, ensuring a pleasant experience before and after the game.",
      },
      {
        id: 10.2,
        title: "Timely Scheduling",
        details:
          "Establish a reliable schedule that allows for timely pickups and drop-offs, minimizing wait times and ensuring players arrive at the course without stress.",
      },
      {
        id: 10.3,
        title: "Knowledgeable Drivers",
        details:
          "Employ experienced drivers who are familiar with the area and can navigate efficiently, providing local insights and tips about the golf course and surroundings.",
      },
      {
        id: 10.4,
        title: "Group Coordination",
        details:
          "Facilitate group transportation options, such as shuttles or vans, to accommodate larger parties, fostering a social atmosphere and making it easier for players to travel together.",
      },
    ],
  },
  {
    id: 11,
    title: "Weddings",
    slug: "party-bus-weddings",
    copy: "LED lighting, Bluetooth sound, and wrap-around seating for unforgettable celebrations and seamless shuttles.",
    src: Wedding,
    src2: Wedding2,
    description:
      "Add a touch of luxury to your wedding day with our Wedding Shuttles or Party Buses—complete with ambient lighting, premium audio, and plush seating. We coordinate pickup times and routes so your entire party arrives together and on time. Personalized décor options and keepsake signage make your transportation as memorable as the ceremony itself.",
    features: [
      {
        id: 11.1,
        title: "Custom Décor Options",
        details: "Choose ribbons, flowers, or signage to match your theme.",
      },
      {
        id: 11.2,
        title: "Keepsake Signage",
        details: "Personalized boards to commemorate your special day.",
      },
      {
        id: 11.3,
        title: "Champagne Toast Setup",
        details: "Pre-chilled celebratory drinks served onboard.",
      },
      {
        id: 11.4,
        title: "Coordinated Bridal Party Pickup",
        details: "Staggered timing ensures everyone arrives together.",
      },
    ],
  },
  // {
  //   id: 11,
  //   title: "Secure VIP Transport",
  //   slug: "secure-vip-transport",
  //   copy: "Armored Suburbans, trained protection drivers, and optional armed agents for principals requiring elevated security.",
  //   src: Vip,
  //   src2: Vip2,
  //   description:
  //     "Our Secure VIP Transport offers the highest level of personal protection, featuring armored vehicles, specially trained security chauffeurs, and optional armed detail. Whether for high-net-worth individuals or diplomatic delegations, we tailor each itinerary to meet stringent safety protocols. Secure communication channels and advanced route planning ensure discretion and peace of mind.",
  //   features: [
  //     {
  //       id: 1,
  //       title: "Armored Vehicle Certification",
  //       details: "All vehicles meet ballistic and blast protection standards.",
  //     },
  //     {
  //       id: 2,
  //       title: "Trained Protection Drivers",
  //       details:
  //         "Operators certified in evasive and defensive driving techniques.",
  //     },
  //     {
  //       id: 3,
  //       title: "Discrete Communications",
  //       details:
  //         "Encrypted radios and silent escort protocols for enhanced privacy.",
  //     },
  //     {
  //       id: 4,
  //       title: "Custom Security Planning",
  //       details: "Risk assessments and route analysis tailored to each client.",
  //     },
  //   ],
  // },
] as const;

export const ServiceAreas = [
  {
    id: 7,
    city: "Scottsdale",
    desc: "Scottsdale is known for its vibrant arts scene, upscale shopping, and stunning desert landscapes.",
    src: ImgScottsdale,
  },
  {
    id: 8,
    city: "Phoenix",
    desc: "The state's capital and largest city, offering a diverse cultural scene, desert botanical gardens, and outdoor adventures.",
    src: ImgPhoenix,
  },
  {
    id: 9,
    city: "Mesa",
    desc: "Mesa boasts a rich history, with the Mesa Arts Center and a thriving downtown area, making it a hub for arts and culture.",
    src: ImgMesa,
  },
  {
    id: 10,
    city: "Tempe",
    desc: "Home to Arizona State University, combines a lively college atmosphere with recreation along Tempe Town Lake.",
    src: ImgTempe,
  },
  {
    id: 13,
    city: "West Valley",
    desc: "Avondale, Goodyear, Buckeye, Surprise, Glendale, Tolleson, and Peoria—suburban living with easy recreation.",
    src: ImgWestValley,
  },
  {
    id: 14,
    city: "Casa Grande",
    desc: "Casa Grande, home of Lucid Motors, features the Casa Grande Ruins National Monument and a welcoming community.",
    src: ImgCasaGrande,
  },
  {
    id: 15,
    city: "Maricopa",
    desc: "Maricopa is a fast‑growing, family‑friendly city set against the natural beauty of the Sonoran Desert.",
    src: ImgMaricopa,
  },
] as const;

export const questions = [
  {
    id: 1,
    question: "How do you handle flight delays or early arrivals?",
    answer:
      "We monitor your flight in real time and automatically adjust your pickup window at no extra charge. If your flight arrives early, your chauffeur will be standing by; if it’s delayed, we’ll wait up to 60 minutes after landing before any fees apply.",
  },
  {
    id: 1.1,
    question: "What is your cancellation policy?",
    answer:
      "You can cancel or modify your reservation free of charge up to 24 hours before your scheduled pickup. Cancellations made within 24 hours may incur a fee equal to one hour of service or 50% of the trip fare, whichever is less.",
  },
  {
    id: 1.2,
    question: "Can I bring pets or special equipment?",
    answer:
      "Yes—small pets are welcome in our vehicles at no extra cost (please use a carrier). For larger animals or special equipment (golf clubs, skis, wheelchairs), select the appropriate add-on during booking and we’ll provide secure storage and handling.",
  },
  {
    id: 1.3,
    question: "Are gratuities included in the fare?",
    answer:
      "Our fares represent the total cost of your transportation.  However, if you feel inclined, tips are always welcomed and appreciated.",
  },
  {
    id: 1.4,
    question: "What safety measures do you have in place?",
    answer:
      "Every vehicle is cleaned and sanitized before each trip, and all chauffeurs undergo annual defensive-driving recertification and background checks. We also maintain 256-bit SSL encryption on our booking and payment systems to protect your data.",
  },
  {
    id: 1.5,
    question: "How can I add extra stops or change my route?",
    answer:
      "You can add up to three additional stops or modify your itinerary at any time via our mobile app, website, or by calling your chauffeur directly. All changes are confirmed instantly and reflected in your final fare.",
  },
  {
    id: 1.6,
    question: "Do you offer group or corporate discounts?",
    answer:
      "Yes—teams of five or more traveling together, or accounts with recurring ride volume, qualify for custom corporate pricing and priority booking. Contact our sales team for a tailored rate sheet and service agreement.",
  },
] as const;

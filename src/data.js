// All site content lives here — edit text, photos and contacts in one place.

const img = (id, w = 900, extra = "") =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80${extra}`;

export const CONTACT = {
  whatsapp: "919773431736", // receives quote requests (Om Rajput, owner)
  email: "krushnamnirman@gmail.com",
  people: [
    { role: "Owner", name: "Om Rajput", phone: "+91 97734 31736", tel: "+919773431736", wa: "919773431736" },
    { role: "Projects", name: "Dev Patil", phone: "+91 91065 99097", tel: "+919106599097", wa: "919106599097" },
  ],
  hours: "Mon – Sat, 10 AM – 7 PM",
  // TODO: replace with your real studio address
  address: ["Your studio address,", "City, State – PIN, India"],
};

export const NAV = [
  ["spaces", "Spaces"],
  ["materials", "Materials"],
  ["atmospheres", "Atmospheres"],
  ["services", "Services"],
  ["projects", "Projects"],
  ["pricing", "Pricing"],
  ["contact", "Contact"],
];

export const HERO_SLIDES = [
  { img: img("1600607687939-ce8a6c25118c", 2000), kicker: "Living Spaces", title: ["Bespoke interiors", "for Indian homes"], cta: ["#spaces", "Discover"] },
  { img: img("1604014237800-1c9102c219da", 2000), kicker: "Turnkey Execution", title: ["Designed, crafted", "& delivered by us"], cta: ["#services", "Discover"] },
  { img: img("1616594039964-ae9021a400a0", 2000), kicker: "Bedrooms & Wardrobes", title: ["Quiet luxury,", "made to measure"], cta: ["#projects", "Discover"] },
  { img: img("1600489000022-c2086d79f9d4", 2000), kicker: "Modular Kitchens", title: ["Kitchens built for", "real Indian cooking"], cta: ["#quote", "Get Free Quote"] },
];

export const MARQUEE = ["Home Interiors", "Modular Kitchens", "Wardrobes", "Pooja Units", "Office Interiors", "Turnkey Projects", "Vastu-Friendly Design"];

export const SPACES = [
  { title: "Living Rooms", service: "Living Room", img: img("1615529182904-14819c35db37", 700, "&h=700"), alt: "Living room with rattan pendant lights" },
  { title: "Modular Kitchens", service: "Modular Kitchen", img: img("1600489000022-c2086d79f9d4", 700, "&h=700"), alt: "L-shaped modular kitchen in charcoal" },
  { title: "Bedrooms", service: "Bedroom", img: img("1615874959474-d609969a20ed", 700, "&h=700"), alt: "Bedroom with green accents" },
  { title: "Wardrobes & Storage", service: "Wardrobe & Storage", img: img("1595428774223-ef52624120d2", 700, "&h=700"), alt: "Wooden storage unit" },
  { title: "Dining", service: "Dining", img: img("1617806118233-18e1de247200", 700, "&h=700"), alt: "Dining room with green velvet chairs" },
  { title: "Bathrooms", service: "Bathroom", img: img("1604709177225-055f99402ea3", 700, "&h=700"), alt: "Grey stone bathroom with round mirrors" },
  { title: "Home Office", service: "Home Office", img: img("1600494603989-9650cf6ddd3d", 700, "&h=700"), alt: "Home office with green wall" },
  { title: "Commercial", service: "Office / Commercial", img: img("1524758631624-e2822e304c36", 700, "&h=700"), alt: "Bright commercial lounge" },
];

export const MATERIALS = {
  main: { img: img("1565538810643-b5bdb714032a", 1200), alt: "Quartz countertop with brass tap" },
  side: { img: img("1618220179428-22790b461013", 800), alt: "Cane sideboard with brass mirror and orange armchair" },
  list: [
    "BWP / BWR marine plywood",
    "Natural veneers & teak finishes",
    "Italian marble, quartz & granite",
    "Acrylic, PU & premium laminates",
    "Soft-close branded hardware",
    "Brass, cane & handcrafted accents",
  ],
};

// TODO: replace these numbers with your real figures
export const STATS = [
  { value: 250, suffix: "+", label: "Projects delivered" },
  { value: 10, suffix: "+", label: "Years of experience" },
  { value: 45, suffix: " days", label: "Typical 2BHK timeline" },
  { value: 10, suffix: " yr", label: "Warranty on modular work" },
];

export const ATMOSPHERES = [
  { title: "Modern Contemporary", text: "Clean lines, soft neutrals and warm metal accents.", img: img("1616137422495-1e9e46e2aa77"), alt: "Contemporary living room with gold coffee table" },
  { title: "Earthy & Natural", text: "Wood, cane, jute and greenery for a grounded home.", img: img("1616046229478-9901c5536a45"), alt: "Earthy living room with plants and wooden console" },
  { title: "Quiet Luxury", text: "Hotel-inspired bedrooms with tailored upholstery.", img: img("1631049307264-da0ec9d70304"), alt: "Luxury hotel-style bedroom" },
  { title: "Minimal Scandinavian", text: "Light, airy spaces with clever hidden storage.", img: img("1493809842364-78817add7ffb"), alt: "Minimal bright apartment with herringbone floor" },
  { title: "Warm Indian Modern", text: "Rich textures and craft, with a modern layout.", img: img("1618221469555-7f3ad97540d6"), alt: "Warm living room with leather sofa" },
  { title: "Spa Bathrooms", text: "Calm, clean retreats with stone and soft light.", img: img("1620626011761-996317b8d101"), alt: "Spa-like white bathroom with freestanding tub" },
];

export const SERVICES = [
  ["Full Home Interiors", "1–4BHK apartments, villas and bungalows, end to end."],
  ["Modular Kitchens", "L, U, parallel and island kitchens with tall units and appliances."],
  ["Wardrobes & Storage", "Sliding, hinged and walk-in wardrobes, lofts, TV and crockery units."],
  ["Pooja Units & Vastu", "Mandirs in wood, marble and CNC jaali, with Vastu-aware planning."],
  ["Office & Commercial", "Offices, clinics, showrooms, cafés and retail spaces."],
  ["Renovation & Turnkey", "False ceiling, electrical, painting, flooring and lighting — ready to move in."],
];

export const STEPS = [
  ["Meet & Measure", "Free consultation and site measurement."],
  ["Design & 3D", "Space planning, mood boards and realistic 3D views."],
  ["Quote & Finalise", "Itemised quotation and material selection."],
  ["Build & Install", "Factory-finished modules with regular updates."],
  ["Handover", "Quality check, deep cleaning and warranty."],
];

// TODO: replace these stock images with photos of your own projects
export const PROJECTS = [
  { cat: "living", size: "tall", label: "Living", title: "Contemporary 3BHK", img: img("1616486338812-3dadae4b4ace"), alt: "Living room with neutral tones" },
  { cat: "kitchen", label: "Kitchen", title: "Island Kitchen", img: img("1556911220-bff31c812dba"), alt: "Modular kitchen with island" },
  { cat: "bedroom", label: "Bedroom", title: "Master Suite", img: img("1631679706909-1844bbd07221"), alt: "Master bedroom with upholstered headboard" },
  { cat: "living", size: "wide", label: "Living", title: "Duplex Villa", img: img("1600566753086-00f18fb6b3ea", 1200), alt: "Double-height living room with wooden stairs" },
  { cat: "office", label: "Office", title: "Corporate Workspace", img: img("1497366216548-37526070297c"), alt: "Bright open-plan office" },
  { cat: "bedroom", size: "tall", label: "Bedroom", title: "Guest Bedroom", img: img("1540518614846-7eded433c457"), alt: "Calm bedroom with soft lighting" },
  { cat: "kitchen", label: "Kitchen", title: "Open Kitchen & Dining", img: img("1484154218962-a197022b5858"), alt: "White modular kitchen with breakfast counter" },
  { cat: "living", label: "Living", title: "Minimal Lounge", img: img("1586023492125-27b2c045efd7"), alt: "Living area with accent chair" },
  { cat: "office", label: "Office", title: "Meeting Lounge", img: img("1497215728101-856f4ea42174"), alt: "Office meeting area" },
];

export const PROJECT_FILTERS = [
  ["all", "All"],
  ["living", "Living"],
  ["kitchen", "Kitchen"],
  ["bedroom", "Bedroom"],
  ["office", "Office"],
];

export const PACKAGES = [
  { name: "1 BHK", property: "1 BHK", items: ["Modular kitchen", "Wardrobe", "TV unit", "False ceiling & lighting"] },
  { name: "2 BHK", property: "2 BHK", items: ["Modular kitchen with tall unit", "2 wardrobes with lofts", "TV unit, shoe rack & pooja unit", "False ceiling, lighting & painting"] },
  { name: "3 BHK & Villas", property: "3 BHK", items: ["Premium modular kitchen", "3+ wardrobes with lofts", "TV, crockery, pooja & study units", "Complete turnkey finishing"] },
  { name: "Office & Commercial", property: "Office / Commercial", items: ["Workstations & cabins", "Reception & conference rooms", "Branding & lighting design", "Complete turnkey execution"] },
];

// TODO: replace with real client reviews
export const TESTIMONIALS = [
  { quote: "The team understood exactly how our family uses the kitchen. Loads of storage, and it was finished before Diwali as promised.", by: "Client name — 2BHK, City" },
  { quote: "Clear quotation, no surprises, and the 3D designs matched the final home almost perfectly.", by: "Client name — 3BHK, City" },
  { quote: "They redesigned our office in just a few weeks. The space feels bigger, brighter and our team loves it.", by: "Client name — Office, City" },
];

export const PROPERTY_TYPES = ["1 BHK", "2 BHK", "3 BHK", "4 BHK / Villa", "Office / Commercial", "Only Modular Kitchen", "Renovation"];

export const QUOTE_SERVICES = [
  ["Full Home Interiors", "Full Home"],
  ["Modular Kitchen", "Modular Kitchen"],
  ["Wardrobe & Storage", "Wardrobes"],
  ["Living Room", "Living Room"],
  ["Bedroom", "Bedroom"],
  ["Dining", "Dining"],
  ["Bathroom", "Bathroom"],
  ["Home Office", "Home Office"],
  ["Pooja Unit", "Pooja Unit"],
  ["Office / Commercial", "Office"],
];

export const QUOTE_IMAGE = { img: img("1618219908412-a29a1bb7b86e", 1200), alt: "Elegant foyer with round mirror and cane console" };

export const FAQS = [
  ["How much does home interior design cost?", "Pricing is on request because it depends on your home's size, scope of work and chosen materials. After a free consultation, we share a detailed, itemised quotation with no hidden charges."],
  ["How long does a project take?", "Most 2BHK and 3BHK projects are completed in 45–60 days after design sign-off. Modular kitchens alone can be delivered in 3–4 weeks."],
  ["Do you follow Vastu?", "Yes. If you'd like, we plan layouts, pooja units, kitchen placement and colours keeping Vastu principles in mind."],
  ["What materials do you use?", "BWP/BWR grade plywood, branded laminates or acrylic finishes, soft-close hardware and quartz or granite countertops — all specified in your quote."],
  ["Is there a warranty?", "Yes. Modular furniture comes with a warranty on materials and workmanship, along with after-sales support."],
  ["How do payments work?", "Payments are milestone-based — booking, design sign-off, material delivery and handover."],
];

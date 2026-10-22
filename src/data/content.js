// ---------------------------------------------------------------------------
// All site copy lives here so the hall team can update it in one place.
// Content taken from www.chieveleyvillagehall.org (October 2026).
// ---------------------------------------------------------------------------

// Our own photos (in src/assets/photos)
import fourWaysIn from '../assets/photos/four-ways-in.jpg';

export const SITE = {
  name: 'Chieveley Village Hall',
  fullName: 'Chieveley Village Hall & Recreational Centre',
  tagline: 'bringing community together',
  address: 'Chieveley Village Hall, High Street, Chieveley, RG20 8TE',
  email: 'chieveleyvillagehall@gmail.com',
  phone: '07592 021273',
  bookingsManager: 'Rosalind',
  charity: 'Chieveley Recreational Centre is a Registered Charity, No. 296892',
  charityNo: '296892',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Chieveley+Village+Hall+High+Street+Chieveley+RG20+8TE',
  instagram: 'https://www.instagram.com/chieveleyvillagehall/',
  facebook: 'https://www.facebook.com/Chieveley/',
  // The live booking calendar (rooms, availability, requests). Swap for the
  // new booking system's URL if it moves.
  bookingSystemUrl: 'https://www.chieveleyvillagehall.org/booking',
};

// Menu: four visitor tasks (see the October 2026 sitemap review). Each item's
// `children` are the sections of that page, shown in a drop-down on hover.
// `to` is "page" or "page/section" (section = an anchor on that page).
// Home is reached from the logo. "Book the hall" and "Donate" are buttons.
export const NAV = [
  {
    label: "What's on", to: 'whats-on',
    children: [['classes', 'Weekly classes'], ['upcoming', 'Upcoming events'], ['past', 'Past events']],
  },
  {
    label: 'Hire the hall', to: 'hire',
    children: [['rooms', 'Rooms & facilities'], ['prices', 'Prices'], ['how-to-book', 'How to book'], ['dog-shows', 'Dog shows & outdoor events'], ['reviews', 'What hirers say'], ['photos', 'Photos of the hall']],
  },
  {
    label: 'Support us', to: 'support',
    children: [['donate', 'Donate'], ['500-club', '500 Club'], ['winners', '500 Club winners'], ['volunteer', 'Volunteer']],
  },
  {
    label: 'About', to: 'about',
    children: [['team', 'Meet the team'], ['meeting', 'Next meeting / AGM'], ['documents', 'Governance documents'], ['vision-2050', 'Vision 2050'], ['contact', 'Contact us']],
  },
];

// Where the two header buttons go.
export const CTA = { book: 'hire/how-to-book', donate: 'support/donate' };

// Old addresses -> new ones, so existing links and bookmarks still land
// on the right section.
export const REDIRECTS = {
  booking: 'hire/how-to-book',
  facilities: 'hire/rooms',
  'dog-clubs': 'hire/dog-shows',
  gallery: 'hire/photos',
  'regular-events': 'whats-on/classes',
  contacts: 'whats-on/classes',
  'new-events': 'whats-on/upcoming',
  'seasonal-events': 'whats-on/upcoming',
  'vision-2050': 'about/vision-2050',
  governance: 'about',
  'governance/documents': 'about/documents',
  'governance/meeting': 'about/meeting',
  'governance/team': 'about/team',
  fundraising: 'support',
  'fundraising/help': 'support/volunteer',
  'fundraising/fireworks': 'whats-on/upcoming',
  'fundraising/benches': 'support/donate',
  'support/bench': 'support/donate',
  '500-club': 'support/500-club',
  '500-club/join': 'support/500-club',
  '500-club/winners': 'support/winners',
};

// The Coffee Stop (from the client brief).
export const COFFEE_STOP = {
  title: 'The Coffee Stop',
  status: 'Reopening for a second 10-week trial',
  start: '14 January 2027',
  startISO: '2027-01-14',
  text:
    'Our community Coffee Stop returns for a second 10-week trial from 14 January 2027. Drop in for a hot drink, a slice of something and a catch-up with neighbours. Full details will be shared here soon.',
};

export const BOOKING_STEPS = [
  {
    title: 'Choose a room',
    text: 'Pick the room or area under "Select Room". The Facilities page describes each space.',
  },
  {
    title: 'Pick a date',
    text: 'Availability is shown up to a year ahead. Scroll to the month and day, then click "+" to request that room, date and time.',
  },
  {
    title: 'Create an account',
    text: 'You need an account before making a request. Use an email address you check. Regular users can arrange repeat bookings.',
  },
  {
    title: 'Tell us about vehicles',
    text: 'Under "additional items", select "vehicles expected to attend" and give your best estimate. It does not change the price, but your request may be incomplete without it.',
  },
  {
    title: 'Approval and deposit',
    text: 'The Bookings Manager checks and approves each request. Your booking is secured once we acknowledge your deposit.',
  },
];

// Regular classes, shown A–Z on What's on (sorted automatically below, so new
// classes can be added anywhere in this list). `day` is filled where the
// current site states it.
// `contact` matches a `group` in CONTACTS below, so each class card shows
// its organiser's details.
const CLASS_LIST = [
  { name: 'Chieveley Cricket Club', who: '', day: '', category: 'Sport', link: 'https://chieveley.play-cricket.com/web_pages/join_us' },
  { name: 'Social time with Cuppa & Cake', contact: 'Cuppa & Cake', who: '', day: 'Weekly', category: 'Social' },
  { name: 'Puppy Training with Michelle', contact: 'Puppy Training', who: 'Michelle', day: '', category: 'Dogs' },
  { name: 'Yoga with Alex', contact: 'Yoga with Alex', who: 'Alex', day: '', category: 'Wellbeing' },
  { name: 'Chieveley Short Mat Bowls', contact: 'Short Mat Bowls Club', who: '', day: '', category: 'Sport' },
  { name: 'Chieveley Gardeners Club', contact: 'Chieveley Gardening Club', who: '', day: '', category: 'Social' },
  { name: 'Whist Club', contact: 'Whist Card Club', who: '', day: '', category: 'Social' },
  { name: 'Gail Davis Art Class', contact: 'Art with Gail', who: 'Gail Davis', day: '', category: 'Creative' },
  { name: 'Pilates with Sallie-Anne', contact: 'Pilates Class', who: 'Sallie-Anne', day: '', category: 'Wellbeing' },
  { name: 'Textile Art', contact: 'Textile Art', who: '', day: '', category: 'Creative' },
  { name: 'Seated Exercise', contact: 'Seated Exercise', who: '', day: '', category: 'Wellbeing' },
  { name: 'Ballroom, Latin & Sequence Dance', contact: 'Ballroom & Latin Dance', who: 'Jeff & Tracy of Newbury Dancers', day: '', category: 'Dance' },
  { name: 'Newbury Bridge Club', contact: 'Newbury Bridge Club', who: '', day: '', category: 'Social' },
  { name: 'Chieveley Table Tennis Club', contact: 'Chieveley Table Tennis Club', who: '', day: 'Wednesdays, 7pm–9pm', category: 'Sport' },
  { name: 'Chieveley WI', contact: 'Chieveley WI', who: '', day: 'Second Wednesday afternoon of the month', category: 'Social' },
  { name: 'Ecstatic Dance with Jayne', contact: 'Ecstatic Dance with Jayne', who: 'Jayne', day: '', category: 'Dance' },
];
export const CLASSES = [...CLASS_LIST].sort((a, b) => a.name.localeCompare(b.name, 'en-GB'));

// Organiser contacts, shown on each class card on What's on.
export const CONTACTS = [
  { group: 'Cuppa & Cake', people: [{ name: 'Anthea', tel: '01635 248242' }, { name: 'Prudy', tel: '07909 528557' }] },
  { group: 'Puppy Training', people: [{ name: 'Michelle Harris', tel: '07718 913177' }] },
  { group: 'Yoga with Alex', people: [{ name: 'Alex Stambouzou', email: 'alexandradanaeyoga@gmail.com' }] },
  { group: 'Short Mat Bowls Club', people: [{ name: 'Richard', tel: '01635 862596' }, { name: 'Michelle', tel: '01635 248801' }, { name: 'Anthea', tel: '01635 248242' }] },
  // Email on the current site appears incomplete ("couzensmail@aol"); please confirm.
  { group: 'Chieveley Gardening Club', people: [{ name: 'Gardening Club', email: 'couzensmail@aol', note: 'Email to be confirmed' }] },
  { group: 'Whist Card Club', people: [{ name: 'Richard Brant', email: 'richardbrant20@hotmail.co.uk' }] },
  { group: 'Art with Gail', people: [{ name: 'Gail Davis', email: 'artgaildavis@gmail.com' }] },
  { group: 'Pilates Class', people: [{ name: 'Sallie-Anne', email: 'pilateswithsa@gmail.com' }] },
  { group: 'Textile Art', people: [{ name: 'Ann Beer', email: 'ann.jemima@outlook.com' }] },
  { group: 'Seated Exercise', people: [{ name: 'Debbie Medlin', email: 'Debbie@moveability.org' }] },
  { group: 'Ballroom & Latin Dance', people: [{ name: 'Jeff & Tracy Fryer', email: 'newburydancers@gmail.com' }] },
  { group: 'Newbury Bridge Club', people: [{ name: 'Richard Bungay', email: 'newburybridgeclubt@gmail.com' }] },
  { group: 'Chieveley Table Tennis Club', people: [{ name: 'Lance Mitchell', tel: '07394 552550' }] },
  { group: 'Ecstatic Dance with Jayne', people: [{ name: 'Jayne Aufiero', tel: '07762 323296' }] },
  { group: 'Chieveley WI', people: [{ name: 'Jean Pocock', tel: '01635 248213' }] },
];

// Reviews: names, organisations and dates from the current site.
// TEXT: these are short summaries — paste each reviewer's full words in.
export const REVIEWS = [
  { name: 'M. Mangena', org: 'Founder, Endo Awareness Foundation', date: 'April 2026', text: 'A spacious hall, with support that was responsive and professional from start to finish.' },
  { name: 'R. Davies', org: 'Siamese Cat Association', date: 'March 2026', text: 'We hired the hall for our cat show. The team were so supportive that we have already booked again.' },
  { name: 'C. Stangroom', org: 'Southern Pointers Dog Club', date: 'June 2025', text: 'A long-standing venue for us. We recommend the facilities for large dog shows.' },
  { name: 'B. Hayes', org: '', date: '', text: 'Well kept, well equipped and suitable for almost any occasion.' },
  { name: 'C. Rust', org: 'Family gathering', date: 'April 2025', text: 'Easy to use, friendly booking and a reasonable fee.' },
  { name: 'M. Alderidge', org: '', date: '', text: 'A smart hall with good facilities, a large recreation ground and a children’s playground.' },
];

// Upcoming events, shown as one dated list on What's on › Upcoming events.
// Add a new entry for each event. `date` (YYYY-MM-DD) sorts the list and
// hides the event the day after it has passed; use the last likely day when
// the exact date isn't fixed yet. `day`/`month` are what the date tile shows.
export const EVENTS = [
  {
    id: 'fireworks', date: '2026-11-05', day: '5', month: 'Nov', when: 'Thursday 5 November 2026',
    title: 'Bonfire & fireworks',
    text: 'Our traditional bonfire and fireworks display, and a major fundraiser for the hall. 2018 marked its 50th anniversary. Around 70 villagers and friends help run it each year.',
    links: [
      { label: 'Buy tickets', url: 'https://www.mychieveley.co.uk', primary: true },
      { label: 'Help on the night', to: 'support/volunteer' },
    ],
    note: 'Tickets are sold through mychieveley.co.uk from late October.',
  },
  {
    id: 'agm', date: '2026-11-23', day: '23', month: 'Nov', when: 'Monday 23 November 2026',
    title: 'AGM & Trustees meeting',
    text: 'Hear how the hall is run and what is planned for the year ahead. All are welcome.',
    links: [{ label: 'About the meeting', to: 'about/meeting' }],
  },
  {
    id: 'christmas-market', date: '2026-11-30', day: 'Late', month: 'Nov', when: 'Late November 2026 · date to be confirmed',
    title: 'Christmas market & tree lighting',
    text: 'The popular Christmas market and tree lighting ceremony returns, with local food, drink and craft stalls. Full details will be posted nearer the time.',
    stallholders: true,
    links: [{ label: 'Ask about a stall', url: 'mailto:chieveleyvillagehall@gmail.com' }],
  },
  {
    id: 'coffee-stop', date: '2027-03-25', day: '14', month: 'Jan', when: 'From Thursday 14 January 2027 · 10 weeks',
    title: 'The Coffee Stop',
    text: 'Our community Coffee Stop returns for a second 10-week trial. Drop in for a hot drink, a slice of something and a catch-up with neighbours.',
    links: [],
  },
];

// Photos of past events (What's on › Past events).
export const PAST_EVENT_PHOTOS = ['Christmas lunch', 'Themed party', 'Pet show', 'Family celebration', 'Village event', 'Community gathering', 'Panto night', 'Summer on the grounds'];

export const STALLHOLDERS = {
  'Arts & Crafts': ["Sam's Handmade Soaps", '3D Tinker Toys', 'Face Painting with Laura', "Amy's Polymer Jewellery", "Two Raven's Gem Stones"],
  'Food & Drink': ["Ben's Bees Honey", 'Loaf Bread stall', 'Sweety Pie Patisserie', 'Merry Kitchen', "Mei's Homemade", 'Hedgerow Cheeses', 'Renegade Brewery', 'Moonlight Macarons'],
};

export const GOV_DOCS = [
  { title: 'CRC Governing Document', note: 'Amended 10 September 2025', url: 'https://www.chieveleyvillagehall.org/_files/ugd/dcef2e_e7b19008449d4b5b975ddc031bb4a8c2.pdf' },
  { title: 'Charity Registration Certificate', note: 'No. 296892', url: 'https://www.chieveleyvillagehall.org/_files/ugd/baf735_0a81bc15981e445e915aab0db4877bb0.pdf' },
  { title: 'Accounts 2025', note: "Treasurer's consolidated submission to the AGM", url: 'https://www.chieveleyvillagehall.org/_files/ugd/dcef2e_92afac42f8b247648e458ecf85461c80.pdf' },
  { title: 'Safeguarding Policy and Procedures', note: '2025', url: 'https://www.chieveleyvillagehall.org/_files/ugd/47ae83_c3628e52c34c4eb2abc97dbb35984188.pdf' },
  { title: 'Fire Safety Policy', note: 'Issue 1, February 2025', url: 'https://www.chieveleyvillagehall.org/_files/ugd/dcef2e_daffb3c5f2464a2890104406f8c7ecfc.pdf' },
];

// Committee contact (About › Contact us, and donations on Support us).
export const COMMITTEE_CONTACT = { name: 'Rebecca Couzens', role: 'Secretary', email: 'secretary.crc@outlook.com' };

// The Chair's email, shown only under Vision 2050.
export const CHAIR_EMAIL = 'chair.crc@outlook.com';

// Meet the team. PHOTOS: put each person's photo in src/assets/team/, named
// after them in lower case with hyphens (e.g. neal-courtney.jpg, .png or
// .webp). It replaces their initials automatically. A square photo of the
// head and shoulders works best. `bio` pops up when you hover over a name.
export const TEAM = [
  { name: 'Neal Courtney', role: 'Chair of Trustees', elected: true, bio: 'Chair since June 2023. Background in insurance-related services and consultancy.' },
  { name: 'Phil Kinzett-Evans', role: 'Treasurer', elected: true, bio: 'Background in accountancy and taxation.' },
  { name: 'Rebecca Couzens', role: 'Secretary', elected: true, bio: '' },
  { name: 'Rosalind Byrne', role: 'Bookings Manager', elected: true, bio: 'Your contact for bookings and help on the day.' },
  { name: 'Derek Brown', role: 'Service Coordinator', elected: true, bio: '' },
  { name: 'Mark Hutchison', role: 'Grounds Manager & Cricket Club Representative', elected: false, bio: 'Led the £150,000 playground replacement project.' },
  { name: 'Sharon Knowles', role: '500 Club Manager', elected: false, bio: '' },
  { name: 'Chris Armitage', role: 'Bridge Club Representative', elected: false, bio: '' },
  { name: 'Kieran Knight', role: 'Cold Ash Football Club Representative', elected: false, bio: '' },
];

export const CLUB_500 = {
  ticket: '£15',
  halfYear: '£7.50',
  prizes: [
    { label: 'Monthly first prize', amount: '£50' },
    { label: 'Monthly second prize', amount: '£25' },
    { label: 'Christmas prize', amount: '£200', note: 'Full-year members' },
  ],
  email: 'Chieveley500club@outlook.com',
  formUrl: 'https://www.chieveleyvillagehall.org/200-club',
  winners: [
    { month: 'September 2026', first: { no: 146, name: 'Jim & Jenny Usherwood' }, second: { no: 104, name: 'R & R Couzens' } },
  ],
};

export const GALLERY_INTERIOR = ['Main hall', 'Main hall kitchen', 'Club room, from entrance', 'Club room', 'Club room kitchen & bar area'];

export const FACILITY_PHOTOS = [
  'Chieveley Village Hall', 'Cricketers', 'Watching cricket', 'Party in the hall', 'Ladies night', 'Gardening Club',
  'Children in the playground watching fireworks', 'Fun in the snow', 'Rhodesian Ridgeback show', 'Cold Ash FC ready to strike',
  'Things get hot in the kitchen', 'The Club Room bar',
];

// ---------------------------------------------------------------------------
// Photos. PLACEHOLDER stock photography from Unsplash (unsplash.com, free to
// use under the Unsplash licence), loaded straight from Unsplash's servers.
// Swap each one for a real photo of the hall: either paste another image URL
// here, or put the file in src/assets/, import it at the top of this file and
// use that instead. Keys match the `label` on each <Photo />.
// ---------------------------------------------------------------------------
// A photo imported from src/assets (a file path or inlined image) is used as
// it is; anything else is treated as an Unsplash photo id.
export const img = (id, w = 1400) => (/^(https?:|data:|blob:|\/|\.)/.test(id)
  ? id
  : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`);

const U = {
  countryside: 'photo-1541598023388-9a08906153a7',   // Colin Watts – foggy morning in the countryside
  villageSpire: 'photo-1765989501968-0daf38d65b57',  // Brett Jordan – village with church spire
  villageSun: 'photo-1607537670164-a9bfae0a8df1',    // Compagnons – houses on a field at sunset
  hall: 'photo-1634625971963-e68abc286101',          // Asia Culturecenter – large room, wooden floor, big windows
  parquet: 'photo-1615965149280-8c380be22930',       // Miguel Luis – parquet floor with windows
  kitchen: 'photo-1708915965975-2a950db0e215',       // Barbara Burgess – kitchen with wooden counter
  clubRoom: 'photo-1597106525363-7916ebf5b083',      // JP Holecka – wooden table and chairs
  bar: 'photo-1779372178719-9476cc86a53d',           // Jonathan Borba – traditional wooden bar
  cricket: 'photo-1751219720336-5a3017fb8791',       // Rob Wingate – cricket on a grassy field
  cricketBat: 'photo-1758791184255-411236a49346',    // Village Cricket Co – bat against a stone wall
  playground: 'photo-1596997000103-e597b3ca50df',    // Oakville Dude – wooden playground among trees
  wedding: 'photo-1666617710768-425d2d9088f8',       // Lukas – room with tables set for a wedding
  weddingDance: 'photo-1772945492345-ee8d17e9a74b',  // Brooke Balentine – couple dancing at a reception
  balloons: 'photo-1530103862676-de8c9debad1d',      // Adi Goldstein – balloons
  yoga: 'photo-1761035005546-62b8018b212a',          // Christian Harb – people stretching on yoga mats
  ballroom: 'photo-1765632814488-52e6d0653ebe',      // Preillumination SeTh – ballroom on a wooden floor
  coffee: 'photo-1467189386127-c4e5e31ee213',        // Toa Heftiba – coffee and cake
  coffee2: 'photo-1498604132755-751b73a22ec9',       // Toa Heftiba – cake and cappuccino
  fireworks: 'photo-1533219057257-4bb9ed5d2cc6',     // zuzanka galczynska – people watching fireworks
  bonfire: 'photo-1504470695779-75300268aa0e',       // Toa Heftiba – bonfire
  christmas: 'photo-1640040159521-8a1b5d323181',     // Elena Mozhvilo – people around a Christmas tree
  christmasLights: 'photo-1575659458448-27b1d2836de2', // Daniels Joffe – lit village
  dogShow: 'photo-1785941941895-6da103c25c47',       // Haberdoedas – presenting a dog at an outdoor show
  collie: 'photo-1544456948-c7ba22fe7111',           // Murilo Viviani – rough collie
  bench: 'photo-1445937888010-cc262f556033',         // Will Paterson – bench and autumn leaves
  community: 'photo-1764173040044-9835cc696a39',     // Centre for Ageing Better – seniors playing a game in a hall
  group: 'photo-1730382855859-8938b1e7cd0d',         // Age Cymru – group of people
  circle: 'photo-1777326587610-1ddcce610a5c',        // Kin Shing Lai – chairs arranged in a circle
  banquet: 'photo-1762765684665-6b6855bb6fe6',       // Adrien Olichon – long tables set for a banquet
};

export const PHOTOS = {
  // Page heroes
  'hero-home': U.hall,                 // inside the hall
  'hero-whats-on': U.yoga,
  'hero-hire': U.wedding,
  'hero-support': U.bonfire,
  'hero-about': U.villageSpire,
  'hero-404': U.villageSun,
  // Home
  'Find: whats-on': fourWaysIn,        // our own photo: friends greeting in the hall
  'Find: hire': U.wedding,
  'Find: support': U.bonfire,
  'Find: about': U.villageSpire,
  'The Coffee Stop': U.coffee,
  'Donate band': U.villageSun,
  // Rooms
  'Main hall': U.hall,
  'Main hall kitchen': U.kitchen,
  'Club room': U.clubRoom,
  'Club room, from entrance': U.clubRoom,
  'Club room kitchen & bar': U.bar,
  'Club room kitchen & bar area': U.bar,
  'Grounds & recreation ground': U.cricket,
  'Playground & parking': U.playground,
  // Hall in use
  'Chieveley Village Hall': U.parquet,
  Cricketers: U.cricket,
  'Watching cricket': U.cricketBat,
  'Party in the hall': U.balloons,
  'Ladies night': U.weddingDance,
  'Gardening Club': U.group,
  'Children in the playground watching fireworks': U.fireworks,
  'Fun in the snow': U.christmasLights,
  'Rhodesian Ridgeback show': U.dogShow,
  'Cold Ash FC ready to strike': U.cricket,
  'Things get hot in the kitchen': U.kitchen,
  'The Club Room bar': U.bar,
  // Past events
  'Christmas lunch': U.banquet,
  'Themed party': U.balloons,
  'Pet show': U.collie,
  'Family celebration': U.weddingDance,
  'Village event': U.community,
  'Community gathering': U.group,
  'Panto night': U.christmas,
  'Summer on the grounds': U.cricket,
  // Events
  'event-fireworks': U.fireworks,
  'event-agm': U.circle,
  'event-christmas-market': U.christmas,
  'event-coffee-stop': U.coffee2,
  // Support / About
  'Volunteers at the hall': U.community,
  'Bench on the recreation ground': U.bench,
  '5 November fireworks': U.fireworks,
};

// ---------------------------------------------------------------------------
// Hand-drawn doodles over the photos. Keys match the photo labels above (and
// `event-<id>` for events). Each entry is a list of drawings:
//   [drawing, left %, top %, width %, rotate°, hide on phones?, [left, top, width] on phones]
// Positions are percentages of the photo. Drawings live in
// src/components/doodleArt.js: bunting, lights, burst, burst2, sparkles,
// flowers, balloons, rosette, paws, cup, cake, heart, speech, sun, music,
// cricket, swing, tree, xtree, glasses, table, flames, hall, walker,
// stretcher, arrow, sprig, people. Delete an entry to show the photo on its own.
// ---------------------------------------------------------------------------
export const DOODLES = {
  // Page heroes: kept to the top right, clear of the headings
  // Home: drawn in as you scroll the pinned hero (see HomeHero.jsx)
  'hero-home': [['bunting', 19, 10, 30, -2, true], ['bunting', 51, 10, 30, 2, true], ['people', 39, 61, 25, 0, false, [6, 20, 88]], ['sparkles', 89, 17, 5, 0, true]],
  'hero-whats-on': [['music', 68, 19, 12], ['cup', 85, 30, 8, 6, true], ['sparkles', 84, 14, 6]],
  'hero-hire': [['lights', 48, 12, 48, -2], ['table', 76, 30, 17, 0, true], ['sparkles', 62, 32, 5, 0, true]],
  'hero-support': [['burst', 68, 13, 14], ['burst2', 84, 27, 10], ['sparkles', 60, 32, 6, 0, true]],
  'hero-about': [['speech', 68, 18, 16], ['tree', 88, 21, 8, 0, true], ['sun', 59, 14, 7, 0, true]],
  'hero-404': [['walker', 76, 16, 11], ['arrow', 60, 34, 12, -6, true]],
  'Donate band': [['lights', 4, 11, 56, 1], ['heart', 80, 15, 9, -8, true]],
  // Home › Find your way
  'Find: whats-on': [['music', 64, 10, 13], ['sparkles', 81, 22, 7]],
  'Find: hire': [['lights', 6, 6, 46, -2], ['glasses', 66, 10, 15]],
  'Find: support': [['burst', 62, 5, 15], ['burst2', 80, 18, 11]],
  'Find: about': [['speech', 64, 10, 17], ['hall', 10, 12, 17, 0, true]],
  // Photos
  'Main hall': [['lights', 4, 5, 92]],
  'Main hall kitchen': [['cup', 58, 38, 32, 6]],
  'Club room': [['table', 48, 40, 46]],
  'Club room, from entrance': [['table', 48, 40, 46]],
  'Club room kitchen & bar': [['glasses', 52, 36, 42]],
  'Club room kitchen & bar area': [['glasses', 52, 36, 42]],
  'Grounds & recreation ground': [['cricket', 50, 40, 46]],
  'Playground & parking': [['swing', 50, 38, 44]],
  'Party in the hall': [['balloons', 66, 8, 26], ['sparkles', 48, 10, 14]],
  'Rhodesian Ridgeback show': [['rosette', 66, 10, 24, 8], ['paws', 6, 58, 22]],
  'Volunteers at the hall': [['heart', 62, 8, 28, -6], ['sparkles', 12, 12, 16]],
  'The Coffee Stop': [['cup', 56, 10, 32, 6], ['cake', 8, 64, 34, -4]],
  'Chieveley Village Hall': [['hall', 44, 30, 50]],
  Cricketers: [['cricket', 50, 36, 46]],
  'Watching cricket': [['sun', 66, 6, 26]],
  'Ladies night': [['glasses', 52, 10, 42]],
  'Gardening Club': [['flowers', 30, 44, 64]],
  'Children in the playground watching fireworks': [['burst', 50, 4, 44]],
  'Fun in the snow': [['sparkles', 50, 8, 40]],
  'Cold Ash FC ready to strike': [['burst2', 62, 6, 32]],
  'Things get hot in the kitchen': [['flames', 58, 30, 36]],
  'The Club Room bar': [['glasses', 52, 30, 42]],
  'Christmas lunch': [['xtree', 66, 8, 26]],
  'Themed party': [['balloons', 64, 8, 26]],
  'Pet show': [['rosette', 66, 8, 24, 8], ['paws', 6, 60, 22]],
  'Family celebration': [['bunting', 4, 4, 92]],
  'Village event': [['bunting', 4, 4, 92]],
  'Community gathering': [['speech', 46, 8, 48]],
  'Panto night': [['music', 10, 12, 30], ['sparkles', 62, 10, 28]],
  'Summer on the grounds': [['sun', 64, 6, 28]],
  // Events (What's on › Upcoming)
  'event-fireworks': [['burst', 52, 6, 42], ['burst2', 26, 54, 22]],
  'event-agm': [['speech', 44, 8, 50]],
  'event-christmas-market': [['xtree', 66, 10, 26], ['sparkles', 14, 10, 18]],
  'event-coffee-stop': [['cup', 56, 14, 34, 6]],
};

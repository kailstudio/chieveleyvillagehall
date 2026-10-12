// ---------------------------------------------------------------------------
// All site copy lives here so the hall team can update it in one place.
// Content taken from www.chieveleyvillagehall.org (October 2026).
// ---------------------------------------------------------------------------

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

// Menu: same items, order and hierarchy as the current site.
// `to` is "page" or "page/section" (section = an anchor on that page).
export const NAV = [
  { label: 'Home', to: 'home' },
  { label: 'Booking', to: 'booking' },
  {
    label: "What's On",
    children: [
      { label: 'Regular Events', to: 'regular-events' },
      { label: 'Contacts', to: 'contacts' },
      { label: 'Christmas/Easter Events', to: 'seasonal-events' },
      { label: 'Dog Clubs', to: 'dog-clubs' },
      { label: 'Vision 2050', to: 'vision-2050' },
      { label: 'Fireworks', to: 'fundraising/fireworks' },
    ],
  },
  { label: 'New Events', to: 'new-events' },
  {
    label: 'Facilities',
    children: [{ label: 'Hall and Grounds Facilities', to: 'facilities' }],
  },
  { label: 'Reviews', to: 'home/reviews' },
  { label: 'Gallery', to: 'gallery' },
  {
    label: 'Fundraising',
    children: [
      { label: 'Help your Hall', to: 'fundraising/help' },
      { label: 'Fireworks', to: 'fundraising/fireworks' },
      { label: 'Benches', to: 'fundraising/benches' },
      { label: 'Join our 500 Club Lottery', to: '500-club/join' },
      { label: 'Previous 500 Club Winners', to: '500-club/winners' },
    ],
  },
  {
    label: 'Governance',
    children: [
      { label: 'Governance Documents', to: 'governance/documents' },
      { label: 'Notice of Next Meeting', to: 'governance/meeting' },
      { label: 'Meet the Team', to: 'governance/team' },
    ],
  },
];

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

// Regular classes. `day` is filled where the current site states it.
export const CLASSES = [
  { name: 'Chieveley Cricket Club', who: '', day: '', category: 'Sport', link: 'https://chieveley.play-cricket.com/web_pages/join_us' },
  { name: 'Social time with Cuppa & Cake', who: '', day: 'Weekly', category: 'Social' },
  { name: 'Puppy Training with Michelle', who: 'Michelle', day: '', category: 'Dogs' },
  { name: 'Yoga with Alex', who: 'Alex', day: '', category: 'Wellbeing' },
  { name: 'Chieveley Short Mat Bowls', who: '', day: '', category: 'Sport' },
  { name: 'Chieveley Gardeners Club', who: '', day: '', category: 'Social' },
  { name: 'Whist Club', who: '', day: '', category: 'Social' },
  { name: 'Gail Davis Art Class', who: 'Gail Davis', day: '', category: 'Creative' },
  { name: 'Pilates with Sallie-Anne', who: 'Sallie-Anne', day: '', category: 'Wellbeing' },
  { name: 'Textile Art', who: '', day: '', category: 'Creative' },
  { name: 'Seated Exercise', who: '', day: '', category: 'Wellbeing' },
  { name: 'Ballroom, Latin & Sequence Dance', who: 'Jeff & Tracy of Newbury Dancers', day: '', category: 'Dance' },
  { name: 'Newbury Bridge Club', who: '', day: '', category: 'Social' },
  { name: 'Chieveley Table Tennis Club', who: '', day: 'Wednesdays, 7pm–9pm', category: 'Sport' },
  { name: 'Chieveley WI', who: '', day: 'Second Wednesday afternoon of the month', category: 'Social' },
  { name: 'Ecstatic Dance with Jayne', who: 'Jayne', day: '', category: 'Dance' },
];

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

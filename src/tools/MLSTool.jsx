// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';

const housePhotos = [
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1625602812206-5ec545ca1231?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1549517045-bc93de075e53?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1598228723793-52759bba239c?w=600&h=400&fit=crop',
];

const p = (id) => housePhotos[(id - 1) % 20];

const listings = [
  {
    id: 1,
    address: '4821 Maple Ridge Dr',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    price: 589000,
    beds: 4,
    baths: 3,
    sqft: 2450,
    type: 'Single Family',
    status: 'Active',
    dom: 12,
    mlsNumber: 'MLS-TX-20241021',
    yearBuilt: 2018,
    garage: 2,
    lot: '0.25 acres',
    description:
      'Stunning 4BR/3BA home in prime Austin location. Open-concept kitchen with quartz countertops, stainless appliances. Master suite with spa bath. Large backyard with covered patio.',
    img: p(1),
    agent: 'Maria Gonzalez',
    agentPhone: '(512) 555-0134',
    broker: 'Realty One Group',
    tags: ['Pool', 'Corner Lot', 'New Roof'],
  },
  {
    id: 2,
    address: '1103 Westbrook Ln',
    city: 'Austin',
    state: 'TX',
    zip: '78703',
    price: 875000,
    beds: 5,
    baths: 4,
    sqft: 3800,
    type: 'Single Family',
    status: 'Active',
    dom: 5,
    mlsNumber: 'MLS-TX-20241098',
    yearBuilt: 2021,
    garage: 3,
    lot: '0.4 acres',
    description:
      "Modern luxury home with soaring ceilings and walls of windows. Chef's kitchen, butler's pantry, home office. Resort-style pool.",
    img: p(2),
    agent: 'James Okafor',
    agentPhone: '(512) 555-0287',
    broker: 'Compass Realty',
    tags: ['Pool', 'Office', 'New Construction'],
  },
  {
    id: 3,
    address: '302 Cedarwood Ct',
    city: 'Round Rock',
    state: 'TX',
    zip: '78664',
    price: 399000,
    beds: 3,
    baths: 2,
    sqft: 1870,
    type: 'Single Family',
    status: 'Pending',
    dom: 3,
    mlsNumber: 'MLS-TX-20241143',
    yearBuilt: 2015,
    garage: 2,
    lot: '0.18 acres',
    description:
      'Move-in ready home on a quiet cul-de-sac. Updated kitchen and bathrooms, new flooring throughout. Fenced backyard.',
    img: p(3),
    agent: 'Priya Nair',
    agentPhone: '(512) 555-0391',
    broker: 'Austin Home Pro',
    tags: ['Cul-de-sac', 'Updated Kitchen'],
  },
  {
    id: 4,
    address: '789 Shoreline Blvd #402',
    city: 'Austin',
    state: 'TX',
    zip: '78702',
    price: 645000,
    beds: 2,
    baths: 2,
    sqft: 1420,
    type: 'Condo',
    status: 'Active',
    dom: 21,
    mlsNumber: 'MLS-TX-20240987',
    yearBuilt: 2019,
    garage: 1,
    lot: 'N/A',
    description:
      "Upscale urban condo with panoramic lake views from the 4th floor. Floor-to-ceiling windows, designer finishes, chef's kitchen.",
    img: p(4),
    agent: 'Derek Chen',
    agentPhone: '(512) 555-0452',
    broker: 'Urban Living Realty',
    tags: ['Lake View', 'Concierge', 'Rooftop'],
  },
  {
    id: 5,
    address: '5500 Pinehurst Ave',
    city: 'Pflugerville',
    state: 'TX',
    zip: '78660',
    price: 329000,
    beds: 3,
    baths: 2,
    sqft: 1680,
    type: 'Single Family',
    status: 'Active',
    dom: 34,
    mlsNumber: 'MLS-TX-20240823',
    yearBuilt: 2010,
    garage: 2,
    lot: '0.22 acres',
    description:
      'Charming home in established neighborhood. Original owner, meticulously maintained. Spacious living areas, mature trees, covered porch.',
    img: p(5),
    agent: 'Tanisha Williams',
    agentPhone: '(512) 555-0561',
    broker: 'Metro Homes TX',
    tags: ['Mature Trees', 'Well-Maintained'],
  },
  {
    id: 6,
    address: '211 Riverview Terrace',
    city: 'Cedar Park',
    state: 'TX',
    zip: '78613',
    price: 512000,
    beds: 4,
    baths: 3,
    sqft: 2910,
    type: 'Single Family',
    status: 'Sold',
    dom: 8,
    mlsNumber: 'MLS-TX-20240756',
    yearBuilt: 2017,
    garage: 2,
    lot: '0.3 acres',
    description:
      'Beautiful home in sought-after Cedar Park neighborhood. Gourmet kitchen, large game room, covered outdoor kitchen. Minutes from Lake Travis.',
    img: p(6),
    agent: 'Luis Herrera',
    agentPhone: '(512) 555-0678',
    broker: 'Keller Williams',
    tags: ['Outdoor Kitchen', 'Game Room'],
  },
  {
    id: 7,
    address: '912 Oak Haven Way',
    city: 'Kyle',
    state: 'TX',
    zip: '78640',
    price: 285000,
    beds: 3,
    baths: 2,
    sqft: 1520,
    type: 'Single Family',
    status: 'Active',
    dom: 18,
    mlsNumber: 'MLS-TX-20241201',
    yearBuilt: 2012,
    garage: 2,
    lot: '0.16 acres',
    description:
      'Affordable starter home in growing Kyle community. Updated fixtures, new paint throughout, covered back patio.',
    img: p(7),
    agent: 'Sophie Andersen',
    agentPhone: '(512) 555-0712',
    broker: 'RE/MAX Capital City',
    tags: ['Starter Home', 'Updated'],
  },
  {
    id: 8,
    address: '2200 Lakewood Dr #105',
    city: 'Austin',
    state: 'TX',
    zip: '78746',
    price: 425000,
    beds: 1,
    baths: 1,
    sqft: 890,
    type: 'Condo',
    status: 'Active',
    dom: 9,
    mlsNumber: 'MLS-TX-20241215',
    yearBuilt: 2020,
    garage: 1,
    lot: 'N/A',
    description:
      'Sleek modern condo in West Austin. Polished concrete floors, custom cabinetry, spa-style bath. Resort amenities include pool and fitness center.',
    img: p(8),
    agent: 'Kwame Mensah',
    agentPhone: '(512) 555-0823',
    broker: 'Compass Realty',
    tags: ['Pool', 'Dog Park', 'Modern'],
  },
  {
    id: 9,
    address: '634 Willow Creek Blvd',
    city: 'Buda',
    state: 'TX',
    zip: '78610',
    price: 345000,
    beds: 3,
    baths: 2,
    sqft: 1750,
    type: 'Single Family',
    status: 'Pending',
    dom: 6,
    mlsNumber: 'MLS-TX-20241230',
    yearBuilt: 2016,
    garage: 2,
    lot: '0.19 acres',
    description:
      'Immaculate home on a tree-lined street. Open floor plan with granite kitchen, large primary suite.',
    img: p(9),
    agent: 'Yuki Tanaka',
    agentPhone: '(512) 555-0934',
    broker: 'Austin Home Pro',
    tags: ['Tree-Lined', 'Granite Kitchen'],
  },
  {
    id: 10,
    address: '1450 Ridgecrest Rd',
    city: 'Georgetown',
    state: 'TX',
    zip: '78628',
    price: 520000,
    beds: 4,
    baths: 3,
    sqft: 2680,
    type: 'Single Family',
    status: 'Active',
    dom: 27,
    mlsNumber: 'MLS-TX-20241245',
    yearBuilt: 2019,
    garage: 3,
    lot: '0.28 acres',
    description:
      "Spacious Georgetown beauty in a master-planned community. Formal dining, media room, chef's kitchen. 3-car garage, extended patio with outdoor fireplace.",
    img: p(10),
    agent: 'Isabella Reyes',
    agentPhone: '(512) 555-1045',
    broker: 'Coldwell Banker',
    tags: ['Media Room', 'Outdoor Fireplace', '3-Car Garage'],
  },
  {
    id: 11,
    address: '88 Stonebridge Ct',
    city: 'Leander',
    state: 'TX',
    zip: '78641',
    price: 460000,
    beds: 4,
    baths: 3,
    sqft: 2400,
    type: 'Single Family',
    status: 'Active',
    dom: 14,
    mlsNumber: 'MLS-TX-20241260',
    yearBuilt: 2020,
    garage: 2,
    lot: '0.23 acres',
    description:
      'Like-new home on premium cul-de-sac lot. Luxury vinyl plank, quartz counters, soaking tub in primary.',
    img: p(11),
    agent: 'Mohammed Al-Rashid',
    agentPhone: '(512) 555-1156',
    broker: 'eXp Realty',
    tags: ['Cul-de-sac', 'Pergola', 'Near New'],
  },
  {
    id: 12,
    address: '3310 Canyon View Dr',
    city: 'Austin',
    state: 'TX',
    zip: '78759',
    price: 675000,
    beds: 4,
    baths: 3,
    sqft: 2950,
    type: 'Single Family',
    status: 'Active',
    dom: 7,
    mlsNumber: 'MLS-TX-20241275',
    yearBuilt: 2016,
    garage: 2,
    lot: '0.33 acres',
    description:
      'Hill country views from this stunning Northwest Austin home. Vaulted ceilings, gourmet kitchen, spa-like primary bath.',
    img: p(12),
    agent: 'Fatima Diallo',
    agentPhone: '(512) 555-1267',
    broker: "Kuper Sotheby's",
    tags: ['Hill Country Views', 'Deck', 'Gourmet Kitchen'],
  },
  {
    id: 13,
    address: '55 Mesquite Hollow Rd',
    city: 'Dripping Springs',
    state: 'TX',
    zip: '78620',
    price: 895000,
    beds: 5,
    baths: 4,
    sqft: 3600,
    type: 'Single Family',
    status: 'Active',
    dom: 22,
    mlsNumber: 'MLS-TX-20241290',
    yearBuilt: 2018,
    garage: 3,
    lot: '1.2 acres',
    description:
      'Spectacular hill country retreat on over an acre. Designer finishes, resort pool & spa, summer kitchen.',
    img: p(13),
    agent: 'Raj Patel',
    agentPhone: '(512) 555-1378',
    broker: "Sotheby's International",
    tags: ['Pool & Spa', '1+ Acre', 'Summer Kitchen'],
  },
  {
    id: 14,
    address: '7724 Sierra Madre Ln',
    city: 'Austin',
    state: 'TX',
    zip: '78749',
    price: 418000,
    beds: 3,
    baths: 2,
    sqft: 1980,
    type: 'Single Family',
    status: 'Active',
    dom: 31,
    mlsNumber: 'MLS-TX-20241305',
    yearBuilt: 2008,
    garage: 2,
    lot: '0.21 acres',
    description:
      'Well-maintained South Austin gem. Updated kitchen with SS appliances, hardwood floors in main areas.',
    img: p(14),
    agent: 'Amara Johnson',
    agentPhone: '(512) 555-1489',
    broker: 'Metro Homes TX',
    tags: ['Hardwood Floors', 'Oak Trees', 'Updated'],
  },
  {
    id: 15,
    address: '4501 Park Vista Blvd #302',
    city: 'Austin',
    state: 'TX',
    zip: '78731',
    price: 549000,
    beds: 2,
    baths: 2,
    sqft: 1250,
    type: 'Condo',
    status: 'Active',
    dom: 16,
    mlsNumber: 'MLS-TX-20241320',
    yearBuilt: 2021,
    garage: 1,
    lot: 'N/A',
    description:
      "Elevated condo living in North Austin. Chef's kitchen, spa bath, private balcony with greenbelt views.",
    img: p(15),
    agent: 'Carlos Vega',
    agentPhone: '(512) 555-1590',
    broker: 'Urban Living Realty',
    tags: ['Greenbelt View', 'Balcony', 'Concierge'],
  },
  {
    id: 16,
    address: '219 Redbud Trail',
    city: 'Wimberley',
    state: 'TX',
    zip: '78676',
    price: 765000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: 'Single Family',
    status: 'Active',
    dom: 45,
    mlsNumber: 'MLS-TX-20241335',
    yearBuilt: 2015,
    garage: 2,
    lot: '0.85 acres',
    description:
      'Serene Wimberley retreat surrounded by mature cypress and oak trees. Gourmet kitchen, stone fireplace, screened porch.',
    img: p(16),
    agent: 'Chen Wei',
    agentPhone: '(512) 555-1601',
    broker: 'Realty One Group',
    tags: ['Guest House', 'Stone Fireplace', 'Screened Porch'],
  },
  {
    id: 17,
    address: '1820 Pecan Grove Dr',
    city: 'Pflugerville',
    state: 'TX',
    zip: '78660',
    price: 310000,
    beds: 3,
    baths: 2,
    sqft: 1640,
    type: 'Single Family',
    status: 'Sold',
    dom: 4,
    mlsNumber: 'MLS-TX-20241350',
    yearBuilt: 2013,
    garage: 2,
    lot: '0.17 acres',
    description:
      'Sold in under a week! Charming home with pecan trees in backyard. Open kitchen, spacious living area.',
    img: p(17),
    agent: 'Nadia Petrov',
    agentPhone: '(512) 555-1712',
    broker: 'Century 21 Gold',
    tags: ['Pecan Trees', 'Walk-in Closet'],
  },
  {
    id: 18,
    address: '6644 Barton Springs Rd #201',
    city: 'Austin',
    state: 'TX',
    zip: '78704',
    price: 389000,
    beds: 1,
    baths: 1,
    sqft: 820,
    type: 'Condo',
    status: 'Active',
    dom: 11,
    mlsNumber: 'MLS-TX-20241365',
    yearBuilt: 2018,
    garage: 1,
    lot: 'N/A',
    description:
      'Chic South Austin condo steps from Barton Springs. Exposed brick, industrial finishes, gourmet kitchen.',
    img: p(18),
    agent: 'Samuel Osei',
    agentPhone: '(512) 555-1823',
    broker: 'Austin Home Pro',
    tags: ['Near Barton Springs', 'Pool', 'Exposed Brick'],
  },
  {
    id: 19,
    address: '350 Meadowlark Cir',
    city: 'Kyle',
    state: 'TX',
    zip: '78640',
    price: 299000,
    beds: 3,
    baths: 2,
    sqft: 1580,
    type: 'Single Family',
    status: 'Active',
    dom: 38,
    mlsNumber: 'MLS-TX-20241380',
    yearBuilt: 2011,
    garage: 2,
    lot: '0.15 acres',
    description:
      'Value-priced Kyle home in family-friendly community. Bright and airy floor plan, fenced yard, community pool.',
    img: p(19),
    agent: 'Aisha Hassan',
    agentPhone: '(512) 555-1934',
    broker: 'RE/MAX Capital City',
    tags: ['Community Pool', 'Fenced Yard'],
  },
  {
    id: 20,
    address: '1109 Creekside Ct',
    city: 'Georgetown',
    state: 'TX',
    zip: '78633',
    price: 585000,
    beds: 4,
    baths: 3,
    sqft: 2890,
    type: 'Single Family',
    status: 'Pending',
    dom: 2,
    mlsNumber: 'MLS-TX-20241395',
    yearBuilt: 2020,
    garage: 2,
    lot: '0.27 acres',
    description:
      'Just went pending in 2 days! Premium Georgetown home backing to greenbelt. High ceilings, quartz throughout.',
    img: p(20),
    agent: 'Sophie Andersen',
    agentPhone: '(512) 555-0712',
    broker: 'RE/MAX Capital City',
    tags: ['Greenbelt', 'Outdoor Fireplace', 'High Ceilings'],
  },
  {
    id: 21,
    address: '2975 Westlake Hills Dr',
    city: 'Austin',
    state: 'TX',
    zip: '78746',
    price: 1250000,
    beds: 5,
    baths: 4,
    sqft: 4200,
    type: 'Single Family',
    status: 'Active',
    dom: 19,
    mlsNumber: 'MLS-TX-20241410',
    yearBuilt: 2017,
    garage: 3,
    lot: '0.65 acres',
    description:
      'Exceptional Westlake estate with stunning city views. European kitchen, wine cellar, home theater. Infinity pool overlooks Austin skyline.',
    img: p(21),
    agent: 'Kwame Mensah',
    agentPhone: '(512) 555-0823',
    broker: "Sotheby's International",
    tags: ['City Views', 'Wine Cellar', 'Infinity Pool'],
  },
  {
    id: 22,
    address: '815 Tanglewood Rd',
    city: 'Buda',
    state: 'TX',
    zip: '78610',
    price: 372000,
    beds: 3,
    baths: 2,
    sqft: 1850,
    type: 'Single Family',
    status: 'Active',
    dom: 26,
    mlsNumber: 'MLS-TX-20241425',
    yearBuilt: 2014,
    garage: 2,
    lot: '0.2 acres',
    description:
      'Lovely Buda home with open concept layout. Stainless appliances, tile backsplash, walk-in pantry. Large fenced backyard.',
    img: p(22),
    agent: 'Yuki Tanaka',
    agentPhone: '(512) 555-0934',
    broker: 'Coldwell Banker',
    tags: ['Walk-in Pantry', 'Large Yard'],
  },
  {
    id: 23,
    address: '3100 Domain Pkwy #410',
    city: 'Austin',
    state: 'TX',
    zip: '78758',
    price: 495000,
    beds: 2,
    baths: 2,
    sqft: 1180,
    type: 'Condo',
    status: 'Active',
    dom: 8,
    mlsNumber: 'MLS-TX-20241440',
    yearBuilt: 2022,
    garage: 1,
    lot: 'N/A',
    description:
      'New construction condo in the Domain. Designer kitchen, smart home tech, wraparound balcony. Resort-style amenities.',
    img: p(23),
    agent: 'Isabella Reyes',
    agentPhone: '(512) 555-1045',
    broker: 'Urban Living Realty',
    tags: ['New Construction', 'Smart Home', 'Balcony'],
  },
  {
    id: 24,
    address: '9234 Escarpment Blvd',
    city: 'Austin',
    state: 'TX',
    zip: '78749',
    price: 628000,
    beds: 4,
    baths: 3,
    sqft: 2760,
    type: 'Single Family',
    status: 'Sold',
    dom: 5,
    mlsNumber: 'MLS-TX-20241455',
    yearBuilt: 2015,
    garage: 2,
    lot: '0.29 acres',
    description:
      'Sold above list price! Pool and spa in a private oasis backyard. Updated kitchen, fresh exterior paint, new HVAC.',
    img: p(24),
    agent: 'Mohammed Al-Rashid',
    agentPhone: '(512) 555-1156',
    broker: 'Keller Williams',
    tags: ['Pool & Spa', 'Greenbelt', 'Updated'],
  },
  {
    id: 25,
    address: '460 Summit Springs Dr',
    city: 'Dripping Springs',
    state: 'TX',
    zip: '78620',
    price: 745000,
    beds: 4,
    baths: 4,
    sqft: 3150,
    type: 'Single Family',
    status: 'Active',
    dom: 33,
    mlsNumber: 'MLS-TX-20241470',
    yearBuilt: 2019,
    garage: 3,
    lot: '0.75 acres',
    description:
      "Country elegance meets modern luxury in the hill country. Grand entry, formal dining, media room, chef's island kitchen.",
    img: p(25),
    agent: 'Fatima Diallo',
    agentPhone: '(512) 555-1267',
    broker: "Kuper Sotheby's",
    tags: ['Media Room', '3-Car Garage', 'Private Lot'],
  },
  {
    id: 26,
    address: '1728 Stacy Ln',
    city: 'Cedar Park',
    state: 'TX',
    zip: '78613',
    price: 448000,
    beds: 4,
    baths: 3,
    sqft: 2300,
    type: 'Single Family',
    status: 'Active',
    dom: 15,
    mlsNumber: 'MLS-TX-20241485',
    yearBuilt: 2018,
    garage: 2,
    lot: '0.22 acres',
    description:
      'Meticulously maintained Cedar Park home. Beautiful wood floors, open kitchen with island, primary suite retreat.',
    img: p(26),
    agent: 'Raj Patel',
    agentPhone: '(512) 555-1378',
    broker: 'eXp Realty',
    tags: ['Wood Floors', 'Community Pool', 'Trails'],
  },
  {
    id: 27,
    address: '5820 Duval St #A',
    city: 'Austin',
    state: 'TX',
    zip: '78751',
    price: 325000,
    beds: 2,
    baths: 2,
    sqft: 1100,
    type: 'Townhouse',
    status: 'Active',
    dom: 20,
    mlsNumber: 'MLS-TX-20241500',
    yearBuilt: 2017,
    garage: 1,
    lot: 'N/A',
    description:
      'Stylish Hyde Park townhouse. Private front courtyard, rooftop deck with downtown skyline views. Custom tile, quartz counters.',
    img: p(27),
    agent: 'Amara Johnson',
    agentPhone: '(512) 555-1489',
    broker: 'Compass Realty',
    tags: ['Rooftop Deck', 'Downtown Views', 'Courtyard'],
  },
  {
    id: 28,
    address: '211 Blue Heron Dr',
    city: 'Lago Vista',
    state: 'TX',
    zip: '78645',
    price: 555000,
    beds: 3,
    baths: 2,
    sqft: 2100,
    type: 'Single Family',
    status: 'Active',
    dom: 41,
    mlsNumber: 'MLS-TX-20241515',
    yearBuilt: 2014,
    garage: 2,
    lot: '0.45 acres',
    description:
      'Waterfront community home in Lago Vista with Lake Travis access. Wraparound deck, updated baths. Community marina and private boat ramps.',
    img: p(28),
    agent: 'Carlos Vega',
    agentPhone: '(512) 555-1590',
    broker: 'Realty One Group',
    tags: ['Lake Access', 'Marina', 'Wraparound Deck'],
  },
  {
    id: 29,
    address: '4020 Braker Ln #218',
    city: 'Austin',
    state: 'TX',
    zip: '78759',
    price: 315000,
    beds: 1,
    baths: 1,
    sqft: 780,
    type: 'Condo',
    status: 'Pending',
    dom: 3,
    mlsNumber: 'MLS-TX-20241530',
    yearBuilt: 2015,
    garage: 1,
    lot: 'N/A',
    description:
      'Efficient North Austin condo near tech corridor. Stainless kitchen, updated bath, private patio. Gated community with pool.',
    img: p(29),
    agent: 'Chen Wei',
    agentPhone: '(512) 555-1601',
    broker: 'Century 21 Gold',
    tags: ['Gated', 'Dog Park', 'Near Tech'],
  },
  {
    id: 30,
    address: '7350 Springdale Rd',
    city: 'Austin',
    state: 'TX',
    zip: '78723',
    price: 389000,
    beds: 3,
    baths: 2,
    sqft: 1620,
    type: 'Single Family',
    status: 'Active',
    dom: 29,
    mlsNumber: 'MLS-TX-20241545',
    yearBuilt: 2009,
    garage: 2,
    lot: '0.18 acres',
    description:
      'East Austin charmer with original wood floors and updated kitchen. Covered front porch, close to Mueller district.',
    img: p(30),
    agent: 'Nadia Petrov',
    agentPhone: '(512) 555-1712',
    broker: 'Austin Home Pro',
    tags: ['Wood Floors', 'Workshop', 'Near Mueller'],
  },
  {
    id: 31,
    address: '125 Vineyard Dr',
    city: 'Driftwood',
    state: 'TX',
    zip: '78619',
    price: 985000,
    beds: 5,
    baths: 4,
    sqft: 3900,
    type: 'Single Family',
    status: 'Active',
    dom: 52,
    mlsNumber: 'MLS-TX-20241560',
    yearBuilt: 2016,
    garage: 3,
    lot: '2.1 acres',
    description:
      "Breathtaking Driftwood estate on 2+ acres surrounded by vineyards. Chef's kitchen, wine room, outdoor kitchen, resort pool.",
    img: p(31),
    agent: 'Samuel Osei',
    agentPhone: '(512) 555-1823',
    broker: "Sotheby's International",
    tags: ['2+ Acres', 'Wine Room', 'Vineyard View'],
  },
  {
    id: 32,
    address: '2840 Brushy Creek Rd',
    city: 'Cedar Park',
    state: 'TX',
    zip: '78613',
    price: 398000,
    beds: 3,
    baths: 2,
    sqft: 2020,
    type: 'Single Family',
    status: 'Sold',
    dom: 7,
    mlsNumber: 'MLS-TX-20241575',
    yearBuilt: 2012,
    garage: 2,
    lot: '0.2 acres',
    description:
      'Sold quickly in competitive market. Lovingly maintained home near Brushy Creek trail. Updated kitchen, spacious backyard.',
    img: p(32),
    agent: 'Aisha Hassan',
    agentPhone: '(512) 555-1934',
    broker: 'Keller Williams',
    tags: ['Near Trails', 'Pool-Ready', 'Updated'],
  },
  {
    id: 33,
    address: '618 Post Oak Dr',
    city: 'Hutto',
    state: 'TX',
    zip: '78634',
    price: 265000,
    beds: 3,
    baths: 2,
    sqft: 1480,
    type: 'Single Family',
    status: 'Active',
    dom: 44,
    mlsNumber: 'MLS-TX-20241590',
    yearBuilt: 2007,
    garage: 2,
    lot: '0.14 acres',
    description:
      'Affordable Hutto home priced to sell. New roof 2023, fresh exterior paint. Convenient to SH-130.',
    img: p(33),
    agent: 'Sophie Andersen',
    agentPhone: '(512) 555-0712',
    broker: 'RE/MAX Capital City',
    tags: ['New Roof', 'Commuter-Friendly', 'Move-In Ready'],
  },
  {
    id: 34,
    address: '8900 Research Blvd #503',
    city: 'Austin',
    state: 'TX',
    zip: '78758',
    price: 279000,
    beds: 1,
    baths: 1,
    sqft: 720,
    type: 'Condo',
    status: 'Active',
    dom: 17,
    mlsNumber: 'MLS-TX-20241605',
    yearBuilt: 2016,
    garage: 1,
    lot: 'N/A',
    description:
      'Efficient condo in the heart of Austin tech corridor. City-facing balcony, in-unit laundry. Walking distance to Q2 Stadium and MetroRail.',
    img: p(34),
    agent: 'Kwame Mensah',
    agentPhone: '(512) 555-0823',
    broker: 'Urban Living Realty',
    tags: ['Near Q2 Stadium', 'Balcony', 'MetroRail'],
  },
  {
    id: 35,
    address: '1550 Twin Creek Dr',
    city: 'Pflugerville',
    state: 'TX',
    zip: '78660',
    price: 338000,
    beds: 3,
    baths: 2,
    sqft: 1720,
    type: 'Single Family',
    status: 'Active',
    dom: 23,
    mlsNumber: 'MLS-TX-20241620',
    yearBuilt: 2014,
    garage: 2,
    lot: '0.18 acres',
    description:
      'Solid Pflugerville home with community amenities. Large kitchen with island, primary bath with garden tub.',
    img: p(35),
    agent: 'Yuki Tanaka',
    agentPhone: '(512) 555-0934',
    broker: 'Coldwell Banker',
    tags: ['Splash Pad', 'Community Pool', 'Island Kitchen'],
  },
  {
    id: 36,
    address: '390 Ranch Road 12',
    city: 'Wimberley',
    state: 'TX',
    zip: '78676',
    price: 1100000,
    beds: 5,
    baths: 4,
    sqft: 4100,
    type: 'Single Family',
    status: 'Active',
    dom: 60,
    mlsNumber: 'MLS-TX-20241635',
    yearBuilt: 2014,
    garage: 3,
    lot: '3.5 acres',
    description:
      'Luxury 3.5-acre Wimberley estate. Imported tile, custom cabinetry, resort pool with waterfall, outdoor pavilion.',
    img: p(36),
    agent: 'Isabella Reyes',
    agentPhone: '(512) 555-1045',
    broker: "Kuper Sotheby's",
    tags: ['3.5 Acres', 'Waterfall Pool', 'Pavilion'],
  },
  {
    id: 37,
    address: '2200 Ridgepoint Dr #132',
    city: 'Austin',
    state: 'TX',
    zip: '78754',
    price: 249000,
    beds: 2,
    baths: 2,
    sqft: 980,
    type: 'Condo',
    status: 'Active',
    dom: 35,
    mlsNumber: 'MLS-TX-20241650',
    yearBuilt: 2007,
    garage: 1,
    lot: 'N/A',
    description:
      'Value buy in established condo community. Updated flooring and kitchen, private patio. Near Tesla Gigafactory.',
    img: p(37),
    agent: 'Mohammed Al-Rashid',
    agentPhone: '(512) 555-1156',
    broker: 'Metro Homes TX',
    tags: ['Near Tesla', 'Updated', 'Value Buy'],
  },
  {
    id: 38,
    address: '9511 Brodie Ln',
    city: 'Austin',
    state: 'TX',
    zip: '78748',
    price: 525000,
    beds: 4,
    baths: 3,
    sqft: 2540,
    type: 'Single Family',
    status: 'Pending',
    dom: 4,
    mlsNumber: 'MLS-TX-20241665',
    yearBuilt: 2017,
    garage: 2,
    lot: '0.24 acres',
    description:
      'Gorgeous South Austin home in highly desirable school district. Sparkling pool in privacy-fenced backyard.',
    img: p(38),
    agent: 'Fatima Diallo',
    agentPhone: '(512) 555-1267',
    broker: 'Keller Williams',
    tags: ['Pool', 'Custom Built-ins', 'Top Schools'],
  },
  {
    id: 39,
    address: '745 Goforth Rd',
    city: 'Kyle',
    state: 'TX',
    zip: '78640',
    price: 420000,
    beds: 3,
    baths: 2,
    sqft: 2150,
    type: 'Single Family',
    status: 'Active',
    dom: 28,
    mlsNumber: 'MLS-TX-20241680',
    yearBuilt: 2016,
    garage: 2,
    lot: '0.33 acres',
    description:
      'Spacious Kyle home on larger lot. Split bedroom plan, high ceilings. Extended covered patio with hot tub included. No HOA.',
    img: p(39),
    agent: 'Raj Patel',
    agentPhone: '(512) 555-1378',
    broker: 'eXp Realty',
    tags: ['No HOA', 'Hot Tub', 'Large Lot'],
  },
  {
    id: 40,
    address: '3602 Far West Blvd #B',
    city: 'Austin',
    state: 'TX',
    zip: '78731',
    price: 435000,
    beds: 2,
    baths: 3,
    sqft: 1350,
    type: 'Townhouse',
    status: 'Active',
    dom: 13,
    mlsNumber: 'MLS-TX-20241695',
    yearBuilt: 2019,
    garage: 1,
    lot: 'N/A',
    description:
      'Modern Northwest Austin townhome. Rooftop terrace with Hill Country views, designer kitchen, EV charging.',
    img: p(40),
    agent: 'Amara Johnson',
    agentPhone: '(512) 555-1489',
    broker: 'Compass Realty',
    tags: ['Rooftop Terrace', 'EV Charging', 'Hill Country Views'],
  },
  {
    id: 41,
    address: '161 Clearwater Dr',
    city: 'Leander',
    state: 'TX',
    zip: '78641',
    price: 512000,
    beds: 4,
    baths: 3,
    sqft: 2650,
    type: 'Single Family',
    status: 'Active',
    dom: 9,
    mlsNumber: 'MLS-TX-20241710',
    yearBuilt: 2021,
    garage: 2,
    lot: '0.26 acres',
    description:
      "Nearly new Leander home in award-winning LISD. Gourmet kitchen, butler's pantry, game room. Extended covered patio with outdoor kitchen.",
    img: p(41),
    agent: 'Carlos Vega',
    agentPhone: '(512) 555-1590',
    broker: 'Realty One Group',
    tags: ['Award-Winning Schools', 'Outdoor Kitchen', 'Butler Pantry'],
  },
  {
    id: 42,
    address: '4850 William Cannon Dr #205',
    city: 'Austin',
    state: 'TX',
    zip: '78749',
    price: 289000,
    beds: 1,
    baths: 1,
    sqft: 750,
    type: 'Condo',
    status: 'Sold',
    dom: 6,
    mlsNumber: 'MLS-TX-20241725',
    yearBuilt: 2013,
    garage: 1,
    lot: 'N/A',
    description:
      'Sold over asking price! Clean SW Austin condo with granite counters and updated bath. Community pool and fitness center.',
    img: p(42),
    agent: 'Chen Wei',
    agentPhone: '(512) 555-1601',
    broker: 'Austin Home Pro',
    tags: ['Granite', 'Pool', 'Updated Bath'],
  },
  {
    id: 43,
    address: '1025 Iron Horse Trail',
    city: 'Round Rock',
    state: 'TX',
    zip: '78681',
    price: 475000,
    beds: 4,
    baths: 3,
    sqft: 2410,
    type: 'Single Family',
    status: 'Active',
    dom: 21,
    mlsNumber: 'MLS-TX-20241740',
    yearBuilt: 2017,
    garage: 2,
    lot: '0.22 acres',
    description:
      'Pristine Round Rock home in master-planned community. Open floor plan, quartz counters. Community features lazy river and tennis courts.',
    img: p(43),
    agent: 'Nadia Petrov',
    agentPhone: '(512) 555-1712',
    broker: 'Coldwell Banker',
    tags: ['Lazy River', 'Tennis Courts', 'Master Planned'],
  },
  {
    id: 44,
    address: '505 Deer Park Ln',
    city: 'Driftwood',
    state: 'TX',
    zip: '78619',
    price: 1350000,
    beds: 6,
    baths: 5,
    sqft: 5200,
    type: 'Single Family',
    status: 'Active',
    dom: 37,
    mlsNumber: 'MLS-TX-20241755',
    yearBuilt: 2020,
    garage: 4,
    lot: '5.0 acres',
    description:
      'Exceptional Driftwood compound on 5 acres. Professional kitchen, home gym, theater, pool/spa. Guest quarters and barn.',
    img: p(44),
    agent: 'Samuel Osei',
    agentPhone: '(512) 555-1823',
    broker: "Sotheby's International",
    tags: ['5 Acres', 'Home Gym', 'Theater', 'Barn'],
  },
  {
    id: 45,
    address: '2715 Exposition Blvd',
    city: 'Austin',
    state: 'TX',
    zip: '78703',
    price: 895000,
    beds: 4,
    baths: 4,
    sqft: 3100,
    type: 'Single Family',
    status: 'Active',
    dom: 11,
    mlsNumber: 'MLS-TX-20241770',
    yearBuilt: 2019,
    garage: 2,
    lot: '0.22 acres',
    description:
      "Old Enfield architectural gem. White oak floors, steel doors, chef's kitchen with La Cornue range. Lush landscaped yard and private courtyard.",
    img: p(45),
    agent: 'Aisha Hassan',
    agentPhone: '(512) 555-1934',
    broker: "Kuper Sotheby's",
    tags: ['Architectural', 'Summer Kitchen', 'Courtyard'],
  },
  {
    id: 46,
    address: '6120 Manchaca Rd #301',
    city: 'Austin',
    state: 'TX',
    zip: '78745',
    price: 335000,
    beds: 2,
    baths: 2,
    sqft: 1050,
    type: 'Condo',
    status: 'Active',
    dom: 24,
    mlsNumber: 'MLS-TX-20241785',
    yearBuilt: 2020,
    garage: 1,
    lot: 'N/A',
    description:
      'New community in South Austin. Quartz counters, LVP flooring, private patio. Walkable to shops and restaurants on South Congress.',
    img: p(46),
    agent: 'Sophie Andersen',
    agentPhone: '(512) 555-0712',
    broker: 'Century 21 Gold',
    tags: ['Near SoCo', 'New Community', 'Walkable'],
  },
  {
    id: 47,
    address: '830 Buttonwood Dr',
    city: 'Georgetown',
    state: 'TX',
    zip: '78626',
    price: 365000,
    beds: 3,
    baths: 2,
    sqft: 1890,
    type: 'Single Family',
    status: 'Pending',
    dom: 1,
    mlsNumber: 'MLS-TX-20241800',
    yearBuilt: 2015,
    garage: 2,
    lot: '0.19 acres',
    description:
      'Went pending in 1 day! Pristine Georgetown home with new HVAC, updated baths, and beautiful landscaping.',
    img: p(47),
    agent: 'Kwame Mensah',
    agentPhone: '(512) 555-0823',
    broker: 'RE/MAX Capital City',
    tags: ['New HVAC', 'Updated Baths', 'High Demand'],
  },
  {
    id: 48,
    address: '1940 Lakeline Blvd #415',
    city: 'Cedar Park',
    state: 'TX',
    zip: '78613',
    price: 299000,
    beds: 1,
    baths: 1,
    sqft: 810,
    type: 'Condo',
    status: 'Active',
    dom: 30,
    mlsNumber: 'MLS-TX-20241815',
    yearBuilt: 2018,
    garage: 1,
    lot: 'N/A',
    description:
      'Top-floor condo with vaulted ceilings and pool views. Stainless kitchen, in-unit washer/dryer, private balcony. Gated community.',
    img: p(48),
    agent: 'Yuki Tanaka',
    agentPhone: '(512) 555-0934',
    broker: 'Metro Homes TX',
    tags: ['Top Floor', 'Vaulted Ceilings', 'Pool View'],
  },
  {
    id: 49,
    address: '7622 N Lamar Blvd #C',
    city: 'Austin',
    state: 'TX',
    zip: '78752',
    price: 385000,
    beds: 3,
    baths: 3,
    sqft: 1450,
    type: 'Townhouse',
    status: 'Active',
    dom: 16,
    mlsNumber: 'MLS-TX-20241830',
    yearBuilt: 2020,
    garage: 1,
    lot: 'N/A',
    description:
      "Urban North Loop townhome. Rooftop deck, open chef's kitchen. Walkable to North Loop restaurants, coffee shops, and vintage stores.",
    img: p(49),
    agent: 'Isabella Reyes',
    agentPhone: '(512) 555-1045',
    broker: 'Compass Realty',
    tags: ['Rooftop Deck', 'Walkable', 'North Loop'],
  },
  {
    id: 50,
    address: '315 Mesa Verde Dr',
    city: 'Buda',
    state: 'TX',
    zip: '78610',
    price: 438000,
    beds: 4,
    baths: 3,
    sqft: 2250,
    type: 'Single Family',
    status: 'Active',
    dom: 19,
    mlsNumber: 'MLS-TX-20241845',
    yearBuilt: 2019,
    garage: 2,
    lot: '0.21 acres',
    description:
      "Beautiful newer home in Buda's fastest growing neighborhood. White cabinetry, farmhouse sink, engineered hardwood. Spa-like primary bath.",
    img: p(50),
    agent: 'Mohammed Al-Rashid',
    agentPhone: '(512) 555-1156',
    broker: 'eXp Realty',
    tags: ['Farmhouse Style', 'Engineered Hardwood', 'Spa Bath'],
  },
  {
    id: 51,
    address: '4411 Red River St',
    city: 'Austin',
    state: 'TX',
    zip: '78751',
    price: 649000,
    beds: 3,
    baths: 2,
    sqft: 1700,
    type: 'Single Family',
    status: 'Active',
    dom: 8,
    mlsNumber: 'MLS-TX-20241860',
    yearBuilt: 2022,
    garage: 1,
    lot: '0.12 acres',
    description:
      'New construction in vibrant Hyde Park. Scandinavian-inspired design, polished concrete floors, floating staircase. Rooftop deck with views.',
    img: p(51),
    agent: 'Fatima Diallo',
    agentPhone: '(512) 555-1267',
    broker: 'Austin Home Pro',
    tags: ['New Construction', 'Rooftop Deck', 'UT Views'],
  },
  {
    id: 52,
    address: '9823 Escarpment Blvd #102',
    city: 'Austin',
    state: 'TX',
    zip: '78749',
    price: 415000,
    beds: 2,
    baths: 2,
    sqft: 1120,
    type: 'Condo',
    status: 'Sold',
    dom: 3,
    mlsNumber: 'MLS-TX-20241875',
    yearBuilt: 2016,
    garage: 1,
    lot: 'N/A',
    description:
      'Ground-floor corner unit with private patio backing to greenbelt. Updated kitchen with quartz counters, spa bath. Sold in 3 days.',
    img: p(52),
    agent: 'Raj Patel',
    agentPhone: '(512) 555-1378',
    broker: 'Keller Williams',
    tags: ['Corner Unit', 'Greenbelt Patio', 'Updated'],
  },
  {
    id: 53,
    address: '2350 Old Bastrop Hwy',
    city: 'Bastrop',
    state: 'TX',
    zip: '78602',
    price: 289000,
    beds: 3,
    baths: 2,
    sqft: 1580,
    type: 'Single Family',
    status: 'Active',
    dom: 47,
    mlsNumber: 'MLS-TX-20241890',
    yearBuilt: 2005,
    garage: 2,
    lot: '0.38 acres',
    description:
      'Country charmer on a large Bastrop lot surrounded by loblolly pines. Covered porches, fireplace, large workshop.',
    img: p(53),
    agent: 'Amara Johnson',
    agentPhone: '(512) 555-1489',
    broker: 'Century 21 Gold',
    tags: ['Pine Trees', 'Workshop', 'Fireplace'],
  },
  {
    id: 54,
    address: '1100 Retreat Blvd',
    city: 'Marble Falls',
    state: 'TX',
    zip: '78654',
    price: 685000,
    beds: 4,
    baths: 3,
    sqft: 2920,
    type: 'Single Family',
    status: 'Active',
    dom: 31,
    mlsNumber: 'MLS-TX-20241905',
    yearBuilt: 2018,
    garage: 2,
    lot: '0.55 acres',
    description:
      'Lake LBJ area retreat in prestigious gated community. Stunning lake views, open living with vaulted ceilings, summer kitchen, boat dock access.',
    img: p(54),
    agent: 'Carlos Vega',
    agentPhone: '(512) 555-1590',
    broker: "Kuper Sotheby's",
    tags: ['Lake LBJ', 'Gated', 'Boat Dock'],
  },
  {
    id: 55,
    address: '6701 Burnet Rd #201',
    city: 'Austin',
    state: 'TX',
    zip: '78757',
    price: 349000,
    beds: 2,
    baths: 2,
    sqft: 1100,
    type: 'Condo',
    status: 'Active',
    dom: 12,
    mlsNumber: 'MLS-TX-20241920',
    yearBuilt: 2019,
    garage: 1,
    lot: 'N/A',
    description:
      "Hip Brentwood condo near the best of North Austin. Light-filled corner unit, chef's kitchen, private juliet balcony.",
    img: p(55),
    agent: 'Chen Wei',
    agentPhone: '(512) 555-1601',
    broker: 'Urban Living Realty',
    tags: ['Corner Unit', 'Rooftop Pool', 'Walkable'],
  },
  {
    id: 56,
    address: '480 Longhorn Valley Rd',
    city: 'Spicewood',
    state: 'TX',
    zip: '78669',
    price: 1450000,
    beds: 5,
    baths: 5,
    sqft: 4800,
    type: 'Single Family',
    status: 'Active',
    dom: 25,
    mlsNumber: 'MLS-TX-20241935',
    yearBuilt: 2021,
    garage: 4,
    lot: '4.2 acres',
    description:
      "Landmark Spicewood estate on 4.2 private acres with Lake Travis views. Infinity pool, home theater, 1,200 sqft guest suite. Car collector's garage.",
    img: p(56),
    agent: 'Nadia Petrov',
    agentPhone: '(512) 555-1712',
    broker: "Sotheby's International",
    tags: ['Lake Travis Views', 'Infinity Pool', 'Guest Suite'],
  },
  // --- 100 NEW LISTINGS ---
  {
    id: 57,
    address: '204 Bluebell Ct',
    city: 'Liberty Hill',
    state: 'TX',
    zip: '78642',
    price: 349000,
    beds: 3,
    baths: 2,
    sqft: 1790,
    type: 'Single Family',
    status: 'Active',
    dom: 14,
    mlsNumber: 'MLS-TX-20242001',
    yearBuilt: 2019,
    garage: 2,
    lot: '0.18 acres',
    description:
      'Charming Liberty Hill home in an emerging community. Open kitchen with island, large primary suite, covered patio, and fully fenced yard.',
    img: p(57),
    agent: 'Maria Gonzalez',
    agentPhone: '(512) 555-0134',
    broker: 'Realty One Group',
    tags: ['Fenced Yard', 'Island Kitchen'],
  },
  {
    id: 58,
    address: '982 Creekbend Dr',
    city: 'New Braunfels',
    state: 'TX',
    zip: '78130',
    price: 415000,
    beds: 4,
    baths: 3,
    sqft: 2200,
    type: 'Single Family',
    status: 'Active',
    dom: 20,
    mlsNumber: 'MLS-TX-20242002',
    yearBuilt: 2018,
    garage: 2,
    lot: '0.22 acres',
    description:
      'Gorgeous New Braunfels home minutes from the Guadalupe River. Granite counters, stainless appliances, soaking tub, and private backyard retreat.',
    img: p(58),
    agent: 'James Okafor',
    agentPhone: '(512) 555-0287',
    broker: 'Compass Realty',
    tags: ['Near River', 'Granite Kitchen', 'Soaking Tub'],
  },
  {
    id: 59,
    address: '3320 Pecos St #201',
    city: 'Austin',
    state: 'TX',
    zip: '78703',
    price: 560000,
    beds: 2,
    baths: 2,
    sqft: 1300,
    type: 'Condo',
    status: 'Active',
    dom: 10,
    mlsNumber: 'MLS-TX-20242003',
    yearBuilt: 2020,
    garage: 1,
    lot: 'N/A',
    description:
      'Sleek downtown-adjacent condo with city views. Quartz counters, spa bath, private terrace. Steps from restaurants, coffee shops, and Shoal Creek trail.',
    img: p(59),
    agent: 'Priya Nair',
    agentPhone: '(512) 555-0391',
    broker: 'Urban Living Realty',
    tags: ['City Views', 'Terrace', 'Near Shoal Creek'],
  },
  {
    id: 60,
    address: '17 Crestwood Pass',
    city: 'San Marcos',
    state: 'TX',
    zip: '78666',
    price: 295000,
    beds: 3,
    baths: 2,
    sqft: 1560,
    type: 'Single Family',
    status: 'Active',
    dom: 30,
    mlsNumber: 'MLS-TX-20242004',
    yearBuilt: 2010,
    garage: 2,
    lot: '0.15 acres',
    description:
      'Affordable San Marcos home near Texas State University. Updated fixtures, fresh paint, new water heater. Great for families or investors.',
    img: p(60),
    agent: 'Derek Chen',
    agentPhone: '(512) 555-0452',
    broker: 'Metro Homes TX',
    tags: ['Near University', 'Updated', 'Investor-Friendly'],
  },
  {
    id: 61,
    address: '6410 Manchaca Rd',
    city: 'Austin',
    state: 'TX',
    zip: '78745',
    price: 532000,
    beds: 3,
    baths: 2,
    sqft: 1920,
    type: 'Single Family',
    status: 'Pending',
    dom: 3,
    mlsNumber: 'MLS-TX-20242005',
    yearBuilt: 2017,
    garage: 2,
    lot: '0.2 acres',
    description:
      "South Austin stunner that went pending fast. Hardwood floors, designer lighting, chef's kitchen. Private pool added 2022.",
    img: p(61),
    agent: 'Tanisha Williams',
    agentPhone: '(512) 555-0561',
    broker: 'Keller Williams',
    tags: ['Pool', 'Hardwood Floors', "Chef's Kitchen"],
  },
  {
    id: 62,
    address: '1450 Bee Cave Pkwy #310',
    city: 'Bee Cave',
    state: 'TX',
    zip: '78738',
    price: 680000,
    beds: 2,
    baths: 2,
    sqft: 1400,
    type: 'Condo',
    status: 'Active',
    dom: 18,
    mlsNumber: 'MLS-TX-20242006',
    yearBuilt: 2021,
    garage: 2,
    lot: 'N/A',
    description:
      'Luxurious Bee Cave condo with Hill Country views. Floor-to-ceiling windows, gourmet kitchen, spa bath. Building offers concierge, pool, and EV stations.',
    img: p(62),
    agent: 'Luis Herrera',
    agentPhone: '(512) 555-0678',
    broker: "Kuper Sotheby's",
    tags: ['Hill Country Views', 'Concierge', 'EV Stations'],
  },
  {
    id: 63,
    address: '220 Riverside Ranch Rd',
    city: 'Bastrop',
    state: 'TX',
    zip: '78602',
    price: 478000,
    beds: 4,
    baths: 3,
    sqft: 2350,
    type: 'Single Family',
    status: 'Active',
    dom: 36,
    mlsNumber: 'MLS-TX-20242007',
    yearBuilt: 2016,
    garage: 2,
    lot: '0.65 acres',
    description:
      'Spacious Bastrop home on over half an acre. Wrap-around porch, open floor plan, media room, and oversized garage with workshop space.',
    img: p(63),
    agent: 'Sophie Andersen',
    agentPhone: '(512) 555-0712',
    broker: 'RE/MAX Capital City',
    tags: ['Half Acre', 'Wrap-Around Porch', 'Media Room'],
  },
  {
    id: 64,
    address: '8814 Slaughter Ln #105',
    city: 'Austin',
    state: 'TX',
    zip: '78749',
    price: 268000,
    beds: 1,
    baths: 1,
    sqft: 740,
    type: 'Condo',
    status: 'Active',
    dom: 22,
    mlsNumber: 'MLS-TX-20242008',
    yearBuilt: 2015,
    garage: 1,
    lot: 'N/A',
    description:
      'Efficient SW Austin condo with updated finishes. Stainless kitchen, walk-in closet, private patio. Community pool, gym, and gated entry.',
    img: p(64),
    agent: 'Kwame Mensah',
    agentPhone: '(512) 555-0823',
    broker: 'Austin Home Pro',
    tags: ['Gated', 'Updated', 'Community Pool'],
  },
  {
    id: 65,
    address: '5101 N Lakeline Blvd',
    city: 'Leander',
    state: 'TX',
    zip: '78641',
    price: 385000,
    beds: 3,
    baths: 2,
    sqft: 1830,
    type: 'Single Family',
    status: 'Active',
    dom: 11,
    mlsNumber: 'MLS-TX-20242009',
    yearBuilt: 2020,
    garage: 2,
    lot: '0.16 acres',
    description:
      'Nearly new Leander home loaded with upgrades. Smart thermostat, tankless water heater, quartz countertops. Close to MetroRail station.',
    img: p(65),
    agent: 'Yuki Tanaka',
    agentPhone: '(512) 555-0934',
    broker: 'Coldwell Banker',
    tags: ['Smart Home', 'Near MetroRail', 'Move-In Ready'],
  },
  {
    id: 66,
    address: '4402 Avenue F #B',
    city: 'Austin',
    state: 'TX',
    zip: '78751',
    price: 498000,
    beds: 3,
    baths: 3,
    sqft: 1600,
    type: 'Townhouse',
    status: 'Active',
    dom: 7,
    mlsNumber: 'MLS-TX-20242010',
    yearBuilt: 2021,
    garage: 1,
    lot: 'N/A',
    description:
      'Sophisticated Hyde Park townhome. Rooftop deck with tree-canopy views, designer kitchen, private fenced yard. Walk to local Austin staples.',
    img: p(66),
    agent: 'Isabella Reyes',
    agentPhone: '(512) 555-1045',
    broker: 'Compass Realty',
    tags: ['Rooftop Deck', 'Fenced Yard', 'Hyde Park'],
  },
  {
    id: 67,
    address: '3700 Riviera Dr',
    city: 'Round Rock',
    state: 'TX',
    zip: '78665',
    price: 440000,
    beds: 4,
    baths: 3,
    sqft: 2280,
    type: 'Single Family',
    status: 'Active',
    dom: 16,
    mlsNumber: 'MLS-TX-20242011',
    yearBuilt: 2017,
    garage: 2,
    lot: '0.21 acres',
    description:
      'Beautiful Round Rock home near Old Settlers Park. Open layout, granite kitchen, large primary with tray ceiling. Covered pergola in backyard.',
    img: p(67),
    agent: 'Mohammed Al-Rashid',
    agentPhone: '(512) 555-1156',
    broker: 'eXp Realty',
    tags: ['Near Park', 'Pergola', 'Granite Kitchen'],
  },
  {
    id: 68,
    address: '101 Malabar Cove',
    city: 'Lakeway',
    state: 'TX',
    zip: '78734',
    price: 820000,
    beds: 5,
    baths: 4,
    sqft: 3500,
    type: 'Single Family',
    status: 'Active',
    dom: 28,
    mlsNumber: 'MLS-TX-20242012',
    yearBuilt: 2018,
    garage: 3,
    lot: '0.48 acres',
    description:
      'Stunning Lakeway home with Lake Travis views. Gourmet kitchen, wine room, resort pool with slide. Sought-after Eanes ISD district.',
    img: p(68),
    agent: 'Fatima Diallo',
    agentPhone: '(512) 555-1267',
    broker: "Kuper Sotheby's",
    tags: ['Lake Travis Views', 'Pool Slide', 'Eanes ISD'],
  },
  {
    id: 69,
    address: '260 Timber Ridge Dr',
    city: 'Georgetown',
    state: 'TX',
    zip: '78628',
    price: 499000,
    beds: 4,
    baths: 3,
    sqft: 2600,
    type: 'Single Family',
    status: 'Sold',
    dom: 6,
    mlsNumber: 'MLS-TX-20242013',
    yearBuilt: 2019,
    garage: 2,
    lot: '0.25 acres',
    description:
      'Sold above list in top Georgetown neighborhood. Open concept with quartz island, spa bath, oversized game room. Backs to greenbelt.',
    img: p(69),
    agent: 'Raj Patel',
    agentPhone: '(512) 555-1378',
    broker: 'Realty One Group',
    tags: ['Greenbelt', 'Game Room', 'Sold Over Asking'],
  },
  {
    id: 70,
    address: '7900 Shoal Creek Blvd #2B',
    city: 'Austin',
    state: 'TX',
    zip: '78757',
    price: 312000,
    beds: 2,
    baths: 1,
    sqft: 950,
    type: 'Condo',
    status: 'Active',
    dom: 25,
    mlsNumber: 'MLS-TX-20242014',
    yearBuilt: 2008,
    garage: 1,
    lot: 'N/A',
    description:
      'Centrally located condo near Shoal Creek hike and bike trail. Updated kitchen, private balcony, assigned covered parking. Great walkability.',
    img: p(70),
    agent: 'Amara Johnson',
    agentPhone: '(512) 555-1489',
    broker: 'Metro Homes TX',
    tags: ['Near Trail', 'Updated', 'Balcony'],
  },
  {
    id: 71,
    address: '910 Springhouse Ln',
    city: 'Buda',
    state: 'TX',
    zip: '78610',
    price: 362000,
    beds: 3,
    baths: 2,
    sqft: 1810,
    type: 'Single Family',
    status: 'Active',
    dom: 19,
    mlsNumber: 'MLS-TX-20242015',
    yearBuilt: 2016,
    garage: 2,
    lot: '0.19 acres',
    description:
      'Well-maintained Buda home in a community with resort amenities. Open plan, updated kitchen, covered patio with ceiling fan.',
    img: p(71),
    agent: 'Carlos Vega',
    agentPhone: '(512) 555-1590',
    broker: 'Coldwell Banker',
    tags: ['Community Pool', 'Open Plan', 'Updated Kitchen'],
  },
  {
    id: 72,
    address: '1222 Lockhart Hwy',
    city: 'Lockhart',
    state: 'TX',
    zip: '78644',
    price: 229000,
    beds: 3,
    baths: 2,
    sqft: 1450,
    type: 'Single Family',
    status: 'Active',
    dom: 55,
    mlsNumber: 'MLS-TX-20242016',
    yearBuilt: 2003,
    garage: 2,
    lot: '0.28 acres',
    description:
      'Great value in historic Lockhart — the BBQ capital of Texas! Spacious lot, covered carport, fresh paint, and new flooring throughout.',
    img: p(72),
    agent: 'Chen Wei',
    agentPhone: '(512) 555-1601',
    broker: 'Austin Home Pro',
    tags: ['BBQ Capital', 'New Flooring', 'Large Lot'],
  },
  {
    id: 73,
    address: '2055 E 7th St #304',
    city: 'Austin',
    state: 'TX',
    zip: '78702',
    price: 595000,
    beds: 2,
    baths: 2,
    sqft: 1180,
    type: 'Condo',
    status: 'Active',
    dom: 9,
    mlsNumber: 'MLS-TX-20242017',
    yearBuilt: 2022,
    garage: 1,
    lot: 'N/A',
    description:
      'Brand-new East Austin condo in the heart of the 78702 zip code. Polished concrete, custom millwork, private terrace. Walk to restaurants and bars.',
    img: p(73),
    agent: 'Nadia Petrov',
    agentPhone: '(512) 555-1712',
    broker: 'Urban Living Realty',
    tags: ['New Construction', 'East Austin', 'Terrace'],
  },
  {
    id: 74,
    address: '440 Twin Sisters Rd',
    city: 'Wimberley',
    state: 'TX',
    zip: '78676',
    price: 675000,
    beds: 3,
    baths: 2,
    sqft: 2100,
    type: 'Single Family',
    status: 'Active',
    dom: 40,
    mlsNumber: 'MLS-TX-20242018',
    yearBuilt: 2014,
    garage: 2,
    lot: '1.0 acres',
    description:
      'Secluded Wimberley gem on a full acre. Wraparound porch, open living with stone fireplace, private hot tub. Detached office/studio.',
    img: p(74),
    agent: 'Samuel Osei',
    agentPhone: '(512) 555-1823',
    broker: "Sotheby's International",
    tags: ['1 Acre', 'Hot Tub', 'Detached Office'],
  },
  {
    id: 75,
    address: '3005 Oak Knoll Dr',
    city: 'Cedar Park',
    state: 'TX',
    zip: '78613',
    price: 425000,
    beds: 3,
    baths: 2,
    sqft: 2040,
    type: 'Single Family',
    status: 'Active',
    dom: 15,
    mlsNumber: 'MLS-TX-20242019',
    yearBuilt: 2015,
    garage: 2,
    lot: '0.2 acres',
    description:
      'Lovely Cedar Park home near Brushy Creek trails. Updated kitchen with shaker cabinets, hardwood floors, bright breakfast room.',
    img: p(75),
    agent: 'Aisha Hassan',
    agentPhone: '(512) 555-1934',
    broker: 'RE/MAX Capital City',
    tags: ['Near Trails', 'Hardwood Floors', 'Updated Kitchen'],
  },
  {
    id: 76,
    address: '520 Luling Ave',
    city: 'Luling',
    state: 'TX',
    zip: '78648',
    price: 199000,
    beds: 3,
    baths: 1,
    sqft: 1200,
    type: 'Single Family',
    status: 'Active',
    dom: 72,
    mlsNumber: 'MLS-TX-20242020',
    yearBuilt: 1998,
    garage: 1,
    lot: '0.22 acres',
    description:
      'Affordable Luling home perfect for first-time buyers or investors. Covered front porch, new roof, large fenced backyard with mature trees.',
    img: p(76),
    agent: 'Sophie Andersen',
    agentPhone: '(512) 555-0712',
    broker: 'Century 21 Gold',
    tags: ['First-Time Buyer', 'New Roof', 'Investor'],
  },
  {
    id: 77,
    address: '1810 Kirby Pl',
    city: 'Austin',
    state: 'TX',
    zip: '78703',
    price: 1750000,
    beds: 5,
    baths: 5,
    sqft: 4600,
    type: 'Single Family',
    status: 'Active',
    dom: 21,
    mlsNumber: 'MLS-TX-20242021',
    yearBuilt: 2020,
    garage: 3,
    lot: '0.35 acres',
    description:
      'Exceptional Tarrytown estate. Imported limestone, Venetian plaster, Thermador kitchen, climate-controlled wine room, negative-edge pool.',
    img: p(77),
    agent: 'Kwame Mensah',
    agentPhone: '(512) 555-0823',
    broker: "Kuper Sotheby's",
    tags: ['Tarrytown', 'Wine Room', 'Negative-Edge Pool'],
  },
  {
    id: 78,
    address: '655 Rancho Vista Dr',
    city: 'Dripping Springs',
    state: 'TX',
    zip: '78620',
    price: 598000,
    beds: 4,
    baths: 3,
    sqft: 2700,
    type: 'Single Family',
    status: 'Active',
    dom: 27,
    mlsNumber: 'MLS-TX-20242022',
    yearBuilt: 2018,
    garage: 2,
    lot: '0.6 acres',
    description:
      "Hill country living in a premium Dripping Springs community. Big sky views, open living room, chef's kitchen, covered outdoor living.",
    img: p(78),
    agent: 'Yuki Tanaka',
    agentPhone: '(512) 555-0934',
    broker: 'Realty One Group',
    tags: ['Hill Country Views', 'Open Living', 'Large Lot'],
  },
  {
    id: 79,
    address: '2390 Cameron Rd #108',
    city: 'Austin',
    state: 'TX',
    zip: '78723',
    price: 299000,
    beds: 1,
    baths: 1,
    sqft: 810,
    type: 'Condo',
    status: 'Active',
    dom: 18,
    mlsNumber: 'MLS-TX-20242023',
    yearBuilt: 2017,
    garage: 1,
    lot: 'N/A',
    description:
      "Modern East Austin condo with stylish finishes. Open kitchen, spa-style bath, private patio, covered parking. Near Mueller farmer's market.",
    img: p(79),
    agent: 'Isabella Reyes',
    agentPhone: '(512) 555-1045',
    broker: 'Compass Realty',
    tags: ['East Austin', 'Near Mueller', 'Modern Finishes'],
  },
  {
    id: 80,
    address: '333 Settlers Park Loop',
    city: 'Round Rock',
    state: 'TX',
    zip: '78664',
    price: 365000,
    beds: 3,
    baths: 2,
    sqft: 1760,
    type: 'Single Family',
    status: 'Active',
    dom: 13,
    mlsNumber: 'MLS-TX-20242024',
    yearBuilt: 2016,
    garage: 2,
    lot: '0.17 acres',
    description:
      'Clean and move-in ready Round Rock home. Open kitchen, engineered wood floors, large primary suite. Backs to park with no rear neighbors.',
    img: p(80),
    agent: 'Mohammed Al-Rashid',
    agentPhone: '(512) 555-1156',
    broker: 'Coldwell Banker',
    tags: ['Backs to Park', 'Engineered Wood', 'No Rear Neighbors'],
  },
  {
    id: 81,
    address: '1030 Summit Ridge Dr',
    city: 'Leander',
    state: 'TX',
    zip: '78641',
    price: 479000,
    beds: 4,
    baths: 3,
    sqft: 2450,
    type: 'Single Family',
    status: 'Pending',
    dom: 4,
    mlsNumber: 'MLS-TX-20242025',
    yearBuilt: 2020,
    garage: 2,
    lot: '0.24 acres',
    description:
      'Immaculate Leander home went pending quickly. Gourmet kitchen, media room, covered outdoor kitchen, 3-zone irrigation system.',
    img: p(81),
    agent: 'Fatima Diallo',
    agentPhone: '(512) 555-1267',
    broker: 'eXp Realty',
    tags: ['Media Room', 'Outdoor Kitchen', 'Irrigation'],
  },
  {
    id: 82,
    address: '4802 Convict Hill Rd',
    city: 'Austin',
    state: 'TX',
    zip: '78749',
    price: 549000,
    beds: 4,
    baths: 3,
    sqft: 2650,
    type: 'Single Family',
    status: 'Active',
    dom: 24,
    mlsNumber: 'MLS-TX-20242026',
    yearBuilt: 2013,
    garage: 2,
    lot: '0.27 acres',
    description:
      'Spacious SW Austin home with great bones. Recently updated kitchen, large game room, covered patio, and privacy-fenced pool.',
    img: p(82),
    agent: 'Raj Patel',
    agentPhone: '(512) 555-1378',
    broker: 'Austin Home Pro',
    tags: ['Pool', 'Game Room', 'Updated Kitchen'],
  },
  {
    id: 83,
    address: '718 Clearview Dr',
    city: 'Kyle',
    state: 'TX',
    zip: '78640',
    price: 342000,
    beds: 3,
    baths: 2,
    sqft: 1710,
    type: 'Single Family',
    status: 'Active',
    dom: 21,
    mlsNumber: 'MLS-TX-20242027',
    yearBuilt: 2015,
    garage: 2,
    lot: '0.18 acres',
    description:
      'Cute Kyle home with great curb appeal. Granite kitchen, walk-in pantry, covered patio. Community features playground and walking trails.',
    img: p(83),
    agent: 'Amara Johnson',
    agentPhone: '(512) 555-1489',
    broker: 'RE/MAX Capital City',
    tags: ['Walk-in Pantry', 'Playground', 'Trails'],
  },
  {
    id: 84,
    address: '5600 N Mopac Expy #402',
    city: 'Austin',
    state: 'TX',
    zip: '78731',
    price: 419000,
    beds: 2,
    baths: 2,
    sqft: 1050,
    type: 'Condo',
    status: 'Active',
    dom: 14,
    mlsNumber: 'MLS-TX-20242028',
    yearBuilt: 2019,
    garage: 1,
    lot: 'N/A',
    description:
      'Upscale North Austin condo near the Arboretum. Quartz counters, gas range, oversized balcony with wooded views. Building offers concierge and resort pool.',
    img: p(84),
    agent: 'Carlos Vega',
    agentPhone: '(512) 555-1590',
    broker: 'Urban Living Realty',
    tags: ['Near Arboretum', 'Gas Range', 'Concierge'],
  },
  {
    id: 85,
    address: '2740 Lakewood Knoll',
    city: 'Cedar Park',
    state: 'TX',
    zip: '78613',
    price: 488000,
    beds: 4,
    baths: 3,
    sqft: 2510,
    type: 'Single Family',
    status: 'Active',
    dom: 17,
    mlsNumber: 'MLS-TX-20242029',
    yearBuilt: 2019,
    garage: 2,
    lot: '0.23 acres',
    description:
      "Outstanding Cedar Park home in top school district. Soaring ceilings, built-in study, butler's pantry. Extended patio with outdoor kitchen.",
    img: p(85),
    agent: 'Chen Wei',
    agentPhone: '(512) 555-1601',
    broker: 'Keller Williams',
    tags: ['Top Schools', 'Outdoor Kitchen', 'Butler Pantry'],
  },
  {
    id: 86,
    address: '160 Windmill Ranch Rd',
    city: 'Liberty Hill',
    state: 'TX',
    zip: '78642',
    price: 565000,
    beds: 4,
    baths: 3,
    sqft: 2780,
    type: 'Single Family',
    status: 'Active',
    dom: 30,
    mlsNumber: 'MLS-TX-20242030',
    yearBuilt: 2020,
    garage: 3,
    lot: '0.45 acres',
    description:
      'Stunning Liberty Hill home on almost half an acre. Vaulted ceilings, gourmet kitchen, primary suite with sitting area. 3-car garage and extended patio.',
    img: p(86),
    agent: 'Nadia Petrov',
    agentPhone: '(512) 555-1712',
    broker: 'Coldwell Banker',
    tags: ['Half Acre', 'Gourmet Kitchen', '3-Car Garage'],
  },
  {
    id: 87,
    address: '3800 S 1st St #210',
    city: 'Austin',
    state: 'TX',
    zip: '78704',
    price: 355000,
    beds: 2,
    baths: 2,
    sqft: 1020,
    type: 'Condo',
    status: 'Sold',
    dom: 2,
    mlsNumber: 'MLS-TX-20242031',
    yearBuilt: 2018,
    garage: 1,
    lot: 'N/A',
    description:
      'Sold in 2 days in hot South Austin market. Updated kitchen with quartz, LVP floors, private balcony with pool view. Steps from South Congress Ave.',
    img: p(87),
    agent: 'Samuel Osei',
    agentPhone: '(512) 555-1823',
    broker: 'Metro Homes TX',
    tags: ['Near SoCo', 'Pool View', 'Sold Fast'],
  },
  {
    id: 88,
    address: '4211 Lost Horizon Dr',
    city: 'Austin',
    state: 'TX',
    zip: '78746',
    price: 1095000,
    beds: 4,
    baths: 4,
    sqft: 3800,
    type: 'Single Family',
    status: 'Active',
    dom: 23,
    mlsNumber: 'MLS-TX-20242032',
    yearBuilt: 2016,
    garage: 2,
    lot: '0.4 acres',
    description:
      'Remarkable Westlake home with downtown views. Floating staircase, sub-zero fridge, steam shower, custom built-ins throughout. Eanes ISD.',
    img: p(88),
    agent: 'Aisha Hassan',
    agentPhone: '(512) 555-1934',
    broker: "Sotheby's International",
    tags: ['Downtown Views', 'Custom Built-ins', 'Eanes ISD'],
  },
  {
    id: 89,
    address: '715 Elm Creek Dr',
    city: 'Hutto',
    state: 'TX',
    zip: '78634',
    price: 278000,
    beds: 3,
    baths: 2,
    sqft: 1510,
    type: 'Single Family',
    status: 'Active',
    dom: 38,
    mlsNumber: 'MLS-TX-20242033',
    yearBuilt: 2009,
    garage: 2,
    lot: '0.15 acres',
    description:
      'Affordable Hutto home with no rear neighbors. Fresh interior paint, granite kitchen, large backyard with storage shed.',
    img: p(89),
    agent: 'Sophie Andersen',
    agentPhone: '(512) 555-0712',
    broker: 'Austin Home Pro',
    tags: ['No Rear Neighbors', 'Granite Kitchen', 'Storage Shed'],
  },
  {
    id: 90,
    address: '6100 Meridian Dr',
    city: 'Pflugerville',
    state: 'TX',
    zip: '78660',
    price: 359000,
    beds: 4,
    baths: 2,
    sqft: 1940,
    type: 'Single Family',
    status: 'Active',
    dom: 26,
    mlsNumber: 'MLS-TX-20242034',
    yearBuilt: 2012,
    garage: 2,
    lot: '0.19 acres',
    description:
      'Spacious Pflugerville home with 4 bedrooms and great layout. Updated master bath, large secondary rooms, covered patio.',
    img: p(90),
    agent: 'Kwame Mensah',
    agentPhone: '(512) 555-0823',
    broker: 'RE/MAX Capital City',
    tags: ['4 Bedrooms', 'Updated Bath', 'Large Rooms'],
  },
  {
    id: 91,
    address: '109 Copper Ridge Rd',
    city: 'Georgetown',
    state: 'TX',
    zip: '78626',
    price: 395000,
    beds: 3,
    baths: 2,
    sqft: 2010,
    type: 'Single Family',
    status: 'Active',
    dom: 12,
    mlsNumber: 'MLS-TX-20242035',
    yearBuilt: 2016,
    garage: 2,
    lot: '0.2 acres',
    description:
      'Beautiful Georgetown home in an established community. Shaker cabinetry, quartz counters, ceiling fans throughout, covered back patio.',
    img: p(91),
    agent: 'Yuki Tanaka',
    agentPhone: '(512) 555-0934',
    broker: 'eXp Realty',
    tags: ['Shaker Cabinets', 'Quartz Counters', 'Established Community'],
  },
  {
    id: 92,
    address: '2305 Travis Heights Blvd',
    city: 'Austin',
    state: 'TX',
    zip: '78704',
    price: 985000,
    beds: 4,
    baths: 3,
    sqft: 2900,
    type: 'Single Family',
    status: 'Active',
    dom: 15,
    mlsNumber: 'MLS-TX-20242036',
    yearBuilt: 2015,
    garage: 2,
    lot: '0.18 acres',
    description:
      "Stunning Travis Heights home on one of South Austin's most coveted streets. Designer interiors, chef's kitchen, cocktail pool, and rooftop deck.",
    img: p(92),
    agent: 'Isabella Reyes',
    agentPhone: '(512) 555-1045',
    broker: "Kuper Sotheby's",
    tags: ['Travis Heights', 'Cocktail Pool', 'Rooftop Deck'],
  },
  {
    id: 93,
    address: '3312 Twisted Oak Dr',
    city: 'Dripping Springs',
    state: 'TX',
    zip: '78620',
    price: 649000,
    beds: 4,
    baths: 3,
    sqft: 2870,
    type: 'Single Family',
    status: 'Active',
    dom: 32,
    mlsNumber: 'MLS-TX-20242037',
    yearBuilt: 2019,
    garage: 2,
    lot: '0.7 acres',
    description:
      'Exceptional Dripping Springs home on a large lot with mature live oaks. Open living, gourmet kitchen, spa bath, extended patio with outdoor fireplace.',
    img: p(93),
    agent: 'Mohammed Al-Rashid',
    agentPhone: '(512) 555-1156',
    broker: 'Realty One Group',
    tags: ['Live Oaks', 'Outdoor Fireplace', 'Large Lot'],
  },
  {
    id: 94,
    address: '410 W MLK Blvd #5B',
    city: 'Austin',
    state: 'TX',
    zip: '78705',
    price: 425000,
    beds: 2,
    baths: 2,
    sqft: 1100,
    type: 'Condo',
    status: 'Active',
    dom: 11,
    mlsNumber: 'MLS-TX-20242038',
    yearBuilt: 2019,
    garage: 1,
    lot: 'N/A',
    description:
      'Chic midtown condo walkable to UT, The Drag, and Whole Foods Market. Polished concrete floors, modern kitchen, private balcony.',
    img: p(94),
    agent: 'Fatima Diallo',
    agentPhone: '(512) 555-1267',
    broker: 'Compass Realty',
    tags: ['Near UT', 'Walkable', 'Polished Concrete'],
  },
  {
    id: 95,
    address: '5504 Tortuga Dr',
    city: 'Manor',
    state: 'TX',
    zip: '78653',
    price: 289000,
    beds: 3,
    baths: 2,
    sqft: 1590,
    type: 'Single Family',
    status: 'Active',
    dom: 44,
    mlsNumber: 'MLS-TX-20242039',
    yearBuilt: 2011,
    garage: 2,
    lot: '0.17 acres',
    description:
      'Great value in Manor with easy Tesla/Samsung commute. Open layout, granite kitchen, covered porch, and large fenced yard.',
    img: p(95),
    agent: 'Raj Patel',
    agentPhone: '(512) 555-1378',
    broker: 'Metro Homes TX',
    tags: ['Near Tesla', 'Commuter-Friendly', 'Large Yard'],
  },
  {
    id: 96,
    address: '845 Enclave Pkwy',
    city: 'Austin',
    state: 'TX',
    zip: '78748',
    price: 448000,
    beds: 3,
    baths: 2,
    sqft: 1980,
    type: 'Single Family',
    status: 'Active',
    dom: 19,
    mlsNumber: 'MLS-TX-20242040',
    yearBuilt: 2016,
    garage: 2,
    lot: '0.2 acres',
    description:
      'Lovely South Austin home in gated enclave. Wood floors, quartz kitchen, primary with walk-in closet. Community pocket park and walking trails.',
    img: p(96),
    agent: 'Amara Johnson',
    agentPhone: '(512) 555-1489',
    broker: 'Keller Williams',
    tags: ['Gated', 'Wood Floors', 'Walking Trails'],
  },
  {
    id: 97,
    address: '250 Meadow View Ln',
    city: 'Kyle',
    state: 'TX',
    zip: '78640',
    price: 319000,
    beds: 3,
    baths: 2,
    sqft: 1660,
    type: 'Single Family',
    status: 'Pending',
    dom: 5,
    mlsNumber: 'MLS-TX-20242041',
    yearBuilt: 2014,
    garage: 2,
    lot: '0.16 acres',
    description:
      'Went pending in less than a week. Pristine Kyle home with open kitchen, fresh paint, and fully fenced backyard with covered patio.',
    img: p(97),
    agent: 'Carlos Vega',
    agentPhone: '(512) 555-1590',
    broker: 'Austin Home Pro',
    tags: ['Fenced Backyard', 'Move-In Ready', 'Open Kitchen'],
  },
  {
    id: 98,
    address: '4909 Saratoga Blvd',
    city: 'Buda',
    state: 'TX',
    zip: '78610',
    price: 405000,
    beds: 4,
    baths: 3,
    sqft: 2180,
    type: 'Single Family',
    status: 'Active',
    dom: 22,
    mlsNumber: 'MLS-TX-20242042',
    yearBuilt: 2018,
    garage: 2,
    lot: '0.21 acres',
    description:
      'Clean and updated Buda home with builder upgrades. Bay window in primary, double vanity bath, extended garage. Community splash pad and pool.',
    img: p(98),
    agent: 'Chen Wei',
    agentPhone: '(512) 555-1601',
    broker: 'Coldwell Banker',
    tags: ['Builder Upgrades', 'Splash Pad', 'Double Vanity'],
  },
  {
    id: 99,
    address: '1711 Tillery St #201',
    city: 'Austin',
    state: 'TX',
    zip: '78702',
    price: 455000,
    beds: 2,
    baths: 2,
    sqft: 1150,
    type: 'Condo',
    status: 'Active',
    dom: 8,
    mlsNumber: 'MLS-TX-20242043',
    yearBuilt: 2021,
    garage: 1,
    lot: 'N/A',
    description:
      'Contemporary East Austin condo with covered patio and city skyline views. Waterfall island, herringbone tile, spa bath. Walk to Rainey Street and Lady Bird Lake.',
    img: p(99),
    agent: 'Nadia Petrov',
    agentPhone: '(512) 555-1712',
    broker: 'Urban Living Realty',
    tags: ['Rainey Street', 'Skyline Views', 'Waterfall Island'],
  },
  {
    id: 100,
    address: '13420 Fitzhugh Rd',
    city: 'Bee Cave',
    state: 'TX',
    zip: '78738',
    price: 1190000,
    beds: 5,
    baths: 4,
    sqft: 4100,
    type: 'Single Family',
    status: 'Active',
    dom: 34,
    mlsNumber: 'MLS-TX-20242044',
    yearBuilt: 2019,
    garage: 3,
    lot: '2.5 acres',
    description:
      'Spectacular Bee Cave estate on 2.5 wooded acres. European oak floors, Thermador kitchen, resort pool with cabana, putting green. Eanes ISD.',
    img: p(100),
    agent: 'Samuel Osei',
    agentPhone: '(512) 555-1823',
    broker: "Sotheby's International",
    tags: ['2.5 Acres', 'Putting Green', 'Cabana Pool'],
  },
  {
    id: 101,
    address: '8820 Pearce Ln',
    city: 'Austin',
    state: 'TX',
    zip: '78754',
    price: 342000,
    beds: 3,
    baths: 2,
    sqft: 1680,
    type: 'Single Family',
    status: 'Active',
    dom: 27,
    mlsNumber: 'MLS-TX-20242045',
    yearBuilt: 2013,
    garage: 2,
    lot: '0.18 acres',
    description:
      'Well-priced Northeast Austin home. Granite kitchen, tile backsplash, covered patio. Near Samsung Austin Semiconductor plant.',
    img: p(101),
    agent: 'Aisha Hassan',
    agentPhone: '(512) 555-1934',
    broker: 'RE/MAX Capital City',
    tags: ['Near Samsung', 'Granite Kitchen', 'Value Buy'],
  },
  {
    id: 102,
    address: '3011 Guadalupe St #503',
    city: 'Austin',
    state: 'TX',
    zip: '78705',
    price: 520000,
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: 'Condo',
    status: 'Active',
    dom: 13,
    mlsNumber: 'MLS-TX-20242046',
    yearBuilt: 2022,
    garage: 1,
    lot: 'N/A',
    description:
      'Top-floor West Campus condo with city views. Stainless appliances, quartz island, private terrace. Premium amenity building with pool deck and gym.',
    img: p(102),
    agent: 'Sophie Andersen',
    agentPhone: '(512) 555-0712',
    broker: 'Compass Realty',
    tags: ['Top Floor', 'City Views', 'Amenity Building'],
  },
  {
    id: 103,
    address: '620 Wildwood Dr',
    city: 'Leander',
    state: 'TX',
    zip: '78641',
    price: 428000,
    beds: 4,
    baths: 2,
    sqft: 2220,
    type: 'Single Family',
    status: 'Active',
    dom: 18,
    mlsNumber: 'MLS-TX-20242047',
    yearBuilt: 2017,
    garage: 2,
    lot: '0.22 acres',
    description:
      'Great Leander home backing to a greenbelt. Updated master bath, open kitchen, bonus loft, and pergola-covered patio.',
    img: p(103),
    agent: 'Kwame Mensah',
    agentPhone: '(512) 555-0823',
    broker: 'eXp Realty',
    tags: ['Greenbelt', 'Bonus Loft', 'Pergola'],
  },
  {
    id: 104,
    address: '555 Longview Ranch Rd',
    city: 'Wimberley',
    state: 'TX',
    zip: '78676',
    price: 849000,
    beds: 4,
    baths: 3,
    sqft: 3000,
    type: 'Single Family',
    status: 'Active',
    dom: 48,
    mlsNumber: 'MLS-TX-20242048',
    yearBuilt: 2017,
    garage: 2,
    lot: '1.5 acres',
    description:
      "Exceptional Wimberley property on 1.5 acres. Reclaimed wood beams, chef's kitchen, outdoor kitchen, and a private swimming hole on the creek.",
    img: p(104),
    agent: 'Yuki Tanaka',
    agentPhone: '(512) 555-0934',
    broker: "Kuper Sotheby's",
    tags: ['1.5 Acres', 'Swimming Hole', 'Reclaimed Wood'],
  },
  {
    id: 105,
    address: '2404 E Cesar Chavez St #102',
    city: 'Austin',
    state: 'TX',
    zip: '78702',
    price: 385000,
    beds: 1,
    baths: 1,
    sqft: 820,
    type: 'Condo',
    status: 'Pending',
    dom: 4,
    mlsNumber: 'MLS-TX-20242049',
    yearBuilt: 2020,
    garage: 1,
    lot: 'N/A',
    description:
      'East Austin hot pocket condo steps from Cesar Chavez. Exposed concrete, custom cabinetry, private yard. Immediate access to dining and nightlife.',
    img: p(105),
    agent: 'Isabella Reyes',
    agentPhone: '(512) 555-1045',
    broker: 'Urban Living Realty',
    tags: ['Private Yard', 'East Austin', 'Exposed Concrete'],
  },
  {
    id: 106,
    address: '1503 Ridgehaven Dr',
    city: 'Round Rock',
    state: 'TX',
    zip: '78681',
    price: 449000,
    beds: 4,
    baths: 3,
    sqft: 2300,
    type: 'Single Family',
    status: 'Active',
    dom: 20,
    mlsNumber: 'MLS-TX-20242050',
    yearBuilt: 2018,
    garage: 2,
    lot: '0.22 acres',
    description:
      'Round Rock home with premium lot backing to greenbelt. Quartz counters, shiplap accent wall, three-season porch.',
    img: p(106),
    agent: 'Mohammed Al-Rashid',
    agentPhone: '(512) 555-1156',
    broker: 'Realty One Group',
    tags: ['Greenbelt', 'Shiplap', 'Three-Season Porch'],
  },
  {
    id: 107,
    address: '9101 Brodie Ln #14',
    city: 'Austin',
    state: 'TX',
    zip: '78748',
    price: 278000,
    beds: 2,
    baths: 2,
    sqft: 1000,
    type: 'Townhouse',
    status: 'Active',
    dom: 24,
    mlsNumber: 'MLS-TX-20242051',
    yearBuilt: 2012,
    garage: 1,
    lot: 'N/A',
    description:
      'Affordable South Austin townhome with private fenced patio. Updated kitchen, LVP floors, half bath on main. Low HOA includes exterior maintenance.',
    img: p(107),
    agent: 'Fatima Diallo',
    agentPhone: '(512) 555-1267',
    broker: 'Metro Homes TX',
    tags: ['Affordable', 'Fenced Patio', 'Low HOA'],
  },
  {
    id: 108,
    address: '401 Marble Falls Blvd',
    city: 'Marble Falls',
    state: 'TX',
    zip: '78654',
    price: 498000,
    beds: 3,
    baths: 2,
    sqft: 2060,
    type: 'Single Family',
    status: 'Active',
    dom: 29,
    mlsNumber: 'MLS-TX-20242052',
    yearBuilt: 2017,
    garage: 2,
    lot: '0.32 acres',
    description:
      'Breathtaking Marble Falls home with lake and hill country views. Tile floors throughout, gourmet kitchen, covered porch ideal for entertaining.',
    img: p(108),
    agent: 'Raj Patel',
    agentPhone: '(512) 555-1378',
    broker: 'Coldwell Banker',
    tags: ['Lake Views', 'Gourmet Kitchen', 'Hill Country'],
  },
  {
    id: 109,
    address: '7820 Tecoma Ct',
    city: 'Austin',
    state: 'TX',
    zip: '78757',
    price: 778000,
    beds: 4,
    baths: 3,
    sqft: 2950,
    type: 'Single Family',
    status: 'Active',
    dom: 16,
    mlsNumber: 'MLS-TX-20242053',
    yearBuilt: 2020,
    garage: 2,
    lot: '0.25 acres',
    description:
      "Gorgeous Allandale home in coveted Central Austin. Vaulted ceilings, white oak floors, chef's kitchen with Miele appliances, cocktail pool.",
    img: p(109),
    agent: 'Amara Johnson',
    agentPhone: '(512) 555-1489',
    broker: "Kuper Sotheby's",
    tags: ['Allandale', 'Cocktail Pool', 'Miele Appliances'],
  },
  {
    id: 110,
    address: '2280 Grapevine Ln',
    city: 'New Braunfels',
    state: 'TX',
    zip: '78130',
    price: 375000,
    beds: 3,
    baths: 2,
    sqft: 1820,
    type: 'Single Family',
    status: 'Active',
    dom: 23,
    mlsNumber: 'MLS-TX-20242054',
    yearBuilt: 2017,
    garage: 2,
    lot: '0.2 acres',
    description:
      'Beautiful New Braunfels home in fast-growing community. Granite counters, 9-ft ceilings, covered patio overlooking quiet greenbelt.',
    img: p(110),
    agent: 'Carlos Vega',
    agentPhone: '(512) 555-1590',
    broker: 'Austin Home Pro',
    tags: ['Greenbelt', '9-ft Ceilings', 'Granite Kitchen'],
  },
  {
    id: 111,
    address: '309 S Lamar Blvd #4C',
    city: 'Austin',
    state: 'TX',
    zip: '78704',
    price: 615000,
    beds: 2,
    baths: 2,
    sqft: 1320,
    type: 'Condo',
    status: 'Active',
    dom: 10,
    mlsNumber: 'MLS-TX-20242055',
    yearBuilt: 2021,
    garage: 1,
    lot: 'N/A',
    description:
      'South Lamar condo in a boutique building. Warm wood finishes, quartz island, juliet balcony. Steps from Alamo Drafthouse and SOCO.',
    img: p(111),
    agent: 'Chen Wei',
    agentPhone: '(512) 555-1601',
    broker: 'Compass Realty',
    tags: ['South Lamar', 'Boutique Building', 'Near Alamo Drafthouse'],
  },
  {
    id: 112,
    address: '5620 Sunrise Pass',
    city: 'Georgetown',
    state: 'TX',
    zip: '78628',
    price: 555000,
    beds: 4,
    baths: 3,
    sqft: 2750,
    type: 'Single Family',
    status: 'Sold',
    dom: 4,
    mlsNumber: 'MLS-TX-20242056',
    yearBuilt: 2020,
    garage: 3,
    lot: '0.27 acres',
    description:
      'Sold multiple offers over asking! Premium Georgetown home with 3-car garage. Open concept, gourmet kitchen, spa bath, extended covered patio.',
    img: p(112),
    agent: 'Nadia Petrov',
    agentPhone: '(512) 555-1712',
    broker: 'Keller Williams',
    tags: ['Multiple Offers', '3-Car Garage', 'Gourmet Kitchen'],
  },
  {
    id: 113,
    address: '1145 Emerald Isle Dr',
    city: 'Lago Vista',
    state: 'TX',
    zip: '78645',
    price: 620000,
    beds: 3,
    baths: 2,
    sqft: 2300,
    type: 'Single Family',
    status: 'Active',
    dom: 39,
    mlsNumber: 'MLS-TX-20242057',
    yearBuilt: 2016,
    garage: 2,
    lot: '0.5 acres',
    description:
      'Lake Travis waterfront community home. Private boat ramp access, large wraparound deck, open living with panoramic lake views.',
    img: p(113),
    agent: 'Samuel Osei',
    agentPhone: '(512) 555-1823',
    broker: 'Realty One Group',
    tags: ['Lake Travis', 'Boat Ramp', 'Wraparound Deck'],
  },
  {
    id: 114,
    address: '2600 Alum Rock Ave',
    city: 'Del Valle',
    state: 'TX',
    zip: '78617',
    price: 269000,
    beds: 3,
    baths: 2,
    sqft: 1520,
    type: 'Single Family',
    status: 'Active',
    dom: 41,
    mlsNumber: 'MLS-TX-20242058',
    yearBuilt: 2008,
    garage: 2,
    lot: '0.16 acres',
    description:
      'Affordable Del Valle home near Austin airport and Tesla. Open kitchen, large master bedroom, covered porch, and spacious backyard.',
    img: p(114),
    agent: 'Aisha Hassan',
    agentPhone: '(512) 555-1934',
    broker: 'Metro Homes TX',
    tags: ['Near Airport', 'Near Tesla', 'Value Buy'],
  },
  {
    id: 115,
    address: '4350 Todd Ln #315',
    city: 'Austin',
    state: 'TX',
    zip: '78744',
    price: 248000,
    beds: 1,
    baths: 1,
    sqft: 710,
    type: 'Condo',
    status: 'Active',
    dom: 33,
    mlsNumber: 'MLS-TX-20242059',
    yearBuilt: 2014,
    garage: 1,
    lot: 'N/A',
    description:
      'Budget-friendly SE Austin condo. Updated finishes, in-unit laundry, covered parking. Easy access to I-35 and SH-71.',
    img: p(115),
    agent: 'Sophie Andersen',
    agentPhone: '(512) 555-0712',
    broker: 'Century 21 Gold',
    tags: ['Affordable', 'In-Unit Laundry', 'Easy Access'],
  },
  {
    id: 116,
    address: '7012 Bluff Springs Rd',
    city: 'Austin',
    state: 'TX',
    zip: '78744',
    price: 389000,
    beds: 3,
    baths: 2,
    sqft: 1740,
    type: 'Single Family',
    status: 'Active',
    dom: 21,
    mlsNumber: 'MLS-TX-20242060',
    yearBuilt: 2015,
    garage: 2,
    lot: '0.18 acres',
    description:
      'Well-kept SE Austin home in a quiet subdivision. Granite kitchen, tile floors in common areas, covered patio, and no neighbors behind.',
    img: p(116),
    agent: 'Kwame Mensah',
    agentPhone: '(512) 555-0823',
    broker: 'eXp Realty',
    tags: ['No Rear Neighbors', 'Granite Kitchen', 'Quiet Subdivision'],
  },
  {
    id: 117,
    address: '3460 Steck Ave #212',
    city: 'Austin',
    state: 'TX',
    zip: '78759',
    price: 345000,
    beds: 2,
    baths: 2,
    sqft: 1040,
    type: 'Condo',
    status: 'Active',
    dom: 15,
    mlsNumber: 'MLS-TX-20242061',
    yearBuilt: 2011,
    garage: 1,
    lot: 'N/A',
    description:
      'Convenient Northwest Hills condo near The Domain and Mopac. Updated kitchen, private balcony, resort pool and fitness center.',
    img: p(117),
    agent: 'Yuki Tanaka',
    agentPhone: '(512) 555-0934',
    broker: 'Urban Living Realty',
    tags: ['Near The Domain', 'Updated', 'Resort Pool'],
  },
  {
    id: 118,
    address: '1802 Cripple Creek Dr',
    city: 'Austin',
    state: 'TX',
    zip: '78758',
    price: 498000,
    beds: 3,
    baths: 2,
    sqft: 1980,
    type: 'Single Family',
    status: 'Active',
    dom: 12,
    mlsNumber: 'MLS-TX-20242062',
    yearBuilt: 2014,
    garage: 2,
    lot: '0.2 acres',
    description:
      'Charming North Austin home in sought-after Crestview neighborhood. White oak floors, remodeled kitchen, screened-in porch, lush yard.',
    img: p(118),
    agent: 'Isabella Reyes',
    agentPhone: '(512) 555-1045',
    broker: 'Austin Home Pro',
    tags: ['Crestview', 'White Oak Floors', 'Screened Porch'],
  },
  {
    id: 119,
    address: '280 Serene Hills Dr',
    city: 'Lakeway',
    state: 'TX',
    zip: '78734',
    price: 720000,
    beds: 4,
    baths: 3,
    sqft: 3100,
    type: 'Single Family',
    status: 'Active',
    dom: 27,
    mlsNumber: 'MLS-TX-20242063',
    yearBuilt: 2019,
    garage: 2,
    lot: '0.38 acres',
    description:
      "Sophisticated Lakeway home with Hill Country and Lake Travis views. Grand entry, butler's pantry, resort pool, and 3-zone audio system.",
    img: p(119),
    agent: 'Mohammed Al-Rashid',
    agentPhone: '(512) 555-1156',
    broker: "Kuper Sotheby's",
    tags: ['Hill Country Views', 'Resort Pool', 'Audio System'],
  },
  {
    id: 120,
    address: '5233 Lightning Ranch Rd',
    city: 'Hutto',
    state: 'TX',
    zip: '78634',
    price: 302000,
    beds: 3,
    baths: 2,
    sqft: 1620,
    type: 'Single Family',
    status: 'Active',
    dom: 35,
    mlsNumber: 'MLS-TX-20242064',
    yearBuilt: 2013,
    garage: 2,
    lot: '0.16 acres',
    description:
      'Great Hutto starter home. Kitchen with breakfast bar, primary suite with garden tub, large backyard with extended patio.',
    img: p(120),
    agent: 'Fatima Diallo',
    agentPhone: '(512) 555-1267',
    broker: 'RE/MAX Capital City',
    tags: ['Starter Home', 'Garden Tub', 'Extended Patio'],
  },
  {
    id: 121,
    address: '760 Water Oak Dr',
    city: 'Georgetown',
    state: 'TX',
    zip: '78633',
    price: 539000,
    beds: 4,
    baths: 3,
    sqft: 2700,
    type: 'Single Family',
    status: 'Active',
    dom: 19,
    mlsNumber: 'MLS-TX-20242065',
    yearBuilt: 2020,
    garage: 2,
    lot: '0.24 acres',
    description:
      "Newer Georgetown home in a premier 55+ community. Single story with wide hallways, chef's kitchen, sunroom, and landscaped low-maintenance yard.",
    img: p(121),
    agent: 'Raj Patel',
    agentPhone: '(512) 555-1378',
    broker: 'Coldwell Banker',
    tags: ['55+ Community', 'Sunroom', 'Low Maintenance'],
  },
  {
    id: 122,
    address: '6822 River Place Blvd',
    city: 'Austin',
    state: 'TX',
    zip: '78730',
    price: 865000,
    beds: 4,
    baths: 3,
    sqft: 3300,
    type: 'Single Family',
    status: 'Active',
    dom: 22,
    mlsNumber: 'MLS-TX-20242066',
    yearBuilt: 2017,
    garage: 2,
    lot: '0.35 acres',
    description:
      'Exceptional River Place home bordering a nature preserve. Soaring ceilings, gourmet kitchen, resort pool with waterfall, 3-car tandem garage.',
    img: p(122),
    agent: 'Amara Johnson',
    agentPhone: '(512) 555-1489',
    broker: "Sotheby's International",
    tags: ['Nature Preserve', 'Waterfall Pool', '3-Car Garage'],
  },
  {
    id: 123,
    address: '504 Elk Run Blvd',
    city: 'Liberty Hill',
    state: 'TX',
    zip: '78642',
    price: 395000,
    beds: 3,
    baths: 2,
    sqft: 1920,
    type: 'Single Family',
    status: 'Active',
    dom: 17,
    mlsNumber: 'MLS-TX-20242067',
    yearBuilt: 2021,
    garage: 2,
    lot: '0.19 acres',
    description:
      'Nearly new Liberty Hill home in master-planned community. Open concept, quartz island, smart home tech, community parks and splash pad.',
    img: p(123),
    agent: 'Carlos Vega',
    agentPhone: '(512) 555-1590',
    broker: 'eXp Realty',
    tags: ['Master Planned', 'Smart Home', 'Splash Pad'],
  },
  {
    id: 124,
    address: '2900 E MLK Jr Blvd #203',
    city: 'Austin',
    state: 'TX',
    zip: '78702',
    price: 429000,
    beds: 2,
    baths: 2,
    sqft: 1080,
    type: 'Condo',
    status: 'Pending',
    dom: 3,
    mlsNumber: 'MLS-TX-20242068',
    yearBuilt: 2021,
    garage: 1,
    lot: 'N/A',
    description:
      'Trendy East Austin condo went pending in 3 days. Custom cabinetry, LVP floors, private balcony with neighborhood views. Walk score of 92.',
    img: p(124),
    agent: 'Chen Wei',
    agentPhone: '(512) 555-1601',
    broker: 'Metro Homes TX',
    tags: ['Walkable', 'Trendy East Austin', 'Balcony'],
  },
  {
    id: 125,
    address: '810 Clearfork Dr',
    city: 'Cedar Park',
    state: 'TX',
    zip: '78613',
    price: 462000,
    beds: 4,
    baths: 3,
    sqft: 2350,
    type: 'Single Family',
    status: 'Active',
    dom: 20,
    mlsNumber: 'MLS-TX-20242069',
    yearBuilt: 2018,
    garage: 2,
    lot: '0.22 acres',
    description:
      'Polished Cedar Park home in award-winning RRISD. Open layout, quartz kitchen, primary retreat with sitting area, lush backyard with playset.',
    img: p(125),
    agent: 'Nadia Petrov',
    agentPhone: '(512) 555-1712',
    broker: 'Keller Williams',
    tags: ['RRISD Schools', 'Playset', 'Primary Retreat'],
  },
  {
    id: 126,
    address: '1225 Palomino Ridge',
    city: 'Round Rock',
    state: 'TX',
    zip: '78665',
    price: 395000,
    beds: 3,
    baths: 2,
    sqft: 1990,
    type: 'Single Family',
    status: 'Active',
    dom: 14,
    mlsNumber: 'MLS-TX-20242070',
    yearBuilt: 2016,
    garage: 2,
    lot: '0.19 acres',
    description:
      'Immaculate Round Rock home with no rear neighbors. Large secondary bedrooms, granite kitchen, walk-in pantry, and game room.',
    img: p(126),
    agent: 'Samuel Osei',
    agentPhone: '(512) 555-1823',
    broker: 'Austin Home Pro',
    tags: ['No Rear Neighbors', 'Game Room', 'Walk-in Pantry'],
  },
  {
    id: 127,
    address: '3201 Bee Cave Rd #402',
    city: 'Austin',
    state: 'TX',
    zip: '78746',
    price: 749000,
    beds: 3,
    baths: 3,
    sqft: 1900,
    type: 'Condo',
    status: 'Active',
    dom: 16,
    mlsNumber: 'MLS-TX-20242071',
    yearBuilt: 2022,
    garage: 2,
    lot: 'N/A',
    description:
      'Ultra-luxury Rollingwood condo with panoramic Hill Country views. Sub-Zero fridge, Wolf range, spa bath, rooftop terrace with outdoor kitchen.',
    img: p(127),
    agent: 'Aisha Hassan',
    agentPhone: '(512) 555-1934',
    broker: "Kuper Sotheby's",
    tags: ['Ultra Luxury', 'Wolf Range', 'Rooftop Terrace'],
  },
  {
    id: 128,
    address: '900 Stonecroft Ln',
    city: 'Buda',
    state: 'TX',
    zip: '78610',
    price: 388000,
    beds: 3,
    baths: 2,
    sqft: 1900,
    type: 'Single Family',
    status: 'Active',
    dom: 24,
    mlsNumber: 'MLS-TX-20242072',
    yearBuilt: 2017,
    garage: 2,
    lot: '0.2 acres',
    description:
      'Beautiful Buda home on a corner lot. Bay window in breakfast area, large kitchen island, guest bath with custom tile, pergola in backyard.',
    img: p(128),
    agent: 'Sophie Andersen',
    agentPhone: '(512) 555-0712',
    broker: 'Realty One Group',
    tags: ['Corner Lot', 'Kitchen Island', 'Pergola'],
  },
  {
    id: 129,
    address: '4605 Avenue B',
    city: 'Austin',
    state: 'TX',
    zip: '78751',
    price: 895000,
    beds: 3,
    baths: 2,
    sqft: 1900,
    type: 'Single Family',
    status: 'Active',
    dom: 9,
    mlsNumber: 'MLS-TX-20242073',
    yearBuilt: 2023,
    garage: 1,
    lot: '0.11 acres',
    description:
      'Brand-new Hyde Park bungalow with modern craftsmanship. Shiplap ceilings, marble counters, private garden courtyard, and detached studio.',
    img: p(129),
    agent: 'Kwame Mensah',
    agentPhone: '(512) 555-0823',
    broker: 'Compass Realty',
    tags: ['New Build', 'Garden Courtyard', 'Detached Studio'],
  },
  {
    id: 130,
    address: '2010 Pine Forest Dr',
    city: 'Pflugerville',
    state: 'TX',
    zip: '78660',
    price: 349000,
    beds: 3,
    baths: 2,
    sqft: 1770,
    type: 'Single Family',
    status: 'Active',
    dom: 30,
    mlsNumber: 'MLS-TX-20242074',
    yearBuilt: 2014,
    garage: 2,
    lot: '0.18 acres',
    description:
      'Comfortable Pflugerville home with spacious layout. Tile floors, granite kitchen, tankless water heater, and fenced yard with mature trees.',
    img: p(130),
    agent: 'Yuki Tanaka',
    agentPhone: '(512) 555-0934',
    broker: 'Coldwell Banker',
    tags: ['Tankless Water Heater', 'Mature Trees', 'Fenced Yard'],
  },
  {
    id: 131,
    address: '610 N Heights Blvd',
    city: 'Lockhart',
    state: 'TX',
    zip: '78644',
    price: 259000,
    beds: 3,
    baths: 2,
    sqft: 1480,
    type: 'Single Family',
    status: 'Active',
    dom: 60,
    mlsNumber: 'MLS-TX-20242075',
    yearBuilt: 2006,
    garage: 2,
    lot: '0.24 acres',
    description:
      'Affordable Lockhart home with large lot. Fresh paint throughout, covered front porch, new HVAC 2023. Close to downtown dining.',
    img: p(131),
    agent: 'Isabella Reyes',
    agentPhone: '(512) 555-1045',
    broker: 'Metro Homes TX',
    tags: ['New HVAC', 'Large Lot', 'Near Downtown'],
  },
  {
    id: 132,
    address: '750 Rimrock Trail',
    city: 'Driftwood',
    state: 'TX',
    zip: '78619',
    price: 1595000,
    beds: 5,
    baths: 5,
    sqft: 5000,
    type: 'Single Family',
    status: 'Active',
    dom: 42,
    mlsNumber: 'MLS-TX-20242076',
    yearBuilt: 2021,
    garage: 4,
    lot: '4.8 acres',
    description:
      'Private Driftwood masterpiece on nearly 5 acres. Grand living spaces, Venetian plaster, cigar room, tennis court, resort pool, and caretaker suite.',
    img: p(132),
    agent: 'Mohammed Al-Rashid',
    agentPhone: '(512) 555-1156',
    broker: "Sotheby's International",
    tags: ['4.8 Acres', 'Tennis Court', 'Cigar Room'],
  },
  {
    id: 133,
    address: '1011 Water St #601',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    price: 1200000,
    beds: 3,
    baths: 3,
    sqft: 2100,
    type: 'Condo',
    status: 'Active',
    dom: 20,
    mlsNumber: 'MLS-TX-20242077',
    yearBuilt: 2020,
    garage: 2,
    lot: 'N/A',
    description:
      'Penthouse-level condo overlooking Lady Bird Lake. Wraparound terrace, European kitchen, spa bath, private elevator access. Steps from Rainey Street.',
    img: p(133),
    agent: 'Fatima Diallo',
    agentPhone: '(512) 555-1267',
    broker: "Kuper Sotheby's",
    tags: ['Lady Bird Lake', 'Wraparound Terrace', 'Penthouse'],
  },
  {
    id: 134,
    address: '4108 Prairie Flower Dr',
    city: 'Austin',
    state: 'TX',
    zip: '78735',
    price: 635000,
    beds: 4,
    baths: 3,
    sqft: 2880,
    type: 'Single Family',
    status: 'Active',
    dom: 17,
    mlsNumber: 'MLS-TX-20242078',
    yearBuilt: 2016,
    garage: 2,
    lot: '0.28 acres',
    description:
      'Pristine Barton Creek-area home with greenbelt views. Quartz kitchen, hardwood floors, spa bath with freestanding tub, and extended patio.',
    img: p(134),
    agent: 'Raj Patel',
    agentPhone: '(512) 555-1378',
    broker: 'Realty One Group',
    tags: ['Greenbelt Views', 'Freestanding Tub', 'Hardwood Floors'],
  },
  {
    id: 135,
    address: '350 High Lonesome Rd',
    city: 'Wimberley',
    state: 'TX',
    zip: '78676',
    price: 525000,
    beds: 3,
    baths: 2,
    sqft: 1980,
    type: 'Single Family',
    status: 'Active',
    dom: 50,
    mlsNumber: 'MLS-TX-20242079',
    yearBuilt: 2012,
    garage: 2,
    lot: '0.9 acres',
    description:
      "Enchanting Wimberley retreat near Blanco River. Live oaks, covered porch, stone accents, and a private firepit area. Artist's studio included.",
    img: p(135),
    agent: 'Amara Johnson',
    agentPhone: '(512) 555-1489',
    broker: 'Austin Home Pro',
    tags: ['Blanco River', 'Artist Studio', 'Firepit'],
  },
  {
    id: 136,
    address: '6660 McNeil Dr #3A',
    city: 'Austin',
    state: 'TX',
    zip: '78729',
    price: 285000,
    beds: 2,
    baths: 2,
    sqft: 1000,
    type: 'Condo',
    status: 'Active',
    dom: 28,
    mlsNumber: 'MLS-TX-20242080',
    yearBuilt: 2010,
    garage: 1,
    lot: 'N/A',
    description:
      'NW Austin condo near Apple campus. Updated kitchen, covered parking, resort-style pool and gym. Easy access to 183 and Parmer Lane.',
    img: p(136),
    agent: 'Carlos Vega',
    agentPhone: '(512) 555-1590',
    broker: 'eXp Realty',
    tags: ['Near Apple Campus', 'Resort Pool', 'Updated Kitchen'],
  },
  {
    id: 137,
    address: '9811 Covered Bridge Dr',
    city: 'Austin',
    state: 'TX',
    zip: '78736',
    price: 588000,
    beds: 4,
    baths: 3,
    sqft: 2760,
    type: 'Single Family',
    status: 'Pending',
    dom: 5,
    mlsNumber: 'MLS-TX-20242081',
    yearBuilt: 2018,
    garage: 2,
    lot: '0.26 acres',
    description:
      "Exceptional Oak Hill home went pending quickly. Vaulted ceilings, chef's kitchen, media room, and sparkling pool in a private backyard.",
    img: p(137),
    agent: 'Chen Wei',
    agentPhone: '(512) 555-1601',
    broker: 'Keller Williams',
    tags: ['Oak Hill', 'Media Room', 'Pool'],
  },
  {
    id: 138,
    address: '1701 E 2nd St #102',
    city: 'Austin',
    state: 'TX',
    zip: '78702',
    price: 465000,
    beds: 2,
    baths: 2,
    sqft: 1140,
    type: 'Condo',
    status: 'Active',
    dom: 11,
    mlsNumber: 'MLS-TX-20242082',
    yearBuilt: 2021,
    garage: 1,
    lot: 'N/A',
    description:
      'East Austin condo in a boutique 12-unit building. Concrete counters, custom tile, private fenced yard with fire pit. Walking distance to bars and restaurants.',
    img: p(138),
    agent: 'Nadia Petrov',
    agentPhone: '(512) 555-1712',
    broker: 'Compass Realty',
    tags: ['Boutique Building', 'Private Yard', 'Fire Pit'],
  },
  {
    id: 139,
    address: '430 Bluffstone Cove',
    city: 'Lakeway',
    state: 'TX',
    zip: '78734',
    price: 980000,
    beds: 5,
    baths: 4,
    sqft: 4000,
    type: 'Single Family',
    status: 'Active',
    dom: 29,
    mlsNumber: 'MLS-TX-20242083',
    yearBuilt: 2019,
    garage: 3,
    lot: '0.55 acres',
    description:
      'Stunning Lakeway home on a bluff with Hill Country views. Gourmet kitchen, game room, movie room, negative-edge pool. Guest suite on main floor.',
    img: p(139),
    agent: 'Samuel Osei',
    agentPhone: '(512) 555-1823',
    broker: "Kuper Sotheby's",
    tags: ['Bluff Views', 'Movie Room', 'Negative-Edge Pool'],
  },
  {
    id: 140,
    address: '2203 Yellowstone Ave',
    city: 'Pflugerville',
    state: 'TX',
    zip: '78660',
    price: 329000,
    beds: 3,
    baths: 2,
    sqft: 1640,
    type: 'Single Family',
    status: 'Active',
    dom: 23,
    mlsNumber: 'MLS-TX-20242084',
    yearBuilt: 2013,
    garage: 2,
    lot: '0.17 acres',
    description:
      'Neat and tidy Pflugerville home. Updated kitchen with subway tile, primary with ensuite, covered patio with ceiling fan.',
    img: p(140),
    agent: 'Aisha Hassan',
    agentPhone: '(512) 555-1934',
    broker: 'RE/MAX Capital City',
    tags: ['Subway Tile', 'Updated Kitchen', 'Move-In Ready'],
  },
  {
    id: 141,
    address: '3330 Briarwood Dr',
    city: 'Bastrop',
    state: 'TX',
    zip: '78602',
    price: 318000,
    beds: 3,
    baths: 2,
    sqft: 1670,
    type: 'Single Family',
    status: 'Active',
    dom: 45,
    mlsNumber: 'MLS-TX-20242085',
    yearBuilt: 2009,
    garage: 2,
    lot: '0.3 acres',
    description:
      'Peaceful Bastrop home surrounded by pine trees. Tile floors, large kitchen, fireplace, covered front and back porches. Easy commute to Austin.',
    img: p(141),
    agent: 'Sophie Andersen',
    agentPhone: '(512) 555-0712',
    broker: 'Austin Home Pro',
    tags: ['Pine Trees', 'Fireplace', 'Large Lot'],
  },
  {
    id: 142,
    address: '4921 Duval Rd #201',
    city: 'Austin',
    state: 'TX',
    zip: '78752',
    price: 335000,
    beds: 2,
    baths: 2,
    sqft: 1050,
    type: 'Condo',
    status: 'Active',
    dom: 20,
    mlsNumber: 'MLS-TX-20242086',
    yearBuilt: 2019,
    garage: 1,
    lot: 'N/A',
    description:
      'Bright North Austin condo near North Loop shops. Quartz counters, LVP throughout, covered parking. Community pool and rooftop lounge.',
    img: p(142),
    agent: 'Kwame Mensah',
    agentPhone: '(512) 555-0823',
    broker: 'Metro Homes TX',
    tags: ['Near North Loop', 'Rooftop Lounge', 'Community Pool'],
  },
  {
    id: 143,
    address: '8005 Springwoods Dr',
    city: 'Austin',
    state: 'TX',
    zip: '78759',
    price: 729000,
    beds: 4,
    baths: 3,
    sqft: 3100,
    type: 'Single Family',
    status: 'Active',
    dom: 14,
    mlsNumber: 'MLS-TX-20242087',
    yearBuilt: 2015,
    garage: 2,
    lot: '0.3 acres',
    description:
      'Stunning Great Hills home with premium finishes throughout. Barrel vault entry, marble kitchen, spa bath, game room. Pool-ready backyard.',
    img: p(143),
    agent: 'Yuki Tanaka',
    agentPhone: '(512) 555-0934',
    broker: 'Realty One Group',
    tags: ['Great Hills', 'Barrel Vault', 'Pool-Ready'],
  },
  {
    id: 144,
    address: '750 Verbena Field Dr',
    city: 'Liberty Hill',
    state: 'TX',
    zip: '78642',
    price: 469000,
    beds: 4,
    baths: 3,
    sqft: 2400,
    type: 'Single Family',
    status: 'Active',
    dom: 18,
    mlsNumber: 'MLS-TX-20242088',
    yearBuilt: 2021,
    garage: 2,
    lot: '0.21 acres',
    description:
      'Exceptional Liberty Hill new build with premium upgrades. Farmhouse-style interior, oversized island, primary suite with retreat. Community amenity center.',
    img: p(144),
    agent: 'Isabella Reyes',
    agentPhone: '(512) 555-1045',
    broker: 'eXp Realty',
    tags: ['New Build', 'Farmhouse Style', 'Amenity Center'],
  },
  {
    id: 145,
    address: '1020 Colorado St #1800',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    price: 2200000,
    beds: 3,
    baths: 3,
    sqft: 2800,
    type: 'Condo',
    status: 'Active',
    dom: 30,
    mlsNumber: 'MLS-TX-20242089',
    yearBuilt: 2020,
    garage: 2,
    lot: 'N/A',
    description:
      'Iconic downtown Austin high-rise penthouse with 360-degree city views. Bulthaup kitchen, Italian marble baths, 1,200 sqft wraparound terrace.',
    img: p(145),
    agent: 'Mohammed Al-Rashid',
    agentPhone: '(512) 555-1156',
    broker: "Sotheby's International",
    tags: ['Penthouse', '360 Views', 'Wraparound Terrace'],
  },
  {
    id: 146,
    address: '215 Clearwater Cove',
    city: 'Horseshoe Bay',
    state: 'TX',
    zip: '78657',
    price: 1350000,
    beds: 5,
    baths: 4,
    sqft: 4200,
    type: 'Single Family',
    status: 'Active',
    dom: 55,
    mlsNumber: 'MLS-TX-20242090',
    yearBuilt: 2018,
    garage: 3,
    lot: '0.7 acres',
    description:
      'Lake LBJ lakefront estate in Horseshoe Bay. Private boat dock, pool and hot tub, outdoor kitchen, and stunning water views from every room.',
    img: p(146),
    agent: 'Fatima Diallo',
    agentPhone: '(512) 555-1267',
    broker: "Kuper Sotheby's",
    tags: ['Lakefront', 'Private Dock', 'Lake LBJ'],
  },
  {
    id: 147,
    address: '6522 Westover Dr',
    city: 'Austin',
    state: 'TX',
    zip: '78723',
    price: 559000,
    beds: 4,
    baths: 2,
    sqft: 2150,
    type: 'Single Family',
    status: 'Active',
    dom: 16,
    mlsNumber: 'MLS-TX-20242091',
    yearBuilt: 2018,
    garage: 2,
    lot: '0.22 acres',
    description:
      "Mueller-area home rebuilt in 2018. Craftsman exterior, chef's kitchen, original hardwood floors, sunroom addition. Walk to farmer's market.",
    img: p(147),
    agent: 'Raj Patel',
    agentPhone: '(512) 555-1378',
    broker: 'Coldwell Banker',
    tags: ['Mueller Area', 'Craftsman', 'Sunroom'],
  },
  {
    id: 148,
    address: '3760 Manchaca Rd #112',
    city: 'Austin',
    state: 'TX',
    zip: '78704',
    price: 318000,
    beds: 1,
    baths: 1,
    sqft: 760,
    type: 'Condo',
    status: 'Sold',
    dom: 3,
    mlsNumber: 'MLS-TX-20242092',
    yearBuilt: 2017,
    garage: 1,
    lot: 'N/A',
    description:
      'Sold in 3 days! Popular South Austin condo community. Ground-floor unit with private patio, quartz kitchen, and steps from South Lamar restaurants.',
    img: p(148),
    agent: 'Amara Johnson',
    agentPhone: '(512) 555-1489',
    broker: 'Austin Home Pro',
    tags: ['Private Patio', 'Sold Fast', 'Near South Lamar'],
  },
  {
    id: 149,
    address: '502 Saddleback Pass',
    city: 'Georgetown',
    state: 'TX',
    zip: '78628',
    price: 615000,
    beds: 4,
    baths: 4,
    sqft: 2950,
    type: 'Single Family',
    status: 'Active',
    dom: 21,
    mlsNumber: 'MLS-TX-20242093',
    yearBuilt: 2020,
    garage: 3,
    lot: '0.28 acres',
    description:
      'Premium Georgetown home in Sun City-adjacent community. Open plan, gourmet kitchen, flex room, spa bath, 3-car garage, and covered outdoor living.',
    img: p(149),
    agent: 'Carlos Vega',
    agentPhone: '(512) 555-1590',
    broker: 'Realty One Group',
    tags: ['Flex Room', '3-Car Garage', 'Gourmet Kitchen'],
  },
  {
    id: 150,
    address: '1415 W 6th St #204',
    city: 'Austin',
    state: 'TX',
    zip: '78703',
    price: 745000,
    beds: 2,
    baths: 2,
    sqft: 1350,
    type: 'Condo',
    status: 'Active',
    dom: 13,
    mlsNumber: 'MLS-TX-20242094',
    yearBuilt: 2019,
    garage: 1,
    lot: 'N/A',
    description:
      'Old West Austin condo in a boutique building. Walnut cabinetry, stone counters, private wraparound terrace. Walk to restaurants on West 6th.',
    img: p(150),
    agent: 'Chen Wei',
    agentPhone: '(512) 555-1601',
    broker: 'Compass Realty',
    tags: ['West 6th', 'Boutique Building', 'Wraparound Terrace'],
  },
  {
    id: 151,
    address: '9822 Menchaca Rd',
    city: 'Austin',
    state: 'TX',
    zip: '78748',
    price: 435000,
    beds: 3,
    baths: 2,
    sqft: 1940,
    type: 'Single Family',
    status: 'Active',
    dom: 25,
    mlsNumber: 'MLS-TX-20242095',
    yearBuilt: 2016,
    garage: 2,
    lot: '0.2 acres',
    description:
      'South Austin gem on a private lot. Updated interior, stained concrete floors, vaulted living room. Large deck and pergola in backyard.',
    img: p(151),
    agent: 'Nadia Petrov',
    agentPhone: '(512) 555-1712',
    broker: 'eXp Realty',
    tags: ['Stained Concrete', 'Vaulted Ceiling', 'Pergola'],
  },
  {
    id: 152,
    address: '4104 Briarhill Dr',
    city: 'Round Rock',
    state: 'TX',
    zip: '78681',
    price: 420000,
    beds: 3,
    baths: 2,
    sqft: 2050,
    type: 'Single Family',
    status: 'Active',
    dom: 17,
    mlsNumber: 'MLS-TX-20242096',
    yearBuilt: 2015,
    garage: 2,
    lot: '0.2 acres',
    description:
      'Pristine Round Rock home in cul-de-sac. Open kitchen with granite, large primary with bay window, covered patio, and fully fenced yard.',
    img: p(152),
    agent: 'Samuel Osei',
    agentPhone: '(512) 555-1823',
    broker: 'Keller Williams',
    tags: ['Cul-de-sac', 'Bay Window', 'Granite Kitchen'],
  },
  {
    id: 153,
    address: '12112 Meridian Park Blvd',
    city: 'Bee Cave',
    state: 'TX',
    zip: '78738',
    price: 578000,
    beds: 3,
    baths: 2,
    sqft: 2200,
    type: 'Single Family',
    status: 'Active',
    dom: 22,
    mlsNumber: 'MLS-TX-20242097',
    yearBuilt: 2019,
    garage: 2,
    lot: '0.2 acres',
    description:
      'Stylish Bee Cave home in Falconhead golf community. Open concept, quartz island, primary with dual vanities. Community golf, pool, and trails.',
    img: p(153),
    agent: 'Aisha Hassan',
    agentPhone: '(512) 555-1934',
    broker: 'RE/MAX Capital City',
    tags: ['Golf Community', 'Dual Vanities', 'Community Trails'],
  },
  {
    id: 154,
    address: '1905 Burrell Dr',
    city: 'Austin',
    state: 'TX',
    zip: '78704',
    price: 849000,
    beds: 3,
    baths: 2,
    sqft: 1760,
    type: 'Single Family',
    status: 'Active',
    dom: 10,
    mlsNumber: 'MLS-TX-20242098',
    yearBuilt: 2021,
    garage: 1,
    lot: '0.12 acres',
    description:
      'Coveted Bouldin Creek new build. Raked ceilings, polished marble kitchen, Japanese soaking tub, private plunge pool. Walk to SOCO.',
    img: p(154),
    agent: 'Sophie Andersen',
    agentPhone: '(512) 555-0712',
    broker: "Kuper Sotheby's",
    tags: ['Bouldin Creek', 'Plunge Pool', 'Japanese Soaking Tub'],
  },
  {
    id: 155,
    address: '7700 Doyle Springs Rd',
    city: 'Austin',
    state: 'TX',
    zip: '78744',
    price: 298000,
    beds: 3,
    baths: 2,
    sqft: 1550,
    type: 'Single Family',
    status: 'Active',
    dom: 36,
    mlsNumber: 'MLS-TX-20242099',
    yearBuilt: 2007,
    garage: 2,
    lot: '0.17 acres',
    description:
      'Value-priced SE Austin home. Clean and move-in ready, new carpet, fresh interior paint, covered patio. Easy access to 183 South and ABIA.',
    img: p(155),
    agent: 'Kwame Mensah',
    agentPhone: '(512) 555-0823',
    broker: 'Austin Home Pro',
    tags: ['Value Buy', 'Move-In Ready', 'Near Airport'],
  },
  {
    id: 156,
    address: '505 Havenwood Ln',
    city: 'Kyle',
    state: 'TX',
    zip: '78640',
    price: 376000,
    beds: 4,
    baths: 2,
    sqft: 1980,
    type: 'Single Family',
    status: 'Pending',
    dom: 6,
    mlsNumber: 'MLS-TX-20242100',
    yearBuilt: 2017,
    garage: 2,
    lot: '0.18 acres',
    description:
      '4-bedroom Kyle home went pending with multiple offers. Gorgeous kitchen with white cabinets and quartz, large game room, covered patio.',
    img: p(156),
    agent: 'Yuki Tanaka',
    agentPhone: '(512) 555-0934',
    broker: 'Coldwell Banker',
    tags: ['Multiple Offers', 'Game Room', 'White Cabinets'],
  },
];

const cityCoords = {
  Austin: { lat: 30.2672, lng: -97.7431 },
  'Round Rock': { lat: 30.5082, lng: -97.6789 },
  'Cedar Park': { lat: 30.5052, lng: -97.8203 },
  Georgetown: { lat: 30.6333, lng: -97.6781 },
  Kyle: { lat: 30.0394, lng: -97.8772 },
  Buda: { lat: 30.0852, lng: -97.8392 },
  Pflugerville: { lat: 30.4394, lng: -97.62 },
  Leander: { lat: 30.5788, lng: -97.8531 },
  'Dripping Springs': { lat: 30.1902, lng: -98.0864 },
  Wimberley: { lat: 29.9966, lng: -98.0972 },
  Driftwood: { lat: 30.1257, lng: -97.9922 },
  'Lago Vista': { lat: 30.4488, lng: -97.9817 },
  Hutto: { lat: 30.5427, lng: -97.5461 },
  Bastrop: { lat: 30.1105, lng: -97.3152 },
  'Marble Falls': { lat: 30.5782, lng: -98.2728 },
  Spicewood: { lat: 30.471, lng: -98.1481 },
  'Liberty Hill': { lat: 30.6638, lng: -97.9228 },
  'New Braunfels': { lat: 29.703, lng: -98.1245 },
  Lockhart: { lat: 29.8849, lng: -97.67 },
  Luling: { lat: 29.6827, lng: -97.6478 },
  'San Marcos': { lat: 29.8827, lng: -97.9414 },
  'Horseshoe Bay': { lat: 30.5424, lng: -98.3614 },
  'Bee Cave': { lat: 30.3077, lng: -97.9561 },
  Lakeway: { lat: 30.3577, lng: -97.9739 },
  Manor: { lat: 30.341, lng: -97.5564 },
  'Del Valle': { lat: 30.1929, lng: -97.6478 },
};

function getCoords(listing) {
  const base = cityCoords[listing.city] || { lat: 30.2672, lng: -97.7431 };
  const jitterLat = ((listing.id * 17) % 100) / 2500 - 0.02;
  const jitterLng = ((listing.id * 13) % 100) / 2500 - 0.02;
  return { lat: base.lat + jitterLat, lng: base.lng + jitterLng };
}

const statusColors = {
  Active: 'bg-green-100 text-green-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Sold: 'bg-red-100 text-red-800',
};

function formatPrice(p) {
  return '$' + p.toLocaleString();
}

function Badge({ status }) {
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
        statusColors[status] || 'bg-gray-100 text-gray-700'
      }`}
    >
      {status}
    </span>
  );
}

function ListingCard({ listing, onClick, saved, onSave }) {
  return (
    <div
      className="bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer border border-gray-100 overflow-hidden flex flex-col"
      onClick={() => onClick(listing)}
    >
      <div className="relative">
        <img
          src={listing.img}
          alt={listing.address}
          className="w-full h-44 object-cover"
        />
        <div className="absolute top-2 left-2">
          <Badge status={listing.status} />
        </div>
        <button
          className={`absolute top-2 right-2 p-1.5 rounded-full shadow ${
            saved
              ? 'bg-red-500 text-white'
              : 'bg-white text-gray-400 hover:text-red-500'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onSave(listing.id);
          }}
        >
          <svg
            className="w-4 h-4"
            fill={saved ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded">
          {listing.type}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <div className="text-lg font-bold text-blue-700">
          {formatPrice(listing.price)}
        </div>
        <div className="font-medium text-gray-800 text-sm">
          {listing.address}
        </div>
        <div className="text-xs text-gray-500">
          {listing.city}, {listing.state} {listing.zip}
        </div>
        <div className="flex gap-3 text-xs text-gray-600 mt-1">
          <span>🛏 {listing.beds} bd</span>
          <span>🚿 {listing.baths} ba</span>
          <span>📐 {listing.sqft.toLocaleString()} sqft</span>
        </div>
        <div className="flex gap-1 flex-wrap mt-2">
          {listing.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-2 text-xs text-gray-400 border-t border-gray-50 flex justify-between items-center">
          <span>{listing.mlsNumber}</span>
          <span>{listing.dom} days on market</span>
        </div>
      </div>
    </div>
  );
}

function DetailModal({ listing, onClose, saved, onSave }) {
  if (!listing) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={listing.img}
            alt={listing.address}
            className="w-full h-56 object-cover rounded-t-2xl"
          />
          <button
            className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge status={listing.status} />
            <span className="bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded">
              {listing.type}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-1">
            <div>
              <div className="text-2xl font-bold text-blue-700">
                {formatPrice(listing.price)}
              </div>
              <div className="text-base font-semibold text-gray-800">
                {listing.address}
              </div>
              <div className="text-sm text-gray-500">
                {listing.city}, {listing.state} {listing.zip}
              </div>
            </div>
            <button
              className={`p-2 rounded-full border-2 ${
                saved
                  ? 'border-red-400 bg-red-50 text-red-500'
                  : 'border-gray-200 text-gray-400 hover:border-red-300'
              }`}
              onClick={() => onSave(listing.id)}
            >
              <svg
                className="w-5 h-5"
                fill={saved ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3 my-4 bg-gray-50 rounded-xl p-3 text-center text-sm">
            <div>
              <div className="font-bold text-gray-800">{listing.beds}</div>
              <div className="text-gray-500 text-xs">Beds</div>
            </div>
            <div>
              <div className="font-bold text-gray-800">{listing.baths}</div>
              <div className="text-gray-500 text-xs">Baths</div>
            </div>
            <div>
              <div className="font-bold text-gray-800">
                {listing.sqft.toLocaleString()}
              </div>
              <div className="text-gray-500 text-xs">Sq Ft</div>
            </div>
            <div>
              <div className="font-bold text-gray-800">{listing.garage}</div>
              <div className="text-gray-500 text-xs">Garage</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <div className="bg-gray-50 rounded-lg p-2">
              <span className="text-gray-500">Year Built:</span>{' '}
              <span className="font-medium">{listing.yearBuilt}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <span className="text-gray-500">Lot Size:</span>{' '}
              <span className="font-medium">{listing.lot}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <span className="text-gray-500">Days on Market:</span>{' '}
              <span className="font-medium">{listing.dom}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <span className="text-gray-500">MLS #:</span>{' '}
              <span className="font-medium text-xs">{listing.mlsNumber}</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="font-semibold text-gray-700 mb-1">Description</div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {listing.description}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap mb-4">
            {listing.tags.map((t) => (
              <span
                key={t}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full border border-blue-100"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="border-t pt-4 flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm text-gray-800">
                {listing.agent}
              </div>
              <div className="text-xs text-gray-500">{listing.broker}</div>
              <div className="text-xs text-blue-600">{listing.agentPhone}</div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition">
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapView({ listings, onSelect }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    if (!window.L) {
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href =
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
        document.head.appendChild(link);
      }
      const script = document.createElement('script');
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
      script.onload = () => setLeafletLoaded(true);
      document.head.appendChild(script);
    } else {
      setLeafletLoaded(true);
    }
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!leafletLoaded || !mapRef.current) return;
    const L = window.L;
    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView([30.2672, -97.7431], 9);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);
      mapInstanceRef.current = map;
    }
    const map = mapInstanceRef.current;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    listings.forEach((l) => {
      const coords = getCoords(l);
      const color =
        l.status === 'Active'
          ? '#16a34a'
          : l.status === 'Pending'
          ? '#d97706'
          : '#dc2626';
      const marker = L.circleMarker([coords.lat, coords.lng], {
        radius: 9,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85,
      }).addTo(map);
      marker.bindPopup(`
        <div style="min-width:190px;font-family:sans-serif">
          <div style="font-weight:700;color:#1d4ed8;font-size:14px">$${l.price.toLocaleString()}</div>
          <div style="font-size:12px;font-weight:600;margin:2px 0">${
            l.address
          }</div>
          <div style="font-size:11px;color:#6b7280">${l.city}, ${l.state} ${
        l.zip
      }</div>
          <div style="font-size:11px;margin:4px 0">🛏 ${l.beds}bd &nbsp;🚿 ${
        l.baths
      }ba &nbsp;📐 ${l.sqft.toLocaleString()} sqft</div>
          <div style="margin-top:6px"><span style="background:${color};color:white;padding:2px 7px;border-radius:999px;font-size:10px;font-weight:600">${
        l.status
      }</span> <span style="color:#6b7280;font-size:11px">${l.type}</span></div>
          <div style="font-size:10px;color:#9ca3af;margin-top:4px">${
            l.mlsNumber
          }</div>
        </div>
      `);
      marker.on('click', () => onSelect(l));
      markersRef.current.push(marker);
    });
    setTimeout(() => map.invalidateSize(), 100);
  }, [leafletLoaded, listings]);

  return (
    <div
      className="bg-white rounded-2xl shadow overflow-hidden"
      style={{ height: '600px' }}
    >
      {!leafletLoaded && (
        <div className="flex items-center justify-center h-full text-gray-400">
          <div className="text-center">
            <svg
              className="w-8 h-8 mx-auto mb-2 animate-spin text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <p className="text-sm">Loading map...</p>
          </div>
        </div>
      )}
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
          display: leafletLoaded ? 'block' : 'none',
        }}
      />
    </div>
  );
}

export default function MLSTool() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [selected, setSelected] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [tab, setTab] = useState('listings');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const PER_PAGE = 24;

  const toggleSave = (id) =>
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  let filtered = listings.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      l.address.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q) ||
      l.zip.includes(q);
    const matchStatus = statusFilter === 'All' || l.status === statusFilter;
    const matchType = typeFilter === 'All' || l.type === typeFilter;
    const matchMin = !minPrice || l.price >= parseInt(minPrice);
    const matchMax = !maxPrice || l.price <= parseInt(maxPrice);
    return matchSearch && matchStatus && matchType && matchMin && matchMax;
  });

  if (sortBy === 'price_asc')
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === 'price_desc')
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === 'sqft')
    filtered = [...filtered].sort((a, b) => b.sqft - a.sqft);
  else if (sortBy === 'newest')
    filtered = [...filtered].sort((a, b) => a.dom - b.dom);

  const allDisplayed =
    tab === 'saved'
      ? filtered.filter((l) => savedIds.includes(l.id))
      : filtered;
  const totalPages = Math.ceil(allDisplayed.length / PER_PAGE);
  const displayed = allDisplayed.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <input
              className="flex-1 min-w-48 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Search address, city, or ZIP..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={statusFilter}
              onChange={handleFilterChange(setStatusFilter)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Sold">Sold</option>
            </select>
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={typeFilter}
              onChange={handleFilterChange(setTypeFilter)}
            >
              <option value="All">All Types</option>
              <option value="Single Family">Single Family</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
            </select>
            <input
              className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Min $"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value.replace(/\D/g, ''));
                setPage(1);
              }}
            />
            <input
              className="w-28 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Max $"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value.replace(/\D/g, ''));
                setPage(1);
              }}
            />
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={sortBy}
              onChange={handleFilterChange(setSortBy)}
            >
              <option value="default">Sort: Default</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="sqft">Sq Ft: Largest</option>
              <option value="newest">Newest Listed</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 mb-4 border-b border-gray-200">
          <button
            className={`pb-2 text-sm font-semibold border-b-2 transition ${
              tab === 'listings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setTab('listings');
              setPage(1);
            }}
          >
            All Listings ({listings.length})
          </button>
          <button
            className={`pb-2 text-sm font-semibold border-b-2 transition ${
              tab === 'saved'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => {
              setTab('saved');
              setPage(1);
            }}
          >
            ❤️ Saved ({savedIds.length})
          </button>
          <button
            className={`pb-2 text-sm font-semibold border-b-2 transition ${
              tab === 'map'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setTab('map')}
          >
            🗺️ Map View
          </button>
        </div>

        <div className="flex gap-4 mb-4 text-sm text-gray-500">
          <span className="font-semibold text-gray-700">
            {allDisplayed.length} result{allDisplayed.length !== 1 ? 's' : ''}
          </span>
          <span>•</span>
          <span>
            Active: {allDisplayed.filter((l) => l.status === 'Active').length}
          </span>
          <span>
            Pending: {allDisplayed.filter((l) => l.status === 'Pending').length}
          </span>
          <span>
            Sold: {allDisplayed.filter((l) => l.status === 'Sold').length}
          </span>
        </div>

        {tab === 'map' ? (
          <>
            <div className="mb-3 flex gap-4 text-xs text-gray-500 items-center">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-full bg-green-600"></span>{' '}
                Active (
                {allDisplayed.filter((l) => l.status === 'Active').length})
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>{' '}
                Pending (
                {allDisplayed.filter((l) => l.status === 'Pending').length})
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 rounded-full bg-red-600"></span>{' '}
                Sold ({allDisplayed.filter((l) => l.status === 'Sold').length})
              </span>
              <span className="ml-auto text-gray-400">
                Click a pin to view listing details
              </span>
            </div>
            <MapView listings={allDisplayed} onSelect={setSelected} />
          </>
        ) : displayed.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <svg
              className="w-12 h-12 mx-auto mb-3 opacity-40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <p className="font-semibold">No listings found</p>
            <p className="text-sm mt-1">Try adjusting your filters.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayed.map((l) => (
                <ListingCard
                  key={l.id}
                  listing={l}
                  onClick={setSelected}
                  saved={savedIds.includes(l.id)}
                  onSave={toggleSave}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (n) =>
                      n === 1 || n === totalPages || Math.abs(n - page) <= 2
                  )
                  .reduce((acc, n, i, arr) => {
                    if (i > 0 && n - arr[i - 1] > 1) acc.push('...');
                    acc.push(n);
                    return acc;
                  }, [])
                  .map((item, i) =>
                    item === '...' ? (
                      <span key={i} className="px-2 text-gray-400">
                        …
                      </span>
                    ) : (
                      <button
                        key={item}
                        className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition ${
                          page === item
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                        onClick={() => setPage(item)}
                      >
                        {item}
                      </button>
                    )
                  )}
                <button
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selected && (
        <DetailModal
          listing={selected}
          onClose={() => setSelected(null)}
          saved={savedIds.includes(selected.id)}
          onSave={toggleSave}
        />
      )}
    </div>
  );
}
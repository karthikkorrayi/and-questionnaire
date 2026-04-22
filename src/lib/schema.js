// ─── All form steps and their fields ────────────────────────────────────────
// This is the single source of truth for the questionnaire structure.
// The form renderer reads from this to build each step dynamically.

export const STEPS = [
  'Personal Info',
  'Project Overview',
  'Budget & Timeline',
  'Design Preferences',
  'Space Requirements',
  'Electrical & Lighting',
  'Assets & Priorities',
  'Final Details',
]

export const STEP_DESCRIPTIONS = [
  'Tell us about the household that will call this home.',
  'Property details and the full scope of work.',
  'Budget range, flexibility and project timeline.',
  'The look, feel and personality of your ideal home.',
  'Room-by-room needs and preferences.',
  'Electrical, lighting, ceiling and smart home features.',
  "What you're keeping, and what matters most day-to-day.",
  'Final wall treatments, décor and atmosphere preferences.',
]

// ─── Default empty form state ────────────────────────────────────────────────
export const EMPTY_FORM = {
  // Step 0 — Personal Info
  fullName: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  household: [],
  numAdults: '',
  childrenAges: '',
  occupations: '',
  workFromHome: '',

  // Step 1 — Project Overview
  configuration: '',
  area: '',
  floorTower: '',
  currentStatus: '',
  spaces: [],
  projectType: '',
  changes: [],

  // Step 2 — Budget & Timeline
  budgetRange: '',
  budgetFlexibility: '',
  timeline: '',
  targetDate: '',
  fixedEvent: '',

  // Step 3 — Design Preferences
  stylePreference: [],
  colorPalette: [],
  colorsNotWanted: '',
  references: '',
  finishPreference: [],
  flooringPreference: [],

  // Step 4 — Space Requirements
  seating: [],
  tvUnit: [],
  diningSeats: '',
  looseFurniture: [],
  kitchenCounter: [],
  kitchenLayout: '',
  cookingHabits: [],
  appliances: [],
  utilityKitchen: '',
  masterBedSize: '',
  wardrobeReq: [],
  masterBathroom: [],
  bedroomAdditionals: [],
  bedroom2User: '',
  bedroom3User: '',
  kidsRoomReq: [],
  bedroomNotes: '',
  foyer: [],
  balcony: [],
  puja: [],
  pujaStyle: [],

  // Step 5 — Electrical & Lighting
  acType: [],
  electricalAppliances: [],
  falseCeiling: [],
  falseCeilingMaterial: [],
  falseCeilingDesign: [],
  lightingMood: '',
  fixturePreference: [],
  dimmer: '',
  smartLighting: '',
  smartCurtains: '',
  smartDoorLock: '',
  smartAC: '',
  homeHub: '',
  brandPref: '',

  // Step 6 — Assets & Priorities
  existingFurniture: '',
  furnitureList: '',
  heirlooms: '',
  easyMaintenance: '',
  storageFirst: '',
  vastu: '',
  ecoFriendly: '',
  elderlyFriendly: '',

  // Step 7 — Final Details
  wallFinish: [],
  accentWalls: [],
  windowCovering: [],
  softFurnishing: [],
  decorLevel: '',
  decorElements: [],
  homeFeel: [],
  dreamWords: '',
  wishDetail: '',
  notRepeat: '',
}

// ─── Sheet column headers (must match order in api/submit.js) ────────────────
export const SHEET_HEADERS = [
  'Timestamp', 'Full Name', 'Phone', 'Email', 'City', 'Address',
  'Household', 'Adults', 'Children Ages', 'Occupations', 'Work From Home',
  'Configuration', 'Area (sqft)', 'Floor/Tower', 'Current Status',
  'Spaces', 'Project Type', 'Changes',
  'Budget Range', 'Budget Flexibility', 'Timeline', 'Target Date', 'Fixed Event',
  'Style', 'Color Palette', 'Colors Not Wanted', 'References',
  'Finish Preference', 'Flooring',
  'Seating', 'TV Unit', 'Dining Seats', 'Loose Furniture',
  'Kitchen Counter', 'Kitchen Layout', 'Cooking Habits', 'Appliances', 'Utility Kitchen',
  'Master Bed Size', 'Wardrobe', 'Master Bathroom', 'Bedroom Additionals',
  'Bedroom 2 User', 'Bedroom 3 User', 'Kids Room Req', 'Bedroom Notes',
  'Foyer', 'Balcony', 'Puja', 'Puja Style',
  'AC Type', 'Electrical Appliances',
  'False Ceiling', 'False Ceiling Material', 'False Ceiling Design',
  'Lighting Mood', 'Fixture Preference', 'Dimmer',
  'Smart Lighting', 'Smart Curtains', 'Smart Door Lock', 'Smart AC', 'Home Hub', 'Brand Pref',
  'Existing Furniture', 'Furniture List', 'Heirlooms',
  'Easy Maintenance', 'Storage Priority', 'Vastu', 'Eco Friendly', 'Elderly Friendly',
  'Wall Finish', 'Accent Walls', 'Window Covering', 'Soft Furnishing',
  'Decor Level', 'Decor Elements',
  'Home Feel', 'Dream Words', 'Wish Detail', 'Not Repeat',
]

// ─── Map form state → flat sheet row ────────────────────────────────────────
export function formToSheetRow(form) {
  const arr = (v) => Array.isArray(v) ? v.join(', ') : (v || '')
  const str = (v) => v || ''

  return [
    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    str(form.fullName), str(form.phone), str(form.email),
    str(form.city), str(form.address),
    arr(form.household), str(form.numAdults), str(form.childrenAges),
    str(form.occupations), str(form.workFromHome),
    str(form.configuration), str(form.area), str(form.floorTower), str(form.currentStatus),
    arr(form.spaces), str(form.projectType), arr(form.changes),
    str(form.budgetRange), str(form.budgetFlexibility), str(form.timeline),
    str(form.targetDate), str(form.fixedEvent),
    arr(form.stylePreference), arr(form.colorPalette), str(form.colorsNotWanted), str(form.references),
    arr(form.finishPreference), arr(form.flooringPreference),
    arr(form.seating), arr(form.tvUnit), str(form.diningSeats), arr(form.looseFurniture),
    arr(form.kitchenCounter), str(form.kitchenLayout), arr(form.cookingHabits),
    arr(form.appliances), str(form.utilityKitchen),
    str(form.masterBedSize), arr(form.wardrobeReq), arr(form.masterBathroom),
    arr(form.bedroomAdditionals), str(form.bedroom2User), str(form.bedroom3User),
    arr(form.kidsRoomReq), str(form.bedroomNotes),
    arr(form.foyer), arr(form.balcony), arr(form.puja), arr(form.pujaStyle),
    arr(form.acType), arr(form.electricalAppliances),
    arr(form.falseCeiling), arr(form.falseCeilingMaterial), arr(form.falseCeilingDesign),
    str(form.lightingMood), arr(form.fixturePreference), str(form.dimmer),
    str(form.smartLighting), str(form.smartCurtains), str(form.smartDoorLock),
    str(form.smartAC), str(form.homeHub), str(form.brandPref),
    str(form.existingFurniture), str(form.furnitureList), str(form.heirlooms),
    str(form.easyMaintenance), str(form.storageFirst), str(form.vastu),
    str(form.ecoFriendly), str(form.elderlyFriendly),
    arr(form.wallFinish), arr(form.accentWalls), arr(form.windowCovering), arr(form.softFurnishing),
    str(form.decorLevel), arr(form.decorElements),
    arr(form.homeFeel), str(form.dreamWords), str(form.wishDetail), str(form.notRepeat),
  ]
}

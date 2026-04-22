// api/submit.js
// ─── Vercel Serverless Function ───────────────────────────────────────────────
// POST /api/submit
// Body: { form: { ...formData } }
// Appends one row to your Google Sheet, then returns { success: true }

import { google } from 'googleapis'

// ─── Auth ─────────────────────────────────────────────────────────────────────
function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const rawKey = process.env.GOOGLE_PRIVATE_KEY

  if (!email || !rawKey) {
    throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_PRIVATE_KEY env vars.')
  }

  // Vercel stores \n as literal \\n — fix that
  const privateKey = rawKey.replace(/\\n/g, '\n')

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

// ─── Flatten form → sheet row ─────────────────────────────────────────────────
function toRow(form) {
  const arr = (v) => (Array.isArray(v) ? v.join(', ') : v || '')
  const str = (v) => v || ''
  const ts  = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

  return [
    ts,
    str(form.fullName),        str(form.phone),          str(form.email),
    str(form.city),            str(form.address),
    arr(form.household),       str(form.numAdults),       str(form.childrenAges),
    str(form.occupations),     str(form.workFromHome),
    str(form.configuration),   str(form.area),            str(form.floorTower),
    str(form.currentStatus),
    arr(form.spaces),          str(form.projectType),     arr(form.changes),
    str(form.budgetRange),     str(form.budgetFlexibility),
    str(form.timeline),        str(form.targetDate),      str(form.fixedEvent),
    arr(form.stylePreference), arr(form.colorPalette),    str(form.colorsNotWanted),
    str(form.references),      arr(form.finishPreference),arr(form.flooringPreference),
    arr(form.seating),         arr(form.tvUnit),          str(form.diningSeats),
    arr(form.looseFurniture),  arr(form.kitchenCounter),  str(form.kitchenLayout),
    arr(form.cookingHabits),   arr(form.appliances),      str(form.utilityKitchen),
    str(form.masterBedSize),   arr(form.wardrobeReq),     arr(form.masterBathroom),
    arr(form.bedroomAdditionals),
    str(form.bedroom2User),    str(form.bedroom3User),
    arr(form.kidsRoomReq),     str(form.bedroomNotes),
    arr(form.foyer),           arr(form.balcony),
    arr(form.puja),            arr(form.pujaStyle),
    arr(form.acType),          arr(form.electricalAppliances),
    arr(form.falseCeiling),    arr(form.falseCeilingMaterial), arr(form.falseCeilingDesign),
    str(form.lightingMood),    arr(form.fixturePreference), str(form.dimmer),
    str(form.smartLighting),   str(form.smartCurtains),   str(form.smartDoorLock),
    str(form.smartAC),         str(form.homeHub),         str(form.brandPref),
    str(form.existingFurniture), str(form.furnitureList), str(form.heirlooms),
    str(form.easyMaintenance), str(form.storageFirst),    str(form.vastu),
    str(form.ecoFriendly),     str(form.elderlyFriendly),
    arr(form.wallFinish),      arr(form.accentWalls),     arr(form.windowCovering),
    arr(form.softFurnishing),  str(form.decorLevel),      arr(form.decorElements),
    arr(form.homeFeel),        str(form.dreamWords),      str(form.wishDetail),
    str(form.notRepeat),
  ]
}

// ─── Headers row (written once if sheet is empty) ─────────────────────────────
const HEADERS = [
  'Timestamp', 'Full Name', 'Phone', 'Email', 'City', 'Address',
  'Household', 'Adults', 'Children Ages', 'Occupations', 'WFH',
  'Configuration', 'Area (sqft)', 'Floor/Tower', 'Status',
  'Spaces', 'Project Type', 'Changes',
  'Budget', 'Budget Flexibility', 'Timeline', 'Target Date', 'Fixed Event',
  'Style', 'Color Palette', 'Colors Not Wanted', 'References',
  'Finish', 'Flooring',
  'Seating', 'TV Unit', 'Dining Seats', 'Loose Furniture',
  'Kitchen Counter', 'Kitchen Layout', 'Cooking', 'Appliances', 'Utility Kitchen',
  'Master Bed Size', 'Wardrobe', 'Master Bath', 'Bedroom Additionals',
  'Bedroom 2', 'Bedroom 3', 'Kids Room', 'Bedroom Notes',
  'Foyer', 'Balcony', 'Puja', 'Puja Style',
  'AC Type', 'Electrical',
  'False Ceiling', 'FC Material', 'FC Design',
  'Lighting Mood', 'Fixtures', 'Dimmer',
  'Smart Lighting', 'Smart Curtains', 'Smart Lock', 'Smart AC', 'Home Hub', 'Brand Pref',
  'Existing Furniture', 'Furniture List', 'Heirlooms',
  'Easy Maintenance', 'Storage', 'Vastu', 'Eco', 'Elderly',
  'Wall Finish', 'Accent Walls', 'Window Covering', 'Soft Furnishing',
  'Decor Level', 'Decor Elements',
  'Home Feel', 'Dream Words', 'Wish Detail', 'Not Repeat',
]

// ─── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { form } = req.body
    if (!form) return res.status(400).json({ error: 'Missing form data' })

    const sheetId = process.env.GOOGLE_SHEET_ID
    if (!sheetId) return res.status(500).json({ error: 'GOOGLE_SHEET_ID not configured' })

    const auth   = getAuth()
    const sheets = google.sheets({ version: 'v4', auth })
    const range  = 'Sheet1'

    // Check if headers exist (row 1)
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1:B1',
    })

    const hasHeaders = (existing.data.values || []).length > 0

    if (!hasHeaders) {
      // Write headers first
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        requestBody: { values: [HEADERS] },
      })
    }

    // Append the new data row
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [toRow(form)] },
    })

    return res.status(200).json({ success: true, message: 'Submission recorded.' })
  } catch (err) {
    console.error('[/api/submit] Error:', err)
    return res.status(500).json({ error: err.message || 'Internal server error' })
  }
}

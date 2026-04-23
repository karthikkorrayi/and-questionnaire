import { google } from 'googleapis'

/* ── Auth ──────────────────────────────────────────────────────────────── */
function getAuth() {
  const email  = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const rawKey = process.env.GOOGLE_PRIVATE_KEY

  if (!email)  throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_EMAIL')
  if (!rawKey) throw new Error('Missing GOOGLE_PRIVATE_KEY')

  // 1. Replace literal \n with real newlines (Vercel stores them escaped)
  let key = rawKey.replace(/\\n/g, '\n')

  // 2. Unwrap any surrounding quotes Vercel sometimes adds
  key = key.replace(/^["']|["']$/g, '').trim()

  // 3. Ensure correct PKCS#8 headers (Node 18+ / OpenSSL 3 requirement)
  key = key
    .replace(/-----BEGIN RSA PRIVATE KEY-----/g, '-----BEGIN PRIVATE KEY-----')
    .replace(/-----END RSA PRIVATE KEY-----/g,   '-----END PRIVATE KEY-----')

  // 4. Reconstruct clean PEM — strip all whitespace then re-chunk at 64 chars
  const headerMatch = key.match(/(-----BEGIN [^-]+-----)/)
  const footerMatch = key.match(/(-----END [^-]+-----)/)

  if (!headerMatch || !footerMatch) {
    throw new Error(`Private key PEM headers not found. Key starts with: ${key.slice(0, 60)}`)
  }

  const header = headerMatch[1]
  const footer = footerMatch[1]
  const body   = key
    .replace(header, '')
    .replace(footer, '')
    .replace(/\s+/g, '')   // strip ALL whitespace from body

  // Re-chunk body into 64-char lines
  const chunked = body.match(/.{1,64}/g)?.join('\n') ?? body
  const cleanKey = `${header}\n${chunked}\n${footer}`

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key:  cleanKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

/* ── Headers ───────────────────────────────────────────────────────────── */
const HEADERS = [
  'Timestamp','Full Name','Phone','Email','City','Address',
  'Household','Adults','Children Ages','Occupations','WFH',
  'Configuration','Area (sqft)','Floor/Tower','Status',
  'Spaces','Project Type','Changes',
  'Budget','Budget Flexibility','Timeline','Target Date','Fixed Event',
  'Style','Color Palette','Colors Not Wanted','References',
  'Finish','Flooring','Seating','TV Unit','Dining Seats','Loose Furniture',
  'Kitchen Counter','Kitchen Layout','Cooking','Appliances','Utility Kitchen',
  'Master Bed','Wardrobe','Master Bathroom','Bedroom Additionals',
  'Bedroom 2','Bedroom 3','Kids Room','Bedroom Notes',
  'Foyer','Balcony','Puja','Puja Style',
  'AC Type','Electrical','False Ceiling','FC Material','FC Design',
  'Lighting Mood','Fixtures','Dimmer',
  'Smart Lighting','Smart Curtains','Smart Lock','Smart AC','Home Hub','Brand Pref',
  'Existing Furniture','Furniture List','Heirlooms',
  'Easy Maintenance','Storage','Vastu','Eco','Elderly',
  'Wall Finish','Accent Walls','Window Covering','Soft Furnishing',
  'Decor Level','Decor Elements','Home Feel','Dream Words','Wish Detail','Not Repeat',
]

/* ── Row builder ───────────────────────────────────────────────────────── */
function toRow(f) {
  const a = v => Array.isArray(v) ? v.join(', ') : (v || '')
  const s = v => String(v || '')
  return [
    new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    s(f.fullName), s(f.phone), s(f.email), s(f.city), s(f.address),
    a(f.household), s(f.numAdults), s(f.childrenAges), s(f.occupations), s(f.workFromHome),
    s(f.configuration), s(f.area), s(f.floorTower), s(f.currentStatus),
    a(f.spaces), s(f.projectType), a(f.changes),
    s(f.budgetRange), s(f.budgetFlexibility), s(f.timeline), s(f.targetDate), s(f.fixedEvent),
    a(f.stylePreference), a(f.colorPalette), s(f.colorsNotWanted), s(f.references),
    a(f.finishPreference), a(f.flooringPreference),
    a(f.seating), a(f.tvUnit), s(f.diningSeats), a(f.looseFurniture),
    a(f.kitchenCounter), s(f.kitchenLayout), a(f.cookingHabits), a(f.appliances), s(f.utilityKitchen),
    s(f.masterBedSize), a(f.wardrobeReq), a(f.masterBathroom), a(f.bedroomAdditionals),
    s(f.bedroom2User), s(f.bedroom3User), a(f.kidsRoomReq), s(f.bedroomNotes),
    a(f.foyer), a(f.balcony), a(f.puja), a(f.pujaStyle),
    a(f.acType), a(f.electricalAppliances),
    a(f.falseCeiling), a(f.falseCeilingMaterial), a(f.falseCeilingDesign),
    s(f.lightingMood), a(f.fixturePreference), s(f.dimmer),
    s(f.smartLighting), s(f.smartCurtains), s(f.smartDoorLock),
    s(f.smartAC), s(f.homeHub), s(f.brandPref),
    s(f.existingFurniture), s(f.furnitureList), s(f.heirlooms),
    s(f.easyMaintenance), s(f.storageFirst), s(f.vastu), s(f.ecoFriendly), s(f.elderlyFriendly),
    a(f.wallFinish), a(f.accentWalls), a(f.windowCovering), a(f.softFurnishing),
    s(f.decorLevel), a(f.decorElements), a(f.homeFeel),
    s(f.dreamWords), s(f.wishDetail), s(f.notRepeat),
  ]
}

/* ── Handler ───────────────────────────────────────────────────────────── */
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { form } = req.body ?? {}
    if (!form) return res.status(400).json({ error: 'Missing form data' })

    const sheetId = process.env.GOOGLE_SHEET_ID
    if (!sheetId) return res.status(500).json({ error: 'GOOGLE_SHEET_ID not set' })

    // Build auth — log key shape for debugging without exposing secret
    let auth
    try {
      auth = getAuth()
    } catch (authErr) {
      console.error('[auth]', authErr.message)
      return res.status(500).json({ error: `Auth failed: ${authErr.message}` })
    }

    const sheets = google.sheets({ version: 'v4', auth })

    // Check if headers row exists
    let hasHeaders = false
    try {
      const check = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'Sheet1!A1',
      })
      hasHeaders = (check.data.values?.[0]?.length ?? 0) > 0
    } catch (checkErr) {
      console.warn('[header check]', checkErr.message)
    }

    // Write headers if missing
    if (!hasHeaders) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        requestBody: { values: [HEADERS] },
      })
    }

    // Append data row
    const row = toRow(form)
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [row] },
    })

    console.log(`[submit] ✓ ${form.fullName} — ${row.length} columns`)
    return res.status(200).json({ success: true, columns: row.length })

  } catch (err) {
    console.error('[/api/submit]', err.message)
    // Return full error in response for easier debugging
    return res.status(500).json({
      error: err.message,
      hint: 'Check Vercel function logs for full stack trace',
    })
  }
}
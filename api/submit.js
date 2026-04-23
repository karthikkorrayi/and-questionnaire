// api/submit.js
import { google } from 'googleapis'

/* ── Auth ──────────────────────────────────────────────────────────────── */
function getAuth() {
  const email  = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const rawKey = process.env.GOOGLE_PRIVATE_KEY

  if (!email)  throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_EMAIL')
  if (!rawKey) throw new Error('Missing GOOGLE_PRIVATE_KEY')

  let key = rawKey.replace(/\\n/g, '\n').replace(/^["']|["']$/g, '').trim()

  key = key
    .replace(/-----BEGIN RSA PRIVATE KEY-----/g, '-----BEGIN PRIVATE KEY-----')
    .replace(/-----END RSA PRIVATE KEY-----/g,   '-----END PRIVATE KEY-----')

  const headerMatch = key.match(/(-----BEGIN [^-]+-----)/)
  const footerMatch = key.match(/(-----END [^-]+-----)/)
  if (!headerMatch || !footerMatch) {
    throw new Error(`PEM headers not found. Key starts: ${key.slice(0, 60)}`)
  }

  const header  = headerMatch[1]
  const footer  = footerMatch[1]
  const body    = key.replace(header, '').replace(footer, '').replace(/\s+/g, '')
  const chunked = body.match(/.{1,64}/g)?.join('\n') ?? body
  const cleanKey = `${header}\n${chunked}\n${footer}`

  return new google.auth.GoogleAuth({
    credentials: { client_email: email, private_key: cleanKey },
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

/* ── Colour helpers (RGB 0–1 scale for Sheets API) ─────────────────────── */
const rgb = (r, g, b) => ({
  red:   r / 255,
  green: g / 255,
  blue:  b / 255,
})

// Brand palette
const COLOR = {
  headerBg:    rgb(61,  26,  26),   // deep maroon  #3D1A1A
  headerText:  rgb(245, 239, 230),  // cream        #F5EFE6
  accent:      rgb(181, 146, 76),   // gold         #B5924C
  rowOdd:      rgb(253, 250, 246),  // warm white   #FDFAF6
  rowEven:     rgb(245, 239, 230),  // cream        #F5EFE6
  border:      rgb(220, 210, 195),  // soft border
  sectionBg:   rgb(237, 229, 216),  // section tint #EDE5D8
  white:       rgb(255, 255, 255),
  text:        rgb(26,  10,  10),   // near-black
  textMuted:   rgb(122, 63,  63),   // muted brown
}

/* ── Column width map (pixels) ─────────────────────────────────────────── */
// Groups: identity | project | budget | design | spaces | electrical | assets | final
const COL_WIDTHS = [
  180, // Timestamp
  150, // Full Name
  130, // Phone
  200, // Email
  120, // City
  220, // Address
  160, // Household
  80,  // Adults
  130, // Children Ages
  160, // Occupations
  100, // WFH
  130, // Configuration
  110, // Area
  130, // Floor/Tower
  120, // Status
  280, // Spaces
  200, // Project Type
  220, // Changes
  130, // Budget
  200, // Budget Flexibility
  120, // Timeline
  140, // Target Date
  180, // Fixed Event
  220, // Style
  180, // Color Palette
  200, // Colors Not Wanted
  280, // References
  200, // Finish
  180, // Flooring
  160, // Seating
  200, // TV Unit
  120, // Dining Seats
  180, // Loose Furniture
  180, // Kitchen Counter
  160, // Kitchen Layout
  180, // Cooking
  200, // Appliances
  130, // Utility Kitchen
  130, // Master Bed
  200, // Wardrobe
  200, // Master Bathroom
  200, // Bedroom Additionals
  120, // Bedroom 2
  120, // Bedroom 3
  180, // Kids Room
  220, // Bedroom Notes
  180, // Foyer
  160, // Balcony
  180, // Puja
  180, // Puja Style
  120, // AC Type
  160, // Electrical
  200, // False Ceiling
  200, // FC Material
  180, // FC Design
  160, // Lighting Mood
  200, // Fixtures
  130, // Dimmer
  130, // Smart Lighting
  140, // Smart Curtains
  130, // Smart Lock
  120, // Smart AC
  120, // Home Hub
  180, // Brand Pref
  180, // Existing Furniture
  240, // Furniture List
  240, // Heirlooms
  160, // Easy Maintenance
  120, // Storage
  100, // Vastu
  100, // Eco
  120, // Elderly
  180, // Wall Finish
  200, // Accent Walls
  180, // Window Covering
  200, // Soft Furnishing
  160, // Decor Level
  200, // Decor Elements
  200, // Home Feel
  180, // Dream Words
  240, // Wish Detail
  240, // Not Repeat
]

/* ── Section colour bands ───────────────────────────────────────────────── */
// [startCol, endCol, label] — 0-indexed, used to tint header groups
const SECTIONS = [
  { start: 0,  end: 0,  label: '🕐 Timestamp' },
  { start: 1,  end: 10, label: '👤 Personal' },
  { start: 11, end: 17, label: '🏠 Project' },
  { start: 18, end: 22, label: '💰 Budget' },
  { start: 23, end: 28, label: '🎨 Design' },
  { start: 29, end: 48, label: '🛋 Spaces' },
  { start: 49, end: 57, label: '💡 Electrical' },
  { start: 58, end: 63, label: '🏠 Automation' },
  { start: 64, end: 68, label: '📦 Assets' },
  { start: 69, end: 78, label: '✨ Final' },
]

/* ── Build all formatting requests ─────────────────────────────────────── */
function buildFormatRequests(sheetId, totalRows) {
  const numCols = HEADERS.length
  const requests = []

  // ── 1. Freeze row 1 (header) ──────────────────────────────────────────
  requests.push({
    updateSheetProperties: {
      properties: {
        sheetId,
        gridProperties: { frozenRowCount: 1, frozenColumnCount: 2 },
      },
      fields: 'gridProperties.frozenRowCount,gridProperties.frozenColumnCount',
    },
  })

  // ── 2. Header row — deep maroon background, cream bold text ───────────
  requests.push({
    repeatCell: {
      range: { sheetId, startRowIndex: 0, endRowIndex: 1,
                startColumnIndex: 0, endColumnIndex: numCols },
      cell: {
        userEnteredFormat: {
          backgroundColor: COLOR.headerBg,
          textFormat: {
            foregroundColor: COLOR.headerText,
            bold: true,
            fontSize: 10,
            fontFamily: 'Arial',
          },
          horizontalAlignment: 'CENTER',
          verticalAlignment: 'MIDDLE',
          wrapStrategy: 'WRAP',
          padding: { top: 10, bottom: 10, left: 8, right: 8 },
        },
      },
      fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment,wrapStrategy,padding)',
    },
  })

  // ── 3. Set header row height to 48px ─────────────────────────────────
  requests.push({
    updateDimensionProperties: {
      range: { sheetId, dimension: 'ROWS', startIndex: 0, endIndex: 1 },
      properties: { pixelSize: 48 },
      fields: 'pixelSize',
    },
  })

  // ── 4. Data rows — alternating warm white / cream ─────────────────────
  if (totalRows > 1) {
    // Odd data rows (row 2, 4, 6... → index 1, 3, 5...)
    for (let r = 1; r < totalRows; r += 2) {
      requests.push({
        repeatCell: {
          range: { sheetId, startRowIndex: r, endRowIndex: r + 1,
                    startColumnIndex: 0, endColumnIndex: numCols },
          cell: {
            userEnteredFormat: {
              backgroundColor: COLOR.rowOdd,
              textFormat: { fontSize: 9, fontFamily: 'Arial', foregroundColor: COLOR.text },
              verticalAlignment: 'TOP',
              wrapStrategy: 'WRAP',
              padding: { top: 6, bottom: 6, left: 8, right: 8 },
            },
          },
          fields: 'userEnteredFormat(backgroundColor,textFormat,verticalAlignment,wrapStrategy,padding)',
        },
      })
    }

    // Even data rows (row 3, 5, 7... → index 2, 4, 6...)
    for (let r = 2; r < totalRows; r += 2) {
      requests.push({
        repeatCell: {
          range: { sheetId, startRowIndex: r, endRowIndex: r + 1,
                    startColumnIndex: 0, endColumnIndex: numCols },
          cell: {
            userEnteredFormat: {
              backgroundColor: COLOR.rowEven,
              textFormat: { fontSize: 9, fontFamily: 'Arial', foregroundColor: COLOR.text },
              verticalAlignment: 'TOP',
              wrapStrategy: 'WRAP',
              padding: { top: 6, bottom: 6, left: 8, right: 8 },
            },
          },
          fields: 'userEnteredFormat(backgroundColor,textFormat,verticalAlignment,wrapStrategy,padding)',
        },
      })
    }
  }

  // ── 5. Set data row height to 36px ────────────────────────────────────
  if (totalRows > 1) {
    requests.push({
      updateDimensionProperties: {
        range: { sheetId, dimension: 'ROWS', startIndex: 1, endIndex: totalRows },
        properties: { pixelSize: 36 },
        fields: 'pixelSize',
      },
    })
  }

  // ── 6. Column widths ──────────────────────────────────────────────────
  COL_WIDTHS.forEach((px, i) => {
    requests.push({
      updateDimensionProperties: {
        range: { sheetId, dimension: 'COLUMNS', startIndex: i, endIndex: i + 1 },
        properties: { pixelSize: px },
        fields: 'pixelSize',
      },
    })
  })

  // ── 7. Timestamp column — muted italic text ───────────────────────────
  if (totalRows > 1) {
    requests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: 1, endRowIndex: totalRows,
                  startColumnIndex: 0, endColumnIndex: 1 },
        cell: {
          userEnteredFormat: {
            textFormat: {
              italic: true,
              fontSize: 8,
              foregroundColor: COLOR.textMuted,
              fontFamily: 'Arial',
            },
          },
        },
        fields: 'userEnteredFormat.textFormat',
      },
    })
  }

  // ── 8. Full Name column — bold ────────────────────────────────────────
  if (totalRows > 1) {
    requests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: 1, endRowIndex: totalRows,
                  startColumnIndex: 1, endColumnIndex: 2 },
        cell: {
          userEnteredFormat: {
            textFormat: {
              bold: true,
              fontSize: 10,
              foregroundColor: COLOR.text,
              fontFamily: 'Arial',
            },
          },
        },
        fields: 'userEnteredFormat.textFormat',
      },
    })
  }

  // ── 9. Gold accent top border on header ──────────────────────────────
  requests.push({
    updateBorders: {
      range: { sheetId, startRowIndex: 0, endRowIndex: 1,
                startColumnIndex: 0, endColumnIndex: numCols },
      top: {
        style: 'SOLID_THICK',
        width: 3,
        color: COLOR.accent,
      },
      bottom: {
        style: 'SOLID_MEDIUM',
        width: 2,
        color: COLOR.accent,
      },
    },
  })

  // ── 10. Light borders between data cells ─────────────────────────────
  if (totalRows > 1) {
    requests.push({
      updateBorders: {
        range: { sheetId, startRowIndex: 1, endRowIndex: totalRows,
                  startColumnIndex: 0, endColumnIndex: numCols },
        innerHorizontal: {
          style: 'SOLID',
          color: COLOR.border,
          width: 1,
        },
        innerVertical: {
          style: 'SOLID',
          color: COLOR.border,
          width: 1,
        },
      },
    })
  }

  // ── 11. Section group tints in header (column group colouring) ────────
  const SECTION_COLORS = [
    rgb(61,  26,  26),  // maroon    — Timestamp
    rgb(74,  36,  36),  // maroon+   — Personal
    rgb(55,  45,  30),  // brown     — Project
    rgb(40,  55,  40),  // green     — Budget
    rgb(35,  45,  65),  // navy      — Design
    rgb(55,  35,  55),  // plum      — Spaces
    rgb(40,  50,  55),  // teal      — Electrical
    rgb(30,  50,  50),  // dark teal — Automation
    rgb(55,  40,  30),  // brown     — Assets
    rgb(50,  35,  20),  // amber-dk  — Final
  ]

  SECTIONS.forEach((sec, idx) => {
    requests.push({
      repeatCell: {
        range: { sheetId, startRowIndex: 0, endRowIndex: 1,
                  startColumnIndex: sec.start, endColumnIndex: sec.end + 1 },
        cell: {
          userEnteredFormat: {
            backgroundColor: SECTION_COLORS[idx] || COLOR.headerBg,
          },
        },
        fields: 'userEnteredFormat.backgroundColor',
      },
    })
  })

  // ── 12. Tab / sheet colour — gold ─────────────────────────────────────
  requests.push({
    updateSheetProperties: {
      properties: {
        sheetId,
        tabColorStyle: { rgbColor: COLOR.accent },
      },
      fields: 'tabColorStyle',
    },
  })

  return requests
}

/* ── Get Sheet1 sheetId (not the same as spreadsheetId) ───────────────── */
async function getSheet1Id(sheets, spreadsheetId) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId })
  const sheet = meta.data.sheets?.find(
    s => s.properties.title === 'Sheet1'
  )
  return sheet?.properties?.sheetId ?? 0
}

/* ── Handler ───────────────────────────────────────────────────────────── */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { form } = req.body ?? {}
    if (!form) return res.status(400).json({ error: 'Missing form data' })

    const spreadsheetId = process.env.GOOGLE_SHEET_ID
    if (!spreadsheetId) return res.status(500).json({ error: 'GOOGLE_SHEET_ID not set' })

    let auth
    try {
      auth = getAuth()
    } catch (authErr) {
      console.error('[auth]', authErr.message)
      return res.status(500).json({ error: `Auth failed: ${authErr.message}` })
    }

    const sheets = google.sheets({ version: 'v4', auth })

    // ── Check if headers exist ─────────────────────────────────────────
    let hasHeaders = false
    let currentRowCount = 1 // at minimum row 1

    try {
      const check = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!A1',
      })
      hasHeaders = (check.data.values?.[0]?.length ?? 0) > 0
    } catch (_) {}

    // ── Write headers if missing ───────────────────────────────────────
    if (!hasHeaders) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        requestBody: { values: [HEADERS] },
      })
    }

    // ── Append data row ────────────────────────────────────────────────
    const row = toRow(form)
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [row] },
    })

    // ── Get current row count for formatting range ─────────────────────
    try {
      const countCheck = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!A:A',
      })
      currentRowCount = countCheck.data.values?.length ?? 2
    } catch (_) {
      currentRowCount = 2
    }

    // ── Apply formatting ───────────────────────────────────────────────
    const sheetId  = await getSheet1Id(sheets, spreadsheetId)
    const requests = buildFormatRequests(sheetId, currentRowCount)

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: { requests },
    })

    console.log(`[submit] ✓ ${form.fullName} — row ${currentRowCount} — ${requests.length} format ops`)
    return res.status(200).json({
      success: true,
      row: currentRowCount,
      formatted: true,
    })

  } catch (err) {
    console.error('[/api/submit]', err.message)
    return res.status(500).json({ error: err.message })
  }
}
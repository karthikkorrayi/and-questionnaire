import {
  Document, Page, Text, View, StyleSheet, Font, pdf,
} from '@react-pdf/renderer'

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#F5EFE6',
    padding: 0,
  },
  // Header
  header: {
    backgroundColor: '#3D1A1A',
    padding: '24 36',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: { flexDirection: 'column' },
  logoA: { fontSize: 28, color: '#D4AF72', fontFamily: 'Helvetica-Bold', letterSpacing: -1 },
  logoStudio: { fontSize: 7, color: '#D4AF72', letterSpacing: 3, marginTop: 1 },
  headerRight: { flexDirection: 'column', alignItems: 'flex-end' },
  headerTitle: { fontSize: 13, color: 'rgba(245,239,230,0.7)', fontFamily: 'Helvetica', letterSpacing: 1 },
  headerSub: { fontSize: 8, color: 'rgba(245,239,230,0.4)', letterSpacing: 2, marginTop: 3 },
  // Gold rule
  goldRule: { height: 2, backgroundColor: '#B5924C' },
  // Body
  body: { padding: '28 36' },
  // Section
  sectionTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: '#FDFAF6',
    backgroundColor: '#3D1A1A',
    padding: '6 12',
    marginBottom: 10,
    marginTop: 16,
  },
  // Row
  row: { flexDirection: 'row', marginBottom: 6 },
  label: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#7A3F3F',
    width: '35%',
    letterSpacing: 0.5,
    paddingRight: 8,
    lineHeight: 1.5,
  },
  value: {
    fontSize: 9,
    color: '#1A0A0A',
    width: '65%',
    lineHeight: 1.5,
    fontFamily: 'Helvetica',
  },
  valueMuted: { color: '#8A7070', fontStyle: 'italic' },
  divider: { height: 0.5, backgroundColor: 'rgba(61,26,26,0.12)', marginVertical: 8 },
  // Footer
  footer: {
    backgroundColor: '#3D1A1A',
    padding: '14 36',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: { fontSize: 8, color: 'rgba(245,239,230,0.45)', letterSpacing: 1 },
  footerGold: { fontSize: 8, color: '#B5924C', letterSpacing: 1 },
  // Page number
  pageNum: { fontSize: 7, color: 'rgba(245,239,230,0.4)' },
  // Confidential banner
  confBanner: {
    backgroundColor: '#EDE5D8',
    borderLeft: '3 solid #B5924C',
    padding: '8 12',
    marginBottom: 16,
  },
  confText: { fontSize: 8, color: '#8A7070', lineHeight: 1.6 },
  confBold: { fontFamily: 'Helvetica-Bold', color: '#3D1A1A' },
})

// ─── Helper components ────────────────────────────────────────────────────────
const arr = (v) => Array.isArray(v) ? v.join(', ') : (v || '—')
const str = (v) => v || '—'

function Row({ label, value }) {
  const val = typeof value === 'object' && Array.isArray(value) ? arr(value) : str(value)
  return (
    <View style={S.row}>
      <Text style={S.label}>{label}</Text>
      <Text style={[S.value, val === '—' ? S.valueMuted : {}]}>{val}</Text>
    </View>
  )
}

function SectionTitle({ children }) {
  return <Text style={S.sectionTitle}>{children}</Text>
}

function Hr() {
  return <View style={S.divider} />
}

// ─── PDF Document ─────────────────────────────────────────────────────────────
function QuestionnairePDF({ form }) {
  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

  return (
    <Document
      title={`AnD Studio — ${form.fullName || 'Client'} — Discovery Brief`}
      author="AnD Design Studio"
      subject="Client Discovery Questionnaire"
    >
      {/* ── Page 1 — Personal + Project ── */}
      <Page size="A4" style={S.page}>
        {/* Header */}
        <View style={S.header}>
          <View style={S.headerLeft}>
            <Text style={S.logoA}>AnD</Text>
            <Text style={S.logoStudio}>DESIGN STUDIO</Text>
          </View>
          <View style={S.headerRight}>
            <Text style={S.headerTitle}>Discovery Questionnaire</Text>
            <Text style={S.headerSub}>CLIENT BRIEF — CONFIDENTIAL</Text>
          </View>
        </View>
        <View style={S.goldRule} />

        <View style={S.body}>
          {/* Confidentiality */}
          <View style={S.confBanner}>
            <Text style={S.confText}>
              <Text style={S.confBold}>Statement of Confidentiality: </Text>
              This document contains confidential information prepared for {form.fullName || 'the client'}. For internal use by AnD Design Studio only.
            </Text>
          </View>

          <SectionTitle>Personal Information</SectionTitle>
          <Row label="Full Name" value={form.fullName} />
          <Row label="Phone" value={form.phone} />
          <Row label="Email" value={form.email} />
          <Row label="City" value={form.city} />
          <Row label="Site / Flat Address" value={form.address} />
          <Hr />
          <Row label="Household Type" value={form.household} />
          <Row label="Number of Adults" value={form.numAdults} />
          <Row label="Children / Ages" value={form.childrenAges} />
          <Row label="Occupations" value={form.occupations} />
          <Row label="Work from Home" value={form.workFromHome} />

          <SectionTitle>Project Overview</SectionTitle>
          <Row label="Configuration" value={form.configuration} />
          <Row label="Area (sq ft)" value={form.area} />
          <Row label="Floor / Tower" value={form.floorTower} />
          <Row label="Current Status" value={form.currentStatus} />
          <Hr />
          <Row label="Spaces to Design" value={form.spaces} />
          <Row label="Project Type" value={form.projectType} />
          <Row label="Changes & Additions" value={form.changes} />

          <SectionTitle>Budget & Timeline</SectionTitle>
          <Row label="Budget Range" value={form.budgetRange} />
          <Row label="Budget Flexibility" value={form.budgetFlexibility} />
          <Row label="Expected Timeline" value={form.timeline} />
          <Row label="Target Date" value={form.targetDate} />
          <Row label="Fixed Event" value={form.fixedEvent} />
        </View>

        {/* Footer */}
        <View style={S.footer} fixed>
          <Text style={S.footerGold}>AnD Design Studio</Text>
          <Text style={S.footerText}>+91 93988 14073</Text>
          <Text style={S.pageNum} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>

      {/* ── Page 2 — Design + Space ── */}
      <Page size="A4" style={S.page}>
        <View style={S.header}>
          <Text style={S.headerTitle}>Discovery Questionnaire — {form.fullName || 'Client'}</Text>
          <Text style={S.headerSub}>DESIGN PREFERENCES & SPACE REQUIREMENTS</Text>
        </View>
        <View style={S.goldRule} />

        <View style={S.body}>
          <SectionTitle>Design Preferences</SectionTitle>
          <Row label="Style Preference" value={form.stylePreference} />
          <Row label="Colour Palette" value={form.colorPalette} />
          <Row label="Colours to Avoid" value={form.colorsNotWanted} />
          <Row label="References / Inspirations" value={form.references} />
          <Hr />
          <Row label="Finish Preferences" value={form.finishPreference} />
          <Row label="Flooring" value={form.flooringPreference} />

          <SectionTitle>Living & Dining</SectionTitle>
          <Row label="Seating" value={form.seating} />
          <Row label="TV Unit" value={form.tvUnit} />
          <Row label="Dining Seats" value={form.diningSeats} />
          <Row label="Loose Furniture" value={form.looseFurniture} />

          <SectionTitle>Kitchen</SectionTitle>
          <Row label="Counter Preference" value={form.kitchenCounter} />
          <Row label="Layout Type" value={form.kitchenLayout} />
          <Row label="Cooking Habits" value={form.cookingHabits} />
          <Row label="Appliances" value={form.appliances} />
          <Row label="Utility Kitchen" value={form.utilityKitchen} />

          <SectionTitle>Master Bedroom</SectionTitle>
          <Row label="Bed Size" value={form.masterBedSize} />
          <Row label="Wardrobe" value={form.wardrobeReq} />
          <Row label="Master Bathroom" value={form.masterBathroom} />
          <Row label="Additionals" value={form.bedroomAdditionals} />

          <SectionTitle>Bedrooms 2 & 3</SectionTitle>
          <Row label="Bedroom 2 User" value={form.bedroom2User} />
          <Row label="Bedroom 3 User" value={form.bedroom3User} />
          <Row label="Kids Room Req." value={form.kidsRoomReq} />
          <Row label="Notes" value={form.bedroomNotes} />

          <SectionTitle>Foyer, Balcony & Puja</SectionTitle>
          <Row label="Foyer" value={form.foyer} />
          <Row label="Balcony Usage" value={form.balcony} />
          <Row label="Puja Space" value={form.puja} />
          <Row label="Puja Style" value={form.pujaStyle} />
        </View>

        <View style={S.footer} fixed>
          <Text style={S.footerGold}>AnD Design Studio</Text>
          <Text style={S.footerText}>+91 93988 14073</Text>
          <Text style={S.pageNum} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>

      {/* ── Page 3 — Electrical + Final ── */}
      <Page size="A4" style={S.page}>
        <View style={S.header}>
          <Text style={S.headerTitle}>Discovery Questionnaire — {form.fullName || 'Client'}</Text>
          <Text style={S.headerSub}>ELECTRICAL, LIGHTING & FINAL DETAILS</Text>
        </View>
        <View style={S.goldRule} />

        <View style={S.body}>
          <SectionTitle>Electrical & Lighting</SectionTitle>
          <Row label="AC Type" value={form.acType} />
          <Row label="Electrical Points" value={form.electricalAppliances} />
          <Hr />
          <Row label="False Ceiling Scope" value={form.falseCeiling} />
          <Row label="False Ceiling Material" value={form.falseCeilingMaterial} />
          <Row label="False Ceiling Design" value={form.falseCeilingDesign} />
          <Hr />
          <Row label="Lighting Mood" value={form.lightingMood} />
          <Row label="Fixture Preferences" value={form.fixturePreference} />
          <Row label="Dimmer Required" value={form.dimmer} />

          <SectionTitle>Home Automation</SectionTitle>
          <Row label="Smart Lighting" value={form.smartLighting} />
          <Row label="Smart Curtains" value={form.smartCurtains} />
          <Row label="Smart Door Lock" value={form.smartDoorLock} />
          <Row label="Smart AC" value={form.smartAC} />
          <Row label="Home Hub" value={form.homeHub} />
          <Row label="Brand Preference" value={form.brandPref} />

          <SectionTitle>Existing Assets</SectionTitle>
          <Row label="Existing Furniture" value={form.existingFurniture} />
          <Row label="Items to Retain" value={form.furnitureList} />
          <Row label="Heirlooms / Art" value={form.heirlooms} />

          <SectionTitle>Functional Priorities</SectionTitle>
          <Row label="Easy Maintenance" value={form.easyMaintenance} />
          <Row label="Storage Priority" value={form.storageFirst} />
          <Row label="Vastu Compliance" value={form.vastu} />
          <Row label="Eco-Friendly" value={form.ecoFriendly} />
          <Row label="Elderly Friendly" value={form.elderlyFriendly} />

          <SectionTitle>Final Design Details</SectionTitle>
          <Row label="Wall Finish" value={form.wallFinish} />
          <Row label="Accent Walls" value={form.accentWalls} />
          <Row label="Window Covering" value={form.windowCovering} />
          <Row label="Soft Furnishings" value={form.softFurnishing} />
          <Row label="Décor Level" value={form.decorLevel} />
          <Row label="Décor Elements" value={form.decorElements} />
          <Hr />
          <Row label="Home Feel" value={form.homeFeel} />
          <Row label="Dream Home in 3 Words" value={form.dreamWords} />
          <Row label="One Wish Detail" value={form.wishDetail} />
          <Row label="Not to Repeat" value={form.notRepeat} />

          {/* Submitted stamp */}
          <View style={{ marginTop: 24, padding: '10 16', backgroundColor: '#EDE5D8', borderLeft: '3 solid #B5924C' }}>
            <Text style={{ fontSize: 8, color: '#8A7070' }}>
              Submitted on: {submittedAt}
            </Text>
          </View>
        </View>

        <View style={S.footer} fixed>
          <Text style={S.footerGold}>AnD Design Studio</Text>
          <Text style={S.footerText}>+91 93988 14073 · Let Us Create Your Dream Home Together</Text>
          <Text style={S.pageNum} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
        </View>
      </Page>
    </Document>
  )
}

// ─── Export: download PDF in browser ─────────────────────────────────────────
export async function downloadPDF(form) {
  const doc = <QuestionnairePDF form={form} />
  const blob = await pdf(doc).toBlob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `AnD_Studio_${(form.fullName || 'Client').replace(/\s+/g, '_')}_Brief.pdf`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export default QuestionnairePDF

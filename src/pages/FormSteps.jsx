import {
  CheckGroup, RadioGroup, Field, FieldRow,
  Card, SubLabel, Divider,
} from '../components/FormControls'

// ─── Step 0 — Personal Info ───────────────────────────────────────────────────
export function Step0({ form, set }) {
  return (
    <>
      <div style={{
        background: '#EDE5D8',
        borderLeft: '3px solid #B5924C',
        padding: '12px 18px',
        marginBottom: '24px',
        borderRadius: '2px',
        fontSize: '13px',
        color: '#8A7070',
        lineHeight: 1.7,
      }}>
        <strong style={{ color: '#3D1A1A', fontWeight: 600 }}>Statement of Confidentiality: </strong>
        This questionnaire contains confidential information of AnD Design Studio.
        All responses are used exclusively for your project.
      </div>

      <Card label="Personal Information">
        <FieldRow>
          <Field label="Full Name" name="fullName" value={form.fullName} onChange={set} placeholder="Your full name" required />
          <Field label="Phone Number" name="phone" type="tel" value={form.phone} onChange={set} placeholder="+91 00000 00000" required />
        </FieldRow>
        <FieldRow>
          <Field label="Email Address" name="email" type="email" value={form.email} onChange={set} placeholder="you@email.com" required />
          <Field label="City of Project" name="city" value={form.city} onChange={set} placeholder="e.g. Bengaluru" />
        </FieldRow>
        <Field label="Site / Flat Address" name="address" value={form.address} onChange={set} placeholder="Full address of the property" />
      </Card>

      <Card label="Household Profile">
        <SubLabel>Who will be living in this home?</SubLabel>
        <CheckGroup name="household" value={form.household} onChange={set}
          options={['Nuclear Family', 'Joint Family', 'Couple', 'Bachelors', '+ Parents / Elders', 'Pets at Home']} />
        <Divider />
        <FieldRow>
          <Field label="Number of Adults" name="numAdults" value={form.numAdults} onChange={set} placeholder="e.g. 2" />
          <Field label="Children / Ages" name="childrenAges" value={form.childrenAges} onChange={set} placeholder="e.g. 8, 12 years" />
        </FieldRow>
        <Field label="Occupations" name="occupations" value={form.occupations} onChange={set} placeholder="e.g. Software Engineer, Architect" />
        <SubLabel>Work from home?</SubLabel>
        <RadioGroup name="workFromHome" value={form.workFromHome} onChange={set}
          options={['Yes — full time', 'Occasionally / Hybrid', 'No']} />
      </Card>
    </>
  )
}

// ─── Step 1 — Project Overview ────────────────────────────────────────────────
export function Step1({ form, set }) {
  return (
    <>
      <Card label="Property Details">
        <FieldRow>
          <Field label="Configuration" name="configuration" value={form.configuration} onChange={set} placeholder="e.g. 3BHK, Duplex, Villa" />
          <Field label="Approximate Area (sq ft)" name="area" value={form.area} onChange={set} placeholder="e.g. 1800" />
        </FieldRow>
        <FieldRow>
          <Field label="Floor Number / Tower" name="floorTower" value={form.floorTower} onChange={set} placeholder="e.g. 12th / Tower A" />
          <div>
            <SubLabel>Current Status</SubLabel>
            <RadioGroup name="currentStatus" value={form.currentStatus} onChange={set}
              options={['Bare', 'Semi-furnished', 'Renovation']} />
          </div>
        </FieldRow>
      </Card>

      <Card label="Scope of Work">
        <SubLabel>Which spaces are you looking to design?</SubLabel>
        <CheckGroup name="spaces" value={form.spaces} onChange={set}
          options={['Foyer / Entry', 'Living Room', 'Dining Area', 'Kitchen', 'Master Bedroom',
            'Bedroom 2', 'Bedroom 3', 'Kids Room / Study', 'Puja Room', 'Bathrooms', 'Balcony',
            'Full Home (All Spaces)']} />
        <Divider />
        <SubLabel>Project Type</SubLabel>
        <RadioGroup name="projectType" value={form.projectType} onChange={set}
          options={['Turnkey (Design + Execute)', 'Design Only (Drawings + BOQ)', 'Partial (Selected rooms)']} />
        <Divider />
        <SubLabel>Changes & Additions</SubLabel>
        <CheckGroup name="changes" value={form.changes} onChange={set}
          options={['Civil changes', 'Electrical changes', 'Fire sprinkler positioning',
            'Window position changes', 'Main doors & other Doors', 'Safety door']} />
      </Card>
    </>
  )
}

// ─── Step 2 — Budget & Timeline ───────────────────────────────────────────────
export function Step2({ form, set }) {
  return (
    <>
      <Card label="Budget">
        <SubLabel>Total budget range</SubLabel>
        <RadioGroup name="budgetRange" value={form.budgetRange} onChange={set}
          options={['10–15 Lakhs', '15–20 Lakhs', '20–30 Lakhs', '30+ Lakhs', "Let's discuss"]} />
        <Divider />
        <SubLabel>Budget flexibility</SubLabel>
        <RadioGroup name="budgetFlexibility" value={form.budgetFlexibility} onChange={set}
          options={['Fixed — cannot exceed', 'Slightly flexible (±10–15%)', 'Quality first — open if justified']} />
      </Card>

      <Card label="Timeline">
        <SubLabel>Expected move-in / handover</SubLabel>
        <RadioGroup name="timeline" value={form.timeline} onChange={set}
          options={['1–3 Months', '3–6 Months', '6 Months+']} />
        <Divider />
        <FieldRow>
          <Field label="Target Date (approx.)" name="targetDate" type="date" value={form.targetDate} onChange={set} />
          <Field label="Fixed Event / Deadline" name="fixedEvent" value={form.fixedEvent} onChange={set}
            placeholder="e.g. Griha Pravesh, Marriage" />
        </FieldRow>
      </Card>
    </>
  )
}

// ─── Step 3 — Design Preferences ─────────────────────────────────────────────
export function Step3({ form, set }) {
  return (
    <>
      <Card label="Style & Aesthetic">
        <SubLabel>Overall style preference</SubLabel>
        <CheckGroup name="stylePreference" value={form.stylePreference} onChange={set}
          options={['Modern / Contemporary', 'Minimalist', 'Classic / Traditional',
            'Transitional', 'Indo-Western Fusion', 'Open to Suggestions']} />
        <Divider />
        <SubLabel>Colour palette leaning</SubLabel>
        <CheckGroup name="colorPalette" value={form.colorPalette} onChange={set}
          options={['Neutrals (White, Beige, Greige)', 'Earthy Tones', 'Bold Accents',
            'Monochromes', 'Pastels', 'Suggest for us']} />
        <Divider />
        <Field label="Colours you absolutely do NOT want" name="colorsNotWanted"
          value={form.colorsNotWanted} onChange={set} placeholder="e.g. Yellow, Neon green" textarea />
        <Field label="Reference images / inspirations (Pinterest, Instagram, designer names)"
          name="references" value={form.references} onChange={set}
          placeholder="Paste links or mention names / styles you love" textarea />
      </Card>

      <Card label="Material & Finish Preference">
        <SubLabel>Finish preferences</SubLabel>
        <CheckGroup name="finishPreference" value={form.finishPreference} onChange={set}
          options={['Matte', 'Satin / Semi-Gloss', 'High Gloss', 'Wood Veneer',
            'Lacquer / PU', 'Textured', 'Mix of finishes', 'PU/DUCO', 'Open to Suggestions']} />
        <Divider />
        <SubLabel>Flooring preference</SubLabel>
        <CheckGroup name="flooringPreference" value={form.flooringPreference} onChange={set}
          options={['Vitrified Tiles', 'Marble / Granite', 'Wooden / Laminate',
            'Herringbone / Pattern', 'Existing (retain)', 'Already done']} />
      </Card>
    </>
  )
}

// ─── Step 4 — Space Requirements ─────────────────────────────────────────────
export function Step4({ form, set }) {
  return (
    <>
      <Card label="Living & Dining">
        <SubLabel>Seating preference</SubLabel>
        <CheckGroup name="seating" value={form.seating} onChange={set}
          options={['L-Shape Sofa', '3+2+1 Sofa Set', 'Sectional/Modular', 'Mix']} />
        <Divider />
        <SubLabel>TV Unit</SubLabel>
        <CheckGroup name="tvUnit" value={form.tvUnit} onChange={set}
          options={['Wall-mounted floating', 'Floor unit with storage', 'Feature wall panel', 'No TV unit']} />
        <Divider />
        <SubLabel>Dining table seating capacity</SubLabel>
        <RadioGroup name="diningSeats" value={form.diningSeats} onChange={set}
          options={['4-seater', '6-seater', '8-seater', 'Extendable']} />
        <Divider />
        <SubLabel>Loose furniture</SubLabel>
        <CheckGroup name="looseFurniture" value={form.looseFurniture} onChange={set}
          options={['Nested Tables', 'Indoor planters', 'Side tables', 'Crockery unit', 'Vanity Sink']} />
      </Card>

      <Card label="Kitchen">
        <SubLabel>Platform / counter preference</SubLabel>
        <CheckGroup name="kitchenCounter" value={form.kitchenCounter} onChange={set}
          options={['Granite', 'Quartz', 'Acrylic shutters', 'Laminate shutters', 'Membrane / PU']} />
        <Divider />
        <SubLabel>Layout type</SubLabel>
        <RadioGroup name="kitchenLayout" value={form.kitchenLayout} onChange={set}
          options={['L-Shape', 'U-Shape', 'Parallel/Galley', 'Open Kitchen', 'Island / Breakfast Counter']} />
        <Divider />
        <SubLabel>Cooking habits</SubLabel>
        <CheckGroup name="cookingHabits" value={form.cookingHabits} onChange={set}
          options={['Daily home cooking', 'Heavy cooking', 'Minimal / Simple', 'Baking enthusiast', 'Frequent entertaining']} />
        <Divider />
        <SubLabel>Appliances to accommodate</SubLabel>
        <CheckGroup name="appliances" value={form.appliances} onChange={set}
          options={['Chimney', 'Built-in Oven', 'Microwave', 'Dishwasher', 'Refrigerator', 'Water Purifier']} />
        <Divider />
        <SubLabel>Utility / Dry Kitchen required?</SubLabel>
        <RadioGroup name="utilityKitchen" value={form.utilityKitchen} onChange={set}
          options={['Yes', 'No', 'If space permits']} />
      </Card>

      <Card label="Master Bedroom">
        <SubLabel>Bed size</SubLabel>
        <RadioGroup name="masterBedSize" value={form.masterBedSize} onChange={set}
          options={['King (6×6.5 ft)', 'Queen (5×6.5 ft)', 'As per space']} />
        <Divider />
        <SubLabel>Wardrobe requirements</SubLabel>
        <CheckGroup name="wardrobeReq" value={form.wardrobeReq} onChange={set}
          options={['Walk-in wardrobe', 'Built-in wardrobe', 'Sliding shutters', 'Swing shutters', 'With mirror', 'With vanity area']} />
        <Divider />
        <SubLabel>Master bathroom</SubLabel>
        <CheckGroup name="masterBathroom" value={form.masterBathroom} onChange={set}
          options={['Glass Shower separator', 'Faucets / Hardware', 'Vanity Cabinet', 'Tiles Work', 'Mirror', 'Bath Accessories']} />
        <Divider />
        <SubLabel>Additionals in bedroom</SubLabel>
        <CheckGroup name="bedroomAdditionals" value={form.bedroomAdditionals} onChange={set}
          options={['Window seater', 'Lounge chair', 'Bench', 'Dresser Unit', 'Study Unit', 'TV Unit']} />
      </Card>

      <Card label="Bedrooms 2 & 3">
        <FieldRow>
          <div>
            <SubLabel>Bedroom 2 — Who will use it?</SubLabel>
            <RadioGroup name="bedroom2User" value={form.bedroom2User} onChange={set}
              options={['Kids', 'Parents', 'Guest Room']} />
          </div>
          <div>
            <SubLabel>Bedroom 3 — Who will use it?</SubLabel>
            <RadioGroup name="bedroom3User" value={form.bedroom3User} onChange={set}
              options={['Kids', 'Parents', 'Guest Room']} />
          </div>
        </FieldRow>
        <Divider />
        <SubLabel>Kids room requirements</SubLabel>
        <CheckGroup name="kidsRoomReq" value={form.kidsRoomReq} onChange={set}
          options={['Study table + bookshelf', 'Bunk bed', 'Theme-based design', 'Chalkboard / Whiteboard', 'Twin Bed']} />
        <Field label="Additional notes for secondary bedrooms" name="bedroomNotes"
          value={form.bedroomNotes} onChange={set} textarea placeholder="Any specific requirements..." />
      </Card>

      <Card label="Foyer, Balcony & Other Spaces">
        <SubLabel>Foyer requirements</SubLabel>
        <CheckGroup name="foyer" value={form.foyer} onChange={set}
          options={['Shoe cabinet / seating', 'Console + mirror', 'Decorative feature wall', 'Key / mail storage', 'Keep minimal']} />
        <Divider />
        <SubLabel>Balcony usage</SubLabel>
        <CheckGroup name="balcony" value={form.balcony} onChange={set}
          options={['Sit-out / lounge', 'Garden / plants', 'Multipurpose', 'Utility / washing', 'Skip']} />
        <Divider />
        <SubLabel>Puja / Prayer space</SubLabel>
        <CheckGroup name="puja" value={form.puja} onChange={set}
          options={['Dedicated Puja room', 'Puja unit in Living', 'Puja unit in Kitchen', 'Puja with crockery', 'Skip']} />
        <SubLabel>Puja Style</SubLabel>
        <CheckGroup name="pujaStyle" value={form.pujaStyle} onChange={set}
          options={['Swing Glass Shutters', 'Solid Wood carved door', 'Foldable Door', 'Stone backdrop', 'Ply Backdrop']} />
      </Card>
    </>
  )
}

// ─── Step 5 — Electrical & Lighting ──────────────────────────────────────────
export function Step5({ form, set }) {
  return (
    <>
      <Card label="Air Conditioning & Electrical">
        <SubLabel>Air conditioner type</SubLabel>
        <CheckGroup name="acType" value={form.acType} onChange={set}
          options={['Split AC', 'Cassette AC', 'Central', 'Existing']} />
        <Divider />
        <SubLabel>Electrical appliances (to plan points for)</SubLabel>
        <CheckGroup name="electricalAppliances" value={form.electricalAppliances} onChange={set}
          options={['Geysers', 'Fans', 'Lights']} />
      </Card>

      <Card label="False Ceiling">
        <SubLabel>Scope</SubLabel>
        <CheckGroup name="falseCeiling" value={form.falseCeiling} onChange={set}
          options={['Full home — all rooms', 'Living + dining only', 'All bedrooms too', 'Toilet', 'No false ceiling']} />
        <Divider />
        <SubLabel>Material preference</SubLabel>
        <CheckGroup name="falseCeilingMaterial" value={form.falseCeilingMaterial} onChange={set}
          options={['Gypsum Board', 'POP (Plaster of Paris)', 'Grid / Armstrong tiles', 'Wood / Veneer panels', 'Mirror ceiling', 'As per design']} />
        <Divider />
        <SubLabel>Design style</SubLabel>
        <CheckGroup name="falseCeilingDesign" value={form.falseCeilingDesign} onChange={set}
          options={['Flat / Simple band', 'Curved ceiling', 'Feature ceiling', 'Exposed / Industrial']} />
      </Card>

      <Card label="Lighting Design">
        <SubLabel>Lighting mood</SubLabel>
        <RadioGroup name="lightingMood" value={form.lightingMood} onChange={set}
          options={['Warm / Cozy', 'Bright / Clinical', 'Layered (ambient + task + accent)',
            'Natural light-focused', 'Dramatic / Moody']} />
        <Divider />
        <SubLabel>Fixture preferences</SubLabel>
        <CheckGroup name="fixturePreference" value={form.fixturePreference} onChange={set}
          options={['Recessed / Spotlights', 'LED Cove / Strip', 'Pendant lights',
            'Chandelier', 'Track lighting', 'Table / floor lamps', 'Wall sconces', 'Surface lights']} />
        <Divider />
        <SubLabel>Dimmer / scene-setting required?</SubLabel>
        <RadioGroup name="dimmer" value={form.dimmer} onChange={set}
          options={['Yes — living room', 'Yes — master bedroom', 'Not required']} />
      </Card>

      <Card label="Home Automation & Smart Features">
        {[
          { label: 'Smart lighting (Alexa / Google Home compatible switches)', name: 'smartLighting' },
          { label: 'Smart curtains / motorized blinds', name: 'smartCurtains' },
          { label: 'Smart door lock / video doorbell', name: 'smartDoorLock' },
          { label: 'Smart AC / thermostat control', name: 'smartAC' },
          { label: 'Whole home automation hub', name: 'homeHub' },
        ].map(({ label, name }) => (
          <div key={name} style={{ marginBottom: 20 }}>
            <SubLabel>{label}</SubLabel>
            <RadioGroup name={name} value={form[name]} onChange={set} options={['Yes', 'No']} />
          </div>
        ))}
        <Field label="Brand / system preferences (Schneider, Wipro, Legrand, Alexa...)"
          name="brandPref" value={form.brandPref} onChange={set}
          placeholder="e.g. Legrand, Google Home, Schneider" />
      </Card>
    </>
  )
}

// ─── Step 6 — Assets & Priorities ────────────────────────────────────────────
export function Step6({ form, set }) {
  return (
    <>
      <Card label="Existing Furniture to Retain">
        <SubLabel>Do you have existing furniture to incorporate?</SubLabel>
        <RadioGroup name="existingFurniture" value={form.existingFurniture} onChange={set}
          options={['Yes — a few key pieces', 'Yes — significant amount', 'No — fresh start']} />
        <Field label="List furniture / items to retain (include approx. dimensions)"
          name="furnitureList" value={form.furnitureList} onChange={set} textarea
          placeholder="e.g. Teak dining table 6×3 ft, Antique sofa set..." />
        <Field label="Heirloom pieces, artworks or décor to be showcased"
          name="heirlooms" value={form.heirlooms} onChange={set} textarea
          placeholder="Describe pieces you'd like to highlight or build around..." />
      </Card>

      <Card label="Lifestyle & Functional Priorities">
        {[
          { label: 'Easy maintenance — anti-scratch, easy-clean surfaces preferred', name: 'easyMaintenance' },
          { label: 'Storage is top priority — maximize concealed storage everywhere', name: 'storageFirst' },
          { label: 'Vastu compliance is important — design guided by Vastu Shastra', name: 'vastu' },
          { label: 'Energy efficiency / sustainable materials — eco-friendly, low VOC', name: 'ecoFriendly' },
          { label: 'Senior / elderly friendly — anti-slip, grab bars, accessible layouts', name: 'elderlyFriendly' },
        ].map(({ label, name }) => (
          <div key={name} style={{ marginBottom: 20 }}>
            <SubLabel>{label}</SubLabel>
            <RadioGroup name={name} value={form[name]} onChange={set} options={['Yes', 'No']} />
          </div>
        ))}
      </Card>
    </>
  )
}

// ─── Step 7 — Final Details ───────────────────────────────────────────────────
export function Step7({ form, set }) {
  return (
    <>
      <Card label="Wall Treatments & Surfaces">
        <SubLabel>Wall finish preferences</SubLabel>
        <CheckGroup name="wallFinish" value={form.wallFinish} onChange={set}
          options={['Plain paint', 'Textured paint', 'Wallpaper', 'Mix — feature wall only']} />
        <Divider />
        <SubLabel>Feature / accent wall — which rooms?</SubLabel>
        <CheckGroup name="accentWalls" value={form.accentWalls} onChange={set}
          options={['Living room (behind sofa)', 'TV wall', 'Dining area',
            'Master bed headboard wall', 'Kids room', 'Foyer / Entry', 'No feature walls']} />
        <Divider />
        <SubLabel>Window covering preference</SubLabel>
        <CheckGroup name="windowCovering" value={form.windowCovering} onChange={set}
          options={['Curtains only', 'Roman blinds', 'Roller blinds',
            'Wooden / Venetian blinds', 'Sheer + blackout curtains', 'Motorized blinds']} />
        <Divider />
        <SubLabel>Soft furnishing interest (in scope?)</SubLabel>
        <CheckGroup name="softFurnishing" value={form.softFurnishing} onChange={set}
          options={['Carpets', 'Runner / placemats', 'Sofa Cushions', 'Ottomen',
            'Bed linen / throws', 'Bed Upholstery', 'Handle Separately']} />
      </Card>

      <Card label="Décor & Styling Personality">
        <SubLabel>What level of décor and accessories do you prefer?</SubLabel>
        <RadioGroup name="decorLevel" value={form.decorLevel} onChange={set}
          options={['Minimal — clean, curated, very few objects',
            'Balanced — thoughtful mix of art + objects',
            'Layered — rich, collected, lived-in feel']} />
        <Divider />
        <SubLabel>Décor elements you love</SubLabel>
        <CheckGroup name="decorElements" value={form.decorElements} onChange={set}
          options={['Indoor plants', 'Framed art', 'Books / display shelves',
            'Ceramic / pottery', 'Sculptures', 'Travel souvenirs',
            'Mirrors as décor', 'Metal accents (brass / copper)']} />
      </Card>

      <Card label="How You Want to Feel in Your Home">
        <SubLabel>When you walk in, you want to feel...</SubLabel>
        <CheckGroup name="homeFeel" value={form.homeFeel} onChange={set}
          options={['Calm and de-stressed', 'Energised and inspired', 'Warm and cocooned', 'Light, airy and open']} />
        <Divider />
        <Field label="Describe your dream home in 3 words" name="dreamWords"
          value={form.dreamWords} onChange={set} placeholder="e.g. Serene. Warm. Timeless." />
        <Field label="One design detail you've always wanted but never had" name="wishDetail"
          value={form.wishDetail} onChange={set} textarea placeholder="Your dream feature..." />
        <Field label="Something from your current home you do NOT want to repeat" name="notRepeat"
          value={form.notRepeat} onChange={set} textarea placeholder="What to avoid this time..." />
      </Card>
    </>
  )
}

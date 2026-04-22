# AnD Studio — Discovery Questionnaire
### Full-stack React app · Google Sheets backend · Branded PDF · Deployed on Vercel

---

## Project Structure

```
and-questionnaire/
├── api/
│   └── submit.js            ← Vercel serverless function (Google Sheets write)
├── src/
│   ├── components/
│   │   ├── FormControls.jsx  ← CheckGroup, RadioGroup, Field, Card
│   │   ├── FormControls.module.css
│   │   ├── Header.jsx
│   │   ├── Header.module.css
│   │   ├── StepNav.jsx       ← Progress bar + step tabs
│   │   └── StepNav.module.css
│   ├── lib/
│   │   ├── schema.js         ← Form fields, sheet headers, row mapper
│   │   └── pdfGenerator.jsx  ← @react-pdf/renderer branded PDF
│   ├── pages/
│   │   ├── FormPage.jsx      ← Main 8-step form orchestrator
│   │   ├── FormPage.module.css
│   │   ├── FormSteps.jsx     ← All 8 step components
│   │   ├── SuccessPage.jsx
│   │   ├── SuccessPage.module.css
│   │   ├── SubmissionsPage.jsx
│   │   └── SubmissionsPage.module.css
│   ├── styles/
│   │   └── global.css        ← Brand tokens (CSS vars), reset, animations
│   ├── App.jsx               ← Router + global state
│   └── main.jsx              ← React entry point
├── public/
│   └── favicon.svg
├── index.html
├── vite.config.js
├── vercel.json
├── package.json
├── .env.example
└── .gitignore
```

---

## STEP 1 — Install & Run Locally

```bash
# Clone or create the project folder, then:
npm install
cp .env.example .env        # Fill in your credentials (see Step 2)
npm run dev                 # Opens at http://localhost:3000
```

---

## STEP 2 — Google Cloud Setup (One-time)

### 2A — Create a Google Cloud Project
1. Go to https://console.cloud.google.com
2. Click **Select a project → New Project**
3. Name it `and-studio-questionnaire` → Create

### 2B — Enable APIs
1. In the project, go to **APIs & Services → Library**
2. Search and enable: **Google Sheets API**
3. Search and enable: **Google Drive API**

### 2C — Create a Service Account
1. Go to **APIs & Services → Credentials**
2. Click **+ Create Credentials → Service Account**
3. Name: `and-sheets-writer` → Create and Continue → Done
4. Click the service account email → **Keys** tab
5. **Add Key → Create new key → JSON** → Download the file
6. Open the JSON file — you need:
   - `client_email` → your `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key`  → your `GOOGLE_PRIVATE_KEY`

### 2D — Create & Share your Google Sheet
1. Go to https://sheets.google.com → Create a new spreadsheet
2. Name it `AnD Studio — Submissions`
3. Copy the Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/10WPoqIbYNzYtUv2JKYdoZbWe9wM82nVJSVeLI-RNUJY/edit
   ```
4. Click **Share** → paste your service account email → **Editor** → Share

---

## STEP 3 — Configure Environment Variables

### Local `.env` file:
```env
GOOGLE_SHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=and-sheets-writer@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nYOUR KEY HERE\n-----END RSA PRIVATE KEY-----"
```

> ⚠️ The `GOOGLE_PRIVATE_KEY` must be wrapped in double quotes.
> Replace literal newlines in the key with `\n`.

---

## STEP 4 — Deploy to Vercel

### 4A — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit — AnD Studio Questionnaire"
git remote add origin https://github.com/YOUR_USERNAME/and-questionnaire.git
git push -u origin main
```

### 4B — Deploy on Vercel
```bash
npm install -g vercel
vercel
```
Follow the prompts:
- Link to existing project? **No**
- Project name: `and-questionnaire`
- Build command: `npm run build`
- Output directory: `dist`
- Framework: `Vite`

### 4C — Add Environment Variables in Vercel Dashboard
1. Go to https://vercel.com/dashboard → your project
2. **Settings → Environment Variables**
3. Add all three variables:
   - `GOOGLE_SHEET_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
4. Set scope: **Production + Preview + Development**
5. Click **Save** → **Redeploy** the project

---

## STEP 5 — Custom Domain (Optional)

1. In Vercel Dashboard → **Settings → Domains**
2. Add your domain: `questionnaire.anddesignstudio.com`
3. Vercel shows you the DNS records to add
4. In your domain registrar (GoDaddy, Namecheap, etc.) → add the CNAME record
5. Done — SSL is automatic

---

## How It Works — Data Flow

```
Client opens URL
      ↓
Fills 8-step React form (client-side, no data sent yet)
      ↓
Clicks "Submit Questionnaire"
      ↓
POST /api/submit  →  Vercel Serverless Function
      ↓
Google Sheets API  →  Appends row to your spreadsheet
      ↓
@react-pdf/renderer  →  Generates branded 3-page PDF
      ↓
PDF auto-downloads to client's device
      ↓
Redirect to /success page
```

---

## How Sheets Are Organised

Headers are auto-created on the first submission:

| Col A | Col B | Col C | Col D | ... |
|-------|-------|-------|-------|-----|
| Timestamp | Full Name | Phone | Email | ... |
| 22/04/2026 | Rohit Sharma | +91 98... | rohit@... | ... |

Each submission = one row. You can filter, sort, export to PDF from Sheets.

---

## Local Development Notes

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

The `/api/submit.js` serverless function only runs on Vercel.
To test it locally, use `vercel dev` instead of `npm run dev`:

```bash
npm install -g vercel
vercel dev       # Runs both React + API locally at localhost:3000
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Routing | React Router v6 |
| Styling | CSS Modules + CSS variables |
| PDF | @react-pdf/renderer |
| Backend | Vercel Serverless Functions |
| Database | Google Sheets via googleapis |
| Hosting | Vercel (free tier) |

---

## Support

**AnD Design Studio**
+91 93988 14073 · Let Us Create Your Dream Home Together

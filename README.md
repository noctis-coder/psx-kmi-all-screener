# 📊 PSX KMI-All Investment Screener

> A full-stack stock screening and fundamental analysis platform for companies listed on the **Pakistan Stock Exchange (PSX)**.

The **PSX KMI-All Investment Screener** provides investors and traders with a structured way to explore PSX-listed companies, filter stocks by sector, access live market information, and generate AI-assisted interpretations of company fundamentals.

The project combines a **Chrome Extension frontend**, a **REST API backend**, live PSX data extraction, and an extensible AI analysis layer.

---

## ✨ Features

### 🔎 Stock Screening

* Browse companies listed in the PSX KMI-All Share universe
* Filter companies by sector
* View live market information
* Search and analyze individual companies
* Sector-wise company counts and summaries

### 📊 Fundamental Analysis

The screener is designed to surface important fundamental indicators such as:

* Market Price
* P/E Ratio
* EPS
* Dividend Yield
* Market Capitalization
* ROI
* Debt-to-Equity
* Other available company fundamentals

> Data availability depends on what is currently provided by the underlying PSX/company data sources.

### 🤖 AI-Assisted Interpretation

The platform includes an AI analysis layer that converts available financial information into a more understandable interpretation for the user.

The architecture separates:

* Data collection
* Financial data processing
* AI interpretation
* Frontend presentation

This allows the AI provider to be replaced or extended without redesigning the entire application.

### 🌐 Live PSX Data

The backend uses a live PSX data provider to retrieve market and sector information.

The live provider currently handles:

* PSX market-watch data
* KMI-All Share filtering
* Sector-wise information
* Company-level information
* P/E Ratio extraction
* Sector mapping

### ⚡ REST API

The backend exposes API endpoints for frontend and external clients.

Example endpoints:

```text
GET /api/health
POST /api/analyze
```

The health endpoint provides information about the current:

* Data provider
* AI provider
* Data mode
* Provider configuration
* Provider status

### 🧩 Chrome Extension

The screener is designed to work through a Chrome Extension interface, allowing users to interact with the screening and analysis functionality directly from the browser.

---

## 🏗️ Architecture

```text
┌──────────────────────────────┐
│       Chrome Extension       │
│          Frontend            │
└──────────────┬───────────────┘
               │
               │ HTTPS / REST API
               ▼
┌──────────────────────────────┐
│        Backend API           │
│                              │
│  ┌────────────────────────┐  │
│  │ Stock Screening        │  │
│  │ Company Analysis       │  │
│  │ Sector Filtering       │  │
│  │ AI Interpretation      │  │
│  └────────────────────────┘  │
└──────────────┬───────────────┘
               │
       ┌───────┴────────┐
       ▼                ▼
┌─────────────┐  ┌─────────────┐
│ PSX Portal  │  │ AI Provider │
│ Live Data   │  │    Layer    │
└─────────────┘  └─────────────┘
```

The architecture is intentionally provider-based so that additional financial data sources and AI providers can be integrated later.

---

## 🗂️ Data Provider Architecture

The backend supports a provider-based data architecture.

Currently available:

```text
PSX Portal
     │
     ▼
Live Market Data
     │
     ├── Market Watch
     ├── KMI-All Share
     ├── Sector Data
     └── Company Data
```

The provider abstraction makes it possible to introduce additional sources in the future without tightly coupling the application to a single data provider.

Potential future sources include:

* Business Recorder
* TradingView
* Investify
* WSJ Markets
* Company annual reports

---

## 🧠 AI Analysis Architecture

The AI layer is separated from the market-data layer.

```text
PSX Data
   │
   ▼
Financial Metrics
   │
   ▼
Analysis Engine
   │
   ▼
AI Provider
   │
   ▼
Investor-Friendly Interpretation
```

This allows the application to evolve from a simple data screener into a more comprehensive financial research assistant.

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* Chrome Extension APIs
* Manifest V3

### Backend

* Node.js
* Express.js
* REST API
* Provider-based architecture

### Data

* Pakistan Stock Exchange (PSX) Portal
* Live market-watch data
* Sector-wise PSX data

### Deployment

* Cloudflare Workers
* HTTPS API
* `workers.dev` deployment

---

## 🔌 API

### Health Check

```http
GET /api/health
```

Example response:

```json
{
  "ok": true,
  "aiProvider": "mock",
  "dataProvider": "psx_portal",
  "dataMode": "live",
  "providerConfigured": true,
  "providerStatus": "live"
}
```

### Stock Analysis

```http
POST /api/analyze
```

The analysis endpoint processes the requested company information and returns the available financial data together with the configured analysis output.

---

## 📈 Supported Sector Data

The backend is capable of retrieving sector-wise PSX information, including sectors such as:

* Commercial Banks
* Textile Spinning
* Miscellaneous
* Transport
* Property
* Vanaspati & Allied
* Glass & Ceramics
* Paper & Board
* And other PSX sectors available through the portal

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_REPOSITORY_NAME>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file if your deployment requires environment-specific configuration.

Example:

```env
DATA_PROVIDER=psx_portal
AI_PROVIDER=mock
```

### 4. Start the backend

```bash
npm start
```

For development:

```bash
npm run dev
```

### 5. Load the Chrome Extension

1. Open Chrome
2. Navigate to:

```text
chrome://extensions
```

3. Enable **Developer mode**
4. Select **Load unpacked**
5. Choose the extension directory

---

## ☁️ Cloudflare Worker Deployment

The backend can be deployed using Cloudflare Workers.

Local development:

```bash
npx wrangler dev --local --port 8787
```

Authentication:

```bash
npx wrangler login
```

Deployment:

```bash
npx wrangler deploy
```

The production API can then be consumed by the Chrome Extension through HTTPS.

---

## 🔐 Configuration

The backend uses provider configuration to determine how financial data and AI analysis are supplied.

Example:

```text
DATA_PROVIDER = psx_portal
AI_PROVIDER   = mock
```

This makes the system easier to maintain and extend as additional providers are introduced.

---

## 🧪 Tested Data

The live PSX provider has been tested against multiple sectors, including:

| Sector             | Example Records |
| ------------------ | --------------: |
| Textile Spinning   |              31 |
| Miscellaneous      |              17 |
| Transport          |               6 |
| Property           |               5 |
| Vanaspati & Allied |               1 |
| Glass & Ceramics   |               7 |
| Paper & Board      |              10 |
| Commercial Banks   |              19 |

The live market-watch parser has also been tested against hundreds of PSX market rows.

---

## 🗺️ Roadmap

### Completed

* [x] PSX market-watch integration
* [x] KMI-All Share filtering
* [x] Sector-wise filtering
* [x] Live PSX provider
* [x] P/E Ratio extraction
* [x] Company analysis endpoint
* [x] Health monitoring endpoint
* [x] Provider-based backend architecture
* [x] Chrome Extension integration
* [x] Cloudflare Worker deployment

### Planned

* [ ] Additional financial data providers
* [ ] Historical price analysis
* [ ] Advanced fundamental scoring
* [ ] Dividend analysis
* [ ] Financial statement analysis
* [ ] Company annual-report extraction
* [ ] Portfolio tracking
* [ ] Watchlists
* [ ] Improved AI-powered investment reports
* [ ] Automated data-quality validation
* [ ] More advanced technical indicators

---

## ⚠️ Data Disclaimer

This project is intended for **educational, research, and informational purposes**.

Financial information may be incomplete, delayed, unavailable, or subject to changes in the underlying data sources.

AI-generated interpretations should not be considered financial advice or a substitute for independent investment research.

Always verify important financial information against authoritative sources before making investment decisions.

---

## 👩‍💻 Author

**Ayesha Noor**

Computer Science Student • Full-Stack Developer • AI & Financial Technology Enthusiast

GitHub: **[@noctis-coder](https://github.com/noctis-coder)**

---

## 📄 License

This project is currently under development.

License information will be added as the project reaches its public release stage.

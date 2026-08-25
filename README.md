# 📊 PSX KMI-All Investment Screener

> A full-stack stock screening and fundamental analysis platform for companies listed on the **Pakistan Stock Exchange (PSX)**.

The **PSX KMI-All Investment Screener** provides a structured interface for exploring PSX-listed companies, filtering stocks by sector, retrieving live market data, and generating AI-assisted interpretations of available financial information.
<img width="1600" height="900" alt="psx" src="https://github.com/user-attachments/assets/feb9f39a-f307-49b8-8984-2a1888ad631a" />

The project combines a **Chrome Extension frontend**, **Node.js/Express backend**, **live PSX data extraction**, and a **provider-based analysis architecture** designed for future expansion.

---

## ✨ Features

### 🔎 Stock Screening

* Browse companies within the **PSX KMI-All Share** universe
* Filter companies by sector
* Search and analyze individual companies
* Retrieve live market-watch information
* Display sector-wise company data and counts
* Filter PSX market data specifically for KMI-All Share constituents

### 📊 Fundamental Metrics

The platform extracts and processes available financial indicators, including:

* Market Price
* P/E Ratio
* EPS
* Dividend Yield
* Market Capitalization
* ROI
* Debt-to-Equity
* Other available company fundamentals

> Metric availability depends on the underlying PSX and company data sources.

### 🤖 AI-Assisted Analysis

The backend includes a dedicated analysis layer for transforming available financial information into a more understandable interpretation.

The architecture separates:

```text
Market Data
     ↓
Financial Metrics
     ↓
Analysis Layer
     ↓
AI Provider
     ↓
User-Facing Interpretation
```

The AI provider is configurable, allowing the analysis layer to be replaced or extended without restructuring the rest of the application.

> The current deployment uses a configurable provider architecture; AI output can be extended with a production AI provider in future iterations.

### 🌐 Live PSX Data

The live PSX provider currently supports:

* PSX market-watch data
* KMI-All Share filtering
* Sector-wise data
* Company-level information
* P/E Ratio extraction
* PSX sector mapping

The provider has been tested against hundreds of PSX market-watch records and multiple sector datasets.

### ⚡ REST API

The backend exposes REST endpoints for the Chrome Extension and other potential clients.

Current endpoints include:

```http
GET  /api/health
POST /api/analyze
```

The health endpoint reports:

* Active data provider
* Active AI provider
* Data mode
* Provider configuration
* Provider status

### 🧩 Chrome Extension

The frontend is implemented as a **Chrome Extension using Manifest V3**, providing a browser-based interface for stock screening and company analysis.

---

## 🏗️ Architecture

```text
┌───────────────────────────────┐
│        Chrome Extension       │
│          Frontend             │
│          Manifest V3          │
└───────────────┬───────────────┘
                │
                │ HTTPS / REST
                ▼
┌───────────────────────────────┐
│          Backend API          │
│        Node.js / Express      │
│                               │
│  ┌─────────────────────────┐  │
│  │ Stock Screening         │  │
│  │ Sector Filtering        │  │
│  │ Company Analysis        │  │
│  │ Financial Processing    │  │
│  │ AI Interpretation       │  │
│  └─────────────────────────┘  │
└───────────────┬───────────────┘
                │
        ┌───────┴────────┐
        ▼                ▼
┌──────────────┐  ┌──────────────┐
│  PSX Portal  │  │ AI Provider  │
│  Live Data   │  │    Layer     │
└──────────────┘  └──────────────┘
```

The system follows a **provider-based architecture**, reducing coupling between the application and external data or AI services.

This makes it possible to introduce additional providers without redesigning the core application.

---

## 🗂️ Data Provider Architecture

The backend abstracts external financial data behind a provider layer.

### Current Provider

```text
PSX Portal
    │
    ├── Market Watch
    ├── KMI-All Share
    ├── Sector Data
    ├── Company Data
    └── P/E Ratio
```

### Planned Provider Expansion

Potential future data sources include:

* Business Recorder
* TradingView
* Investify
* WSJ Markets
* Company annual reports

This architecture allows additional sources to be integrated independently while keeping the screening logic decoupled from the underlying provider.

---

## 🧠 AI Analysis Architecture

Financial data and AI interpretation are intentionally separated.

```text
PSX Data
    │
    ▼
Data Processing
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

This separation allows the project to evolve from a market screener into a broader financial research platform.

---

## 🛠️ Tech Stack

| Layer              | Technology                  |
| ------------------ | --------------------------- |
| Frontend           | HTML, CSS, JavaScript       |
| Browser Platform   | Chrome Extension API        |
| Extension Standard | Manifest V3                 |
| Backend            | Node.js, Express.js         |
| API                | REST                        |
| Data Source        | Pakistan Stock Exchange     |
| Architecture       | Provider-based architecture |
| Deployment         | Cloudflare Workers          |
| Development        | Wrangler                    |

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

The analysis endpoint processes company information and returns the available financial data together with the configured analysis output.

---

## 📈 Sector Coverage

The live provider has been tested against multiple PSX sectors, including:

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

The market-watch parser has also been tested against **hundreds of live PSX market rows**.

> These figures represent test results from development and are not guaranteed to remain constant as PSX market data changes.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm
* Google Chrome
* Git

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd psx-kmi-all-screener
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file when environment-specific configuration is required.

Example:

```env
DATA_PROVIDER=psx_portal
AI_PROVIDER=mock
```

### 4. Start the Backend

```bash
npm start
```

For development:

```bash
npm run dev
```

### 5. Load the Chrome Extension

1. Open Google Chrome.
2. Navigate to:

```text
chrome://extensions
```

3. Enable **Developer mode**.
4. Select **Load unpacked**.
5. Select the project's Chrome Extension directory.
6. Launch the extension.

---

## ☁️ Cloudflare Workers Deployment

The backend can be deployed using **Cloudflare Workers**.

### Local Development

```bash
npx wrangler dev --local --port 8787
```

### Authenticate Wrangler

```bash
npx wrangler login
```

### Deploy

```bash
npx wrangler deploy
```

After deployment, the Chrome Extension can communicate with the backend through the deployed HTTPS endpoint.

---

## 🔐 Configuration

Provider selection is controlled through environment configuration.

```env
DATA_PROVIDER=psx_portal
AI_PROVIDER=mock
```

### Data Providers

| Provider           | Status     |
| ------------------ | ---------- |
| `psx_portal`       | ✅ Active   |
| Additional sources | 🔄 Planned |

### AI Providers

| Provider               | Status         |
| ---------------------- | -------------- |
| `mock`                 | ✅ Configurable |
| Production AI provider | 🔄 Planned     |

This configuration-based approach makes the backend easier to maintain and extend.

---

## 🗺️ Roadmap

### Completed

* [x] PSX market-watch integration
* [x] KMI-All Share filtering
* [x] Sector-wise filtering
* [x] Live PSX data provider
* [x] PSX sector mapping
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
* [ ] Annual-report data extraction
* [ ] Portfolio tracking
* [ ] Watchlists
* [ ] Automated data-quality validation
* [ ] Advanced technical indicators
* [ ] Production AI-powered investment reports

---

## ⚠️ Data & Investment Disclaimer

This project is intended for **educational, research, and informational purposes only**.

Financial data may be incomplete, delayed, unavailable, or affected by changes in the underlying data sources.

AI-generated interpretations are experimental and should **not** be considered financial advice.

Users should independently verify important financial information against authoritative sources before making investment decisions.

---

## 👩‍💻 Author

**Ayesha Noor**

Computer Science Student • Full-Stack Developer • AI & Financial Technology Enthusiast

GitHub: **@noctis-coder**

---

## 📄 License

This project is currently under active development.

License information will be added when the project reaches its public release stage.


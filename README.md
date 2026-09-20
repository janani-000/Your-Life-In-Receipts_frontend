# 🧾 Your Life, In Receipts

> **Thousands of digital moments. One story waiting to be discovered.**

**Your Life, In Receipts** is a frontend-only interactive data storytelling experience created for **WebRush — 6-Hour Frontend Hackathon**.

Instead of simply displaying a collection of digital-life records, the project transforms disconnected receipts into **patterns, relationships, insights, and stories**.

The experience brings together three different datasets — **Spotify activity, India transactions, and household transactions** — to explore how seemingly unrelated moments can reveal meaningful aspects of a person's digital life.

---

## ✨ The Idea

Digital life is made up of hundreds of small moments:

🎵 A song played late at night  
💳 A purchase made during the day  
🧾 A household transaction  
📍 A recurring activity  
🎬 An entertainment expense  
🔁 A repeated routine  

Individually, these moments may seem insignificant.

But when connected together, they can reveal patterns.

### Our approach

```text
RAW DATA
   ↓
EXPLORATION
   ↓
PATTERNS
   ↓
CONNECTIONS
   ↓
INSIGHTS
   ↓
STORY
```

The goal is not simply to answer:

> **"What happened?"**

but instead:

> **"What does it mean when these moments are viewed together?"**

---

# 🎯 WebRush Challenge

**Challenge:** Your Life, In Receipts

The challenge asks participants to transform a collection of fictional digital-life receipts into a meaningful and interactive story.

The solution must go beyond a simple chronological timeline and provide:

- Exploration of life receipts
- Filtering/search/navigation
- Relationship or pattern discovery
- Interactive storytelling
- Visual representation of the digital journey
- Responsive design

**Your Life, In Receipts** is designed around these requirements.

---

# 📊 Datasets

The project integrates **all three datasets provided for the challenge**.

### 🎵 Spotify Activity

Contains digital music/listening activity.

Used to explore:

- Listening patterns
- Artists and tracks
- Listening frequency
- Time-based activity
- Recurring listening behaviour

---

### 💳 India Transactions

Contains financial transaction records.

Used to explore:

- Transaction activity
- Spending patterns
- Categories
- Merchants
- Financial activity over time

---

### 🧾 Household Transactions

Contains household-level financial/activity records.

Used to explore:

- Daily-life activity
- Household categories
- Recurring expenses
- Spending behaviour
- Activity patterns

---

# 🧠 Core Experience

## 1. Life at a Glance

The opening dashboard provides a high-level view of the digital life represented by the datasets.

Key metrics summarize:

- Listening activity
- Financial transactions
- Household activity
- Overall activity patterns

This gives users an immediate understanding of the scale of the dataset.

---

## 2. Life Pulse

A combined visual timeline brings activity from multiple datasets into one view.

Different activity types can be explored together to identify periods of:

- High activity
- Recurring behaviour
- Changes in patterns
- Cross-dataset relationships

Instead of viewing each dataset in isolation, users can see how different types of activity overlap.

---

## 3. Discover Connections 🔗

The central concept of the experience.

The interface identifies potentially meaningful relationships between different datasets.

For example:

```text
Music Activity
      +
Financial Activity
      +
Household Activity
      ↓
Potential Life Pattern
```

Users can explore connections between:

- Listening and spending
- Entertainment and transactions
- Recurring activities
- Time-based behaviour
- Unusual activity periods

These insights are generated using frontend data processing and heuristic pattern detection.

---

# 📖 Life Chapters

Instead of presenting the data as a basic chronological list, the experience groups meaningful activity into **story-like chapters**.

Examples include:

### Routine

Periods containing repeated or consistent activity.

### Social

Periods where multiple types of activity overlap.

### Entertainment

Periods characterized by music and entertainment-related activity.

### Change

Periods where activity patterns differ significantly from surrounding periods.

### High Activity

Periods containing unusually dense activity across datasets.

These chapters help transform raw records into a narrative that users can explore.

---

# 🔍 Receipt Explorer

Users can explore the underlying records through an interactive receipt explorer.

Features include:

- 🔎 Search
- 🗂 Dataset filtering
- 📅 Date filtering
- 🏷 Category filtering
- 📄 Receipt-style records
- 👆 Interactive details

The explorer allows users to move from a high-level insight back to the individual records that support it.

---

# 🎵 Music Lens

The Music view focuses on Spotify activity.

It provides insights such as:

- Top artists
- Top tracks
- Listening frequency
- Listening periods
- Activity patterns
- Skipping behaviour where available

---

# 💳 Money Lens

The Money view focuses on transaction data.

It provides:

- Transaction counts
- Spending categories
- Merchant activity
- Spending trends
- High-activity periods

---

# 🧾 Daily Life Lens

The Daily Life view focuses on household transactions and recurring activity.

It helps reveal:

- Household spending
- Recurring categories
- Daily-life patterns
- Income/expense relationships where available

---

# 🛠️ Technology

The project is built as a **frontend-only application**.

### Core

- React
- Vite
- JavaScript
- HTML5
- CSS3

### Visualization

- Recharts / frontend visualization libraries

### Data

- Local CSV/JSON datasets
- Client-side data processing

### Development

- Git
- GitHub
- Modern browser-based development tools

---

# 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │   Local Datasets     │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              ↓                ↓                ↓
        ┌───────────┐    ┌────────────┐   ┌──────────────┐
        │  Spotify  │    │   India    │   │  Household   │
        │  Activity │    │Transactions│   │ Transactions │
        └─────┬─────┘    └─────┬──────┘   └──────┬───────┘
              │                │                  │
              └────────────────┼──────────────────┘
                               ↓
                    ┌────────────────────┐
                    │ Client-side Data   │
                    │ Processing Layer   │
                    └─────────┬──────────┘
                              ↓
             ┌─────────────────────────────────┐
             │ Pattern & Connection Detection │
             └───────────────┬─────────────────┘
                             ↓
             ┌─────────────────────────────────┐
             │ Interactive Storytelling Layer │
             └───────────────┬─────────────────┘
                             ↓
        ┌────────────────────────────────────────────┐
        │ Dashboard │ Timeline │ Insights │ Chapters │
        │ Explorer  │ Charts   │ Filters  │ Details  │
        └────────────────────────────────────────────┘
```

---

# 🚫 No Backend

This project intentionally uses **no backend implementation**.

All processing happens within the frontend.

There is:

- ❌ No server
- ❌ No backend API
- ❌ No database
- ❌ No server-side processing
- ✅ Local/static datasets
- ✅ Client-side processing
- ✅ Frontend-only architecture

This follows the WebRush frontend-only requirement.

---

# 📱 Responsive Design

The interface is designed to work across:

- 🖥️ Desktop
- 💻 Laptop
- 📱 Mobile
- 📟 Tablet

Charts, cards, navigation, filters, and story sections adapt to different screen sizes.

---

# ♿ Accessibility

Accessibility considerations include:

- Semantic HTML
- Keyboard-friendly interactions
- Clear visual hierarchy
- Readable typography
- Accessible controls
- Responsive layouts
- Meaningful labels
- Appropriate contrast

---

# ⚡ Performance

Because the datasets contain a large number of records, the application avoids rendering every record simultaneously.

Instead, it uses:

- Aggregated statistics
- Client-side filtering
- Derived summaries
- Selective rendering
- Lightweight visualizations
- Reusable components

This keeps the interface responsive while still allowing users to explore the underlying data.

---

# 🔐 Privacy

The application does not require user accounts or personal information.

The challenge datasets are processed locally in the frontend.

No personal information is intentionally collected or transmitted by the application.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have:

- Node.js installed
- npm installed
- Git installed

---

## Installation

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate into the project:

```bash
cd <PROJECT_FOLDER>
```

Install dependencies:

```bash
npm install
```

---

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at the local development URL shown in the terminal.

---

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# 🌐 Live Demo

**Live Website:**  
`<YOUR_DEPLOYED_WEBSITE_URL>`

**GitHub Repository:**  
`<YOUR_GITHUB_REPOSITORY_URL>`

---

# 📁 Project Structure

```text
src/
│
├── components/
│   ├── Hero
│   ├── LifePulse
│   ├── DiscoverConnections
│   ├── LifeChapters
│   ├── MusicLens
│   ├── MoneyLens
│   ├── DailyLifeLens
│   ├── ReceiptExplorer
│   └── InsightDetails
│
├── data/
│   ├── spotify
│   ├── india-transactions
│   └── household-transactions
│
├── utils/
│   ├── dataProcessing
│   ├── insights
│   ├── connections
│   └── formatting
│
├── App.jsx
└── main.jsx
```

---

# 🧩 Key Features

| Feature | Description |
|---|---|
| 📊 Life Dashboard | High-level overview of digital activity |
| 🫀 Life Pulse | Combined activity visualization |
| 🔗 Connections | Cross-dataset relationship discovery |
| 📖 Life Chapters | Converts patterns into stories |
| 🎵 Music Lens | Spotify activity exploration |
| 💳 Money Lens | Transaction analysis |
| 🧾 Daily Life Lens | Household activity exploration |
| 🔍 Receipt Explorer | Search and filter individual records |
| 📱 Responsive UI | Desktop, tablet and mobile support |
| ♿ Accessibility | Accessible interactive interface |
| ⚡ Frontend-only | No backend or database |

---

# 🏆 Hackathon Focus

The project was designed specifically around the WebRush evaluation areas:

### UI/UX
Premium data-storytelling interface with clear visual hierarchy and interactive components.

### Functionality
Search, filters, interactive visualizations, insights, and exploration.

### Data Relationships
Multiple datasets are combined to reveal cross-domain patterns.

### Responsiveness
Designed for different screen sizes.

### Accessibility
Semantic and keyboard-friendly interface.

### Performance
Aggregated data processing and selective rendering.

### Documentation
Clear explanation of the concept, architecture, datasets, and setup.

---

# 💡 Design Philosophy

> **Don't just show the receipt. Reveal the story behind it.**

A receipt is only a fragment.

A song is only a moment.

A transaction is only an event.

A collection of these moments can become something much bigger:

```text
        MOMENTS
           ↓
        PATTERNS
           ↓
      CONNECTIONS
           ↓
        INSIGHTS
           ↓
         STORY
```

**Your Life, In Receipts** turns fragmented digital activity into an experience users can explore, question, and interpret.

---

# 👨‍💻 Hackathon

Built for:

**WebRush — 6-Hour Frontend Hackathon**

Challenge:

**Your Life, In Receipts 🧾**

Participation:

**Individual**

Architecture:

**Frontend Only**

Datasets:

**Spotify + India Transactions + Household Transactions**

---

## ⭐ Final Thought

> **One Dataset. Hundreds of Moments. Infinite Stories.**
>
> **What story will you uncover?**

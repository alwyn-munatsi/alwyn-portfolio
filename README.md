# Alwyn Munatsi — Portfolio

Personal portfolio website for Alwyn (Ndodana) Munatsi — Data Engineer · Data Analyst · BI Developer · AI/ML Engineering.

Live at: [alwynmunatsi.com](https://alwynmunatsi.com) <!-- update with actual URL -->

---

## Tech Stack

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **AI Chatbot:** Groq API (llama-3.3-70b-versatile)
- **Runtime:** Node.js / Express (API proxy server)

---

## Features

- Responsive single-page portfolio with smooth scroll sections
- Interactive AI chatbot powered by Groq — answers questions about experience, skills, and availability
- Sections: Hero, About, Experience, Projects, Certifications, Skills, Contact
- Animated entrance transitions throughout

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Groq API key](https://console.groq.com)

### Installation

```bash
git clone https://github.com/alwyn-munatsi/alwyn-portfolio.git
cd alwyn-portfolio
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### Development

```bash
npm run dev
```

Runs the Vite dev server at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

---

## Project Structure

```
src/
├── components/       # UI sections (Hero, About, Experience, etc.)
│   └── Chatbot.jsx   # AI chatbot component
├── data/
│   └── portfolio.js  # All portfolio content (single source of truth)
├── App.jsx
└── main.jsx
```

To update portfolio content (experience, projects, skills, etc.), edit [src/data/portfolio.js](src/data/portfolio.js).

---

## Contact

- LinkedIn: [linkedin.com/in/alwynmunatsi](https://www.linkedin.com/in/alwynmunatsi/)
- GitHub: [github.com/alwyn-munatsi](https://github.com/alwyn-munatsi)
- Email: alwynmunatsi@email.com

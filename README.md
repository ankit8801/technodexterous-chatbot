# TechnoDexterous Support Chatbot

> An embeddable, modular AI support chatbot built for the [TechnoDexterous](https://technodexterous.com) platform — designed to deliver instant, intelligent automated assistance for course inquiries, internship guidance, and platform onboarding without any backend dependency on a third-party AI service.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-technodexterous--chatbot.vercel.app-3b82f6?style=for-the-badge&logo=vercel&logoColor=white)](https://technodexterous-chatbot.vercel.app/)

---

## 📌 Overview

The TechnoDexterous Support Chatbot is a production-grade, self-contained conversational interface deployed directly on the company's website. It serves as the first line of automated support, intercepting and resolving common user queries before they reach a human agent.

The system is architected for **zero-dependency extensibility**: intent patterns, responses, and safety rules are each managed in their own module, making the chatbot fully maintainable without touching the core routing logic.

It integrates into any existing website as a floating widget via a single `<script>` tag — no frontend framework, no npm dependencies, no build step required.

---

## ✨ Features

- **Single-Script Embed Integration** — Drop a single `<script>` tag on any page to activate the full chatbot experience with a floating, animated launcher button.
- **Regex & Keyword Intent Engine** — High-performance pattern matching using Python's `re` module with word-boundary guards to prevent false partial matches.
- **Structured Response Protocol** — Every API response returns a typed `{ text, buttons }` JSON object, ensuring consistent behavior across all client implementations.
- **Hardcoded Security Filter (Restricted Intents)** — A first-pass safety layer intercepts and blocks queries containing sensitive keywords (financial, account, PII) before they reach the intent router.
- **Contextual Fallback with Suggestion Chips** — When no intent is matched, the chatbot responds with a curated set of one-click suggestion buttons to guide users back into a supported flow.
- **Persistent Quick-Access Menu Bar** — Four pinned shortcut buttons (Courses, Internships, Getting Started, FAQs) remain accessible at all times within the chat UI.
- **Typing Indicator** — A three-dot animated indicator is displayed while the backend processes each request, providing a polished, natural conversational feel.
- **Accessibility-First Design** — Larger touch targets, high-contrast text, and generous spacing make the interface approachable for all users, including non-technical audiences.
- **Fully Responsive Layout** — The chat window renders as a floating card on desktop and transitions to a full-screen overlay on mobile viewports (≤ 480px).
- **Glassmorphism UI** — A modern dark-themed interface with frosted glass aesthetics rendered in pure HTML/CSS with no external UI library dependencies.

---

## 🛠 Tech Stack

| Layer       | Technology                                      |
|-------------|--------------------------------------------------|
| **Backend** | Python 3.8+, Flask 3.0.3, Werkzeug 3.0.3       |
| **CORS**    | Flask-CORS 4.0.1                                |
| **Intent Matching** | Python `re` (Regex standard library)    |
| **Frontend**| HTML5, CSS3 (Vanilla), Vanilla JavaScript (ES6+)|
| **Typography** | Inter (Google Fonts)                         |
| **Templating** | Jinja2 (via Flask)                           |
| **Widget Delivery** | Self-contained IIFE JavaScript bundle   |

No external NLP libraries, no model inference, and no API keys required.

---

## 🏗 Architecture

The backend follows a **strict separation-of-concerns** architecture. Each layer has a single responsibility and can be modified or extended independently.

```
HTTP Request (POST /chat)
        │
        ▼
   [ app.py ]  ←  Flask route handler & CORS configuration
        │
        ▼
[ chatbot_engine.py ]  ←  Core router: safety checks, intent matching, response dispatch
        │
   ┌────┴────┐
   ▼         ▼
[ intents.py ]    [ responses.py ]
 (Pattern KB)      (Response KB)
```

**Request Lifecycle:**
1. The client (widget or direct API call) sends a `POST /chat` with `{ "message": "..." }`.
2. `chatbot_engine.py` normalizes the input (lowercase, strip whitespace).
3. The **security filter** scans for restricted keywords first — no intent matching occurs if flagged.
4. The **intent router** iterates through all defined intents in `intents.py`, applying word-boundary regex against each pattern list.
5. On match, the corresponding response is fetched from `responses.py` and returned as `{ "text": "...", "buttons": [] }`.
6. On no match, the fallback response and suggestion chip array are returned.
7. The frontend widget renders the message in the appropriate bubble and displays any suggestion buttons.

---

## 📂 Folder Structure

```text
technodexterous_chatbot/
│
├── app.py                    # Flask entry point: server init, CORS, route definitions
├── chatbot_engine.py         # Core processing logic: security filter + intent-to-response router
├── intents.py                # Intent knowledge base: keyword and regex patterns per intent
├── responses.py              # Response knowledge base: reply text, fallback text, and chip labels
├── requirements.txt          # Pinned production dependency manifest
├── test_widget.html          # Standalone local HTML page for widget integration testing
│
├── static/
│   ├── chatbot-widget.js     # Self-contained IIFE widget: injects launcher button and iframe
│   ├── script.js             # In-iframe chat logic: message rendering, API calls, typing indicator
│   └── style.css             # Full chat UI stylesheet: glassmorphism, animations, responsive rules
│
└── templates/
    └── index.html            # Jinja2 template: the chat UI served inside the widget iframe
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Python 3.8+** — [Download here](https://www.python.org/downloads/)
- `pip` package manager (bundled with Python 3.4+)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/technodexterous-chatbot.git
cd technodexterous-chatbot
```

### Step 2 — Create and Activate a Virtual Environment

```bash
# Create the environment
python -m venv venv

# Activate — Linux/macOS
source venv/bin/activate

# Activate — Windows
venv\Scripts\activate
```

### Step 3 — Install Dependencies

```bash
pip install -r requirements.txt
```

**Installed packages:**

| Package       | Version | Purpose                            |
|---------------|---------|------------------------------------|
| Flask         | 3.0.3   | HTTP server and request routing    |
| Werkzeug      | 3.0.3   | WSGI utilities (Flask dependency)  |
| Flask-CORS    | 4.0.1   | Cross-Origin Resource Sharing      |

### Step 4 — Start the Development Server

```bash
python app.py
```

The API server starts at `http://127.0.0.1:5000` with debug mode enabled.

---

## 🔐 Environment Variables

The application uses hardcoded defaults for local development. For production deployments, configure the following via a `.env` file or your hosting platform's environment settings:

```ini
# .env.example (do not commit actual .env files)

# Flask runtime environment
FLASK_ENV=production

# Server port (override default 5000 if needed)
PORT=5000

# Allowed CORS origin for production widget embedding
CORS_ORIGIN=https://technodexterous.com
```

> ⚠️ Never commit `.env` files. The provided `.gitignore` excludes them by default.

---

## 🖥 Usage Guide

### Local Testing

The repository includes a self-contained test page to validate the widget integration locally before deployment.

1. Ensure the Flask server is running (`python app.py`).
2. Open `test_widget.html` directly in your browser (it does **not** require a separate server).
3. Click the **"AI Assistant"** floating button in the bottom-right corner.
4. The full chatbot UI will open in the embedded iframe — interact, test intents, and verify fallback behavior.

---

### Embedding on the Production Website

The chatbot is delivered as a single JavaScript asset. To integrate it on any page of the TechnoDexterous website:

**1. Deploy the backend** to a hosting provider (e.g., Render, Railway, AWS EC2, Heroku).

**2. Update the `baseUrl`** in `static/chatbot-widget.js` to point to the deployed backend:

```js
// static/chatbot-widget.js — Line 4
const baseUrl = 'https://technodexterous-chatbot.vercel.app';
```

**3. Add the script tag** to the target page's HTML, just before `</body>`:

```html
<script src="https://your-domain.com/static/chatbot-widget.js"></script>
```

That is the full integration. No additional configuration, imports, or build steps are required.

---

### Direct API Usage

The chatbot exposes a single REST endpoint that can be consumed by any client:

**Endpoint:** `POST /chat`

**Request Body:**
```json
{
  "message": "What courses do you offer?"
}
```

**Response:**
```json
{
  "text": "We specialize in Python technologies! Our main courses are Python Fullstack Development, Advanced Data Analytics, Python Programming, and Python for Youngsters.",
  "buttons": []
}
```

**Fallback Response (unrecognized query):**
```json
{
  "text": "I didn't quite understand that. You can ask me about Courses, Internships, Getting Started, or FAQs.",
  "buttons": ["Courses", "Internships", "Getting Started", "FAQs"]
}
```

---

### Extending the Intent Engine

To add a new intent without modifying the core engine:

**1.** Add a new key with keyword patterns to `intents.py`:
```python
"pricing": [
    "price", "cost", "fee", "how much", "pricing"
]
```

**2.** Add the corresponding response to `responses.py`:
```python
"pricing": [
    "Please visit our Courses page for up-to-date pricing details."
]
```

No changes to `chatbot_engine.py` or `app.py` are required — the router is data-driven.

---

## 📸 UI Preview

> *Screenshots below reflect the live chat interface as deployed on technodexterous.com.*

| Chat Interface | Mobile View |
|:-:|:-:|
| ![Chatbot Interface](https://via.placeholder.com/380x580/0d1117/3b82f6?text=Chat+Interface) | ![Mobile View](https://via.placeholder.com/320x568/0d1117/8b5cf6?text=Mobile+Fullscreen) |

---

## 🔮 Future Improvements

| Priority | Improvement                                                                                  |
|----------|----------------------------------------------------------------------------------------------|
| High     | **LLM Integration** — Replace regex matching with a fine-tuned or prompted LLM (e.g., Gemini, GPT-4o mini) for contextual query handling |
| High     | **Session Persistence** — Store conversation history in Redis or PostgreSQL to support multi-turn context |
| Medium   | **Analytics & Intent Monitoring** — Track intent hit rates and unresolved query logs to drive content improvements |
| Medium   | **Admin Knowledge Base Panel** — Web UI to add/edit intents and responses without modifying source files |
| Low      | **Multilingual Support** — Implement `gettext`-based i18n for regional language switching    |
| Low      | **Proactive Triggers** — Time-on-page or scroll-depth triggers to open chatbot automatically |

---

## 👤 Author

**Ajay Sharma**
*Software Engineer — TechnoDexterous Internship Project*

- 🔗 [LinkedIn](#)
- 💼 [Portfolio](#)
- 🐙 [GitHub](#)

*This chatbot was designed and built as the capstone project of a software engineering internship at TechnoDexterous, targeting real-world deployment on the company's official web platform.*

---

## 📜 License

This project is proprietary to **TechnoDexterous**. All rights reserved.

For licensing inquiries, contact the TechnoDexterous development team.
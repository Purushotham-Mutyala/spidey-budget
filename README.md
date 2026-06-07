# 🕷️ SpideyBudget — Web-Shooter Expense Tracker

A sleek, modern, and highly interactive **Spider-Man themed** personal finance manager and budget calculator. Built with absolute minimalism in mind using **pure HTML, CSS, and Vanilla JavaScript**—no bulky frameworks, no external dependencies, just super-lightweight tech suit performance!

---

## 💡 The Origin Story
As a hostel student, I often found myself struggling to manage my allowance and expenses efficiently. Money would just fly away, and tracking it felt like a boring chore. I wanted to build something simple, clean, and interactive to help me stay on top of my finances. Being a huge Spider-Man fan, I decided to style it after Peter Parker’s tech suit HUD. Thus, SpideyBudget was born—making budget tracking feel less like accounting and more like preparing for a friendly neighborhood mission!

---

## 📸 Overview
SpideyBudget helps you stay ahead of your expenses. Set your target budget, log your daily expenditures (from Web Fluid Refills to Pizza with MJ), and see your remaining funds computed in real-time on a tech HUD layout. 

If your remaining budget dips below **20%**, your **Spider-Sense** will start tingling with visual neon red pulses across the screen, alerting you to slow down!

---

## ✨ Features

- **🕸️ Tech HUD Overview**: Features a custom-built, responsive circular SVG progress ring that dynamically updates and transitions colors based on your budget status (Green for Safe, Gold for Warning, Pulsing Red for Danger).
- **🚨 Spider-Sense Warnings**: Activates a pulsing full-screen warning and banner notification when funds are low or exceeded.
- **⚡ Web-Shoot Forms**: Fast inputs for setting budgets and adding tasks with custom click transitions and slide-in animations.
- **📂 Local Storage Persistence**: Retains all data automatically inside the browser cache—so reload, close, or reopen the tab without losing your logs.
- **🧪 Dynamic Category Filters**: Filter and search through logs by category (Web Fluid & Gear, Stark Tech, Daily Food, Suit Maintenance, and Others).
- **📱 Fully Responsive**: Custom CSS flexbox/grid architecture that scales from giant desktop setups down to mobile Web-Shooters.

---

## 🎨 Design System & Color Palette

- **Web Background (Midnight Black)**: `rgba(3, 7, 18, 1)`
- **Spidey Red (Accent)**: `#ff3344`
- **Suit Blue (Accent)**: `#3399ff`
- **Spider-Sense Warning (Electro Gold)**: `#ffd700`
- **Spidey HUD Safe (Neon Green)**: `#10b981`

The background includes a custom CSS generated radiating spiderweb design overlaid onto high-performance glassmorphic cards.

---

## 🚀 Getting Started

No configuration or package installations required! Follow these simple steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/spideybudget.git
   cd spideybudget
   ```

2. **Open index.html**:
   - Simply double-click `index.html` to open the app directly in your browser.
   - Alternatively, serve it locally using Python:
     ```bash
     python3 -m http.server 8000
     ```
     Then navigate to `http://localhost:8000` in your web browser.

---

## 📁 File Structure

```text
spidey-budget/
├── index.html     # Semantic structure & layout (comment-free)
├── style.css      # Suit styles, custom properties, animations, & web grids (comment-free)
├── app.js         # Core mathematics, state management, & localStorage logic (comment-free)
├── logo.png       # Generated neon red Spider-Man logo asset
└── README.md      # Documentation
```

---

## 📜 License
Developed with 🕸 by a friendly neighborhood programmer. Free to use, adapt, and build upon.

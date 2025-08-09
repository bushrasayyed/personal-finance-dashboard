# 💸 Finlytico – Personal Finance Dashboard
A modern, responsive personal finance dashboard to add, edit, and delete income/expense transactions, track your spending, and view insightful analytics. Built with React, TypeScript, and Firebase, it provides category-based visualizations, monthly trends, and full data reset from settings — all in a smooth, theme-friendly UI.

🌐 **Live Demo:**  
[**View Finlytico**](https://personal-finance-dashboard-beta.vercel.app/)

---

## ✨ Features

- 💰 **Add, Edit & Delete Transactions** – Full CRUD for income & expense entries.
- 📊 **Analytics Dashboard** – Category-wise **Pie Chart** and monthly trend **Bar Chart**.
- 📅 **Date & Category Filters** – Filter transactions instantly.
- 🌓 **Light / Dark Theme Toggle** – Theme preference saved automatically.
- 🗑 **Reset All Data** – Clear transactions & settings from **Settings** page.
- 📱 **Responsive UI** – Optimized for mobile, tablet, and desktop.
- ⚡ **Smooth Animations** – Powered by Framer Motion for a polished experience.
- 🔔 **Snackbar Notifications** – Using Notistack for instant feedback.

---

## 🛠 Tech Stack

| Technology / Library       | Purpose |
|----------------------------|---------|
| **React (Vite)**           | Core frontend framework & fast bundler |
| **TypeScript**             | Type safety & better development flow |
| **Firebase Firestore**     | Cloud database for transactions |
| **Material UI (MUI v5)**   | Component library for responsive design |
| **Chart.js + react-chartjs-2** | Data visualizations |
| **Framer Motion**          | Animations & transitions |
| **Lucide React**           | Clean, customizable icons |
| **Notistack**              | Snackbar notifications |
| **Date-fns**               | Date formatting & utilities |
| **Vercel**                 | Deployment platform |

---
## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/personal-finance-dashboard.git
cd personal-finance-dashboard
```

### 2. Install dependencies 

```bash
yarn install
# or 
npm install

```
### 3. Setup environment variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

```
### 4.  Run the development server
```
yarn dev
# or
npm run dev
```
### 5. Open in your browser:
```
http://localhost:5173
```
---
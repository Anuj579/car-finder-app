# Car Finder 🚗

A modern car listing app built with React and TailwindCSS. Users can browse cars, add/remove them from a wishlist, and view the wishlist separately.

🔗 **Live URL**: [https://carfinder-app.vercel.app/](https://carfinder-app.vercel.app/)
---

## 🚀 Features

- View car listings in a responsive grid layout
- Add or remove cars from **wishlist** (saved in localStorage)
- Live **wishlist count** in the navbar
- Toast notifications on adding/removing from wishlist
- Smooth UI with blurred sticky navbar

---

## 🛠️ Tech Stack

- **Next.js** (with `useState` and `useEffect`)
- **Tailwind CSS** + **shadcn/ui** for modern styling
- **React Hot Toast** for notifications
- **LocalStorage** for wishlist persistence
- **Custom Event** system for live updates across components

---

## 📂 Folder Structure (Minimal)
```
src/
├── app/
│   ├── page.jsx
│   ├── layout.jsx
│   └── wishlist/
│       └── page.jsx
├── components/
│   ├── CarCard.jsx
│   ├── FilterSidebar.jsx
│   ├── Home.jsx
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   ├── Providers.jsx
│   ├── ThemeToggle.jsx
│   └── ui/ (Shadcn components)
├── utils/
│   └── wishlist.js
```

---

## ⚙️ Setup Instructions (Local)

```bash
1. git clone https://github.com/Anuj579/car-finder-app.git
2. cd car-finder-app
3. npm install
4. npm run dev
```

---

## ✨ Author

Built by [Anuj (@anujbuilds)](https://instagram.com/anujbuilds)
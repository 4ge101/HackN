# 📰 Hacker News Client

A modern, fast, and minimal Hacker News client built with a clean architecture and developer-friendly structure. This project focuses on performance, readability, and a smooth user experience.

---

## 🚀 Features

* 🔥 Browse Top, New, and Best stories
* 💬 Fully nested comment threads
* ⭐ Save & favorite stories
* 👤 View user profiles
* ⚡ Fast data fetching with custom hooks
* 🎯 Keyboard navigation support
* 🌙 Dark / Light theme toggle
* 🔎 Search functionality
* 📱 Responsive UI

---

## 📁 Project Structure

```bash
src/
├── App.jsx                # Root component
├── main.jsx               # Entry point
├── index.css              # Global styles
│
├── Pages/                 # Route-level pages
│   ├── Home.jsx           # Story feed
│   ├── Story.jsx          # Single story view + comments
│   ├── User.jsx           # User profile page
│   ├── Saved.jsx          # Saved stories
│   ├── Favourites.jsx     # Favorited stories
│   └── Settings.jsx       # App settings (theme, preferences)
│
├── components/            # Reusable UI components
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── StoryItem.jsx
│   ├── StoryList.jsx
│   ├── CommentItem.jsx
│   ├── CommentItem.module.css
│   ├── CommentTree.jsx
│   └── CommentTree.module.css
│
├── hooks/                 # Custom React hooks
│   ├── useStories.js      # Fetch and manage stories
│   ├── useComments.js     # Handle nested comments
│   ├── useUser.js         # Fetch user data
│   ├── useBookmarks.js    # Save & retrieve bookmarks
│   ├── useKeyboardNav.js  # Keyboard navigation logic
│   ├── useTheme.js        # Theme switching
│   └── useSearch.js       # Search functionality
│
├── services/              # API layer
│   └── hnApi.js           # Hacker News API wrapper
│
├── store/                 # Global state management
│   └── useStore.js        # Zustand/Context store
│
├── utils/                 # Utility functions
│   ├── timeAgo.js         # Format timestamps
│   ├── formatUrl.js       # Clean URLs
│   └── sanitizeHtml.js    # Prevent XSS in comments
│
└── ui/                    # Small UI primitives
    ├── Spinner.jsx
    ├── Badge.jsx
    └── Button.jsx
```

---

## 🧠 Architecture Overview

* **Pages** handle routing and layout
* **Components** are reusable UI blocks
* **Hooks** encapsulate logic and state
* **Services** manage API communication
* **Store** manages global state
* **Utils** provide helper functions
* **UI** contains small reusable design elements

This separation ensures scalability and clean code.

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/hacker-news-client.git
cd hacker-news-client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

---

## 📡 API

This project uses the official Hacker News API:

* Get stories:

  ```
  https://hacker-news.firebaseio.com/v0/topstories.json
  ```
* Get item:

  ```
  https://hacker-news.firebaseio.com/v0/item/:id.json
  ```

---

## ✨ Key Concepts Used

* Custom React Hooks for logic separation
* Component-based architecture
* Modular CSS for scoped styling
* Global state management
* API abstraction layer

---

## 🔮 Future Improvements

* 🔔 Notifications system
* 📌 Offline support (PWA)
* 🧠 AI summaries for stories
* 🧵 Collapsible comment threads
* 🚀 Performance optimizations (caching, virtualization)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Your Name
GitHub: https://github.com/4ge101

---

## ⭐ Support

If you like this project, consider giving it a star ⭐

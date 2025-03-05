# 📚 Book Finder

Welcome to **Book Finder**, a web application that helps you search for books effortlessly! With features like cached API responses, pagination, lazy-loaded images, ToggleTheme, and detailed book descriptions, this app enhances your book discovery experience.

---

## 🚀 Features

### 🔎 **Search Books Efficiently**

- Enter a book title, author, or keyword in the search bar.
- Fetches results from an API and **caches responses for 24 hours** to optimize performance.

### 📄 **Paginated Results**

- Displays **20 books per page** for a seamless browsing experience.
- Users can navigate between pages easily.

### 🖼️ **Lazy Loading Images**

- Uses **lazy loading** to improve performance and reduce load time.
- Ensures smooth scrolling and optimized resource usage.

### 📖 **Detailed Book Sections**

- Click on **View Details** to access in-depth information about each book.
- Displays author details, description, and additional metadata.

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS , Shadcn UI
- **API:** Google Books API
- **State Management:** React Hooks (useState and useContext )
- **Performance Enhancements:** LocalStorage Caching, Lazy Loading

---

## 📂 Project Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/tarunsrinivas4302/book-finder.git
cd book-finder
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Set Up Environment Variables

**Note this Process is Optional** 
Create a **.env** file and add your CACHE KEY:

```env
VITE_CACHE_KEY=book_finder_cache
```

### 4️⃣ Run the Application

```bash
npm run dev
# or
yarn dev
```

The app should now be running on **http://localhost:5173** 🚀

---

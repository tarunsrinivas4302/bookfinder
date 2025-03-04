import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import BookDetails from "@/pages/book-detail";
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="book/:id" element={<BookDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

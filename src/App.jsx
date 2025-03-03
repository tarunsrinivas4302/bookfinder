import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import BookDetails from "@/pages/book-detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="book/:id" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

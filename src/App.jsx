import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider"
import { lazy, Suspense } from "react";
import { BarLoader } from "react-spinners";

const Home = lazy(() => import("@/pages/home"));
const BookDetails = lazy(() => import("@/pages/book-detail"));

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/"
           element={
             <Suspense fallback={<BarLoader color='oklch(0.777 0.152 181.912)' width="100%" height="4px" />}>
              <Home />
            </Suspense>
          } />
          
          <Route path="/book" element={
            <Suspense fallback={<BarLoader color='oklch(0.777 0.152 181.912)' width="100%" height="4px" />}>
              <BookDetails />
            </Suspense>
          } />
        
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

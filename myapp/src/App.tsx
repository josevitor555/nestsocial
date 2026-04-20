
// index.css
import "./index.css";

// Pages (React route Dom)
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import LoadingPage from "./pages/LoadingPage";

import { useState, useEffect } from "react";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    // Simular carregamento inicial da aplicação
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* Mais Page */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loading" element={<LoadingPage />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

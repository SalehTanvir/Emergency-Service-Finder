import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Favorites from "./pages/Favorites";

function App() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (serviceId) => {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(serviceId)
        ? currentFavorites.filter((id) => id !== serviceId)
        : [...currentFavorites, serviceId]
    );
  };

  return (
    <>
      <Navbar favCount={favorites.length} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/services"
          element={<Services favorites={favorites} onToggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;

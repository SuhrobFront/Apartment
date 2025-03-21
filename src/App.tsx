import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import FloorPlansPage from "./components/FloorPlansPage";
import ApartmentDetailPage from "./components/ApartmentDetailPage";
import FavoritesPage from "./components/FavoritesPage";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/floor-plans" element={<FloorPlansPage />} />
        <Route path="/apartments/:id" element={<ApartmentDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </Suspense>
  );
}

export default App;

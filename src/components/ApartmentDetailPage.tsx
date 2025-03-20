import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import ContactForm from "./ContactForm";
import {
  Heart,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bed,
  Bath,
  Square,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface Apartment {
  id: string;
  title: string;
  description: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  location: string;
  images: string[];
  features: string[];
}

const ApartmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // Check login status
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    setIsLoggedIn(!!userToken);
  }, []);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockApartment: Apartment = {
        id: id || "1",
        title: "Просторная двухкомнатная квартира",
        description:
          "Светлая и просторная квартира в центре города с современным ремонтом. Большие окна обеспечивают отличное естественное освещение. Квартира полностью меблирована и готова к заселению. В шаговой доступности находятся магазины, рестораны и общественный транспорт.",
        area: 75,
        bedrooms: 2,
        bathrooms: 1,
        price: 1200,
        location: "ул. Ленина, 42, Москва",
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
          "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
          "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
          "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&q=80",
          "https://images.unsplash.com/photo-1560184990-4a5229fef9c7?w=800&q=80",
        ],
        features: [
          "Кондиционер",
          "Балкон",
          "Встроенная кухня",
          "Стиральная машина",
          "Холодильник",
          "Интернет",
          "Парковка",
        ],
      };
      setApartment(mockApartment);
      setLoading(false);

      // Check if this apartment is in favorites
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      setIsFavorite(favorites.some((fav: string) => fav === id));
    }, 500);
  }, [id]);

  const handlePrevImage = () => {
    if (!apartment) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? apartment.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    if (!apartment) return;
    setCurrentImageIndex((prev) =>
      prev === apartment.images.length - 1 ? 0 : prev + 1,
    );
  };

  const toggleFavorite = () => {
    if (!apartment) return;

    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      // Remove from favorites
      const newFavorites = favorites.filter(
        (fav: string) => fav !== apartment.id,
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      // Add to favorites
      favorites.push(apartment.id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar logo="Квартира" onSearch={() => {}} isLoggedIn={isLoggedIn} />
        <div className="container mx-auto py-12 px-4">
          <div className="animate-pulse">
            <div className="h-8 w-1/3 bg-gray-200 rounded mb-6"></div>
            <div className="h-96 bg-gray-200 rounded mb-6"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!apartment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar logo="Квартира" onSearch={() => {}} isLoggedIn={isLoggedIn} />
        <div className="container mx-auto py-12 px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Квартира не найдена
          </h2>
          <p className="text-gray-600 mb-6">
            Запрашиваемая квартира не существует или была удалена.
          </p>
          <Button onClick={() => navigate("/floor-plans")}>
            Вернуться к списку квартир
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar logo="Квартира" onSearch={() => {}} isLoggedIn={isLoggedIn} />

      <div className="container mx-auto py-6 px-4">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          onClick={() => navigate("/floor-plans")}
        >
          <ArrowLeft size={16} />
          Назад к списку
        </Button>

        {/* Title and favorite */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {apartment.title}
          </h1>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-gray-600"}`}
            onClick={toggleFavorite}
          >
            <Heart className={isFavorite ? "fill-red-500" : ""} size={20} />
          </Button>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-6">
          <MapPin size={16} />
          <span>{apartment.location}</span>
        </div>

        {/* Login prompt dialog */}
        {showLoginPrompt && (
          <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
            <DialogContent className="sm:max-w-md">
              <div className="text-center p-4">
                <Heart className="mx-auto h-12 w-12 text-red-500 mb
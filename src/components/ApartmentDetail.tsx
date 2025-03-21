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
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface ApartmentDetailProps {
  id?: string;
  onClose?: () => void;
}

const ApartmentDetail: React.FC<ApartmentDetailProps> = ({
  id: propId,
  onClose,
}) => {
  const { id: paramId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const id = propId || paramId;

  const [apartment, setApartment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // Check login status
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    setIsLoggedIn(!!userToken);
  }, []);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockApartment = {
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
    );
  }

  if (!apartment) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Квартира не найдена
        </h2>
        <p className="text-gray-600 mb-6">
          Запрашиваемая квартира не существует или была удалена.
        </p>
        {onClose ? (
          <Button onClick={onClose}>Закрыть</Button>
        ) : (
          <Button onClick={() => navigate("/floor-plans")}>
            Вернуться к списку квартир
          </Button>
        )}
      </div>
    );
  }

  const content = (
    <>
      {/* Back button */}
      {onClose ? (
        <Button
          variant="ghost"
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <ArrowLeft size={16} />
          Назад
        </Button>
      ) : (
        <Button
          variant="ghost"
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          onClick={() => navigate("/floor-plans")}
        >
          <ArrowLeft size={16} />
          Назад к списку
        </Button>
      )}

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
              <Heart className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Требуется авторизация
              </h3>
              <p className="text-gray-500 mb-4">
                Чтобы добавить объект в избранное, необходимо войти в систему
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowLoginPrompt(false)}
                >
                  Отмена
                </Button>
                <Button onClick={() => navigate("/login")}>Войти</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Image gallery */}
      <div className="relative mb-8 bg-gray-100 rounded-lg overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 relative">
          <img
            src={apartment.images[currentImageIndex]}
            alt={`${apartment.title} - изображение ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Image navigation */}
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/70 hover:bg-white/90"
              onClick={handlePrevImage}
            >
              <ChevronLeft size={24} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/70 hover:bg-white/90"
              onClick={handleNextImage}
            >
              <ChevronRight size={24} />
            </Button>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {apartment.images.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
          {apartment.images.map((image: string, index: number) => (
            <div
              key={index}
              className={`w-20 h-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${index === currentImageIndex ? "border-primary" : "border-transparent"}`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Описание</h2>
            <p className="text-gray-700 mb-6">{apartment.description}</p>

            <h2 className="text-xl font-bold mb-4">Характеристики</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Square size={20} className="text-gray-500" />
                <span className="text-gray-700">{apartment.area} м²</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed size={20} className="text-gray-500" />
                <span className="text-gray-700">
                  {apartment.bedrooms}{" "}
                  {apartment.bedrooms === 1 ? "спальня" : "спальни"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Bath size={20} className="text-gray-500" />
                <span className="text-gray-700">
                  {apartment.bathrooms}{" "}
                  {apartment.bathrooms === 1 ? "ванная" : "ванные"}
                </span>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Удобства</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {apartment.features.map((feature: string, index: number) => (
                <Badge key={index} variant="outline" className="bg-gray-50">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Price and contact */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-6">
            <div className="text-2xl font-bold text-primary mb-2">
              ${apartment.price.toLocaleString()}/месяц
            </div>
            <p className="text-gray-500 mb-6">Без учета коммунальных услуг</p>

            <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
              <DialogTrigger asChild>
                <Button className="w-full mb-3">Забронировать просмотр</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <ContactForm
                  title="Забронировать просмотр"
                  apartmentId={apartment.id}
                  apartmentTitle={apartment.title}
                />
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              className="w-full mb-6"
              onClick={() => setShowContactForm(true)}
            >
              Связаться с агентом
            </Button>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Контактная информация</h3>
              <div className="flex items-center gap-2 mb-2">
                <Phone size={16} className="text-gray-500" />
                <span className="text-gray-700">+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-500" />
                <span className="text-gray-700">info@kvartira.ru</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // If used as a standalone page
  if (!propId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar logo="Квартира" onSearch={() => {}} isLoggedIn={isLoggedIn} />
        <div className="container mx-auto py-6 px-4">{content}</div>
        <footer className="bg-white border-t border-gray-200 py-6 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-xl font-bold text-gray-900">Квартира</h2>
                <p className="text-sm text-gray-500">
                  Найдите идеальную квартиру
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <a href="/about" className="text-gray-500 hover:text-gray-900">
                  О нас
                </a>
                <a
                  href="/contact"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Контакты
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  Условия
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  Конфиденциальность
                </a>
              </div>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Квартира. Все права защищены.
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // If used as a component
  return <div className="p-4">{content}</div>;
};

export default ApartmentDetail;

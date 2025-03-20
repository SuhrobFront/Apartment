import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import FloorPlanCard from "./FloorPlanCard";
import { Button } from "./ui/button";
import { Heart, Trash2 } from "lucide-react";

interface FloorPlan {
  id: string;
  imageUrl: string;
  title: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
}

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FloorPlan[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample floor plan data - in a real app, this would come from an API
  const allFloorPlans: FloorPlan[] = [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      title: "Студия",
      area: 45,
      bedrooms: 1,
      bathrooms: 1,
      price: 850,
    },
    {
      id: "2",
      imageUrl:
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
      title: "Однокомнатная",
      area: 60,
      bedrooms: 1,
      bathrooms: 1,
      price: 1000,
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
      title: "Двухкомнатная",
      area: 75,
      bedrooms: 2,
      bathrooms: 1,
      price: 1200,
    },
    {
      id: "4",
      imageUrl:
        "https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&q=80",
      title: "Трехкомнатная",
      area: 95,
      bedrooms: 3,
      bathrooms: 2,
      price: 1500,
    },
    {
      id: "5",
      imageUrl:
        "https://images.unsplash.com/photo-1560184990-4a5229fef9c7?w=800&q=80",
      title: "Четырехкомнатная",
      area: 120,
      bedrooms: 4,
      bathrooms: 2,
      price: 1800,
    },
    {
      id: "6",
      imageUrl:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
      title: "Пентхаус",
      area: 150,
      bedrooms: 3,
      bathrooms: 2,
      price: 2500,
    },
  ];

  useEffect(() => {
    // Load favorites from localStorage
    const loadFavorites = () => {
      const savedFavoriteIds = JSON.parse(
        localStorage.getItem("favorites") || "[]",
      );
      const favoriteFloorPlans = allFloorPlans.filter((plan) =>
        savedFavoriteIds.includes(plan.id),
      );
      setFavorites(favoriteFloorPlans);
      setLoading(false);
    };

    // Simulate API delay
    setTimeout(loadFavorites, 500);
  }, []);

  const handleRemoveFromFavorites = (id: string) => {
    // Remove from state
    setFavorites((prev) => prev.filter((item) => item.id !== id));

    // Remove from localStorage
    const savedFavoriteIds = JSON.parse(
      localStorage.getItem("favorites") || "[]",
    );
    const updatedFavorites = savedFavoriteIds.filter(
      (favId: string) => favId !== id,
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleFloorPlanClick = (id: string) => {
    navigate(`/apartments/${id}`);
  };

  const handleClearAllFavorites = () => {
    setFavorites([]);
    localStorage.setItem("favorites", JSON.stringify([]));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar logo="Квартира" onSearch={() => {}} isLoggedIn={false} />
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Избранное</h1>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-[250px] w-full animate-pulse rounded-lg bg-gray-200"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar logo="Квартира" onSearch={() => {}} isLoggedIn={false} />

      <main className="container mx-auto py-6 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Избранное</h1>
            <p className="text-gray-500">
              {favorites.length}{" "}
              {favorites.length === 1 ? "объект" : "объектов"}
            </p>
          </div>

          {favorites.length > 0 && (
            <Button
              variant="outline"
              className="mt-4 sm:mt-0 flex items-center gap-2"
              onClick={handleClearAllFavorites}
            >
              <Trash2 size={16} />
              Очистить все
            </Button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-lg border border-dashed border-gray-300 p-12 text-center">
            <Heart size={48} className="text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-700 mb-2">
              У вас пока нет избранных объектов
            </h2>
            <p className="text-gray-500 mb-6">
              Добавляйте понравившиеся квартиры в избранное, чтобы вернуться к
              ним позже
            </p>
            <Button onClick={() => navigate("/floor-plans")}>
              Просмотреть все квартиры
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((floorPlan) => (
              <div key={floorPlan.id} className="relative group">
                <FloorPlanCard
                  id={floorPlan.id}
                  imageUrl={floorPlan.imageUrl}
                  title={floorPlan.title}
                  area={floorPlan.area}
                  bedrooms={floorPlan.bedrooms}
                  bathrooms={floorPlan.bathrooms}
                  price={floorPlan.price}
                  onClick={() => handleFloorPlanClick(floorPlan.id)}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromFavorites(floorPlan.id);
                  }}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-gray-900">Квартира</h2>
              <p className="text-sm text-gray-500">
                Найдите идеальную квартиру
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-900">
                О нас
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900">
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
};

export default FavoritesPage;
